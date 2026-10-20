'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { CompassDial } from '@/components/ui/compass-dial';
import { QiblahInfoCard } from '@/features/qiblah/components/qiblah-info-card';
import { QiblahLocationPicker } from '@/features/qiblah/components/qiblah-location-picker';
import { QiblahService } from '@/core/services/qiblah.service';
import type { CityPreset } from '@/features/qiblah/types/qiblah.types';

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

interface DeviceOrientationEventConstructorWithPermission {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

function useCompassOrientation() {
  const [heading, setHeading] = useState(0);
  const [needsPermission, setNeedsPermission] = useState(() => {
    const constructor =
      window.DeviceOrientationEvent as unknown as DeviceOrientationEventConstructorWithPermission;
    return typeof constructor?.requestPermission === 'function';
  });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const eventWithCompass = e as DeviceOrientationEventWithPermission;
      if (typeof eventWithCompass.webkitCompassHeading === 'number') {
        setHeading(eventWithCompass.webkitCompassHeading);
      } else if (typeof e.alpha === 'number') {
        setHeading(360 - e.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const requestPermission = async () => {
    const constructor =
      window.DeviceOrientationEvent as unknown as DeviceOrientationEventConstructorWithPermission;
    if (typeof constructor?.requestPermission === 'function') {
      const result = await constructor.requestPermission();
      if (result === 'granted') {
        setNeedsPermission(false);
      }
    }
  };

  return { heading, needsPermission, requestPermission };
}

function useQiblahLocation() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
    cityName: string;
  }>({
    latitude: 51.5074,
    longitude: -0.1278,
    cityName: 'London',
  });
  const [isDetecting, setIsDetecting] = useState(false);

  const detectGps = () => {
    if (!('geolocation' in navigator)) return;
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          cityName: `${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°`,
        });
        setIsDetecting(false);
      },
      () => {
        setIsDetecting(false);
      },
      { timeout: 10000 }
    );
  };

  const selectCity = (city: CityPreset) => {
    setCoords({
      latitude: city.latitude,
      longitude: city.longitude,
      cityName: city.name,
    });
  };

  return { coords, isDetecting, detectGps, selectCity };
}

function CompassHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box as="div" className="mb-xl text-center">
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
    <Text
      as="p"
      variant="body-md"
      className={`mb-lg max-w-xs text-center transition-colors duration-300 ${
        isAligned ? 'text-primary font-medium' : 'text-on-surface-variant'
      }`}
    >
      {isAligned ? alignedText : instructionText}
    </Text>
  );
}

export function QiblahCompassCard() {
  const t = useTranslations('Qiblah');
  const { heading, needsPermission, requestPermission } = useCompassOrientation();
  const { coords, isDetecting, detectGps, selectCity } = useQiblahLocation();

  const { bearing, distanceKm, cardinal } = QiblahService.calculateQiblah(
    coords.latitude,
    coords.longitude
  );

  const { relativeAngle, isAligned } = QiblahService.calculateAlignment(heading, bearing);

  const prevAlignedRef = useRef(false);
  useEffect(() => {
    if (isAligned && !prevAlignedRef.current) {
      if ('vibrate' in navigator) {
        navigator.vibrate([35]);
      }
    }
    prevAlignedRef.current = isAligned;
  }, [isAligned]);

  return (
    <Box
      as="div"
      className="p-margin-mobile md:p-margin-desktop relative z-10 flex flex-1 flex-col items-center justify-center"
    >
      <CompassHeader title={t('title')} subtitle={t('subtitle')} />

      <Box as="div" className="mb-xl flex items-center justify-center">
        <CompassDial
          needleAngle={relativeAngle}
          isAligned={isAligned}
          labels={{
            north: t('cardinal.N'),
            south: t('cardinal.S'),
            west: t('cardinal.W'),
            east: t('cardinal.E'),
          }}
        />
      </Box>

      {needsPermission && (
        <Button
          variant="secondary"
          size="sm"
          onClick={requestPermission}
          aria-label={t('enableSensors')}
          className="mb-md"
        >
          {t('enableSensors')}
        </Button>
      )}

      <QiblahInfoCard
        bearing={bearing}
        cardinal={cardinal}
        distanceKm={distanceKm}
        className="mb-lg"
      />

      <CompassStatusText
        isAligned={isAligned}
        alignedText={t('aligned')}
        instructionText={t('instruction')}
      />

      <QiblahLocationPicker
        currentCity={coords.cityName}
        onSelectCity={selectCity}
        onDetectGps={detectGps}
        isDetectingGps={isDetecting}
      />
    </Box>
  );
}
