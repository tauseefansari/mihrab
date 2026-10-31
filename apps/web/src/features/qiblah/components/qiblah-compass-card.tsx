'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { CompassDial } from '@/components/ui/compass-dial';
import { QiblahInfoCard } from '@/features/qiblah/components/qiblah-info-card';
import { QiblahLocationPicker } from '@/features/qiblah/components/qiblah-location-picker';
import { CompassCalibrationBanner } from '@/features/qiblah/components/compass-calibration-banner';
import { AnimatedViewSwitcher } from '@/components/ui/animated-view-switcher';
import { QiblahAudioService } from '@/features/qiblah/services/qiblah-audio.service';
import { QiblahService } from '@/core/services/qiblah.service';
import { isClient } from '@/shared/utils/is-client';
import { cn } from '@/shared/utils/cn';
import {
  SANCTUARY_TARGETS,
  DEFAULT_USER_LOCATION,
} from '@/features/qiblah/constants/qiblah.constants';
import type { SanctuaryId } from '@/features/qiblah/types/qiblah.types';

interface DeviceOrientationEventWithCompass extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

interface DeviceOrientationEventConstructorWithPermission {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

const emptySubscribe = () => () => {};

async function requestOrientationPermission(): Promise<'granted' | 'denied'> {
  if (!isClient()) return 'denied';
  try {
    const orientationConstructor =
      window.DeviceOrientationEvent as unknown as DeviceOrientationEventConstructorWithPermission;
    const motionConstructor =
      window.DeviceMotionEvent as unknown as DeviceOrientationEventConstructorWithPermission;

    if (typeof orientationConstructor?.requestPermission === 'function') {
      const result = await orientationConstructor.requestPermission();
      if (result === 'granted') return 'granted';
    } else if (typeof motionConstructor?.requestPermission === 'function') {
      const result = await motionConstructor.requestPermission();
      if (result === 'granted') return 'granted';
    }
    return 'denied';
  } catch {
    return 'denied';
  }
}

function useCompassOrientation() {
  const [heading, setHeading] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  const isPermissionSupported = useSyncExternalStore(
    emptySubscribe,
    () => {
      if (!isClient()) return false;
      const constructor =
        window.DeviceOrientationEvent as unknown as DeviceOrientationEventConstructorWithPermission;
      return typeof constructor?.requestPermission === 'function';
    },
    () => false
  );

  useEffect(() => {
    if (!isClient() || !navigator.permissions?.query) return;
    let isMounted = true;
    navigator.permissions
      .query({ name: 'accelerometer' as PermissionName })
      .then((status) => {
        if (!isMounted) return;
        if (status.state === 'granted') {
          setHasPermission(true);
        } else if (status.state === 'denied') {
          setIsPermissionDenied(true);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isClient()) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const eventWithCompass = e as DeviceOrientationEventWithCompass;
      if (typeof eventWithCompass.webkitCompassHeading === 'number') {
        setHeading(eventWithCompass.webkitCompassHeading);
        setHasPermission(true);
        setIsPermissionDenied(false);
      } else if (typeof e.alpha === 'number') {
        setHeading(360 - e.alpha);
        setHasPermission(true);
        setIsPermissionDenied(false);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const requestPermission = async () => {
    const result = await requestOrientationPermission();
    if (result === 'granted') {
      setHasPermission(true);
      setIsPermissionDenied(false);
    } else {
      setIsPermissionDenied(true);
    }
  };

  const needsPermission = !hasPermission && (isPermissionSupported || isPermissionDenied);

  return { heading, isPermissionDenied, needsPermission, requestPermission };
}

function useQiblahLocation(defaultCityLabel: string) {
  const [selectedSanctuary, setSelectedSanctuary] = useState<SanctuaryId>('makkah');
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
    cityName: string;
  }>({
    latitude: DEFAULT_USER_LOCATION.latitude,
    longitude: DEFAULT_USER_LOCATION.longitude,
    cityName: defaultCityLabel,
  });

  useEffect(() => {
    if (!isClient() || !('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const isNearMumbai =
          Math.abs(lat - DEFAULT_USER_LOCATION.latitude) < 0.5 &&
          Math.abs(lng - DEFAULT_USER_LOCATION.longitude) < 0.5;
        setCoords({
          latitude: lat,
          longitude: lng,
          cityName: isNearMumbai ? defaultCityLabel : `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
        });
      },
      () => {
        // Gracefully keep DEFAULT_USER_LOCATION when permission denied/unavailable
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, [defaultCityLabel]);

  const selectSanctuary = (sanctuary: SanctuaryId) => {
    setSelectedSanctuary(sanctuary);
  };

  return { coords, selectSanctuary, selectedSanctuary };
}

function CompassHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box as="div" className="mb-md text-center">
      <Text as="h1" variant="display-lg" className="text-on-background mb-xs">
        {title}
      </Text>
      <Box as="div" className="gap-xs text-on-surface-variant flex items-center justify-center">
        <Icon name="MapPin" size={16} className="text-primary" />
        <Text as="p" variant="body-md">
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
}

function CompassStatusText({
  isAligned,
  alignedText,
  instructionText,
}: {
  isAligned: boolean;
  alignedText: string;
  instructionText: string;
}) {
  return (
    <Box
      as="div"
      className={cn(
        'mb-lg gap-xs px-md py-xs inline-flex items-center rounded-full border transition-all duration-300',
        isAligned
          ? 'bg-primary/15 border-primary/60 text-primary ring-primary/40 shadow-lg ring-1'
          : 'bg-surface-container/50 border-outline-variant/30 text-on-surface-variant'
      )}
    >
      <Icon
        name={isAligned ? 'Check' : 'Compass'}
        size={18}
        className={isAligned ? 'text-primary' : 'text-on-surface-variant'}
      />
      <Text
        as="span"
        variant="body-md"
        className={cn(
          'font-semibold tracking-wide',
          isAligned ? 'text-primary' : 'text-on-surface-variant'
        )}
      >
        {isAligned ? alignedText : instructionText}
      </Text>
    </Box>
  );
}

function useAlignmentFeedback(isAligned: boolean, isSoundEnabled: boolean) {
  const prevAlignedRef = useRef(false);
  useEffect(() => {
    if (isAligned && !prevAlignedRef.current) {
      if ('vibrate' in navigator) {
        navigator.vibrate([35]);
      }
      if (isSoundEnabled) {
        void QiblahAudioService.playAlignmentChime();
      }
    }
    prevAlignedRef.current = isAligned;
  }, [isAligned, isSoundEnabled]);
}

function CompassDialSection({
  needleAngle,
  isAligned,
  labels,
  sanctuary,
  ariaLabel,
}: {
  needleAngle: number;
  isAligned: boolean;
  labels: { north: string; south: string; west: string; east: string };
  sanctuary: SanctuaryId;
  ariaLabel: string;
}) {
  return (
    <Box as="div" className="mb-md md:mb-lg flex items-center justify-center">
      <CompassDial
        needleAngle={needleAngle}
        isAligned={isAligned}
        labels={labels}
        sanctuary={sanctuary}
        ariaLabel={ariaLabel}
      />
    </Box>
  );
}

function CompassPermissionSection({
  needsPermission,
  isPermissionDenied,
  onRequestPermission,
  enableCompassLabel,
  permissionDeniedNotice,
}: {
  needsPermission: boolean;
  isPermissionDenied: boolean;
  onRequestPermission: () => void;
  enableCompassLabel: string;
  permissionDeniedNotice: string;
}) {
  if (!needsPermission) return null;

  return (
    <Box as="div" className="mb-md flex flex-col items-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={onRequestPermission}
        aria-label={enableCompassLabel}
        className="gap-xs text-label-sm border-primary/40 text-primary hover:bg-primary/10 rounded-full font-medium"
      >
        <Icon name="Compass" size={16} />
        {enableCompassLabel}
      </Button>
      {isPermissionDenied && (
        <Text
          as="p"
          variant="label-sm"
          className="mt-xs text-tertiary max-w-80 text-center font-medium"
        >
          {permissionDeniedNotice}
        </Text>
      )}
    </Box>
  );
}

interface CompassActionToolbarProps {
  isSoundEnabled: boolean;
  isCalibrating: boolean;
  onToggleSound: () => void;
  onToggleCalibration: () => void;
  soundLabel: string;
  calibrateLabel: string;
}

function CompassActionToolbar({
  isSoundEnabled,
  isCalibrating,
  onToggleSound,
  onToggleCalibration,
  soundLabel,
  calibrateLabel,
}: CompassActionToolbarProps) {
  return (
    <Box as="div" className="gap-sm mb-md flex items-center justify-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleSound}
        aria-label={soundLabel}
        className="gap-xs text-label-sm border-outline-variant/40 bg-surface-container/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full border backdrop-blur-sm"
      >
        <Icon name={isSoundEnabled ? 'Volume2' : 'VolumeX'} size={15} />
        <Text as="span" variant="label-sm">
          {soundLabel}
        </Text>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleCalibration}
        aria-label={calibrateLabel}
        className="gap-xs text-label-sm border-outline-variant/40 bg-surface-container/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full border backdrop-blur-sm"
      >
        <Icon name={isCalibrating ? 'Compass' : 'RotateCw'} size={15} />
        <Text as="span" variant="label-sm">
          {calibrateLabel}
        </Text>
      </Button>
    </Box>
  );
}

function useQiblahCalculation(
  heading: number,
  coords: { latitude: number; longitude: number },
  selectedSanctuary: SanctuaryId
) {
  const targetCoords = SANCTUARY_TARGETS[selectedSanctuary];
  const { bearing, distanceKm, cardinal } = QiblahService.calculateQiblah(
    coords.latitude,
    coords.longitude,
    targetCoords
  );
  const { relativeAngle, isAligned } = QiblahService.calculateAlignment(heading, bearing);
  return { bearing, distanceKm, cardinal, relativeAngle, isAligned };
}

interface CompassNavigationSectionProps {
  needleAngle: number;
  isAligned: boolean;
  selectedSanctuary: SanctuaryId;
  labels: { north: string; south: string; west: string; east: string };
  compassDialAria: string;
  needsPermission: boolean;
  isPermissionDenied: boolean;
  onRequestPermission: () => void;
  enableCompassLabel: string;
  permissionDeniedNotice: string;
}

function CompassNavigationSection({
  needleAngle,
  isAligned,
  selectedSanctuary,
  labels,
  compassDialAria,
  needsPermission,
  isPermissionDenied,
  onRequestPermission,
  enableCompassLabel,
  permissionDeniedNotice,
}: CompassNavigationSectionProps) {
  return (
    <>
      <CompassDialSection
        needleAngle={needleAngle}
        isAligned={isAligned}
        sanctuary={selectedSanctuary}
        labels={labels}
        ariaLabel={compassDialAria}
      />
      <CompassPermissionSection
        needsPermission={needsPermission}
        isPermissionDenied={isPermissionDenied}
        onRequestPermission={onRequestPermission}
        enableCompassLabel={enableCompassLabel}
        permissionDeniedNotice={permissionDeniedNotice}
      />
    </>
  );
}

interface CompassHeroViewProps {
  isCalibrating: boolean;
  onDismissCalibration: () => void;
  navigationProps: CompassNavigationSectionProps;
}

function CompassHeroView({
  isCalibrating,
  onDismissCalibration,
  navigationProps,
}: CompassHeroViewProps) {
  return (
    <AnimatedViewSwitcher
      activeKey={isCalibrating ? 'calibrate' : 'compass'}
      className="mb-md min-h-72"
    >
      {isCalibrating ? (
        <CompassCalibrationBanner onDismiss={onDismissCalibration} className="w-full" />
      ) : (
        <CompassNavigationSection {...navigationProps} />
      )}
    </AnimatedViewSwitcher>
  );
}

export function QiblahCompassCard() {
  const t = useTranslations('Qiblah');
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const { heading, isPermissionDenied, needsPermission, requestPermission } =
    useCompassOrientation();
  const defaultCityLabel = t(DEFAULT_USER_LOCATION.cityKey);
  const { coords, selectSanctuary, selectedSanctuary } = useQiblahLocation(defaultCityLabel);

  const sanctuaryLabel = t(`sanctuaries.${selectedSanctuary}`);
  const subtitle = t('subtitle', { sanctuary: sanctuaryLabel });

  const { bearing, distanceKm, cardinal, relativeAngle, isAligned } = useQiblahCalculation(
    heading,
    coords,
    selectedSanctuary
  );
  useAlignmentFeedback(isAligned, isSoundEnabled);

  return (
    <Box as="div" className="relative z-10 flex w-full flex-col items-center justify-center">
      <CompassHeader title={t('title')} subtitle={subtitle} />

      <QiblahLocationPicker
        currentCity={coords.cityName}
        latitude={coords.latitude}
        longitude={coords.longitude}
        selectedSanctuary={selectedSanctuary}
        onSelectSanctuary={selectSanctuary}
        className="mb-md"
      />

      <CompassHeroView
        isCalibrating={isCalibrating}
        onDismissCalibration={() => setIsCalibrating(false)}
        navigationProps={{
          needleAngle: relativeAngle,
          isAligned,
          selectedSanctuary,
          labels: {
            north: t('cardinal.N'),
            south: t('cardinal.S'),
            west: t('cardinal.W'),
            east: t('cardinal.E'),
          },
          compassDialAria: t('compassDialAria', { sanctuary: sanctuaryLabel }),
          needsPermission,
          isPermissionDenied,
          onRequestPermission: requestPermission,
          enableCompassLabel: t('enableCompass'),
          permissionDeniedNotice: t('permissionDeniedNotice'),
        }}
      />

      <CompassActionToolbar
        isSoundEnabled={isSoundEnabled}
        isCalibrating={isCalibrating}
        onToggleSound={() => setIsSoundEnabled((prev) => !prev)}
        onToggleCalibration={() => setIsCalibrating((prev) => !prev)}
        soundLabel={isSoundEnabled ? t('soundOn') : t('soundOff')}
        calibrateLabel={isCalibrating ? t('compass') : t('calibrate')}
      />

      <QiblahInfoCard
        bearing={bearing}
        cardinal={cardinal}
        distanceKm={distanceKm}
        isAligned={isAligned}
        className="mb-md"
      />

      <CompassStatusText
        isAligned={isAligned}
        alignedText={t('aligned')}
        instructionText={t('instruction')}
      />
    </Box>
  );
}
