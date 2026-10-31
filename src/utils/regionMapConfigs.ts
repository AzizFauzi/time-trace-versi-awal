import { RegionId } from './i18n';

export interface RegionMapConfig {
  center: { lat: number; lng: number };
  zoom: number;
  minZoom: number;
  restriction?: {
    latLngBounds: {
      north: number;
      south: number;
      west: number;
      east: number;
    };
    strictBounds: boolean;
  };
}

export const REGION_MAP_CONFIGS: Record<RegionId, RegionMapConfig> = {
  indonesia: {
    center: { lat: -2.0, lng: 118.0 },
    zoom: 5,
    minZoom: 4,
    restriction: {
      latLngBounds: {
        north: 7.0,
        south: -12.5,
        west: 93.0,
        east: 143.0,
      },
      strictBounds: false,
    },
  },
  asia: {
    center: { lat: 22.0, lng: 115.0 },
    zoom: 4,
    minZoom: 3,
    restriction: {
      latLngBounds: {
        north: 55.0,
        south: -15.0,
        west: 60.0,
        east: 155.0,
      },
      strictBounds: false,
    },
  },
  europe: {
    center: { lat: 50.0, lng: 12.0 },
    zoom: 4,
    minZoom: 3,
    restriction: {
      latLngBounds: {
        north: 72.0,
        south: 34.0,
        west: -25.0,
        east: 45.0,
      },
      strictBounds: false,
    },
  },
  americas: {
    center: { lat: 38.0, lng: -97.0 },
    zoom: 4,
    minZoom: 3,
    restriction: {
      latLngBounds: {
        north: 72.0,
        south: -56.0,
        west: -170.0,
        east: -30.0,
      },
      strictBounds: false,
    },
  },
  global: {
    center: { lat: 20.0, lng: 0.0 },
    zoom: 2,
    minZoom: 1,
  },
};
