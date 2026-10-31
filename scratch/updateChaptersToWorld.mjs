import fs from 'fs';

// 1. New data for Chapter 1 replacements
const chap1Replacements = {
  3: {
    id: "lvl-3-jakarta-monas",
    levelNumber: 3,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Monas: Simbol Kejayaan & Jantung Ibu Kota", en: "Monas: Icon of National Glory & Capital Heart" },
    city: "Jakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.1754, lng: 106.8272 },
    targetYear: 2014,
    targetDateStr: { id: "September 2014", en: "September 2014" },
    description: {
      id: "Monumen Nasional (Monas) Jakarta saat peluncuran perdana Google Street View di Indonesia. Satu-satunya arsip kasus Nusantara di petualangan 100 dunia!",
      en: "The National Monument (Monas) in Jakarta during Street View's inaugural Indonesian launch. The sole Indonesian archive in the 100 world adventures!"
    },
    hints: {
      cars: { id: "Taksi Blue Bird Toyota Limo biru dan bus TransJakarta lawas.", en: "Blue Bird Toyota Limo sedans and older TransJakarta BRT buses." },
      architecture: { id: "Tugu Monas 132 meter dengan lidah api berlapis emas murni.", en: "132-meter Monas obelisk crowned by the gilded bronze flame." },
      cultureOrFashion: { id: "Wisatawan keluarga berpiknik di taman Medan Merdeka.", en: "Families relaxing in the leafy Merdeka Square park grounds." }
    },
    streetViewOptions: { position: { lat: -6.1754, lng: 106.8272 }, pov: { heading: 10, pitch: 7, zoom: 1 } }
  },
  9: {
    id: "lvl-9-dublin-temple-bar",
    levelNumber: 9,
    regions: ["global", "europe"],
    title: { id: "Temple Bar Dublin: Lorong Musik & Budaya", en: "Temple Bar Dublin: Cultural Heart" },
    city: "Dublin",
    country: { id: "Irlandia", en: "Ireland" },
    realLocation: { lat: 53.3458, lng: -6.2628 },
    targetYear: 2009,
    targetDateStr: { id: "Juli 2009", en: "July 2009" },
    description: {
      id: "Kawasan berbatu Temple Bar di Dublin saat Street View pertama kali memetakan ibu kota Irlandia dengan pub-pub tradisional merah menyala.",
      en: "Cobblestone streets of Temple Bar Dublin when Street View first mapped Ireland, lined with vibrant scarlet pub facades."
    },
    hints: {
      cars: { id: "Taksi sedan Skoda Octavia dan Ford Mondeo khas Dublin.", en: "Skoda Octavia and Ford Mondeo Dublin taxi cabs." },
      architecture: { id: "Fasad pub Temple Bar berwarna merah terang dengan pot bunga gantung.", en: "Vibrant red exterior of the iconic Temple Bar pub." },
      cultureOrFashion: { id: "Musisi jalanan memainkan alat musik biola tradisional Celtic.", en: "Busking musicians with traditional Celtic violins." }
    },
    streetViewOptions: { position: { lat: 53.3458, lng: -6.2628 }, pov: { heading: 240, pitch: 5, zoom: 1 } }
  },
  11: {
    id: "lvl-11-lisbon-praca-comercio",
    levelNumber: 11,
    regions: ["global", "europe"],
    title: { id: "Praça do Comércio & Trem Kuning Lisboa", en: "Praça do Comércio & Yellow Tram Lisbon" },
    city: "Lisbon",
    country: { id: "Portugal", en: "Portugal" },
    realLocation: { lat: 38.7075, lng: -9.1364 },
    targetYear: 2009,
    targetDateStr: { id: "Mei 2009", en: "May 2009" },
    description: {
      id: "Alun-alun megah Praça do Comércio tepi Sungai Tagus di Lisbon saat trem kuning Remodelado nomor 28 melintas perlahan.",
      en: "Magnificent Praça do Comércio square along the Tagus River in Lisbon as iconic yellow Tram 28 rattles past."
    },
    hints: {
      cars: { id: "Trem kayu kuning lawas dan taksi Mercedes-Benz hijau-hitam.", en: "Vintage yellow wooden trams and green-and-black Mercedes taxis." },
      architecture: { id: "Gerbang kemenangan Arco da Rua Augusta dan deretan arkade kuning.", en: "Arco da Rua Augusta triumphal arch and yellow colonnades." },
      cultureOrFashion: { id: "Warga menikmati kopi bica dan kue pastel de nata di kafe teras.", en: "Patrons sipping bica espresso and pastel de nata on open terraces." }
    },
    streetViewOptions: { position: { lat: 38.7075, lng: -9.1364 }, pov: { heading: 10, pitch: 6, zoom: 1 } }
  },
  13: {
    id: "lvl-13-stockholm-gamla-stan",
    levelNumber: 13,
    regions: ["global", "europe"],
    title: { id: "Gamla Stan: Kota Tua Stockholm Abad Pertengahan", en: "Gamla Stan: Stockholm Medieval Old Town" },
    city: "Stockholm",
    country: { id: "Swedia", en: "Sweden" },
    realLocation: { lat: 59.3258, lng: 18.0711 },
    targetYear: 2009,
    targetDateStr: { id: "Juni 2009", en: "June 2009" },
    description: {
      id: "Alun-alun Stortorget di Gamla Stan Stockholm dengan townhouse berwarna ochre dan terakota khas abad ke-17 Skandinavia.",
      en: "Stortorget square in Gamla Stan Stockholm featuring ochre and terracotta 17th-century Scandinavian merchant houses."
    },
    hints: {
      cars: { id: "Volvo V70 estate dan Saab 9-5 khas Swedia era 2000-an.", en: "Classic Swedish Volvo V70 estates and Saab 9-5 wagons." },
      architecture: { id: "Bangunan gabled atap bertingkat berwarna jingga cerah mengelilingi plaza.", en: "Gabled merchant houses flanking the cobblestone central square." },
      cultureOrFashion: { id: "Turis menikmati tradisi 'fika' kopi kue kayu manis di kafe luar.", en: "Patrons enjoying traditional Swedish fika cinnamon buns at outdoor tables." }
    },
    streetViewOptions: { position: { lat: 59.3258, lng: 18.0711 }, pov: { heading: 320, pitch: 5, zoom: 1 } }
  },
  15: {
    id: "lvl-15-honolulu-waikiki",
    levelNumber: 15,
    regions: ["global", "americas"],
    title: { id: "Pantai Waikiki: Kalakaua Avenue Honolulu", en: "Waikiki Beach: Kalakaua Avenue Honolulu" },
    city: "Honolulu",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 21.2770, lng: -157.8265 },
    targetYear: 2008,
    targetDateStr: { id: "Agustus 2008", en: "August 2008" },
    description: {
      id: "Kalakaua Avenue sepanjang Pantai Waikiki di Honolulu dengan deretan pohon kelapa melambai dan patung legenda selancar Duke Kahanamoku.",
      en: "Kalakaua Avenue along Waikiki Beach in Honolulu with swaying palms and the Duke Kahanamoku surf statue."
    },
    hints: {
      cars: { id: "Bus tingkat terbuka Waikiki Trolley dan Ford Mustang sewaan.", en: "Open-air Waikiki Trolley tour buses and rental convertibles." },
      architecture: { id: "Hotel bersejarah Moana Surfrider 'First Lady of Waikiki' serba putih.", en: "Historic white neoclassical facade of Moana Surfrider hotel." },
      cultureOrFashion: { id: "Peselancar membawa papan selancar longboard mengenakan kemeja Aloha.", en: "Surfers carrying longboards and locals in vibrant Aloha shirts." }
    },
    streetViewOptions: { position: { lat: 21.2770, lng: -157.8265 }, pov: { heading: 140, pitch: 4, zoom: 1 } }
  },
  18: {
    id: "lvl-18-brussels-grand-place",
    levelNumber: 18,
    regions: ["global", "europe"],
    title: { id: "Grand-Place Brussels: Alun-Alun Emas Eropa", en: "Grand Place Brussels: Golden Central Square" },
    city: "Brussels",
    country: { id: "Belgia", en: "Belgium" },
    realLocation: { lat: 50.8467, lng: 4.3524 },
    targetYear: 2009,
    targetDateStr: { id: "November 2009", en: "November 2009" },
    description: {
      id: "Grand-Place di Brussels yang dikelilingi aula serikat pekerja baroque berukir emas dan Balai Kota Gotik Hôtel de Ville setinggi 96 meter.",
      en: "The Grand Place in Brussels surrounded by opulent baroque guildhalls adorned with gold leaf and the 96m Gothic Town Hall."
    },
    hints: {
      cars: { id: "Kawasan pejalan kaki berbatu bundar tanpa kendaraan bermotor.", en: "Fully pedestrianized cobblestone square with delivery vans restricted." },
      architecture: { id: "Menara Gotik runcing Hôtel de Ville dan fasad berlapis aksen emas murni.", en: "Intricate Gothic spire of Brussels Town Hall flanked by ornate guildhalls." },
      cultureOrFashion: { id: "Aroma waffle Belgia dan etalase toko cokelat praline mewah.", en: "Fragrance of warm Belgian waffles and luxurious chocolatier boutiques." }
    },
    streetViewOptions: { position: { lat: 50.8467, lng: 4.3524 }, pov: { heading: 180, pitch: 7, zoom: 1 } }
  }
};

console.log('Chapter 1 replacement metadata prepared.');
