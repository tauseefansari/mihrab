export interface CityPreset {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface QiblahState {
  latitude: number;
  longitude: number;
  cityName: string;
  heading: number;
  isCompassSupported: boolean;
  permissionState: 'prompt' | 'granted' | 'denied';
}
