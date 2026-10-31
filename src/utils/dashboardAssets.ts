/**
 * Dashboard Visual Assets Registry
 * 
 * You can replace any of these paths with your uploaded custom images
 * in the `public/assets/` folder whenever you are ready!
 */

export const DASHBOARD_ASSETS = {
  // Main Hero Desk background
  heroDeskBg: '/assets/hero_desk.png',

  // 4 Game Mode Cards
  compassCard: '/assets/compass_card.jpg',
  globe3dCard: '/assets/globe_expedition.jpg',
  dossierCard: '/assets/dossier_daily.jpg',
  worldMapCard: '/assets/world_map_card.jpg',

  // Default Detective Avatar
  avatarDetective: '/logo.png',

  // 5 Explored Locations Thumbnails (Local generated city images)
  locations: {
    tokyo: {
      image: '/city-images/L1_Tokyo.png',
      fallback: '/assets/hero_desk.jpg',
      city: 'Tokyo',
      country: 'Jepang',
      countryCode: 'jp',
      year: 2009,
      flag: '🇯🇵',
      level: 2,
    },
    paris: {
      image: '/city-images/L1_Paris.png',
      fallback: '/assets/hero_desk.jpg',
      city: 'Paris',
      country: 'Prancis',
      countryCode: 'fr',
      year: 2011,
      flag: '🇫🇷',
      level: 5,
    },
    rome: {
      image: '/city-images/L1_Roma.png',
      fallback: '/assets/hero_desk.jpg',
      city: 'Roma',
      country: 'Italia',
      countryCode: 'it',
      year: 2009,
      flag: '🇮🇹',
      level: 10,
    },
    newYork: {
      image: '/city-images/L1_New York City.png',
      fallback: '/assets/hero_desk.jpg',
      city: 'New York',
      country: 'USA',
      countryCode: 'us',
      year: 2008,
      flag: '🇺🇸',
      level: 1,
    },
    jakarta: {
      image: '/city-images/L1_Jakarta.png',
      fallback: '/assets/hero_desk.jpg',
      city: 'Jakarta',
      country: 'Indonesia',
      countryCode: 'id',
      year: 2014,
      flag: '🇮🇩',
      level: 3,
    },
  },
};
