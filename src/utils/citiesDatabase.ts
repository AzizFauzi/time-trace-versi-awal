export type LocationType =
  | 'city'
  | 'town'
  | 'village'
  | 'district'
  | 'county'
  | 'state'
  | 'country'
  | 'suburb'
  | 'place';

export interface CityRecord {
  name: string;
  secondaryText?: string;
  country: string;
  countryCode?: string;
  flag: string;
  lat: number;
  lng: number;
  zoom?: number;
  type?: LocationType;
  typeLabel?: string;
  bbox?: [number, number, number, number];
}

/**
 * Convert 2-letter ISO country code (e.g. 'ID', 'JP', 'US') to emoji flag
 */
export function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return '📍';
  const cleanCode = countryCode.toUpperCase();
  const codePoints = cleanCode
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Format human-readable location type label
 */
export function formatTypeLabel(type?: LocationType, lang: 'id' | 'en' = 'id'): string {
  switch (type) {
    case 'county':
      return lang === 'id' ? 'Kabupaten' : 'Regency / County';
    case 'district':
      return lang === 'id' ? 'Kecamatan' : 'District';
    case 'village':
      return lang === 'id' ? 'Desa / Kelurahan' : 'Village';
    case 'town':
      return lang === 'id' ? 'Kota Kecil' : 'Town';
    case 'city':
      return lang === 'id' ? 'Kota' : 'City';
    case 'state':
      return lang === 'id' ? 'Provinsi' : 'Province / State';
    case 'country':
      return lang === 'id' ? 'Negara' : 'Country';
    case 'suburb':
      return lang === 'id' ? 'Kawasan / Lingkungan' : 'Suburb';
    case 'place':
    default:
      return lang === 'id' ? 'Lokasi' : 'Location';
  }
}

/**
 * Get tailored zoom level based on geographic scale
 */
export function getDefaultZoomForType(type?: LocationType): number {
  switch (type) {
    case 'village':
      return 15;
    case 'suburb':
      return 14;
    case 'district':
      return 14;
    case 'town':
      return 13;
    case 'city':
      return 12;
    case 'county':
      return 11;
    case 'state':
      return 8;
    case 'country':
      return 5;
    default:
      return 12;
  }
}

/**
 * Pre-indexed instant database for Indonesia (Kota, Kabupaten, Kecamatan) and major world destinations
 */
export const POPULAR_CITIES: CityRecord[] = [
  // --- INDONESIA: KOTA & IBU KOTA ---
  { name: 'Jakarta', secondaryText: 'DKI Jakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.2088, lng: 106.8456, zoom: 12, type: 'city', typeLabel: 'Kota Khusus' },
  { name: 'Surabaya', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.2575, lng: 112.7521, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Bandung', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.9175, lng: 107.6191, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Medan', secondaryText: 'Sumatera Utara, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: 3.5952, lng: 98.6722, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Semarang', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.9667, lng: 110.4167, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Makassar', secondaryText: 'Sulawesi Selatan, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -5.1477, lng: 119.4327, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Palembang', secondaryText: 'Sumatera Selatan, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -2.9761, lng: 104.7754, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Yogyakarta', secondaryText: 'D.I. Yogyakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.7956, lng: 110.3695, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Denpasar', secondaryText: 'Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.6705, lng: 115.2126, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Balikpapan', secondaryText: 'Kalimantan Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -1.2379, lng: 116.8289, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Malang', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.9666, lng: 112.6326, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Surakarta (Solo)', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.5755, lng: 110.8243, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Batam', secondaryText: 'Kepulauan Riau, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: 1.1278, lng: 104.0458, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Padang', secondaryText: 'Sumatera Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -0.9471, lng: 100.4172, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Banjarmasin', secondaryText: 'Kalimantan Selatan, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -3.3167, lng: 114.59, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Samarinda', secondaryText: 'Kalimantan Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -0.5022, lng: 117.1537, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Pontianak', secondaryText: 'Kalimantan Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -0.0263, lng: 109.3425, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Manado', secondaryText: 'Sulawesi Utara, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: 1.4748, lng: 124.8428, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Banda Aceh', secondaryText: 'Aceh, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: 5.5483, lng: 95.3238, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Jayapura', secondaryText: 'Papua, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -2.5337, lng: 140.7181, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Mataram', secondaryText: 'Nusa Tenggara Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.5833, lng: 116.1167, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Kupang', secondaryText: 'Nusa Tenggara Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -10.1772, lng: 123.607, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Ambon', secondaryText: 'Maluku, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -3.6554, lng: 128.1908, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Cirebon', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.7063, lng: 108.557, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Bogor', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.5971, lng: 106.806, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Depok', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.4025, lng: 106.7942, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Tangerang', secondaryText: 'Banten, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.1783, lng: 106.6319, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Tangerang Selatan', secondaryText: 'Banten, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.2888, lng: 106.7179, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Bekasi', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.2383, lng: 106.9756, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Sukabumi', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.9277, lng: 106.93, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Tasikmalaya', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.3274, lng: 108.2207, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Pekalongan', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8898, lng: 109.6753, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Tegal', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8694, lng: 109.1402, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Magelang', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.4706, lng: 110.2178, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Salatiga', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.3305, lng: 110.5084, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Kediri', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.848, lng: 112.0178, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Blitar', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.0954, lng: 112.1682, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Madiun', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.6298, lng: 111.5239, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Probolinggo', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.7543, lng: 113.2159, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Pasuruan', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.6453, lng: 112.9075, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Batu', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.8712, lng: 112.5273, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Nusantara (IKN)', secondaryText: 'Ibu Kota Nusantara, Kalimantan Timur', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -0.9744, lng: 116.7071, zoom: 12, type: 'city', typeLabel: 'Ibu Kota Baru' },

  // --- INDONESIA: KABUPATEN (REGENCIES) POPULER ---
  { name: 'Kabupaten Sleman', secondaryText: 'D.I. Yogyakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.6894, lng: 110.3813, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Bantul', secondaryText: 'D.I. Yogyakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.8943, lng: 110.3297, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Gunungkidul', secondaryText: 'D.I. Yogyakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.0305, lng: 110.6168, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Kulon Progo', secondaryText: 'D.I. Yogyakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.7693, lng: 110.1611, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Banyumas', secondaryText: 'Purwokerto, Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.4517, lng: 109.1622, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Cilacap', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.7183, lng: 109.0159, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Brebes', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8703, lng: 109.0435, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Tegal', secondaryText: 'Slawi, Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.9837, lng: 109.1352, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Klaten', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.7056, lng: 110.6017, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Boyolali', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.5318, lng: 110.5962, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Sukoharjo', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.6833, lng: 110.8333, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Karanganyar', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.5967, lng: 110.9519, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Wonogiri', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.8186, lng: 110.9256, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Sragen', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.4267, lng: 111.0222, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Kudus', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8048, lng: 110.8405, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Jepara', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.5944, lng: 110.6719, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Pati', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.7558, lng: 111.0378, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Rembang', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.7114, lng: 111.3411, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Blora', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.0706, lng: 111.4183, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Grobogan', secondaryText: 'Purwodadi, Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.1067, lng: 110.9167, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Demak', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8944, lng: 110.6389, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Kendal', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.9239, lng: 110.2036, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Batang', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.9083, lng: 109.7333, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Pemalang', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8925, lng: 109.3808, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Purbalingga', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.3886, lng: 109.3639, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Banjarnegara', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.3986, lng: 109.6978, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Kebumen', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.6697, lng: 109.6517, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Purworejo', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.7153, lng: 110.0078, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Wonosobo', secondaryText: 'Dieng, Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.3631, lng: 109.9006, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Temanggung', secondaryText: 'Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.3167, lng: 110.1667, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },

  // Jawa Timur Kabupatens
  { name: 'Kabupaten Sidoarjo', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.4478, lng: 112.7183, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Gresik', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.1567, lng: 112.6558, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Mojokerto', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.4725, lng: 112.4339, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Jombang', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.5461, lng: 112.2331, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Bojonegoro', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.1503, lng: 111.8817, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Tuban', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8986, lng: 112.0647, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Lamongan', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.1197, lng: 112.4158, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Banyuwangi', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.2192, lng: 114.3692, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Jember', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.1725, lng: 113.7008, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Lumajang', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.1333, lng: 113.2167, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Tulungagung', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.0667, lng: 111.9, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Trenggalek', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.05, lng: 111.7167, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Ponorogo', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.8686, lng: 111.4625, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Pacitan', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.2047, lng: 111.0922, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Ngawi', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.4039, lng: 111.4456, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Magetan', secondaryText: 'Jawa Timur, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.6539, lng: 111.3283, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },

  // Jawa Barat & Banten Kabupatens
  { name: 'Kabupaten Bandung Barat', secondaryText: 'Ngamprah, Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8603, lng: 107.5022, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Garut', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.2278, lng: 107.9086, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Cianjur', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8206, lng: 107.1397, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Karawang', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.3056, lng: 107.3006, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Purwakarta', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.5569, lng: 107.4433, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Subang', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.5714, lng: 107.7583, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Sumedang', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8586, lng: 107.9267, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Majalengka', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.8361, lng: 108.2278, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Kuningan', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.9767, lng: 108.4833, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Indramayu', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.3264, lng: 108.32, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Pangandaran', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.7011, lng: 108.4947, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Ciamis', secondaryText: 'Jawa Barat, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.3267, lng: 108.3533, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Lebak', secondaryText: 'Rangkasbitung, Banten, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.65, lng: 106.2167, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Pandeglang', secondaryText: 'Banten, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.5333, lng: 105.8333, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },

  // Bali Kabupatens & Destinasi
  { name: 'Kabupaten Badung', secondaryText: 'Mangupura, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.5819, lng: 115.1772, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Gianyar', secondaryText: 'Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.5447, lng: 115.3267, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Tabanan', secondaryText: 'Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.5392, lng: 115.1264, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Buleleng', secondaryText: 'Singaraja, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.1186, lng: 115.0883, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Karangasem', secondaryText: 'Amlapura, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.4489, lng: 115.6119, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Klungkung', secondaryText: 'Semarapura, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.5333, lng: 115.4, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Bangli', secondaryText: 'Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.4542, lng: 115.355, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kabupaten Jembrana', secondaryText: 'Negara, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.3606, lng: 114.6186, zoom: 11, type: 'county', typeLabel: 'Kabupaten' },
  { name: 'Kuta', secondaryText: 'Badung, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.7233, lng: 115.1725, zoom: 14, type: 'town', typeLabel: 'Kecamatan / Destinasi' },
  { name: 'Ubud', secondaryText: 'Gianyar, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.5069, lng: 115.2625, zoom: 14, type: 'town', typeLabel: 'Kecamatan / Seni' },
  { name: 'Nusa Dua', secondaryText: 'Badung, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.8005, lng: 115.2319, zoom: 14, type: 'town', typeLabel: 'Kawasan Wisata' },
  { name: 'Sanur', secondaryText: 'Denpasar, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.6883, lng: 115.2636, zoom: 14, type: 'town', typeLabel: 'Kelurahan' },

  // --- INDONESIA: KECAMATAN / DESA TERKENAL ---
  { name: 'Kecamatan Wonosari', secondaryText: 'Gunungkidul, D.I. Yogyakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.9655, lng: 110.5998, zoom: 14, type: 'district', typeLabel: 'Kecamatan' },
  { name: 'Kecamatan Ngaglik', secondaryText: 'Sleman, D.I. Yogyakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.722, lng: 110.4026, zoom: 14, type: 'district', typeLabel: 'Kecamatan' },
  { name: 'Kecamatan Depok', secondaryText: 'Sleman, D.I. Yogyakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.7686, lng: 110.4003, zoom: 14, type: 'district', typeLabel: 'Kecamatan' },
  { name: 'Kecamatan Tawangmangu', secondaryText: 'Karanganyar, Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.6622, lng: 111.1333, zoom: 14, type: 'district', typeLabel: 'Kecamatan' },
  { name: 'Kecamatan Menteng', secondaryText: 'Jakarta Pusat, DKI Jakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.1958, lng: 106.8378, zoom: 14, type: 'district', typeLabel: 'Kecamatan' },
  { name: 'Kecamatan Kebayoran Baru', secondaryText: 'Jakarta Selatan, DKI Jakarta, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -6.2444, lng: 106.7972, zoom: 14, type: 'district', typeLabel: 'Kecamatan' },
  { name: 'Desa Kemuning', secondaryText: 'Ngargoyoso, Karanganyar, Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.5956, lng: 111.1214, zoom: 15, type: 'village', typeLabel: 'Desa Wisata' },
  { name: 'Desa Penglipuran', secondaryText: 'Bangli, Bali, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -8.4528, lng: 115.3589, zoom: 15, type: 'village', typeLabel: 'Desa Adat' },
  { name: 'Dieng', secondaryText: 'Wonosobo / Banjarnegara, Jawa Tengah, Indonesia', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩', lat: -7.2056, lng: 109.9056, zoom: 14, type: 'village', typeLabel: 'Kawasan Dataran Tinggi' },

  // --- ASIA: KOTA & KOTA KECIL ---
  { name: 'Tokyo', secondaryText: 'Kanto, Japan', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 35.6762, lng: 139.6503, zoom: 12, type: 'city', typeLabel: 'Metropolis' },
  { name: 'Kyoto', secondaryText: 'Kansai, Japan', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 35.0116, lng: 135.7681, zoom: 13, type: 'city', typeLabel: 'Kota Bersejarah' },
  { name: 'Osaka', secondaryText: 'Kansai, Japan', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 34.6937, lng: 135.5023, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Sapporo', secondaryText: 'Hokkaido, Japan', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 43.0618, lng: 141.3545, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Shirakawa-go', secondaryText: 'Ono District, Gifu, Japan', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 36.2562, lng: 136.9064, zoom: 15, type: 'village', typeLabel: 'Desa Warisan Budaya' },
  { name: 'Seoul', secondaryText: 'South Korea', country: 'South Korea', countryCode: 'KR', flag: '🇰🇷', lat: 37.5665, lng: 126.978, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Busan', secondaryText: 'South Korea', country: 'South Korea', countryCode: 'KR', flag: '🇰🇷', lat: 35.1796, lng: 129.0756, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Jeju', secondaryText: 'Jeju Island, South Korea', country: 'South Korea', countryCode: 'KR', flag: '🇰🇷', lat: 33.4996, lng: 126.5312, zoom: 12, type: 'city', typeLabel: 'Pulau / Kota' },
  { name: 'Beijing', secondaryText: 'China', country: 'China', countryCode: 'CN', flag: '🇨🇳', lat: 39.9042, lng: 116.4074, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Shanghai', secondaryText: 'China', country: 'China', countryCode: 'CN', flag: '🇨🇳', lat: 31.2304, lng: 121.4737, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Hong Kong', secondaryText: 'China SAR', country: 'Hong Kong', countryCode: 'HK', flag: '🇭🇰', lat: 22.3193, lng: 114.1694, zoom: 12, type: 'city', typeLabel: 'Wilayah Khusus' },
  { name: 'Taipei', secondaryText: 'Taiwan', country: 'Taiwan', countryCode: 'TW', flag: '🇹🇼', lat: 25.033, lng: 121.5654, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Jiufen', secondaryText: 'Ruifang District, New Taipei, Taiwan', country: 'Taiwan', countryCode: 'TW', flag: '🇹🇼', lat: 25.1097, lng: 121.8452, zoom: 15, type: 'village', typeLabel: 'Desa Wisata' },
  { name: 'Singapore', secondaryText: 'Singapore', country: 'Singapore', countryCode: 'SG', flag: '🇸🇬', lat: 1.3521, lng: 103.8198, zoom: 12, type: 'city', typeLabel: 'Negara Kota' },
  { name: 'Bangkok', secondaryText: 'Thailand', country: 'Thailand', countryCode: 'TH', flag: '🇹🇭', lat: 13.7563, lng: 100.5018, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Chiang Mai', secondaryText: 'Northern Thailand', country: 'Thailand', countryCode: 'TH', flag: '🇹🇭', lat: 18.7883, lng: 98.9853, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Kuala Lumpur', secondaryText: 'Federal Territory, Malaysia', country: 'Malaysia', countryCode: 'MY', flag: '🇲🇾', lat: 3.139, lng: 101.6869, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'George Town', secondaryText: 'Penang, Malaysia', country: 'Malaysia', countryCode: 'MY', flag: '🇲🇾', lat: 5.4141, lng: 100.3288, zoom: 13, type: 'city', typeLabel: 'Kota' },
  { name: 'Malacca', secondaryText: 'Melaka, Malaysia', country: 'Malaysia', countryCode: 'MY', flag: '🇲🇾', lat: 2.1896, lng: 102.2501, zoom: 13, type: 'city', typeLabel: 'Kota Bersejarah' },
  { name: 'Manila', secondaryText: 'Metro Manila, Philippines', country: 'Philippines', countryCode: 'PH', flag: '🇵🇭', lat: 14.5995, lng: 120.9842, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Hanoi', secondaryText: 'Vietnam', country: 'Vietnam', countryCode: 'VN', flag: '🇻🇳', lat: 21.0285, lng: 105.8542, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Hoi An', secondaryText: 'Quảng Nam, Vietnam', country: 'Vietnam', countryCode: 'VN', flag: '🇻🇳', lat: 15.8801, lng: 108.338, zoom: 14, type: 'town', typeLabel: 'Kota Tua' },
  { name: 'Ho Chi Minh City', secondaryText: 'Vietnam', country: 'Vietnam', countryCode: 'VN', flag: '🇻🇳', lat: 10.8231, lng: 106.6297, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'New Delhi', secondaryText: 'Delhi, India', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 28.6139, lng: 77.209, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Mumbai', secondaryText: 'Maharashtra, India', country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 19.076, lng: 72.8777, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Dubai', secondaryText: 'United Arab Emirates', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪', lat: 25.2048, lng: 55.2708, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Istanbul', secondaryText: 'Turkey', country: 'Turkey', countryCode: 'TR', flag: '🇹🇷', lat: 41.0082, lng: 28.9784, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Riyadh', secondaryText: 'Saudi Arabia', country: 'Saudi Arabia', countryCode: 'SA', flag: '🇸🇦', lat: 24.7136, lng: 46.6753, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Makkah (Mecca)', secondaryText: 'Makkah Province, Saudi Arabia', country: 'Saudi Arabia', countryCode: 'SA', flag: '🇸🇦', lat: 21.3891, lng: 39.8579, zoom: 12, type: 'city', typeLabel: 'Kota Suci' },
  { name: 'Madinah (Medina)', secondaryText: 'Al Madinah Province, Saudi Arabia', country: 'Saudi Arabia', countryCode: 'SA', flag: '🇸🇦', lat: 24.5247, lng: 39.5692, zoom: 12, type: 'city', typeLabel: 'Kota Suci' },

  // --- EROPA: KOTA BESAR & DESA CANTIK ---
  { name: 'London', secondaryText: 'Greater London, United Kingdom', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', lat: 51.5074, lng: -0.1278, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Paris', secondaryText: 'Île-de-France, France', country: 'France', countryCode: 'FR', flag: '🇫🇷', lat: 48.8566, lng: 2.3522, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Rome', secondaryText: 'Lazio, Italy', country: 'Italy', countryCode: 'IT', flag: '🇮🇹', lat: 41.9028, lng: 12.4964, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Berlin', secondaryText: 'Germany', country: 'Germany', countryCode: 'DE', flag: '🇩🇪', lat: 52.52, lng: 13.405, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Munich', secondaryText: 'Bavaria, Germany', country: 'Germany', countryCode: 'DE', flag: '🇩🇪', lat: 48.1351, lng: 11.582, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Rothenburg ob der Tauber', secondaryText: 'Bavaria, Germany', country: 'Germany', countryCode: 'DE', flag: '🇩🇪', lat: 49.3768, lng: 10.1802, zoom: 14, type: 'town', typeLabel: 'Kota Kecil Abad Pertengahan' },
  { name: 'Madrid', secondaryText: 'Community of Madrid, Spain', country: 'Spain', countryCode: 'ES', flag: '🇪🇸', lat: 40.4168, lng: -3.7038, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Barcelona', secondaryText: 'Catalonia, Spain', country: 'Spain', countryCode: 'ES', flag: '🇪🇸', lat: 41.3851, lng: 2.1734, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Amsterdam', secondaryText: 'North Holland, Netherlands', country: 'Netherlands', countryCode: 'NL', flag: '🇳🇱', lat: 52.3676, lng: 4.9041, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Giethoorn', secondaryText: 'Overijssel, Netherlands', country: 'Netherlands', countryCode: 'NL', flag: '🇳🇱', lat: 52.7397, lng: 6.0792, zoom: 15, type: 'village', typeLabel: 'Desa Tanpa Jalan Raya' },
  { name: 'Vienna', secondaryText: 'Austria', country: 'Austria', countryCode: 'AT', flag: '🇦🇹', lat: 48.2082, lng: 16.3738, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Hallstatt', secondaryText: 'Gmunden, Upper Austria, Austria', country: 'Austria', countryCode: 'AT', flag: '🇦🇹', lat: 47.5622, lng: 13.6493, zoom: 15, type: 'village', typeLabel: 'Desa Danau Alpen' },
  { name: 'Prague', secondaryText: 'Czech Republic', country: 'Czech Republic', countryCode: 'CZ', flag: '🇨🇿', lat: 50.0755, lng: 14.4378, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Budapest', secondaryText: 'Hungary', country: 'Hungary', countryCode: 'HU', flag: '🇭🇺', lat: 47.4979, lng: 19.0402, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Athens', secondaryText: 'Attica, Greece', country: 'Greece', countryCode: 'GR', flag: '🇬🇷', lat: 37.9838, lng: 23.7275, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Oia (Santorini)', secondaryText: 'Cyclades, South Aegean, Greece', country: 'Greece', countryCode: 'GR', flag: '🇬🇷', lat: 36.4618, lng: 25.3753, zoom: 15, type: 'village', typeLabel: 'Desa Pulau' },
  { name: 'Lisbon', secondaryText: 'Portugal', country: 'Portugal', countryCode: 'PT', flag: '🇵🇹', lat: 38.7223, lng: -9.1393, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Dublin', secondaryText: 'County Dublin, Ireland', country: 'Ireland', countryCode: 'IE', flag: '🇮🇪', lat: 53.3498, lng: -6.2603, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Brussels', secondaryText: 'Belgium', country: 'Belgium', countryCode: 'BE', flag: '🇧🇪', lat: 50.8503, lng: 4.3517, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Bruges', secondaryText: 'West Flanders, Belgium', country: 'Belgium', countryCode: 'BE', flag: '🇧🇪', lat: 51.2093, lng: 3.2247, zoom: 14, type: 'town', typeLabel: 'Kota Tua Kanal' },
  { name: 'Copenhagen', secondaryText: 'Capital Region, Denmark', country: 'Denmark', countryCode: 'DK', flag: '🇩🇰', lat: 55.6761, lng: 12.5683, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Stockholm', secondaryText: 'Stockholm County, Sweden', country: 'Sweden', countryCode: 'SE', flag: '🇸🇪', lat: 59.3293, lng: 18.0686, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Oslo', secondaryText: 'Norway', country: 'Norway', countryCode: 'NO', flag: '🇳🇴', lat: 59.9139, lng: 10.7522, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Helsinki', secondaryText: 'Uusimaa, Finland', country: 'Finland', countryCode: 'FI', flag: '🇫🇮', lat: 60.1699, lng: 24.9384, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Zurich', secondaryText: 'Canton of Zurich, Switzerland', country: 'Switzerland', countryCode: 'CH', flag: '🇨🇭', lat: 47.3769, lng: 8.5417, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Zermatt', secondaryText: 'Valais, Switzerland', country: 'Switzerland', countryCode: 'CH', flag: '🇨🇭', lat: 45.9765, lng: 7.7491, zoom: 15, type: 'village', typeLabel: 'Desa Matterhorn' },
  { name: 'Venice', secondaryText: 'Veneto, Italy', country: 'Italy', countryCode: 'IT', flag: '🇮🇹', lat: 45.4408, lng: 12.3155, zoom: 13, type: 'city', typeLabel: 'Kota Kanal' },
  { name: 'Florence', secondaryText: 'Tuscany, Italy', country: 'Italy', countryCode: 'IT', flag: '🇮🇹', lat: 43.7696, lng: 11.2558, zoom: 13, type: 'city', typeLabel: 'Kota Seni' },
  { name: 'San Gimignano', secondaryText: 'Siena, Tuscany, Italy', country: 'Italy', countryCode: 'IT', flag: '🇮🇹', lat: 43.4678, lng: 11.0433, zoom: 15, type: 'village', typeLabel: 'Desa Menara Abad Pertengahan' },
  { name: 'Edinburgh', secondaryText: 'Scotland, United Kingdom', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', lat: 55.9533, lng: -3.1883, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Reykjavik', secondaryText: 'Capital Region, Iceland', country: 'Iceland', countryCode: 'IS', flag: '🇮🇸', lat: 64.1466, lng: -21.9426, zoom: 12, type: 'city', typeLabel: 'Kota' },

  // --- AMERIKA & OCEANIA ---
  { name: 'New York City', secondaryText: 'New York, United States', country: 'United States', countryCode: 'US', flag: '🇺🇸', lat: 40.7128, lng: -74.006, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Los Angeles', secondaryText: 'California, United States', country: 'United States', countryCode: 'US', flag: '🇺🇸', lat: 34.0522, lng: -118.2437, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Chicago', secondaryText: 'Illinois, United States', country: 'United States', countryCode: 'US', flag: '🇺🇸', lat: 41.8781, lng: -87.6298, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'San Francisco', secondaryText: 'California, United States', country: 'United States', countryCode: 'US', flag: '🇺🇸', lat: 37.7749, lng: -122.4194, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Toronto', secondaryText: 'Ontario, Canada', country: 'Canada', countryCode: 'CA', flag: '🇨🇦', lat: 43.6532, lng: -79.3832, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Vancouver', secondaryText: 'British Columbia, Canada', country: 'Canada', countryCode: 'CA', flag: '🇨🇦', lat: 49.2827, lng: -123.1207, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Mexico City', secondaryText: 'Mexico', country: 'Mexico', countryCode: 'MX', flag: '🇲🇽', lat: 19.4326, lng: -99.1332, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Rio de Janeiro', secondaryText: 'State of Rio de Janeiro, Brazil', country: 'Brazil', countryCode: 'BR', flag: '🇧🇷', lat: -22.9068, lng: -43.1729, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'São Paulo', secondaryText: 'State of São Paulo, Brazil', country: 'Brazil', countryCode: 'BR', flag: '🇧🇷', lat: -23.5505, lng: -46.6333, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Buenos Aires', secondaryText: 'Argentina', country: 'Argentina', countryCode: 'AR', flag: '🇦🇷', lat: -34.6037, lng: -58.3816, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Santiago', secondaryText: 'Santiago Metropolitan, Chile', country: 'Chile', countryCode: 'CL', flag: '🇨🇱', lat: -33.4489, lng: -70.6693, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Sydney', secondaryText: 'New South Wales, Australia', country: 'Australia', countryCode: 'AU', flag: '🇦🇺', lat: -33.8688, lng: 151.2093, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Melbourne', secondaryText: 'Victoria, Australia', country: 'Australia', countryCode: 'AU', flag: '🇦🇺', lat: -37.8136, lng: 144.9631, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Auckland', secondaryText: 'Auckland Region, New Zealand', country: 'New Zealand', countryCode: 'NZ', flag: '🇳🇿', lat: -36.8485, lng: 174.7633, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Queenstown', secondaryText: 'Otago, New Zealand', country: 'New Zealand', countryCode: 'NZ', flag: '🇳🇿', lat: -45.0312, lng: 168.6626, zoom: 14, type: 'town', typeLabel: 'Kota Wisata Alam' },
  { name: 'Cairo', secondaryText: 'Cairo Governorate, Egypt', country: 'Egypt', countryCode: 'EG', flag: '🇪🇬', lat: 30.0444, lng: 31.2357, zoom: 12, type: 'city', typeLabel: 'Kota' },
  { name: 'Cape Town', secondaryText: 'Western Cape, South Africa', country: 'South Africa', countryCode: 'ZA', flag: '🇿🇦', lat: -33.9249, lng: 18.4241, zoom: 12, type: 'city', typeLabel: 'Kota' },
];

/**
 * Filter local database instantly with zero latency
 */
export function searchLocalCities(query: string): CityRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // Match by name or secondaryText or country
  return POPULAR_CITIES.filter((c) => {
    const nameMatch = c.name.toLowerCase().includes(q);
    const secMatch = c.secondaryText ? c.secondaryText.toLowerCase().includes(q) : false;
    const countryMatch = c.country.toLowerCase().includes(q);
    return nameMatch || secMatch || countryMatch;
  }).slice(0, 8);
}

// In-memory cache for online geocoding queries
const globalSearchCache = new Map<string, CityRecord[]>();

/**
 * Determine location type from OSM tags and properties
 */
function parseOsmLocationType(props: any): { type: LocationType; typeLabel: string } {
  const pType = (props.type || '').toLowerCase();
  const osmVal = (props.osm_value || '').toLowerCase();
  const osmKey = (props.osm_key || '').toLowerCase();
  const name = (props.name || '').toLowerCase();

  if (
    pType.includes('county') ||
    osmVal === 'county' ||
    name.startsWith('kabupaten') ||
    name.startsWith('kab.')
  ) {
    return { type: 'county', typeLabel: 'Kabupaten' };
  }

  if (
    pType.includes('district') ||
    osmVal === 'district' ||
    name.startsWith('kecamatan') ||
    name.startsWith('kec.')
  ) {
    return { type: 'district', typeLabel: 'Kecamatan' };
  }

  if (
    pType.includes('village') ||
    pType.includes('hamlet') ||
    osmVal === 'village' ||
    osmVal === 'hamlet' ||
    name.startsWith('desa') ||
    name.startsWith('kelurahan') ||
    name.startsWith('gampong') ||
    name.startsWith('nagari')
  ) {
    return { type: 'village', typeLabel: 'Desa / Kelurahan' };
  }

  if (pType.includes('city') || osmVal === 'city' || name.startsWith('kota')) {
    return { type: 'city', typeLabel: 'Kota' };
  }

  if (pType.includes('town') || osmVal === 'town') {
    return { type: 'town', typeLabel: 'Kota Kecil' };
  }

  if (pType.includes('suburb') || osmVal === 'suburb' || osmVal === 'neighbourhood') {
    return { type: 'suburb', typeLabel: 'Kawasan / Lingkungan' };
  }

  if (pType.includes('state') || osmVal === 'state' || osmVal === 'province') {
    return { type: 'state', typeLabel: 'Provinsi' };
  }

  if (pType.includes('country') || osmVal === 'country') {
    return { type: 'country', typeLabel: 'Negara' };
  }

  return { type: 'place', typeLabel: 'Lokasi' };
}

/**
 * Comprehensive global search supporting all cities worldwide (large & small),
 * regencies (kabupaten), districts (kecamatan), villages (desa), and hamlets.
 */
export async function searchGlobalLocations(
  query: string,
  lang: 'id' | 'en' = 'id',
  signal?: AbortSignal
): Promise<CityRecord[]> {
  const cleanQ = query.trim();
  if (!cleanQ) return [];

  const cacheKey = `${cleanQ.toLowerCase()}_${lang}`;
  if (globalSearchCache.has(cacheKey)) {
    return globalSearchCache.get(cacheKey)!;
  }

  // 1. First get local instant matches
  const localMatches = searchLocalCities(cleanQ);

  try {
    // 2. Query Komoot Photon (OpenStreetMap global comprehensive index)
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQ)}&limit=10`;
    const response = await fetch(photonUrl, { signal });

    if (response.ok) {
      const data = await response.json();
      const features: any[] = data.features || [];

      if (features.length > 0) {
        const onlineResults: CityRecord[] = features.map((f: any) => {
          const props = f.properties || {};
          const coords = f.geometry?.coordinates || [0, 0];
          const lng = coords[0];
          const lat = coords[1];

          const { type, typeLabel } = parseOsmLocationType(props);

          // Build context / secondary text (e.g. "Sleman, D.I. Yogyakarta, Indonesia")
          const parts: string[] = [];
          if (props.district && props.district !== props.name) parts.push(props.district);
          if (props.city && props.city !== props.name && props.city !== props.district) parts.push(props.city);
          if (props.county && props.county !== props.name && props.county !== props.city) parts.push(props.county);
          if (props.state && props.state !== props.name) parts.push(props.state);
          if (props.country) parts.push(props.country);

          const secondary = parts.join(', ');
          const countryCode = props.countrycode || '';
          const flag = getCountryFlag(countryCode);

          return {
            name: props.name || props.city || cleanQ,
            secondaryText: secondary || props.country || '',
            country: props.country || '',
            countryCode,
            flag,
            lat,
            lng,
            zoom: getDefaultZoomForType(type),
            type,
            typeLabel: lang === 'en' ? formatTypeLabel(type, 'en') : typeLabel,
          };
        });

        // Merge local matches with online results, deduplicating very close coordinates (< 2km)
        const combined: CityRecord[] = [...localMatches];
        for (const item of onlineResults) {
          const isDuplicate = combined.some(
            (c) => Math.abs(c.lat - item.lat) < 0.02 && Math.abs(c.lng - item.lng) < 0.02
          );
          if (!isDuplicate) {
            combined.push(item);
          }
        }

        const finalResults = combined.slice(0, 10);
        globalSearchCache.set(cacheKey, finalResults);
        return finalResults;
      }
    }
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return localMatches;
    }
    // Network or parser error; fallback to Nominatim
  }

  // 3. Fallback to OpenStreetMap Nominatim API if Photon had no features or failed
  try {
    const nomUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQ)}&addressdetails=1&limit=8`;
    const nomRes = await fetch(nomUrl, {
      signal,
      headers: { 'User-Agent': 'StreetViewTimeTraveler/2.0' },
    });

    if (nomRes.ok) {
      const nomData = await nomRes.json();
      if (Array.isArray(nomData) && nomData.length > 0) {
        const nomResults: CityRecord[] = nomData.map((item: any) => {
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          const addr = item.address || {};
          const countryCode = (addr.country_code || '').toUpperCase();
          const flag = getCountryFlag(countryCode);

          let detectedType: LocationType = 'place';
          let detectedLabel = 'Lokasi';

          const addresstype = (item.addresstype || '').toLowerCase();
          const placeType = (item.type || '').toLowerCase();

          if (addresstype === 'county' || placeType === 'county' || item.name?.toLowerCase().includes('kabupaten')) {
            detectedType = 'county';
            detectedLabel = 'Kabupaten';
          } else if (addresstype === 'district' || addresstype === 'subdistrict' || item.name?.toLowerCase().includes('kecamatan')) {
            detectedType = 'district';
            detectedLabel = 'Kecamatan';
          } else if (addresstype === 'village' || addresstype === 'hamlet' || item.name?.toLowerCase().includes('desa') || item.name?.toLowerCase().includes('kelurahan')) {
            detectedType = 'village';
            detectedLabel = 'Desa / Kelurahan';
          } else if (addresstype === 'city' || placeType === 'city') {
            detectedType = 'city';
            detectedLabel = 'Kota';
          } else if (addresstype === 'town' || placeType === 'town') {
            detectedType = 'town';
            detectedLabel = 'Kota Kecil';
          } else if (addresstype === 'state' || placeType === 'state') {
            detectedType = 'state';
            detectedLabel = 'Provinsi';
          } else if (addresstype === 'country' || placeType === 'country') {
            detectedType = 'country';
            detectedLabel = 'Negara';
          }

          const secondary = item.display_name || '';

          return {
            name: item.name || cleanQ,
            secondaryText: secondary,
            country: addr.country || '',
            countryCode,
            flag,
            lat,
            lng,
            zoom: getDefaultZoomForType(detectedType),
            type: detectedType,
            typeLabel: lang === 'en' ? formatTypeLabel(detectedType, 'en') : detectedLabel,
          };
        });

        const combined = [...localMatches];
        for (const item of nomResults) {
          const isDuplicate = combined.some(
            (c) => Math.abs(c.lat - item.lat) < 0.02 && Math.abs(c.lng - item.lng) < 0.02
          );
          if (!isDuplicate) {
            combined.push(item);
          }
        }

        const finalResults = combined.slice(0, 10);
        globalSearchCache.set(cacheKey, finalResults);
        return finalResults;
      }
    }
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return localMatches;
    }
  }

  // If online queries returned nothing or errored, return local matches
  return localMatches;
}

/**
 * Backward compatible searchCities helper
 */
export function searchCities(query: string): CityRecord[] {
  return searchLocalCities(query);
}
