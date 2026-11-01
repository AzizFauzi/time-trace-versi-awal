import { HistoricalPano } from './challenges';

/**
 * 50 Kasus Arsip Sejarah Nusantara - Mode Khusus 'Jelajah Indonesia'
 * Menjelajahi 50 Kota Berbeda dari Sabang sampai Merauke tanpa duplikasi kota maupun gambar.
 */
export const LEVELS_JELAJAH_INDONESIA: HistoricalPano[] = [
  {
    id: "indo-1-jakarta-bundaran-hi",
    levelNumber: 1,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Bundaran HI: Awal Penggalian MRT", en: "Bundaran HI: Dawn of Jakarta MRT" },
    city: "Jakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.195, lng: 106.823 },
    targetYear: 2014,
    targetDateStr: { id: "Tahun 2014", en: "Year 2014" },
    description: {
      id: "Bundaran HI Jakarta saat Street View resmi pertama kali meluncur di Indonesia. Tampak pagar proyek MRT baru dipasang di sekitar Monumen Selamat Datang.",
      en: "Bundaran HI when Street View launched in Indonesia, showing newly erected MRT green construction fences."
    },
    hints: {
      cars: { id: "Taksi Blue Bird Toyota Limo biru lawas dan bus Mayasari Bakti.", en: "Classic Blue Bird Toyota Limo sedans and older Mayasari buses." },
      architecture: { id: "Pagar seng hijau proyek MRT Fase 1 dan Monumen Selamat Datang.", en: "Green construction hoardings for MRT Phase 1 excavation." },
      cultureOrFashion: { id: "Bus TransJakarta gandeng oranye-merah lawas melintas koridor 1.", en: "Vintage orange-red articulated TransJakarta BRT bus." }
    },
    streetViewOptions: {
      position: { lat: -6.195, lng: 106.823 },
      pov: { heading: 320, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-2-surabaya-jembatan-merah",
    levelNumber: 2,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Merah: Kota Tua Surabaya", en: "Jembatan Merah: Old Town Surabaya" },
    city: "Surabaya",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.2355, lng: 112.738 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Kawasan cagar budaya Jembatan Merah dan Kalimas di Surabaya Utara, saksi bisu pertempuran heroik 10 November 1945.",
      en: "Historic Red Bridge and Kalimas riverfront in North Surabaya, iconic scene of the historic 1945 struggle."
    },
    hints: {
      cars: { id: "Angkot lyn mikrolet kuning Surabaya dan truk ekspedisi pelabuhan.", en: "Yellow Surabaya public vans (lyn) and port cargo trucks." },
      architecture: { id: "Gedung kolonial De Javasche Bank dan pagar merah Jembatan Merah.", en: "Dutch colonial banking buildings and crimson railings of the bridge." },
      cultureOrFashion: { id: "Pedagang pasar Pabean dan kuli panggul karung rempah.", en: "Spice market porters carrying burlap sacks near Pabean market." }
    },
    streetViewOptions: {
      position: { lat: -7.2355, lng: 112.738 },
      pov: { heading: 110, pitch: 2, zoom: 1 }
    }
  },
  {
    id: "indo-3-bandung-gedung-sate",
    levelNumber: 3,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Gedung Sate & Gasibu Tempo 2015", en: "Gedung Sate & Gasibu Bandung 2015" },
    city: "Bandung",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.9024, lng: 107.6186 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Gedung Sate kantor Gubernur Jawa Barat dengan ornamen tusuk sate ikonik di puncak atap sirapnya.",
      en: "Gedung Sate, neoclassical West Java provincial hall adorned with satay-skewer ornamental roof finial."
    },
    hints: {
      cars: { id: "Angkot hijau Kalapa-Dago dan plat nomor D Jawa Barat.", en: "Green Dago public angkots and D-series vehicle license plates." },
      architecture: { id: "Menara atap Gedung Sate dengan ornamen enam bola tusuk sate.", en: "Iconic art-deco/neoclassical tower topped with six-sphere finial." },
      cultureOrFashion: { id: "Warga jogging di Lapangan Gasibu sebelum renovasi rumput sintetis.", en: "Morning joggers around Gasibu running track before synthetic turfing." }
    },
    streetViewOptions: {
      position: { lat: -6.9024, lng: 107.6186 },
      pov: { heading: 200, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-4-yogyakarta-malioboro",
    levelNumber: 4,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Malioboro: Sebelum Zona Pedestrian", en: "Malioboro: Before Pedestrian Plaza" },
    city: "Yogyakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.7928, lng: 110.3658 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Jalan Malioboro Yogyakarta saat trotoar masih dipadati deretan sepeda motor parkir dan pedagang tenda terpal sebelum direvitalisasi.",
      en: "Malioboro Street Yogyakarta before full pedestrianization, lined with parked scooters and tarp-roof kiosks."
    },
    hints: {
      cars: { id: "Andong delman kuda dan motor Yamaha Mio karbu lawas.", en: "Horse carriages (andong) and vintage carburetor scooters." },
      architecture: { id: "Trotoar semen lawas tanpa bangku besi tempa modern.", en: "Old concrete walkway before andesite stone benches and bollards." },
      cultureOrFashion: { id: "Spanduk kain sablon toko batik klasik dan plang aksara Jawa.", en: "Traditional fabric batik shop signboards and Javanese script street signs." }
    },
    streetViewOptions: {
      position: { lat: -7.7928, lng: 110.3658 },
      pov: { heading: 185, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-5-semarang-simpang-lima",
    levelNumber: 5,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Simpang Lima Semarang 2015", en: "Simpang Lima Semarang 2015" },
    city: "Semarang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.9926, lng: 110.4225 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Alun-alun Simpang Lima Semarang pertemuan lima jalan protokol utama ibu kota Jawa Tengah.",
      en: "Simpang Lima Central Square, vibrant five-way junction of Central Java's capital."
    },
    hints: {
      cars: { id: "Bus Trans Semarang merah dan mobil plat H.", en: "Red Trans Semarang BRT buses and H-series vehicle plates." },
      architecture: { id: "Masjid Raya Baiturrahman Semarang dan deretan hotel Ciputra.", en: "Baiturrahman Grand Mosque Semarang and surrounding shopping arcades." },
      cultureOrFashion: { id: "Pusat kuliner tahu gimbal, wingko babat, dan lumpia Semarang.", en: "Street food stalls displaying lumpia bamboo baskets and local delicacies." }
    },
    streetViewOptions: {
      position: { lat: -6.9926, lng: 110.4225 },
      pov: { heading: 45, pitch: 2, zoom: 1 }
    }
  },
  {
    id: "indo-6-surakarta-pasar-gede",
    levelNumber: 6,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pasar Gede Harjonagoro Solo", en: "Pasar Gede Harjonagoro Solo" },
    city: "Surakarta (Solo)",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.5686, lng: 110.8317 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Pasar Gede karya arsitek Belanda Thomas Karsten yang memadukan arsitektur Belanda dan Jawa.",
      en: "Pasar Gede, masterwork by Dutch architect Thomas Karsten blending Dutch and Javanese styles."
    },
    hints: {
      cars: { id: "Becak kayuh khas Solo dengan tenda motif batik dan mobil plat AD.", en: "Solo cycle rickshaws with batik covers and AD license plates." },
      architecture: { id: "Gerbang lengkung atap limasan karya arsitek Thomas Karsten 1930.", en: "Arched masonry gateway with Dutch-Javanese roof design." },
      cultureOrFashion: { id: "Aroma dawet telasih Bu Dermi dan jajanan pasar pasar tradisional.", en: "Traditional dawet telasih sweet dessert and batik merchants." }
    },
    streetViewOptions: {
      position: { lat: -7.5686, lng: 110.8317 },
      pov: { heading: 350, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-7-malang-kayutangan",
    levelNumber: 7,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Kayutangan Malang: Sebelum Jalur Heritage", en: "Kayutangan Malang: Pre-Heritage Corridor" },
    city: "Malang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.9785, lng: 112.63 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Koridor pertokoan kolonial Jalan Basuki Rahmat (Kayutangan) Malang sebelum penataan koridor lampu antik.",
      en: "Basuki Rahmat (Kayutangan) heritage corridor in Malang before retro-lighting revitalization."
    },
    hints: {
      cars: { id: "Angkot biru khas Malang (mikrolet) dan plat nomor N.", en: "Blue public minibuses (mikrolet) and East Java N plates." },
      architecture: { id: "Gereja Hati Kudus Yesus (Kayutangan) berlanggam gotik eropa.", en: "Gothic spire of Sacred Heart Church (Kayutangan) built in 1905." },
      cultureOrFashion: { id: "Toko oen dan spanduk kuliner bakso malang legendaris.", en: "Vintage colonial cafes and Malang meatball noodle stalls." }
    },
    streetViewOptions: {
      position: { lat: -7.9785, lng: 112.63 },
      pov: { heading: 170, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-8-magelang-borobudur",
    levelNumber: 8,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Candi Borobudur: Pelataran Kenari", en: "Borobudur Temple: Kenari Courtyard" },
    city: "Magelang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.6079, lng: 110.2038 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Kompleks Candi Borobudur mahakarya wangsa Syailendra abad ke-8 di lembah Kedu Magelang.",
      en: "Magnificent 8th-century Borobudur Buddhist sanctuary in the Kedu Valley."
    },
    hints: {
      cars: { id: "Mobil golf listrik operasional taman wisata candi dan plat AA.", en: "Electric tourism buggies and AA Central Java plates." },
      architecture: { id: "Tingkatan stupa teras melingkar batu andesit vulkanik.", en: "Concentric circular stupa terraces built of dark volcanic andesite stone." },
      cultureOrFashion: { id: "Pohon kenari rindang peninggalan era pemugaran kolonial.", en: "Canopy of heritage kenari trees lining the sacred processional avenue." }
    },
    streetViewOptions: {
      position: { lat: -7.6079, lng: 110.2038 },
      pov: { heading: 90, pitch: 8, zoom: 1 }
    }
  },
  {
    id: "indo-9-sleman-prambanan",
    levelNumber: 9,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Candi Prambanan: Mahakarya Mataram Kuno", en: "Prambanan Temple: Ancient Mataram Wonder" },
    city: "Sleman",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.752, lng: 110.4915 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Candi Prambanan percandian Hindu megah abad ke-9 persembahan untuk Trimurti di perbatasan Sleman-Klaten.",
      en: "Magnificent 9th-century Hindu temple compound dedicated to Trimurti on the border of Sleman."
    },
    hints: {
      cars: { id: "Bus pariwisata bertingkat dan plat AB Yogyakarta.", en: "Chartered tour buses and Yogyakarta AB vehicle plates." },
      architecture: { id: "Menara Candi Siwa setinggi 47 meter yang menjulang runcing.", en: "Towering 47-meter Shiva central spire with intricate stone carvings." },
      cultureOrFashion: { id: "Panggung terbuka Sendratari Ramayana berlatar candi batu.", en: "Ramayana ballet open-air amphitheater backdrop." }
    },
    streetViewOptions: {
      position: { lat: -7.752, lng: 110.4915 },
      pov: { heading: 75, pitch: 6, zoom: 1 }
    }
  },
  {
    id: "indo-10-wonosobo-dieng",
    levelNumber: 10,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Candi Arjuna Dieng: Percandian Tertua Jawa", en: "Arjuna Temple Dieng: Ancient Highland Shrine" },
    city: "Wonosobo",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.2056, lng: 109.9022 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Dataran tinggi Dieng pada ketinggian 2.000 mdpl di Wonosobo dengan kompleks Candi Arjuna abad ke-7 yang berselimut kabut.",
      en: "Misty Dieng volcanic plateau at 2,000m altitude in Wonosobo featuring 7th-century Arjuna temples."
    },
    hints: {
      cars: { id: "Mobil pikap pengangkut kentang Dieng dan motor berselimut sarung.", en: "Highland farm utility pickups loaded with potatoes and cabbage." },
      architecture: { id: "Struktur candi batu andesit mungil tanpa relief berlatar bukit pinus.", en: "Compact stone sanctuaries standing on a grassy plateau framed by hills." },
      cultureOrFashion: { id: "Petani berjaket tebal dan penutup kepala kupluk menembus kabut tipis.", en: "Highland farmers wearing warm balaclavas against freezing mountain mist." }
    },
    streetViewOptions: {
      position: { lat: -7.2056, lng: 109.9022 },
      pov: { heading: 140, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-11-probolinggo-bromo",
    levelNumber: 11,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Lautan Pasir Bromo & Pura Poten", en: "Bromo Sand Sea & Luhur Poten Temple" },
    city: "Probolinggo",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.9425, lng: 112.953 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Kaldera tengger kaldera pasir vulkanik Gunung Bromo dan Pura Luhur Poten masyarakat Tengger.",
      en: "Vast volcanic sand sea caldera of Mount Bromo and sacred Luhur Poten Hindu shrine."
    },
    hints: {
      cars: { id: "Deretan jip Toyota Land Cruiser Hardtop 4x4 warna-warni.", en: "Fleets of classic Toyota FJ40 Hardtop 4x4 tourist jeeps." },
      architecture: { id: "Pura dari batu lava hitam bertingkat di tengah hamparan pasir.", en: "Black volcanic lava-stone temple gates rising dramatically from sand flats." },
      cultureOrFashion: { id: "Warga Suku Tengger menunggang kuda sewaan berselimut sarung.", en: "Indigenous Tenggerese horsemen draped in traditional batik sarongs." }
    },
    streetViewOptions: {
      position: { lat: -7.9425, lng: 112.953 },
      pov: { heading: 220, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-12-anyer-mercusuar",
    levelNumber: 12,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Mercusuar Anyer: Titik Nol Jalan Daendels", en: "Anyer Lighthouse: Point Zero Daendels Highway" },
    city: "Anyer (Serang)",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.0694, lng: 105.8872 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Mercusuar Cikoneng Anyer buatan Belanda tahun 1885, penanda titik awal 1.000 km Jalan Raya Pos Anyer-Panarukan.",
      en: "Historic 1885 Cikoneng Lighthouse in Anyer, official zero point of the 1,000km Great Post Road."
    },
    hints: {
      cars: { id: "Angkot Serang-Cilegon dan plat A Banten.", en: "Banten province A-series license plates and coastal minibuses." },
      architecture: { id: "Menara suar besi putih setinggi 40 meter dengan 16 lantai tangga putar.", en: "White cast-iron lighthouse tower soaring above coconut palm trees." },
      cultureOrFashion: { id: "Warung ikan bakar pesisir Selat Sunda dan pedagang kelapa muda.", en: "Grilled seafood beach warungs and fresh young coconut sellers." }
    },
    streetViewOptions: {
      position: { lat: -6.0694, lng: 105.8872 },
      pov: { heading: 290, pitch: 6, zoom: 1 }
    }
  },
  {
    id: "indo-13-kuta-bali",
    levelNumber: 13,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Kuta: Pesisir Ikonik Wisata Bali", en: "Kuta Beach: Classic Balinese Coastal Strip" },
    city: "Kuta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.718, lng: 115.1686 },
    targetYear: 2014,
    targetDateStr: { id: "Tahun 2014", en: "Year 2014" },
    description: {
      id: "Jalan Pantai Kuta Bali tahun 2014 saat dinding bata merah candi bentar masih berdiri sebelum revitalisasi.",
      en: "Kuta Beach promenade Bali in 2014, showing the red-brick boundary walls facing world-famous surf breaks."
    },
    hints: {
      cars: { id: "Motor matic sewaan dengan rak papan selancar dan plat DK.", en: "Rental automatic scooters with surfboard racks and Bali DK plates." },
      architecture: { id: "Gapura candi bentar bata merah khas arsitektur pesisir Bali.", en: "Split gateways (candi bentar) made of red brick flanking coastal lanes." },
      cultureOrFashion: { id: "Wisatawan asing menyeberang membawa papan selancar.", en: "Surfers carrying longboards across coastal lanes shaded by banyan trees." }
    },
    streetViewOptions: {
      position: { lat: -8.718, lng: 115.1686 },
      pov: { heading: 260, pitch: 2, zoom: 1 }
    }
  },
  {
    id: "indo-14-ubud-monkey-forest",
    levelNumber: 14,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Ubud Monkey Forest: Wanara Wana", en: "Ubud Sacred Monkey Forest Sanctuary" },
    city: "Ubud",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.5186, lng: 115.2605 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Hutan suci Wanara Wana di Desa Padangtegal Ubud Gianyar, pusat konservasi spiritual dan budaya Bali.",
      en: "Sacred Monkey Forest Sanctuary in Padangtegal Ubud, lush spiritual rainforest haven."
    },
    hints: {
      cars: { id: "Mobil van Suzuki APV pariwisata dan plat DK Bali.", en: "White tourist transport vans and Bali DK license plates." },
      architecture: { id: "Pura Dalem Agung Padangtegal dengan ukiran lumut batu paras alami.", en: "Moss-draped volcanic sandstone temple gates and mythical dragon bridges." },
      cultureOrFashion: { id: "Kera ekor panjang melintas di antara pohon beringin raksasa berakar gantung.", en: "Long-tailed macaques resting beneath giant hanging banyan aerial roots." }
    },
    streetViewOptions: {
      position: { lat: -8.5186, lng: 115.2605 },
      pov: { heading: 15, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-15-tabanan-tanah-lot",
    levelNumber: 15,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pura Tanah Lot: Karang Laut Tabanan", en: "Tanah Lot: Sea Temple of Tabanan" },
    city: "Tabanan",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.6212, lng: 115.0868 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Pura Tanah Lot bertengger di atas bongkahan batu karang laut di pesisir Beraban Tabanan Bali.",
      en: "Iconic Tanah Lot sea temple perched on an offshore wave-cut rock formation in Tabanan."
    },
    hints: {
      cars: { id: "Bus pariwisata di area parkir lembah Tabanan.", en: "Large charter buses parked near temple entrance lanes." },
      architecture: { id: "Pelinggih meru bertingkat atap ijuk hitam di atas karang laut terisolasi.", en: "Multi-tiered thatched meru shrines crowning the sea rock outcrop." },
      cultureOrFashion: { id: "Jalan setapak menurun dengan penjual kain sarung bali bermotif poleng.", en: "Walkway lined with souvenir stalls selling black-and-white checkered poleng cloth." }
    },
    streetViewOptions: {
      position: { lat: -8.6212, lng: 115.0868 },
      pov: { heading: 240, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-16-jimbaran-gwk",
    levelNumber: 16,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Taman Budaya GWK: Pra-Pemasangan Patung", en: "GWK Cultural Park: Pre-Assembly Era" },
    city: "Jimbaran",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.8104, lng: 115.1676 },
    targetYear: 2014,
    targetDateStr: { id: "Tahun 2014", en: "Year 2014" },
    description: {
      id: "Kawasan Taman Budaya Garuda Wisnu Kencana di bukit kapur Ungasan Jimbaran sebelum patung utama dirakit utuh.",
      en: "Garuda Wisnu Kencana cultural park atop Ungasan limestone quarry before final statue assembly."
    },
    hints: {
      cars: { id: "Mobil shuttle golf buggy dan bus pariwisata di Bukit Jimbaran.", en: "Open-air golf buggy shuttles on limestone plateau avenues." },
      architecture: { id: "Dinding tebing batu kapur putih terpotong raksasa membentuk koridor megah.", en: "Massive sheer carved limestone cliff walls flanking the Lotus Pond plaza." },
      cultureOrFashion: { id: "Fragmen patung tembaga Wisnu raksasa terpajang terpisah di pelataran.", en: "Separate colossal copper-brass busts of Lord Vishnu on open display." }
    },
    streetViewOptions: {
      position: { lat: -8.8104, lng: 115.1676 },
      pov: { heading: 130, pitch: 7, zoom: 1 }
    }
  },
  {
    id: "indo-17-lombok-senggigi",
    levelNumber: 17,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Senggigi Lombok 2015", en: "Senggigi Beach West Lombok 2015" },
    city: "Lombok Barat",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.5033, lng: 116.0503 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Jalan raya pesisir Senggigi Lombok Barat dengan panorama teluk berpasir putih menghadap Selat Lombok.",
      en: "Senggigi coastal road in West Lombok offering views of sweeping tropical bays."
    },
    hints: {
      cars: { id: "Cidomo (kereta kuda khas Lombok) dan mobil plat DR Nusa Tenggara Barat.", en: "Cidomo horse carts and West Nusa Tenggara DR-series vehicle plates." },
      architecture: { id: "Pagar batu apung dan gapura khas sasak beratap lumbung padi.", en: "Sasak-style thatched barn roofs (lumbung) on resort pavilions." },
      cultureOrFashion: { id: "Nelayan perahu cadik tradisional berlayar di garis pantai berpasir.", en: "Traditional wooden outrigger boats resting on golden sand shorelines." }
    },
    streetViewOptions: {
      position: { lat: -8.5033, lng: 116.0503 },
      pov: { heading: 310, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-18-labuan-bajo",
    levelNumber: 18,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pelabuhan Bahari Labuan Bajo", en: "Labuan Bajo Maritime Harbor" },
    city: "Labuan Bajo",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.4964, lng: 119.8877 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Pesisir pelabuhan Labuan Bajo di ujung barat Flores, gerbang penjelajahan Taman Nasional Komodo.",
      en: "Scenic coastal harbor of Labuan Bajo on Flores island, gateway to Komodo National Park."
    },
    hints: {
      cars: { id: "Truk kayu ekspedisi antarpulau dan mobil plat EB Flores.", en: "Island cargo transports and Flores EB license plate vehicles." },
      architecture: { id: "Dermaga kayu dan bangunan bertingkat di lereng bukit curam menghadap teluk.", en: "Terraced hillside lodges overlooking the deep blue archipelago bay." },
      cultureOrFashion: { id: "Kapal layar pinisi tradisional bersandar di antara pulau-pulau karst kecil.", en: "Classic wooden phinisi sailing schooners anchored in the harbor." }
    },
    streetViewOptions: {
      position: { lat: -8.4964, lng: 119.8877 },
      pov: { heading: 275, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-19-kupang-teluk",
    levelNumber: 19,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pesisir Teluk Kupang & Pantai Lasiana", en: "Kupang Bay Coastal Strip" },
    city: "Kupang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -10.1772, lng: 123.607 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Pesisir Teluk Kupang ibu kota Nusa Tenggara Timur dengan deretan pohon lontar dan pantai karang eksotis.",
      en: "Sunny coastal bay of Kupang, capital of East Nusa Tenggara, shaded by iconic lontar palms."
    },
    hints: {
      cars: { id: "Bemo angkot Kupang dengan speaker musik dentum dan plat DH.", en: "Flamboyantly decorated Kupang bemo vans and DH license plates." },
      architecture: { id: "Gereja kristen berdinding batu kapur dan atap seng tropis.", en: "Churches with limestone facades and breezy veranda-style coastal residences." },
      cultureOrFashion: { id: "Pohon lontar menjulang tinggi penghasil tuak manis dan sasando.", en: "Tall fan-shaped Palmyra (lontar) palms dotting the dry savannah landscape." }
    },
    streetViewOptions: {
      position: { lat: -10.1772, lng: 123.607 },
      pov: { heading: 330, pitch: 2, zoom: 1 }
    }
  },
  {
    id: "indo-20-medan-istana-maimun",
    levelNumber: 20,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Istana Maimun: Kesultanan Deli Medan", en: "Maimun Palace: Deli Sultanate Medan" },
    city: "Medan",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 3.5753, lng: 98.6838 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Istana Maimun peninggalan Kesultanan Deli di Jalan Brigjen Katamso Medan dengan arsitektur Melayu-Islam dan Spanyol.",
      en: "Maimun Palace in Medan, royal residence of Deli Sultanate blending Malay, Islamic, and Spanish architectural elements."
    },
    hints: {
      cars: { id: "Becak motor (bentor) khas Medan dengan sespan samping dan plat BK.", en: "Iconic Medan sidecar motorcycle rickshaws (bentor) and BK plates." },
      architecture: { id: "Kubah kubah melengkung hitam dan dinding warna kuning emas khas kesultanan Melayu.", en: "Golden yellow facade and black scalloped domes designed by Ferrari in 1888." },
      cultureOrFashion: { id: "Kain songket deli dan penjual durian ucok di sudut jalan.", en: "Traditional Malay deli songket fabric and renowned durian vendor signs." }
    },
    streetViewOptions: {
      position: { lat: 3.5753, lng: 98.6838 },
      pov: { heading: 10, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-21-palembang-ampera",
    levelNumber: 21,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Ampera & Sungai Musi", en: "Ampera Bridge & Musi River Palembang" },
    city: "Palembang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.9918, lng: 104.7634 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Jembatan Ampera menghubungkan Seberang Ulu dan Seberang Ilir di atas Sungai Musi Palembang.",
      en: "Ampera Bridge spanning the wide Musi River, connecting Seberang Ulu and Ilir in Palembang."
    },
    hints: {
      cars: { id: "Angkot Palembang merah-kuning dan mobil plat BG Sumatera Selatan.", en: "South Sumatra BG license plates and red-yellow city minibuses." },
      architecture: { id: "Dua menara pilon jembatan baja merah menyala setinggi 63 meter.", en: "Twin 63-meter vermilion steel bridge towers built with Japanese war reparations." },
      cultureOrFashion: { id: "Perahu getek tradisional melaju di bawah jembatan membawa pempek.", en: "Traditional wooden getek river ferries skimming beneath the steel spans." }
    },
    streetViewOptions: {
      position: { lat: -2.9918, lng: 104.7634 },
      pov: { heading: 160, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-22-bukittinggi-jam-gadang",
    levelNumber: 22,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jam Gadang: Jantung Minangkabau", en: "Jam Gadang: Clock Tower of Bukittinggi" },
    city: "Bukittinggi",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.3055, lng: 100.3692 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Jam Gadang di pusat kota Bukittinggi Sumatera Barat, hadiah dari Ratu Belanda tahun 1926 dengan atap gonjong khas Minang.",
      en: "Jam Gadang landmark clock tower in Bukittinggi, topped with traditional Minangkabau gonjong horn roof."
    },
    hints: {
      cars: { id: "Bendi dokar kuda dan plat BA Sumatera Barat.", en: "Horse-drawn bendi carriages and West Sumatra BA license plates." },
      architecture: { id: "Atap gonjong bertanduk runcing di atas menara jam berangka romawi IIII.", en: "Iconic pointed curved gonjong eaves capping the clock face displaying 'IIII'." },
      cultureOrFashion: { id: "Pedagang keripik balado sanjai dan hawa pegunungan sejuk Ngarai Sianok.", en: "Crispy cassava balado sanjai merchants and crisp cool highland air." }
    },
    streetViewOptions: {
      position: { lat: -0.3055, lng: 100.3692 },
      pov: { heading: 25, pitch: 6, zoom: 1 }
    }
  },
  {
    id: "indo-23-parapat-danau-toba",
    levelNumber: 23,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Danau Toba: Gerbang Parapat & Samosir", en: "Lake Toba: Gateway Port of Parapat" },
    city: "Parapat",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 2.6635, lng: 98.9328 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Kota pesisir Parapat di Danau Toba, pelabuhan utama penyeberangan kapal ferry menuju Pulau Samosir.",
      en: "Parapat town on the shores of Lake Toba, primary harbor ferry crossing point to Samosir Island."
    },
    hints: {
      cars: { id: "Bus antar-kota Sumatra dan mobil plat BB/BK.", en: "North Sumatra BB/BK regional bus coaches along cliffside roads." },
      architecture: { id: "Rumah beratap pelana melengkung motif gorga Batak Toba.", en: "Gabled roofs adorned with intricate red-black-white Batak gorga carvings." },
      cultureOrFashion: { id: "Kapal motor kayu bertingkat mengangkut warga menyeberang danau kaldera.", en: "Wooden double-decker passenger ferries plying deep blue crater waters." }
    },
    streetViewOptions: {
      position: { lat: 2.6635, lng: 98.9328 },
      pov: { heading: 260, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-24-banda-aceh-baiturrahman",
    levelNumber: 24,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Masjid Raya Baiturrahman Serambi Mekkah", en: "Grand Mosque of Baiturrahman Aceh" },
    city: "Banda Aceh",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 5.5536, lng: 95.3193 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Masjid Raya Baiturrahman ikon keteguhan dan spiritualitas rakyat Aceh di jantung Kota Banda Aceh.",
      en: "Grand Mosque of Baiturrahman, iconic symbol of Acehnese faith and resilience in Banda Aceh."
    },
    hints: {
      cars: { id: "Motor becak mesin Aceh dengan atap melengkung dan plat BL.", en: "Acehnese motorized rickshaws and BL-series license plates." },
      architecture: { id: "Kubah kubah hitam bergaya Mughal-revival dengan menara putih megah.", en: "Black Mughal-revival onion domes and soaring white minarets." },
      cultureOrFashion: { id: "Payung hidrolik raksasa di pelataran marmer putih bersih.", en: "Giant motorized umbrella canopies covering the pristine marble courtyard." }
    },
    streetViewOptions: {
      position: { lat: 5.5536, lng: 95.3193 },
      pov: { heading: 200, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-25-sabang-nol-km",
    levelNumber: 25,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Tugu Nol Kilometer Indonesia", en: "Zero Kilometer Monument Sabang" },
    city: "Sabang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 5.908, lng: 95.2155 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Tugu Nol Kilometer Indonesia di tebing Hutan Iboih Pulau Weh Sabang, titik tolak pengukuran wilayah nusantara.",
      en: "Kilometer Zero Monument on the forested cliffs of Pulau Weh Sabang, westernmost point of Indonesia."
    },
    hints: {
      cars: { id: "Motor bebek sewaan turis dengan plat BL Sabang.", en: "Rented island scooters navigating lush jungle curves with BL plates." },
      architecture: { id: "Monumen beton putih dengan ornamen angka nol besar dan Burung Garuda.", en: "Concrete spire incorporating giant numeral zero surmounted by Garuda emblem." },
      cultureOrFashion: { id: "Sertifikat penjelajah nol kilometer dan laut lepas Samudra Hindia.", en: "Official visitor certificates awarded to travelers at the western frontier." }
    },
    streetViewOptions: {
      position: { lat: 5.908, lng: 95.2155 },
      pov: { heading: 315, pitch: 6, zoom: 1 }
    }
  },
  {
    id: "indo-26-payakumbuh-kelok-9",
    levelNumber: 26,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Kelok 9 Ngarai Bukit Barisan", en: "Kelok 9 Bridge: Bukit Barisan Flyover" },
    city: "Payakumbuh",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.0718, lng: 100.6974 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Jembatan layang berkelok sembilan yang megah menembus ngarai terjal Bukit Barisan di Payakumbuh.",
      en: "Spectacular multi-span Kelok 9 flyover curving gracefully through Bukit Barisan mountain gorge."
    },
    hints: {
      cars: { id: "Truk barang lintas Sumatera dan mobil keluarga plat BA.", en: "Trans-Sumatran haulage trucks and West Sumatra BA vehicles." },
      architecture: { id: "Jalan layang pilar beton bertingkat yang meliuk di celah dua tebing hijau.", en: "Elevated concrete viaducts hugging vertical granite cliff faces." },
      cultureOrFashion: { id: "Wisatawan menepi di rest area untuk berfoto dengan latar lembah berkabut.", en: "Road trippers pausing at scenic pull-outs enjoying hot local coffee." }
    },
    streetViewOptions: {
      position: { lat: -0.0718, lng: 100.6974 },
      pov: { heading: 140, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-27-belitung-tanjung-tinggi",
    levelNumber: 27,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Tanjung Tinggi: Granit Laskar Pelangi", en: "Tanjung Tinggi Beach: Belitung Granite Coast" },
    city: "Belitung",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.5516, lng: 107.7126 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Pantai Tanjung Tinggi di Belitung dengan tumpukan batu granit raksasa purba dan laut tenang berair toska.",
      en: "Tanjung Tinggi Beach in Belitung, famed for colossal ancient granite boulders and serene turquoise waters."
    },
    hints: {
      cars: { id: "Mobil sewaan Avanza/Innova wisata pulau dan plat BN.", en: "Island tour minivans bearing Bangka Belitung BN license plates." },
      architecture: { id: "Bongkahan batu granit alami setinggi belasan meter di bibir pantai.", en: "Giant naturally weathered granite mega-boulders forming coastal labyrinths." },
      cultureOrFashion: { id: "Warung kopi manggar khas belitung dan kuliner sup gangan ikan.", en: "Local fish gangan soup warungs and Manggar-style pulled coffee signs." }
    },
    streetViewOptions: {
      position: { lat: -2.5516, lng: 107.7126 },
      pov: { heading: 350, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-28-bandar-lampung",
    levelNumber: 28,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Menara Siger: Gerbang Pulau Sumatera", en: "Menara Siger: Southern Crown of Sumatra" },
    city: "Bandar Lampung",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -5.8711, lng: 105.7538 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Menara Siger megah di atas bukit pesisir Bakauheni Bandar Lampung, mahkota selamat datang di Pulau Emas Sumatera.",
      en: "Menara Siger crowning the coastal heights of Bakauheni, architectural gateway welcoming travelers to Sumatra."
    },
    hints: {
      cars: { id: "Bus antar-provinsi ALS/npm dan kendaraan plat BE Lampung.", en: "Long-distance Sumatra-Java express buses and Lampung BE plates." },
      architecture: { id: "Bangunan berbentuk mahkota siger pengantin wanita Lampung berwarna kuning keemasan.", en: "Monumental crown structure modeled on traditional golden Lampung bridal headdress." },
      cultureOrFashion: { id: "Pemandangan lalu lintas kapal ferry ro-ro menyeberangi Selat Sunda.", en: "Roll-on/roll-off ferries crossing the Sunda Strait from Merak harbor." }
    },
    streetViewOptions: {
      position: { lat: -5.8711, lng: 105.7538 },
      pov: { heading: 110, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-29-batam-barelang",
    levelNumber: 29,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Barelang: Ikon Kepulauan Riau", en: "Barelang Bridge: Riau Islands Landmark" },
    city: "Batam",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 0.984, lng: 104.0416 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Jembatan Barelang kabel pancang karya B.J. Habibie menghubungkan Batam, Rempang, dan Galang.",
      en: "Barelang cable-stayed bridge designed by B.J. Habibie, uniting the islands of Batam, Rempang, and Galang."
    },
    hints: {
      cars: { id: "Mobil sedan impor eks-Singapura dan plat nomor BP Kepri.", en: "Imported second-hand sedans and Riau Islands BP license plates." },
      architecture: { id: "Pilon jembatan gantung kabel baja megah menghubungkan pulau-pulau tropis.", en: "High concrete cable-stayed pylons soaring across sea straits." },
      cultureOrFashion: { id: "Penjual jagung bakar di tepi jembatan dan panorama lalu lintas kapal tanker.", en: "Roasted corn vendors along the pedestrian walkway overlooking shipping lanes." }
    },
    streetViewOptions: {
      position: { lat: 0.984, lng: 104.0416 },
      pov: { heading: 175, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-30-pangkalpinang-emas",
    levelNumber: 30,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Emas: Muara Pangkal Balam", en: "Emas Bascule Bridge: Pangkalpinang Estuary" },
    city: "Pangkalpinang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.1297, lng: 106.1554 },
    targetYear: 2017,
    targetDateStr: { id: "Tahun 2017", en: "Year 2017" },
    description: {
      id: "Jembatan Emas tipe buka-tutup (bascule) melintasi muara Sungai Pangkal Balam di ibu kota Bangka.",
      en: "Emas Bascule Bridge spanning the Pangkal Balam river estuary in Pangkalpinang, Bangka."
    },
    hints: {
      cars: { id: "Motor matik nelayan dan mobil plat BN Bangka Belitung.", en: "Coastal commuter motorcycles and Bangka Belitung BN license plates." },
      architecture: { id: "Sistem jembatan jungkit hidrolik yang dapat terbuka untuk kapal lewat.", en: "Hydraulic bascule bridge mechanism lifting for maritime cargo vessels." },
      cultureOrFashion: { id: "Perahu nelayan bagan apung penangkap cumi di perairan muara.", en: "Floating squid-fishing outriggers anchored along the river mouth." }
    },
    streetViewOptions: {
      position: { lat: -2.1297, lng: 106.1554 },
      pov: { heading: 80, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-31-jambi-gentala",
    levelNumber: 31,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Gentala Arasy & Batanghari", en: "Gentala Arasy Pedestrian Bridge Jambi" },
    city: "Jambi",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -1.5907, lng: 103.619 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Jembatan pedestrian berliku Gentala Arasy melintasi Sungai Batanghari menghubungkan kota lama dan Seberang Jambi.",
      en: "Gentala Arasy S-curve pedestrian bridge across Batanghari River leading to the Islamic cultural tower."
    },
    hints: {
      cars: { id: "Hanya pejalan kaki di atas jembatan, jalan raya di darat berplat BH.", en: "Pedestrian-only deck with Jambi BH plate vehicles on approaching boulevards." },
      architecture: { id: "Menara jam Gentala Arasy setinggi 80 meter dengan kubah arab-melayu.", en: "80-meter clock tower featuring Arab-Malay decorative brick arches." },
      cultureOrFashion: { id: "Perahu ketek tradisional mengarungi Sungai Batanghari yang lebar berlumpur cokelat.", en: "Traditional ketek motorboats ferrying passengers across wide muddy waters." }
    },
    streetViewOptions: {
      position: { lat: -1.5907, lng: 103.619 },
      pov: { heading: 320, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-32-bengkulu-marlborough",
    levelNumber: 32,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Benteng Marlborough Pesisir Samudera", en: "Fort Marlborough: British Coastal Stronghold" },
    city: "Bengkulu",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -3.788, lng: 102.2514 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Benteng Marlborough peninggalan East India Company Inggris abad ke-18 menghadap Samudra Hindia di Bengkulu.",
      en: "Fort Marlborough, massive 18th-century British East India Company bastion on the Bengkulu coast."
    },
    hints: {
      cars: { id: "Kendaraan plat BD Bengkulu dan jalan pesisir Pantai Tapak Paderi.", en: "Bengkulu BD license plates and coastal tourist transport vans." },
      architecture: { id: "Dinding benteng bata tebal menyerupai kura-kura dengan parit pertahanan.", en: "Turtle-shaped massive brick ramparts and stone bastion battlements." },
      cultureOrFashion: { id: "Meriam besi VOC/Inggris kuno mengarah ke deburan ombak samudra.", en: "Antique cast-iron cannons pointed toward crashing Indian Ocean surf." }
    },
    streetViewOptions: {
      position: { lat: -3.788, lng: 102.2514 },
      pov: { heading: 240, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-33-pekanbaru-siak",
    levelNumber: 33,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Siak Sultan Abdul Jalil", en: "Siak Bridge: Sultan Abdul Jalil Pekanbaru" },
    city: "Pekanbaru",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 0.5366, lng: 101.4429 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Jembatan Siak melintasi Sungai Siak terdalam di Indonesia menghubungkan dua sisi Kota Bertuah Pekanbaru.",
      en: "Siak cable-stayed bridge spanning the deep Siak River in the petroleum capital of Pekanbaru."
    },
    hints: {
      cars: { id: "Mobil SUV perusahaan minyak dan kendaraan berplat BM Riau.", en: "Heavy oil-field pickup trucks and Riau BM-series license plates." },
      architecture: { id: "Busur pilon kabel baja megah berhias motif pucuk rebung Melayu.", en: "Steel cable-stayed pylons crowned with Malay bamboo-shoot motifs." },
      cultureOrFashion: { id: "Lalu lintas tongkang pengangkut kayu akasia dan minyak sawit di sungai.", en: "Barges transporting palm oil down Indonesia's deepest inland waterway." }
    },
    streetViewOptions: {
      position: { lat: 0.5366, lng: 101.4429 },
      pov: { heading: 40, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-34-pontianak-khatulistiwa",
    levelNumber: 34,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Tugu Khatulistiwa Equator Monument", en: "Equator Monument Pontianak" },
    city: "Pontianak",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 0.0013, lng: 109.3214 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Tugu Khatulistiwa di Siantan Pontianak menandai titik garis lintang 0 derajat melintasi Sungai Kapuas.",
      en: "Equator Monument in Pontianak, marking zero-degree latitude at the mouth of Kapuas River."
    },
    hints: {
      cars: { id: "Sepeda motor bebek plat KB Kalimantan Barat dan truk sawit.", en: "West Kalimantan KB license plates and rural palm oil transport trucks." },
      architecture: { id: "Struktur monumen kayu ulin berbentuk anak panah lingkaran bumi buatan 1928.", en: "Historic ironwood (ulin) arch structure holding circular equator arrow marker." },
      cultureOrFashion: { id: "Peristiwa kulminasi matahari tanpa bayangan dua kali setahun.", en: "Equatorial solar culmination signs and Kapuas riverfront walkways." }
    },
    streetViewOptions: {
      position: { lat: 0.0013, lng: 109.3214 },
      pov: { heading: 190, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-35-banjarmasin-lok-baintan",
    levelNumber: 35,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pasar Terapung Lok Baintan Martapura", en: "Lok Baintan Floating Market Banjarmasin" },
    city: "Banjarmasin",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -3.3166, lng: 114.6335 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Pasar terapung tradisional Lok Baintan di aliran Sungai Martapura Banjarmasin yang telah ada sejak era Kesultanan Banjar.",
      en: "Lok Baintan traditional floating market on Martapura River, trading on wooden canoes since sultanate times."
    },
    hints: {
      cars: { id: "Pikuk perahu klotok mesin tempel dan kendaraan plat DA di dermaga.", en: "Motorized wooden klotok canoes and South Kalimantan DA vehicles onshore." },
      architecture: { id: "Rumah panggung kayu terapung (lanting) beratap sirap di tepian sungai.", en: "Floating timber raft houses (lanting) moored along muddy river banks." },
      cultureOrFashion: { id: "Pedagang wanita (acil-acil) bertopi purun tanggui menjual buah di perahu jukung.", en: "Market traders wearing wide conical straw hats (tanggui) paddling jukung canoes." }
    },
    streetViewOptions: {
      position: { lat: -3.3166, lng: 114.6335 },
      pov: { heading: 70, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-36-balikpapan-melawai",
    levelNumber: 36,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Melawai: Pesisir Selat Makassar", en: "Melawai Beach: Balikpapan Bay" },
    city: "Balikpapan",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -1.2789, lng: 116.8122 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Jalan Jenderal Sudirman pesisir Pantai Melawai Balikpapan menghadap Selat Makassar dan kilang minyak Pertamina.",
      en: "Melawai coastal boulevard in Balikpapan overlooking oil refineries and the Makassar Strait."
    },
    hints: {
      cars: { id: "Mobil pikap double cabin tambang dan kendaraan plat KT.", en: "Mining company 4x4 double-cab pickups and East Kalimantan KT plates." },
      architecture: { id: "Tangki bulat kilang minyak dan pelabuhan bongkar muat Semayang.", en: "Petroleum storage tanks and cranes of Semayang harbor on the horizon." },
      cultureOrFashion: { id: "Deretan pedagang kuliner malam pisang gapit di pinggir tanggul pemecah ombak.", en: "Evening street stalls selling grilled banana (pisang gapit) along sea walls." }
    },
    streetViewOptions: {
      position: { lat: -1.2789, lng: 116.8122 },
      pov: { heading: 210, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-37-samarinda-mahakam",
    levelNumber: 37,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Mahakam Sungai Mahakam", en: "Mahakam Bridge: Riverfront Samarinda" },
    city: "Samarinda",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.523, lng: 117.1189 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Jembatan Mahakam urat nadi transportasi menghubungkan Samarinda Seberang melintasi Sungai Mahakam.",
      en: "Mahakam Bridge, vital artery spanning the majestic Mahakam River in East Kalimantan's capital."
    },
    hints: {
      cars: { id: "Truk tronton kayu/batu bara dan mobil plat KT Samarinda.", en: "Heavy industrial coal/timber flatbed trucks with KT license plates." },
      architecture: { id: "Jembatan rangka baja gelagar lengkung merah-putih panjang di atas air keruh.", en: "Long steel truss bridge spanning over one kilometer of muddy freshwater." },
      cultureOrFashion: { id: "Tongkang batu bara ditarik kapal tugboat berbaris rapi di tengah sungai.", en: "Coal barges pulled by diesel tugboats cruising through central river lanes." }
    },
    streetViewOptions: {
      position: { lat: -0.523, lng: 117.1189 },
      pov: { heading: 125, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-38-palangkaraya-kahayan",
    levelNumber: 38,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Kahayan: Ikon Jantung Dayak", en: "Kahayan Bridge: Heart of Central Kalimantan" },
    city: "Palangkaraya",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.2036, lng: 113.9213 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Jembatan Kahayan dengan bentang lengkung baja merah membentang di atas Sungai Kahayan Palangkaraya.",
      en: "Kahayan Bridge with red steel arch span crossing Kahayan River in the planned capital of Palangkaraya."
    },
    hints: {
      cars: { id: "Kendaraan plat KH Kalimantan Tengah dan jalanan kota beraspal lebar lurus.", en: "Central Kalimantan KH plates on famously wide planned city boulevards." },
      architecture: { id: "Busur lengkung baja berwarna merah menyala di tengah bentang jembatan.", en: "Vibrant crimson steel arch structure rising over the broad brown river." },
      cultureOrFashion: { id: "Ukiran tameng talawang dan ornamen Dayak Ngaju menghiasi tiang jembatan.", en: "Traditional Dayak Ngaju talawang shield motifs carved into bridge pylons." }
    },
    streetViewOptions: {
      position: { lat: -2.2036, lng: 113.9213 },
      pov: { heading: 280, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-39-tarakan-mangrove",
    levelNumber: 39,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pesisir Mangrove & Dermaga Tarakan", en: "Mangrove Boardwalk & Port of Tarakan" },
    city: "Tarakan",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 3.3039, lng: 117.5925 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Kawasan konservasi mangrove dan bekantan di pesisir Pulau Tarakan Kalimantan Utara menghadap Laut Sulawesi.",
      en: "Coastal mangrove boardwalk sanctuary in Tarakan island, North Kalimantan facing the Celebes Sea."
    },
    hints: {
      cars: { id: "Mobil angkot pulau dan kendaraan berplat KU Kalimantan Utara.", en: "North Kalimantan KU license plates and island utility vans." },
      architecture: { id: "Jembatan kayu ulin gantung menembus hutan bakau lebat di tepi laut.", en: "Elevated ironwood pedestrian boardwalk weaving through dense mangrove forest." },
      cultureOrFashion: { id: "Koloni monyet bekantan hidung panjang liar melompat di dahan pohon bakau.", en: "Wild proboscis monkeys (bekantan) leaping through sea-apple tree branches." }
    },
    streetViewOptions: {
      position: { lat: 3.3039, lng: 117.5925 },
      pov: { heading: 95, pitch: 3, zoom: 1 }
    }
  },
  {
    id: "indo-40-makassar-pantai-losari",
    levelNumber: 40,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Losari & Benteng Rotterdam", en: "Pantai Losari & Fort Rotterdam Makassar" },
    city: "Makassar",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -5.1477, lng: 119.4078 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Anjungan Pantai Losari ikon Kota Daeng Makassar dengan huruf beton raksasa menghadap matahari terbenam Selat Makassar.",
      en: "Losari Beach waterfront promenade in Makassar, famed gathering point for glorious sunset panoramas."
    },
    hints: {
      cars: { id: "Mobil pete-pete biru (angkot Makassar) dan plat nomor DD Sulawesi Selatan.", en: "Blue pete-pete public minibuses and South Sulawesi DD license plates." },
      architecture: { id: "Huruf beton merah raksasa bertuliskan 'PANTAI LOSARI' di anjungan beton luas.", en: "Colossal red concrete letters on open seaside plaza overlooking harbor waters." },
      cultureOrFashion: { id: "Gerobak penjual pisang epe panggang saus gula merah dan aroma coto makassar.", en: "Grilled pisang epe banana carts with brown palm sugar sauce aroma." }
    },
    streetViewOptions: {
      position: { lat: -5.1477, lng: 119.4078 },
      pov: { heading: 250, pitch: 2, zoom: 1 }
    }
  },
  {
    id: "indo-41-manado-jembatan-soekarno",
    levelNumber: 41,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Soekarno Teluk Manado", en: "Soekarno Bridge: Bay of Manado" },
    city: "Manado",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 1.4939, lng: 124.8407 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Jembatan Soekarno dengan kabel pancang megah melintasi Pelabuhan Manado berlatar Pulau Manado Tua.",
      en: "Soekarno cable-stayed bridge spanning Manado harbor with volcanic Manado Tua island on the horizon."
    },
    hints: {
      cars: { id: "Mikrolet warna biru muda berstiker modifikasi dan plat DB Sulawesi Utara.", en: "Light blue customized mikrolet vans with loud decals and DB plates." },
      architecture: { id: "Pilon jembatan kabel gantung tunggal setinggi 80 meter di bibir teluk laut.", en: "High single cable-stayed concrete pylon rising from rocky harbor entrance." },
      cultureOrFashion: { id: "Warung kuliner tinutuan (bubur manado) dan pemandangan perahu Bunaken.", en: "Tinutuan yellow porridge warungs and dive speedboats bound for Bunaken." }
    },
    streetViewOptions: {
      position: { lat: 1.4939, lng: 124.8407 },
      pov: { heading: 300, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-42-tana-toraja-kete-kesu",
    levelNumber: 42,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Desa Adat Kete Kesu Tongkonan", en: "Kete Kesu Village: Toraja Ancestral Houses" },
    city: "Tana Toraja",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -3.0031, lng: 119.9075 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Desa adat Kete Kesu di Toraja dengan deretan rumah adat Tongkonan beratap lengkung perahu dan lumbung alang.",
      en: "Kete Kesu ancestral village in Toraja, showcase of saddle-shaped tongkonan longhouses."
    },
    hints: {
      cars: { id: "Bus pariwisata Toraja bertingkat dan mobil plat DP Sulawesi Selatan.", en: "South Sulawesi DP vehicle plates and mountain tour coaches." },
      architecture: { id: "Atap bambu melengkung menyerupai haluan perahu dengan tanduk kerbau tersusun di tiang.", en: "Dramatic boat-shaped curved gables decorated with stacked water buffalo horns." },
      cultureOrFashion: { id: "Ukiran kayu geometris pa'ssura empat warna (merah, hitam, kuning, putih).", en: "Traditional four-color sacred pa'ssura wood carvings on house facades." }
    },
    streetViewOptions: {
      position: { lat: -3.0031, lng: 119.9075 },
      pov: { heading: 15, pitch: 6, zoom: 1 }
    }
  },
  {
    id: "indo-43-palu-teluk",
    levelNumber: 43,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pesisir Teluk Palu & Jembatan Kuning", en: "Palu Bay Coastline: Central Sulawesi" },
    city: "Palu",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.8917, lng: 119.8519 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Pesisir Teluk Palu dikelilingi lembah pegunungan terjal di Sulawesi Tengah, lokasi ikonik jembatan lengkung kuning.",
      en: "Sweeping coastline of Palu Bay encircled by towering rift valley mountains in Central Sulawesi."
    },
    hints: {
      cars: { id: "Angkot kuning Palu dan mobil plat DN Sulawesi Tengah.", en: "Central Sulawesi DN license plates and coastal utility vehicles." },
      architecture: { id: "Lengkung jembatan pilon kuning dan tanggul penahan ombak pantai berbatu.", en: "Vibrant yellow bridge arch remnants and stone shoreline sea defenses." },
      cultureOrFashion: { id: "Warung tenda kuliner kaledo (kaki lembu donggala) berkuah asam pedas gurih.", en: "Spicy and sour kaledo beef bone soup warungs along the breeze-swept shore." }
    },
    streetViewOptions: {
      position: { lat: -0.8917, lng: 119.8519 },
      pov: { heading: 340, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-44-kendari-teluk",
    levelNumber: 44,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Teluk Kendari Pesisir Tenggara", en: "Kendari Bay Bridge: Southeast Sulawesi" },
    city: "Kendari",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -3.9782, lng: 122.5693 },
    targetYear: 2017,
    targetDateStr: { id: "Tahun 2017", en: "Year 2017" },
    description: {
      id: "Jembatan Teluk Kendari sepanjang 1,34 kilometer menghubungkan Kota Lama dan Poasia di Sulawesi Tenggara.",
      en: "Kendari Bay Bridge spanning 1.34 kilometers across the bay, connecting the Old Town and Poasia."
    },
    hints: {
      cars: { id: "Angkot kota Kendari dan kendaraan berplat DT Sulawesi Tenggara.", en: "Southeast Sulawesi DT vehicle plates and regional commuter cars." },
      architecture: { id: "Jembatan kabel pancang dengan bentang lengkung bentang laut biru jernih.", en: "Modern cable-stayed highway viaduct soaring across coastal turquoise water." },
      cultureOrFashion: { id: "Aroma kuliner sinonggi sagu khas suku Tolaki di warung makan pesisir.", en: "Traditional Tolaki sinonggi sago specialty restaurants along coastal avenues." }
    },
    streetViewOptions: {
      position: { lat: -3.9782, lng: 122.5693 },
      pov: { heading: 60, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-45-gorontalo-otanaha",
    levelNumber: 45,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Benteng Otanaha & Danau Limboto", en: "Fort Otanaha & Lake Limboto Gorontalo" },
    city: "Gorontalo",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 0.5489, lng: 123.0132 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Benteng Otanaha peninggalan abad ke-16 di puncak bukit Dembe Gorontalo yang direkatkan putih telur burung maleo.",
      en: "16th-century Otanaha fortress on Dembe hill overlooking Lake Limboto in Gorontalo."
    },
    hints: {
      cars: { id: "Bentor (becak motor) khas Gorontalo dan plat nomor DM.", en: "Gorontalo style motorized bentor rickshaws and DM license plates." },
      architecture: { id: "Struktur benteng batu kapur melingkar di atas bukit dengan ratusan anak tangga.", en: "Circular coral-limestone hilltop ramparts approached by hundreds of steps." },
      cultureOrFashion: { id: "Pemandangan air Danau Limboto terbentang luas berlatar pegunungan hijau.", en: "Expansive waters of Lake Limboto framed by dramatic mountain ranges." }
    },
    streetViewOptions: {
      position: { lat: 0.5489, lng: 123.0132 },
      pov: { heading: 170, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-46-ambon-merah-putih",
    levelNumber: 46,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Merah Putih Teluk Ambon", en: "Merah Putih Bridge: Bay of Ambon" },
    city: "Ambon",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -3.6685, lng: 128.1966 },
    targetYear: 2015,
    targetDateStr: { id: "Tahun 2015", en: "Year 2015" },
    description: {
      id: "Jembatan Merah Putih jembatan kabel pancang terpanjang di Indonesia Timur melintasi perairan Teluk Ambon.",
      en: "Merah Putih Bridge, the longest cable-stayed bridge in Eastern Indonesia spanning Ambon Bay."
    },
    hints: {
      cars: { id: "Angkot warna-warni Ambon dengan musik stereo kencang dan plat DE Maluku.", en: "Maluku DE license plates and colorfully painted Ambon musical minibuses." },
      architecture: { id: "Pilon jembatan kabel pancang merah-putih setinggi 89 meter di atas laut dalam.", en: "89-meter-tall cable-stayed pylons spanning across the calm blue bay waters." },
      cultureOrFashion: { id: "Perahu nelayan berlayar di bawah jembatan membawa ikan cakalang segar.", en: "Traditional wooden outrigger boats carrying fresh skipjack tuna." }
    },
    streetViewOptions: {
      position: { lat: -3.6685, lng: 128.1966 },
      pov: { heading: 220, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-47-ternate-benteng-tolukko",
    levelNumber: 47,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Benteng Tolukko & Gunung Gamalama", en: "Fort Tolukko & Mount Gamalama Ternate" },
    city: "Ternate",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 0.8128, lng: 127.3883 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Benteng Tolukko benteng batu karang peninggalan Portugis tahun 1540 di pesisir Ternate berlatar Gunung Gamalama.",
      en: "Fort Tolukko, 1540 Portuguese coral-stone fort on the coast of Ternate framed by Mount Gamalama."
    },
    hints: {
      cars: { id: "Ojek motor pulau dan kendaraan berplat DG Maluku Utara.", en: "North Maluku DG license plates on winding coastal island roads." },
      architecture: { id: "Benteng batu karang hitam berbentuk anak panah menghadap Selat Halmahera.", en: "Arrowhead-shaped black volcanic stone ramparts overlooking clear ocean waters." },
      cultureOrFashion: { id: "Jemuran cengkeh rempah di halaman rumah warga beraroma harum semerbak.", en: "Fragrant cloves laid out drying on woven mats under tropical sunshine." }
    },
    streetViewOptions: {
      position: { lat: 0.8128, lng: 127.3883 },
      pov: { heading: 35, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-48-jayapura-youtefa",
    levelNumber: 48,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Youtefa Teluk Jayapura", en: "Youtefa Bridge: Bay of Jayapura" },
    city: "Jayapura",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.5936, lng: 140.7107 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Jembatan Youtefa dengan dua pelengkung baja merah menyala menghubungkan Kota Jayapura dan Muara Tami.",
      en: "Youtefa Bridge with iconic dual red steel arches spanning Youtefa Bay in Jayapura, Papua."
    },
    hints: {
      cars: { id: "Mobil angkot trayek Abepura-Jayapura dan plat PA Papua.", en: "Papua PA license plate vehicles and 4WD mountain utility wagons." },
      architecture: { id: "Dua lengkung pelangi baja merah menyala sepanjang 732 meter di atas teluk toska.", en: "Twin vibrant red through-arch spans connecting coastal peninsulas." },
      cultureOrFashion: { id: "Hutan bakau teluk yang sakral dan perahu nelayan tradisional Port Numbay.", en: "Sacred indigenous women's mangrove reserve and calm tropical reef waters." }
    },
    streetViewOptions: {
      position: { lat: -2.5936, lng: 140.7107 },
      pov: { heading: 115, pitch: 4, zoom: 1 }
    }
  },
  {
    id: "indo-49-sentani-danau",
    levelNumber: 49,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Danau Sentani & Bukit Tungkuwiri", en: "Lake Sentani & Teletubbies Hills" },
    city: "Sentani",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.5912, lng: 140.4851 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Panorama danau purba Sentani dan hamparan bukit sabana hijau Tungkuwiri di Kabupaten Jayapura Papua.",
      en: "Ancient Lake Sentani and rolling emerald savanna of Tungkuwiri (Teletubbies) hills in Papua."
    },
    hints: {
      cars: { id: "Pikap angkutan pedalaman dan mobil berplat PA Papua.", en: "Rural high-clearance transport trucks bearing Papua PA plates." },
      architecture: { id: "Jalan setapak beton meliuk menaiki punggung bukit sabana hijau.", en: "Scenic wooden viewing pavilions atop rolling green grassland ridges." },
      cultureOrFashion: { id: "Warga lokal menjajakan tas anyaman noken serat kayu dan lukisan kulit kayu.", en: "Indigenous artisan stalls displaying hand-woven noken bark bags." }
    },
    streetViewOptions: {
      position: { lat: -2.5912, lng: 140.4851 },
      pov: { heading: 200, pitch: 5, zoom: 1 }
    }
  },
  {
    id: "indo-50-sorong-raja-ampat",
    levelNumber: 50,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pelabuhan Pesisir Sorong Gerbang Timur", en: "Sorong Coastal Port: Gateway to Raja Ampat" },
    city: "Sorong",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.8761, lng: 131.2558 },
    targetYear: 2016,
    targetDateStr: { id: "Tahun 2016", en: "Year 2016" },
    description: {
      id: "Pesisir dermaga Kota Sorong Papua Barat Daya, pintu gerbang utama dunia bahari kepulauan Raja Ampat.",
      en: "Bustling coastal port of Sorong, Southwest Papua, chief marine gateway to the Raja Ampat islands."
    },
    hints: {
      cars: { id: "Mobil sewaan ekspedisi diving dan kendaraan plat PB Papua Barat Daya.", en: "Diving safari 4x4 minivans and Southwest Papua PB license plates." },
      architecture: { id: "Dermaga feri cepat antarpulau dan kontainer pelabuhan samudra.", en: "Modern inter-island passenger ferry terminals and harbor shipyards." },
      cultureOrFashion: { id: "Wisatawan bahari berkumpul di dermaga bersiap menaiki kapal cepat menuju karang laut.", en: "Snorkelers and divers assembling with gear bags along coastal departure jetties." }
    },
    streetViewOptions: {
      position: { lat: -0.8761, lng: 131.2558 },
      pov: { heading: 270, pitch: 3, zoom: 1 }
    }
  }
];
