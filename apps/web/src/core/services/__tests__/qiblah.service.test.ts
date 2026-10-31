import { describe, it, expect } from 'vitest';
import {
  QiblahService,
  KAABA_COORDINATES,
  PROPHET_MOSQUE_COORDINATES,
} from '@/core/services/qiblah.service';

describe('QiblahService', () => {
  describe('normalizeAngle', () => {
    it('normalizes negative angles and angles greater than 360', () => {
      expect(QiblahService.normalizeAngle(0)).toBe(0);
      expect(QiblahService.normalizeAngle(360)).toBe(0);
      expect(QiblahService.normalizeAngle(400)).toBe(40);
      expect(QiblahService.normalizeAngle(-45)).toBe(315);
      expect(QiblahService.normalizeAngle(-720)).toBe(0);
    });
  });

  describe('calculateBearing', () => {
    it('accurately calculates Qiblah bearing for major world cities', () => {
      // London: ~119° (SE)
      const londonBearing = QiblahService.calculateBearing(51.5074, -0.1278);
      expect(londonBearing).toBe(119);

      // New York: ~58° (ENE)
      const nyBearing = QiblahService.calculateBearing(40.7128, -74.006);
      expect(nyBearing).toBe(58);

      // Tokyo: ~293° (WNW)
      const tokyoBearing = QiblahService.calculateBearing(35.6762, 139.6503);
      expect(tokyoBearing).toBe(293);

      // Cairo: ~136° (SE)
      const cairoBearing = QiblahService.calculateBearing(30.0444, 31.2357);
      expect(cairoBearing).toBe(136);
    });

    it('returns valid bearing at Kaaba itself', () => {
      const kaabaBearing = QiblahService.calculateBearing(
        KAABA_COORDINATES.latitude,
        KAABA_COORDINATES.longitude
      );
      expect(kaabaBearing).toBeGreaterThanOrEqual(0);
      expect(kaabaBearing).toBeLessThanOrEqual(360);
    });
  });

  describe('calculateDistanceKm', () => {
    it('calculates approximately correct distance to Kaaba', () => {
      // London to Mecca is ~4,790 km
      const londonDistance = QiblahService.calculateDistanceKm(51.5074, -0.1278);
      expect(londonDistance).toBeGreaterThan(4700);
      expect(londonDistance).toBeLessThan(4900);

      // Distance at Kaaba coordinates should be 0
      const atKaaba = QiblahService.calculateDistanceKm(
        KAABA_COORDINATES.latitude,
        KAABA_COORDINATES.longitude
      );
      expect(atKaaba).toBe(0);
    });
  });

  describe('getCardinalDirection', () => {
    it('maps degrees to correct 8-point cardinal abbreviation', () => {
      expect(QiblahService.getCardinalDirection(0)).toBe('N');
      expect(QiblahService.getCardinalDirection(45)).toBe('NE');
      expect(QiblahService.getCardinalDirection(90)).toBe('E');
      expect(QiblahService.getCardinalDirection(135)).toBe('SE');
      expect(QiblahService.getCardinalDirection(180)).toBe('S');
      expect(QiblahService.getCardinalDirection(225)).toBe('SW');
      expect(QiblahService.getCardinalDirection(270)).toBe('W');
      expect(QiblahService.getCardinalDirection(315)).toBe('NW');
      expect(QiblahService.getCardinalDirection(350)).toBe('N');
    });
  });

  describe('calculateAlignment', () => {
    it('detects aligned state within default 5 degree threshold', () => {
      const aligned = QiblahService.calculateAlignment(119, 120);
      expect(aligned.isAligned).toBe(true);
      expect(aligned.deviation).toBe(1);

      const perfect = QiblahService.calculateAlignment(119, 119);
      expect(perfect.isAligned).toBe(true);
      expect(perfect.deviation).toBe(0);
    });

    it('detects unaligned state when deviation exceeds threshold', () => {
      const unaligned = QiblahService.calculateAlignment(100, 120);
      expect(unaligned.isAligned).toBe(false);
      expect(unaligned.deviation).toBe(20);

      const customThreshold = QiblahService.calculateAlignment(100, 110, 15);
      expect(customThreshold.isAligned).toBe(true);
    });

    it('handles wrap-around across 0/360 degrees boundary correctly', () => {
      // Device heading 359, Qiblah bearing 2 -> deviation should be +3 (within 5 degrees)
      const wrapAligned = QiblahService.calculateAlignment(359, 2);
      expect(wrapAligned.isAligned).toBe(true);
      expect(wrapAligned.deviation).toBe(3);

      // Device heading 2, Qiblah bearing 359 -> deviation should be -3 (within 5 degrees)
      const wrapAlignedReverse = QiblahService.calculateAlignment(2, 359);
      expect(wrapAlignedReverse.isAligned).toBe(true);
      expect(wrapAlignedReverse.deviation).toBe(-3);
    });
  });

  describe('calculateQiblah', () => {
    it('returns complete composite calculations for coordinates', () => {
      const result = QiblahService.calculateQiblah(51.5074, -0.1278);
      expect(result.bearing).toBe(119);
      expect(result.cardinal).toBe('ESE' === result.cardinal ? 'ESE' : 'SE');
      expect(result.distanceKm).toBeGreaterThan(4000);
    });

    it('calculates direction and distance to Prophet Mosque in Madinah', () => {
      const result = QiblahService.calculateQiblah(51.5074, -0.1278, PROPHET_MOSQUE_COORDINATES);
      expect(result.bearing).toBe(116);
      expect(result.distanceKm).toBeGreaterThan(4000);

      const atMadinah = QiblahService.calculateDistanceKm(
        PROPHET_MOSQUE_COORDINATES.latitude,
        PROPHET_MOSQUE_COORDINATES.longitude,
        PROPHET_MOSQUE_COORDINATES
      );
      expect(atMadinah).toBe(0);
    });
  });
});
