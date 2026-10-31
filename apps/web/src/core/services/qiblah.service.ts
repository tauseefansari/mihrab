export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface QiblahCalculationResult {
  bearing: number;
  distanceKm: number;
  cardinal: string;
}

export interface AlignmentResult {
  relativeAngle: number;
  isAligned: boolean;
  deviation: number;
}

export const KAABA_COORDINATES: Coordinates = {
  latitude: 21.422487,
  longitude: 39.826206,
};

export const PROPHET_MOSQUE_COORDINATES: Coordinates = {
  latitude: 24.4686,
  longitude: 39.6142,
};

export const EARTH_RADIUS_KM = 6371;

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export class QiblahService {
  public static normalizeAngle(degrees: number): number {
    const remainder = degrees % 360;
    return (remainder + 360) % 360;
  }

  public static calculateBearing(
    userLat: number,
    userLng: number,
    target: Coordinates = KAABA_COORDINATES
  ): number {
    const phi1 = userLat * DEG_TO_RAD;
    const phi2 = target.latitude * DEG_TO_RAD;
    const deltaLambda = (target.longitude - userLng) * DEG_TO_RAD;

    const y = Math.sin(deltaLambda) * Math.cos(phi2);
    const x =
      Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

    const initialBearing = Math.atan2(y, x) * RAD_TO_DEG;
    return Math.round(this.normalizeAngle(initialBearing));
  }

  public static calculateDistanceKm(
    userLat: number,
    userLng: number,
    target: Coordinates = KAABA_COORDINATES
  ): number {
    const phi1 = userLat * DEG_TO_RAD;
    const phi2 = target.latitude * DEG_TO_RAD;
    const deltaPhi = (target.latitude - userLat) * DEG_TO_RAD;
    const deltaLambda = (target.longitude - userLng) * DEG_TO_RAD;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(EARTH_RADIUS_KM * c);
  }

  public static getCardinalDirection(degrees: number): string {
    const normalized = this.normalizeAngle(degrees);
    const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
    const index = Math.round(normalized / 45) % 8;
    return cardinals[index]!;
  }

  public static calculateAlignment(
    deviceHeading: number,
    qiblahBearing: number,
    thresholdDegrees = 5
  ): AlignmentResult {
    const relativeAngle = this.normalizeAngle(qiblahBearing - deviceHeading);
    let deviation = relativeAngle;
    if (deviation > 180) {
      deviation -= 360;
    }
    const isAligned = Math.abs(deviation) <= thresholdDegrees;

    return {
      relativeAngle,
      isAligned,
      deviation,
    };
  }

  public static calculateQiblah(
    userLat: number,
    userLng: number,
    target: Coordinates = KAABA_COORDINATES
  ): QiblahCalculationResult {
    const bearing = this.calculateBearing(userLat, userLng, target);
    const distanceKm = this.calculateDistanceKm(userLat, userLng, target);
    const cardinal = this.getCardinalDirection(bearing);

    return {
      bearing,
      distanceKm,
      cardinal,
    };
  }
}
