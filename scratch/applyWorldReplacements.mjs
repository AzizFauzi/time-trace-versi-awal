import fs from 'fs';

// Complete replacement objects:
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

const chap2Replacements = {
  21: {
    id: "lvl-21-milan-duomo",
    levelNumber: 21,
    regions: ["global", "europe"],
    title: { id: "Duomo di Milano: Mahakarya Marmer Gotik", en: "Milan Duomo: Gothic Marble Cathedral" },
    city: "Milan",
    country: { id: "Italia", en: "Italy" },
    realLocation: { lat: 45.4641, lng: 9.1919 },
    targetYear: 2008,
    targetDateStr: { id: "Oktober 2008", en: "October 2008" },
    description: {
      id: "Piazza del Duomo di Milan menghadap katedral marmer Candoglia berhias 135 menara runcing dan pintu masuk Galleria Vittorio Emanuele II.",
      en: "Piazza del Duomo in Milan facing the Candoglia marble cathedral adorned with 135 spires and the Galleria Vittorio Emanuele II entrance."
    },
    hints: {
      cars: { id: "Trem oranye Peter Witt klasik Milan model tahun 1928.", en: "Classic 1928 Peter Witt orange Milanese trams." },
      architecture: { id: "Fasad katedral gotik marmer putih-merah muda dengan ribuan patung.", en: "Candoglia pink-white marble Gothic facade with thousands of statues." },
      cultureOrFashion: { id: "Warga berbusana setelan jas desainer elegan di ibu kota mode dunia.", en: "Locals wearing sharply tailored designer suits in the fashion capital." }
    },
    streetViewOptions: { position: { lat: 45.4641, lng: 9.1919 }, pov: { heading: 70, pitch: 7, zoom: 1 } }
  },
  22: {
    id: "lvl-22-zurich-bahnhofstrasse",
    levelNumber: 22,
    regions: ["global", "europe"],
    title: { id: "Bahnhofstrasse Zurich: Jantung Finansial Swiss", en: "Bahnhofstrasse Zurich: Financial Heart" },
    city: "Zurich",
    country: { id: "Swiss", en: "Switzerland" },
    realLocation: { lat: 47.3686, lng: 8.5391 },
    targetYear: 2009,
    targetDateStr: { id: "September 2009", en: "September 2009" },
    description: {
      id: "Jalan boulevard belanja paling eksklusif di dunia Bahnhofstrasse Zurich menuju Danau Zurich saat trem biru Tram 2000 melintas tenang.",
      en: "World-famous Bahnhofstrasse shopping boulevard in Zurich toward Lake Zurich as blue Tram 2000 glides past."
    },
    hints: {
      cars: { id: "Trem listrik biru-putih VBZ Tram 2000 khas kota Zurich.", en: "Blue-and-white VBZ Tram 2000 transit electric cars." },
      architecture: { id: "Gedung bank swasta neoklasik abad ke-19 dan butik jam tangan mewah.", en: "19th-century neoclassical private banking mansions and Swiss watchmakers." },
      cultureOrFashion: { id: "Pejalan kaki berjas rapi membawa koper kulit di Paradeplatz.", en: "Financiers carrying leather briefcases through Paradeplatz." }
    },
    streetViewOptions: { position: { lat: 47.3686, lng: 8.5391 }, pov: { heading: 15, pitch: 5, zoom: 1 } }
  },
  23: {
    id: "lvl-23-munich-marienplatz",
    levelNumber: 23,
    regions: ["global", "europe"],
    title: { id: "Marienplatz Munich: Glockenspiel Balai Kota", en: "Marienplatz Munich: Neues Rathaus & Glockenspiel" },
    city: "Munich",
    country: { id: "Jerman", en: "Germany" },
    realLocation: { lat: 48.1374, lng: 11.5755 },
    targetYear: 2010,
    targetDateStr: { id: "November 2010", en: "November 2010" },
    description: {
      id: "Alun-alun Marienplatz di jantung Bavaria Munich menghadap fasad Gotik Neues Rathaus dengan atraksi jam lonceng mekanik Glockenspiel.",
      en: "Marienplatz square in central Munich facing the Gothic Neues Rathaus and its mechanical Glockenspiel clock."
    },
    hints: {
      cars: { id: "Zona pedestrian berbatu granit tanpa kendaraan bermotor.", en: "Cobblestone pedestrian zone strictly devoid of motor vehicles." },
      architecture: { id: "Balai kota Gotik baru Neues Rathaus dengan menara jam 85 meter.", en: "Gothic Revival New Town Hall with its towering 85m belfry." },
      cultureOrFashion: { id: "Wisatawan menengadah menunggu tarian lonceng Glockenspiel berputar.", en: "Spectators gazing up at the animated Glockenspiel bell show." }
    },
    streetViewOptions: { position: { lat: 48.1374, lng: 11.5755 }, pov: { heading: 0, pitch: 8, zoom: 1 } }
  },
  24: {
    id: "lvl-24-oslo-opera-house",
    levelNumber: 24,
    regions: ["global", "europe"],
    title: { id: "Gedung Opera Oslo: Marmer Carrara Tepi Fjord", en: "Oslo Opera House: Fjord Marble Roof" },
    city: "Oslo",
    country: { id: "Norwegia", en: "Norway" },
    realLocation: { lat: 59.9075, lng: 10.7531 },
    targetYear: 2010,
    targetDateStr: { id: "Juli 2010", en: "July 2010" },
    description: {
      id: "Operahuset Oslo rancangan Snøhetta dengan lereng atap marmer putih Carrara yang miring masuk ke dalam air Oslofjord.",
      en: "The Snøhetta-designed Oslo Opera House with sloping white Carrara marble roofs dipping straight into Oslofjord."
    },
    hints: {
      cars: { id: "Mobil listrik awal Think City dan sedan Saab di jalan pelabuhan.", en: "Early Norwegian electric Think City cars and Saab wagons." },
      architecture: { id: "Atap miring marmer putih yang dapat diinjak pejalan kaki hingga ke puncak.", en: "Walkable white Italian marble and granite sloped rooftop." },
      cultureOrFashion: { id: "Warga lokal berjemur menikmati musim panas Skandinavia di tepi air.", en: "Locals soaking up Nordic midnight sun warmth on the waterfront." }
    },
    streetViewOptions: { position: { lat: 59.9075, lng: 10.7531 }, pov: { heading: 140, pitch: 5, zoom: 1 } }
  },
  25: {
    id: "lvl-25-helsinki-senate-square",
    levelNumber: 25,
    regions: ["global", "europe"],
    title: { id: "Senaatintori Helsinki: Katedral Neoklasik Putih", en: "Helsinki Senate Square & White Cathedral" },
    city: "Helsinki",
    country: { id: "Finlandia", en: "Finland" },
    realLocation: { lat: 60.1695, lng: 24.9525 },
    targetYear: 2010,
    targetDateStr: { id: "Juni 2010", en: "June 2010" },
    description: {
      id: "Alun-alun Senaatintori Helsinki dengan Katedral Lutheran putih berkubah hijau rancangan Carl Ludvig Engel.",
      en: "Senate Square Helsinki featuring the neoclassical white Helsinki Cathedral with green domes designed by Carl Ludvig Engel."
    },
    hints: {
      cars: { id: "Trem hijau HKL Valmet Artic dan Volvo estate sedan.", en: "Green-and-yellow HKL city trams and Volvo estates." },
      architecture: { id: "Katedral megah serba putih di atas tangga granit tinggi dan patung Tsar Alexander II.", en: "Pristine white cathedral atop massive granite flight of stairs." },
      cultureOrFashion: { id: "Masyarakat duduk santai di tangga katedral menikmati hari panjang Juni.", en: "Locals lounging on cathedral stairs enjoying long June daylight." }
    },
    streetViewOptions: { position: { lat: 60.1695, lng: 24.9525 }, pov: { heading: 350, pitch: 7, zoom: 1 } }
  },
  26: {
    id: "lvl-26-copenhagen-nyhavn",
    levelNumber: 26,
    regions: ["global", "europe"],
    title: { id: "Nyhavn Kopenhagen: Kanal Rumah Warna-Warni", en: "Nyhavn Copenhagen: Colorful Canal Townhouses" },
    city: "Kopenhagen",
    country: { id: "Denmark", en: "Denmark" },
    realLocation: { lat: 55.6795, lng: 12.5910 },
    targetYear: 2010,
    targetDateStr: { id: "Mei 2010", en: "May 2010" },
    description: {
      id: "Kanal Nyhavn abad ke-17 di Kopenhagen dengan jajaran townhouse kayu warna-warni cerah dan kapal layar kayu bersejarah.",
      en: "17th-century Nyhavn waterfront canal in Copenhagen lined with brightly colored heritage townhouses and wooden sailing ships."
    },
    hints: {
      cars: { id: "Sepeda kota Christiania bike beroda tiga dengan bak kargo depan.", en: "Classic three-wheeled Christiania cargo bikes." },
      architecture: { id: "Deretan townhouse warna kuning kenari, merah bata, dan biru pastel.", en: "Canalside pastel merchant facades from Hans Christian Andersen's era." },
      cultureOrFashion: { id: "Orang-orang duduk di bibir dermaga menikmati bir Carlsberg dingin.", en: "Patrons dangling feet over the canal edge with cold drinks." }
    },
    streetViewOptions: { position: { lat: 55.6795, lng: 12.5910 }, pov: { heading: 75, pitch: 4, zoom: 1 } }
  },
  27: {
    id: "lvl-27-warsaw-old-town",
    levelNumber: 27,
    regions: ["global", "europe"],
    title: { id: "Rynek Starego Miasta: Rekonstruksi Epik Warsawa", en: "Warsaw Old Town Market: Post-War Rebirth" },
    city: "Warsawa",
    country: { id: "Polandia", en: "Poland" },
    realLocation: { lat: 52.2497, lng: 21.0122 },
    targetYear: 2011,
    targetDateStr: { id: "Juni 2011", en: "June 2011" },
    description: {
      id: "Alun-alun Pasar Kota Tua Warsawa (Rynek) yang dibangun kembali dengan cermat pasca Perang Dunia II dengan patung Putri Duyung Syrenka.",
      en: "Warsaw Old Town Market Square meticulously reconstructed post-WWII, anchored by the bronze Syrenka Mermaid monument."
    },
    hints: {
      cars: { id: "Kereta kuda wisata berhias lonceng di sekitar alun-alun pejalan kaki.", en: "Tourist horse carriages navigating paved cobblestone plazas." },
      architecture: { id: "Townhouse Mannerist dan Renaisans dengan lukisan fresko dinding luar sgraffito.", en: "Mannerist tenement houses featuring detailed sgraffito wall paintings." },
      cultureOrFashion: { id: "Pelukis jalanan memajang lukisan minyak panorama panorama Warsawa.", en: "Painters exhibiting oil canvasses of Warsaw streetscapes." }
    },
    streetViewOptions: { position: { lat: 52.2497, lng: 21.0122 }, pov: { heading: 180, pitch: 5, zoom: 1 } }
  },
  28: {
    id: "lvl-28-budapest-parliament",
    levelNumber: 28,
    regions: ["global", "europe"],
    title: { id: "Gedung Parlemen Hungaria: Mahkota Danube", en: "Hungarian Parliament Budapest: Crown of Danube" },
    city: "Budapest",
    country: { id: "Hungaria", en: "Hungary" },
    realLocation: { lat: 47.5072, lng: 19.0456 },
    targetYear: 2011,
    targetDateStr: { id: "Juli 2011", en: "July 2011" },
    description: {
      id: "Gedung Parlemen Gotik Kebangkitan Hungaria di tepi timur Sungai Danube Budapest yang megah dengan kubah Renaissance 96 meter.",
      en: "The Gothic Revival Hungarian Parliament Building on the banks of the Danube in Budapest with its 96m Renaissance dome."
    },
    hints: {
      cars: { id: "Trem kuning Ganz KCSV-7 jalur 2 menyusuri tanggul Danube.", en: "Classic yellow Ganz KCSV-7 Tram Line 2 along the river embankment." },
      architecture: { id: "Ratusan menara runcing batu kapur putih dan atap kubah merah megah.", en: "Hundreds of limestone spires and the towering central red dome." },
      cultureOrFashion: { id: "Kapal pesiar wisata sungai Danube melintas membawa bendera Hungaria.", en: "Danube sightseeing cruise boats waving Hungarian tricolor flags." }
    },
    streetViewOptions: { position: { lat: 47.5072, lng: 19.0456 }, pov: { heading: 60, pitch: 6, zoom: 1 } }
  },
  29: {
    id: "lvl-29-reykjavik-hallgrimskirkja",
    levelNumber: 29,
    regions: ["global", "europe"],
    title: { id: "Hallgrímskirkja Reykjavik: Kolom Basal Vulkanik", en: "Hallgrímskirkja Reykjavik: Basalt Column Spire" },
    city: "Reykjavik",
    country: { id: "Islandia", en: "Iceland" },
    realLocation: { lat: 64.1417, lng: -21.9266 },
    targetYear: 2013,
    targetDateStr: { id: "Agustus 2013", en: "August 2013" },
    description: {
      id: "Gereja ekspresionis Hallgrímskirkja setinggi 74,5 meter di Reykjavik yang arsitekturnya meniru formasi batuan basal vulkanik Islandia.",
      en: "The 74.5-meter expressionist Hallgrímskirkja church in Reykjavik inspired by Iceland's natural volcanic basalt columns."
    },
    hints: {
      cars: { id: "Mobil SUV 4x4 ban besar 'Super Jeep' modifikasi salju.", en: "Lifted 4x4 Super Jeeps built for glacier highland driving." },
      architecture: { id: "Fasad beton bertingkat menyerupai kolom batu lava heksagonal.", en: "Stepped concrete wings mimicking cooling hexagonal lava flows." },
      cultureOrFashion: { id: "Patung penjelajah Viking Leif Erikson dan sweater wol rajut Lopapeysa.", en: "Leif Erikson bronze statue and tourists in wool Lopapeysa sweaters." }
    },
    streetViewOptions: { position: { lat: 64.1417, lng: -21.9266 }, pov: { heading: 110, pitch: 7, zoom: 1 } }
  },
  30: {
    id: "lvl-30-montreal-notre-dame",
    levelNumber: 30,
    regions: ["global", "americas"],
    title: { id: "Vieux-Montréal & Basilika Notre-Dame", en: "Old Montreal & Notre-Dame Basilica" },
    city: "Montreal",
    country: { id: "Kanada", en: "Canada" },
    realLocation: { lat: 45.5048, lng: -73.5560 },
    targetYear: 2009,
    targetDateStr: { id: "Juli 2009", en: "July 2009" },
    description: {
      id: "Place d'Armes di Montreal Lama menghadap menara kembar Gotik Basilika Notre-Dame dengan arsitektur warisan Prancis di Quebec.",
      en: "Place d'Armes in Old Montreal facing the twin Gothic spires of Notre-Dame Basilica amidst historic Quebec French architecture."
    },
    hints: {
      cars: { id: "Taksi sedan Chevrolet Impala dan kereta kuda calèche.", en: "Chevrolet Impala taxis and classic tourist horse calèches." },
      architecture: { id: "Basilika Gotik megah batu kapur abu-abu dengan patung perunggu di fasad.", en: "Grey limestone Gothic Revival basilica with deep blue interior glow." },
      cultureOrFashion: { id: "Plang toko bilingual Prancis-Inggris khas Quebec.", en: "Bilingual French-first street signs and cobblestone alley cafes." }
    },
    streetViewOptions: { position: { lat: 45.5048, lng: -73.5560 }, pov: { heading: 210, pitch: 6, zoom: 1 } }
  },
  31: {
    id: "lvl-31-vancouver-gastown",
    levelNumber: 31,
    regions: ["global", "americas"],
    title: { id: "Gastown Steam Clock: Jam Uap Kuno Vancouver", en: "Gastown Steam Clock Vancouver" },
    city: "Vancouver",
    country: { id: "Kanada", en: "Canada" },
    realLocation: { lat: 49.2844, lng: -123.1089 },
    targetYear: 2009,
    targetDateStr: { id: "April 2009", en: "April 2009" },
    description: {
      id: "Sudut Water Street di Gastown Vancouver tempat Jam Uap Gastown meniupkan uap panas dan memainkan bunyi lonceng Westminster setiap 15 menit.",
      en: "Water Street in historic Gastown Vancouver where the iconic 1977 Steam Clock whistles steam and chimes every quarter hour."
    },
    hints: {
      cars: { id: "Bus listrik troli Vancouver New Flyer putih-biru TransLink.", en: "Electric TransLink trolley buses connected to overhead wires." },
      architecture: { id: "Tiang jam besi perunggu antik mengeluarkan asap uap putih dari corong atas.", en: "Antique bronze steam clock puffing plumes of white steam." },
      cultureOrFashion: { id: "Tiang lampu jalanan besi tempa berhias keranjang bunga gantung.", en: "Victorian lampposts with blooming summer flower baskets." }
    },
    streetViewOptions: { position: { lat: 49.2844, lng: -123.1089 }, pov: { heading: 240, pitch: 5, zoom: 1 } }
  },
  32: {
    id: "lvl-32-washington-lincoln-memorial",
    levelNumber: 32,
    regions: ["global", "americas"],
    title: { id: "Lincoln Memorial: Kolam Refleksi National Mall", en: "Lincoln Memorial & Reflecting Pool Washington D.C." },
    city: "Washington D.C.",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 38.8893, lng: -77.0502 },
    targetYear: 2008,
    targetDateStr: { id: "Agustus 2008", en: "August 2008" },
    description: {
      id: "Tangga marmer Lincoln Memorial menghadap Kolam Refleksi dan Monumen Washington di National Mall ibu kota Amerika Serikat.",
      en: "Lincoln Memorial steps overlooking the Reflecting Pool and the Washington Monument obelisk on the National Mall."
    },
    hints: {
      cars: { id: "Mobil dinas polisi federal Ford Crown Victoria Police Interceptor.", en: "Ford Crown Victoria Police Interceptors parked on perimeter drives." },
      architecture: { id: "Kuil marmer Yundani bergaya Doria dengan 36 pilar marmer Yule raksasa.", en: "Neoclassical Doric temple with 36 fluted marble columns." },
      cultureOrFashion: { id: "Keluarga mengenakan kausal patriotik dan topi baseball bintang garis.", en: "Tourists wearing stars-and-stripes baseball caps on the mall." }
    },
    streetViewOptions: { position: { lat: 38.8893, lng: -77.0502 }, pov: { heading: 90, pitch: 4, zoom: 1 } }
  },
  33: {
    id: "lvl-33-boston-quincy-market",
    levelNumber: 33,
    regions: ["global", "americas"],
    title: { id: "Quincy Market & Faneuil Hall: Jalur Kemerdekaan Boston", en: "Quincy Market & Faneuil Hall Boston" },
    city: "Boston",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 42.3601, lng: -71.0544 },
    targetYear: 2008,
    targetDateStr: { id: "September 2008", en: "September 2008" },
    description: {
      id: "Pasar bersejarah Quincy Market di Boston di sepanjang Freedom Trail dengan pilar granit Yunani dan kubah tembaga Faneuil Hall.",
      en: "Historic Quincy Market in Boston along the Freedom Trail, with Doric granite colonnades and Faneuil Hall copper cupola."
    },
    hints: {
      cars: { id: "Taksi sedan Boston kuning dan kendaraan amfibi Boston Duck Tour.", en: "Yellow Boston taxis and amphibious Boston Duck Tour vehicles." },
      architecture: { id: "Bangunan pasar granit neoklasik panjang dengan kanopi kaca dan kubah tengah.", en: "Long granite Greek Revival market halls flank the cobblestone concourse." },
      cultureOrFashion: { id: "Pengunjung mengantre semangkuk sup krim kerang New England clam chowder.", en: "Crowds lining up for warm New England clam chowder in bread bowls." }
    },
    streetViewOptions: { position: { lat: 42.3601, lng: -71.0544 }, pov: { heading: 70, pitch: 4, zoom: 1 } }
  },
  34: {
    id: "lvl-34-melbourne-flinders-street",
    levelNumber: 34,
    regions: ["global"],
    title: { id: "Flinders Street Station: Jam Ikonik Melbourne", en: "Flinders Street Station Melbourne" },
    city: "Melbourne",
    country: { id: "Australia", en: "Australia" },
    realLocation: { lat: -37.8180, lng: 144.9671 },
    targetYear: 2010,
    targetDateStr: { id: "Maret 2010", en: "March 2010" },
    description: {
      id: "Simpang jalan Flinders dan Swanston di Melbourne menghadap fasad kuning keemasan stasiun kereta bersejarah Flinders Street Station.",
      en: "Intersection of Flinders and Swanston Streets in Melbourne facing the iconic yellow Edwardian Flinders Street railway station."
    },
    hints: {
      cars: { id: "Trem hijau-kuning W-Class heritage dan trem modern Yarra Trams.", en: "Green heritage W-Class trams and sleek modern Yarra Trams." },
      architecture: { id: "Kubah tembaga hijau dan deretan jam analog penunjuk jadwal kereta di pintu utama.", en: "Copper dome and the famous row of analog departure clocks under the arch." },
      cultureOrFashion: { id: "Warga berkumpul di bawah deretan jam stasiun ('Under the clocks').", en: "Locals meeting 'under the clocks' outside the main entrance." }
    },
    streetViewOptions: { position: { lat: -37.8180, lng: 144.9671 }, pov: { heading: 240, pitch: 5, zoom: 1 } }
  },
  35: {
    id: "lvl-35-edinburgh-royal-mile",
    levelNumber: 35,
    regions: ["global", "europe"],
    title: { id: "Royal Mile & Kastel Edinburgh: Batuan Vulkanik Kuno", en: "Royal Mile & Edinburgh Castle" },
    city: "Edinburgh",
    country: { id: "Skotlandia", en: "United Kingdom" },
    realLocation: { lat: 55.9486, lng: -3.1999 },
    targetYear: 2009,
    targetDateStr: { id: "Juli 2009", en: "July 2009" },
    description: {
      id: "Jalan berbatu Royal Mile di Edinburgh menanjak menuju benteng megah Kastel Edinburgh di atas tebing batu Castle Rock.",
      en: "Cobblestone Royal Mile in Edinburgh sloping upward to the imposing fortress of Edinburgh Castle atop Castle Rock."
    },
    hints: {
      cars: { id: "Taksi hitam London TX4 dan bus tingkat merah Lothian Buses.", en: "Black TX4 Hackney carriages and maroon Lothian double-deckers." },
      architecture: { id: "Dinding batu benteng abad pertengahan menjulang di atas tebing batu basal gelap.", en: "Medieval stone battlements looming high atop volcanic crag." },
      cultureOrFashion: { id: "Pemain bagpipe Skotlandia mengenakan kilt wol tartan tradisional.", en: "Bagpipers busking in full traditional tartan kilt regalia." }
    },
    streetViewOptions: { position: { lat: 55.9486, lng: -3.1999 }, pov: { heading: 270, pitch: 6, zoom: 1 } }
  }
};

const chap4Replacements = {
  61: {
    id: "lvl-61-nara-todaiji",
    levelNumber: 61,
    regions: ["global", "asia"],
    title: { id: "Kuil Todai-ji Nara: Aula Kayu Terbesar di Dunia", en: "Todai-ji Temple & Nara Deer Park" },
    city: "Nara",
    country: { id: "Jepang", en: "Japan" },
    realLocation: { lat: 34.6851, lng: 135.8050 },
    targetYear: 2010,
    targetDateStr: { id: "Oktober 2010", en: "October 2010" },
    description: {
      id: "Jalan setapak Kuil Todai-ji di Nara saat rusa shika liar jinak berkeliaran di antara wisatawan menuju Aula Daibutsuden.",
      en: "Path to Todai-ji Temple in Nara as friendly sacred shika deer mingle with visitors heading toward the Great Buddha Hall."
    },
    hints: {
      cars: { id: "Jalur pejalan kaki batu kuil bebas kendaraan bermotor.", en: "Paved temple grounds path free from automobile traffic." },
      architecture: { id: "Gerbang kayu raksasa Nandaimon abad ke-12 dengan pilar kayu utuh.", en: "Towering 12th-century wooden Nandaimon gate with massive timber pillars." },
      cultureOrFashion: { id: "Rusa shika membungkuk meminta biskuit shika-senbei dari wisatawan.", en: "Shika deer bowing politely to visitors offering rice crackers." }
    },
    streetViewOptions: { position: { lat: 34.6851, lng: 135.8050 }, pov: { heading: 10, pitch: 6, zoom: 1 } }
  },
  62: {
    id: "lvl-62-sapporo-odori-park",
    levelNumber: 62,
    regions: ["global", "asia"],
    title: { id: "Taman Odori & Menara TV Sapporo: Pulau Hokkaido", en: "Odori Park & Sapporo TV Tower" },
    city: "Sapporo",
    country: { id: "Jepang", en: "Japan" },
    realLocation: { lat: 43.0605, lng: 141.3544 },
    targetYear: 2011,
    targetDateStr: { id: "Juli 2011", en: "July 2011" },
    description: {
      id: "Taman hijau memanjang Odori Park di Sapporo Hokkaido menghadap Menara TV Sapporo merah-putih dengan jam digital raksasa.",
      en: "Lush elongated Odori Park in Sapporo Hokkaido facing the red-and-white Sapporo TV Tower with digital clock."
    },
    hints: {
      cars: { id: "Taksi Toyota Crown Comfort hijau Hokkaido dan mobil minivan kei-car.", en: "Green Hokkaido Toyota Comfort taxis and micro kei vans." },
      architecture: { id: "Menara kisi baja kisi merah setinggi 147 meter dengan jam digital Panasonic.", en: "147-meter red steel lattice tower with glowing digital clock faces." },
      cultureOrFashion: { id: "Warga menikmati jagung bakar mentega manis Hokkaido di bangku taman.", en: "Locals savoring grilled Hokkaido sweet corn at park benches." }
    },
    streetViewOptions: { position: { lat: 43.0605, lng: 141.3544 }, pov: { heading: 90, pitch: 5, zoom: 1 } }
  },
  63: {
    id: "lvl-63-incheon-songdo",
    levelNumber: 63,
    regions: ["global", "asia"],
    title: { id: "Songdo Central Park: Kota Pintar Reklamasi Masa Depan", en: "Songdo Central Park Incheon: Smart Eco City" },
    city: "Incheon",
    country: { id: "Korea Selatan", en: "South Korea" },
    realLocation: { lat: 37.3925, lng: 126.6394 },
    targetYear: 2012,
    targetDateStr: { id: "Oktober 2012", en: "October 2012" },
    description: {
      id: "Danau air laut buatan di Songdo Central Park Incheon dikelilingi gedung futuristik Tri-bowl dan pencakar langit ramah lingkungan.",
      en: "Seawater canal in Songdo Central Park Incheon framed by curved Tri-bowl architecture and sustainable eco-skyscrapers."
    },
    hints: {
      cars: { id: "Hyundai Sonata YF dan Kia K5 sedan putih khas armada Korea.", en: "YF Sonata and Kia K5 sedans cruising wide boulevards." },
      architecture: { id: "Pusat seni Tri-bowl berbentuk tiga mangkuk terbalik di atas cermin air.", en: "Curvilinear Tri-bowl arts pavilion floating above reflecting pools." },
      cultureOrFashion: { id: "Perahu taksi air bertenaga surya melintasi kanal air laut.", en: "Solar-assisted water taxis cruising along the seawater waterway." }
    },
    streetViewOptions: { position: { lat: 37.3925, lng: 126.6394 }, pov: { heading: 220, pitch: 4, zoom: 1 } }
  },
  64: {
    id: "lvl-64-doha-souq-waqif",
    levelNumber: 64,
    regions: ["global"],
    title: { id: "Souq Waqif Doha: Pasar Tradisional Negeri Gurun", en: "Souq Waqif Doha: Traditional Mud-Brick Bazaar" },
    city: "Doha",
    country: { id: "Qatar", en: "Qatar" },
    realLocation: { lat: 25.2867, lng: 51.5333 },
    targetYear: 2014,
    targetDateStr: { id: "November 2014", en: "November 2014" },
    description: {
      id: "Lorong batu kapur dan kayu gelondongan Souq Waqif di Doha Qatar tempat pedagang rempah, burung elang falcon, dan mutiara teluk.",
      en: "Limestone and timber alleys of Souq Waqif in Doha Qatar with spice merchants, falconry markets, and Arabian horses."
    },
    hints: {
      cars: { id: "Mobil patroli polisi berkuda dan SUV Toyota Land Cruiser putih.", en: "Mounted police on Arabian horses and white Toyota Land Cruisers." },
      architecture: { id: "Bangunan dinding lumpur plester krem dengan balok kayu mangrove menonjol.", en: "Traditional mud-rendered walls with exposed mangrove wood roof beams." },
      cultureOrFashion: { id: "Pria mengenakan gamis thobe putih bersih dan kain penutup kepala ghutra.", en: "Men in crisp white thobes and ghutra headdresses sipping mint tea." }
    },
    streetViewOptions: { position: { lat: 25.2867, lng: 51.5333 }, pov: { heading: 310, pitch: 4, zoom: 1 } }
  },
  65: {
    id: "lvl-65-abu-dhabi-sheikh-zayed",
    levelNumber: 65,
    regions: ["global"],
    title: { id: "Masjid Agung Sheikh Zayed: Marmer Putih Sivec", en: "Sheikh Zayed Grand Mosque Abu Dhabi" },
    city: "Abu Dhabi",
    country: { id: "Uni Emirat Arab", en: "United Arab Emirates" },
    realLocation: { lat: 24.4128, lng: 54.4750 },
    targetYear: 2014,
    targetDateStr: { id: "Mei 2014", en: "May 2014" },
    description: {
      id: "Pelataran luas Masjid Agung Sheikh Zayed di Abu Dhabi dengan 82 kubah marmer putih murni, 4 menara setinggi 107 meter, dan kolam cermin.",
      en: "The immense courtyard of Sheikh Zayed Grand Mosque in Abu Dhabi with 82 pristine white marble domes and reflective pools."
    },
    hints: {
      cars: { id: "Mobil buggy golf listrik putih pengangkut jemaah di pelataran luas.", en: "Electric white golf buggies ferrying visitors across the vast apron." },
      architecture: { id: "Lantai marmer putih berhias mozaik motif bunga lapis lazuli dan emas 24 karat.", en: "Intricate floral stone inlays on white Macedonian Sivec marble." },
      cultureOrFashion: { id: "Pengunjung mengenakan jubah abaya hitam dan kain penutup kepala.", en: "Visitors in dark flowing abayas admiring the architectural symmetry." }
    },
    streetViewOptions: { position: { lat: 24.4128, lng: 54.4750 }, pov: { heading: 160, pitch: 6, zoom: 1 } }
  },
  66: {
    id: "lvl-66-muscat-mutrah-corniche",
    levelNumber: 66,
    regions: ["global"],
    title: { id: "Mutrah Corniche: Teluk Berbatu Kesultanan Oman", en: "Mutrah Corniche Muscat: Arabian Gulf Harbour" },
    city: "Muscat",
    country: { id: "Oman", en: "Oman" },
    realLocation: { lat: 23.6190, lng: 58.5630 },
    targetYear: 2015,
    targetDateStr: { id: "Januari 2015", en: "January 2015" },
    description: {
      id: "Tepi laut Mutrah Corniche di Muscat Oman menghadap kapal dhow kayu tradisional, benteng tebing berbatu, dan kubah biru Souq Mutrah.",
      en: "Mutrah Corniche in Muscat Oman fronting traditional wooden dhows, craggy coastal forts, and the azure domes of Mutrah Souq."
    },
    hints: {
      cars: { id: "Taksi sedan Toyota Corolla putih-oranye khas Kesultanan Oman.", en: "White-and-orange Toyota Corolla taxis unique to Oman." },
      architecture: { id: "Rumah-rumah bercat putih dengan kisi jendela kayu mushrabiya di kaki tebing.", en: "White-painted Arabian coastal homes framed by dramatic jagged peaks." },
      cultureOrFashion: { id: "Warga lokal mengenakan dishdasha dan topi rajut kumma bermotif.", en: "Omani men wearing collarless dishdashas and embroidered kumma caps." }
    },
    streetViewOptions: { position: { lat: 23.6190, lng: 58.5630 }, pov: { heading: 320, pitch: 4, zoom: 1 } }
  },
  67: {
    id: "lvl-67-marrakech-jemaa-el-fnaa",
    levelNumber: 67,
    regions: ["global"],
    title: { id: "Jemaa el-Fnaa: Teater Terbuka Terbesar Afrika Utara", en: "Jemaa el-Fnaa Marrakech: Heart of Morocco" },
    city: "Marrakech",
    country: { id: "Maroko", en: "Morocco" },
    realLocation: { lat: 31.6258, lng: -7.9891 },
    targetYear: 2015,
    targetDateStr: { id: "Maret 2015", en: "March 2015" },
    description: {
      id: "Alun-alun legendaris Jemaa el-Fnaa di Marrakech Maroko dipenuhi gerobak jus jeruk segar, peniup seruling ular, dan menara Masjid Koutoubia.",
      en: "Legendary Jemaa el-Fnaa square in Marrakech Morocco brimming with orange juice carts, storytellers, and Koutoubia Minaret."
    },
    hints: {
      cars: { id: "Kereta kuda caleche roda kuning dan motor moped Peugeot tua.", en: "Yellow-wheeled caleche carriages and vintage Peugeot mopeds." },
      architecture: { id: "Dinding kota tanah liat merah 'Kota Merah' dan menara batu Koutoubia.", en: "Ochre-red clay walls that give Marrakech its 'Red City' moniker." },
      cultureOrFashion: { id: "Pedagang memakai jubah djellaba berpenutup kepala runcing.", en: "Vendors donning hooded woolen djellabas serving fresh mint tea." }
    },
    streetViewOptions: { position: { lat: 31.6258, lng: -7.9891 }, pov: { heading: 250, pitch: 5, zoom: 1 } }
  },
  68: {
    id: "lvl-68-casablanca-hassan-ii",
    levelNumber: 68,
    regions: ["global"],
    title: { id: "Masjid Hassan II Casablanca: Menara 210 Meter Tepi Samudra", en: "Hassan II Mosque Casablanca: Atlantic Minaret" },
    city: "Casablanca",
    country: { id: "Maroko", en: "Morocco" },
    realLocation: { lat: 33.6086, lng: -7.6328 },
    targetYear: 2015,
    targetDateStr: { id: "April 2015", en: "April 2015" },
    description: {
      id: "Masjid megah Hassan II di Casablanca Maroko yang menjorok langsung ke atas ombak Samudra Atlantik dengan menara tertinggi di Afrika Utara.",
      en: "The colossal Hassan II Mosque in Casablanca perched directly over the Atlantic Ocean swells with a 210m laser-guided minaret."
    },
    hints: {
      cars: { id: "Taksi kecil 'Petit Taxi' Peugeot 205 warna merah tua khas Casablanca.", en: "Iconic scarlet-red Peugeot 205 and Dacia 'Petit Taxis'." },
      architecture: { id: "Menara marmer persegi 210 meter berhias ubin keramik hijau zellij.", en: "210-meter square minaret adorned with green glazed tilework." },
      cultureOrFashion: { id: "Suara deburan ombak Atlantik menghantam fondasi marmer masjid.", en: "Atlantic waves breaking against the foundation platforms." }
    },
    streetViewOptions: { position: { lat: 33.6086, lng: -7.6328 }, pov: { heading: 340, pitch: 7, zoom: 1 } }
  },
  69: {
    id: "lvl-69-brisbane-south-bank",
    levelNumber: 69,
    regions: ["global"],
    title: { id: "South Bank Brisbane: Pantai Buatan di Tengah Kota", en: "South Bank Parklands Brisbane: Urban Beach Lagoon" },
    city: "Brisbane",
    country: { id: "Australia", en: "Australia" },
    realLocation: { lat: -27.4753, lng: 153.0205 },
    targetYear: 2010,
    targetDateStr: { id: "Mei 2010", en: "May 2010" },
    description: {
      id: "Kawasan tepi Sungai Brisbane di South Bank dengan kolam laguna pasir putih Streets Beach dan bianglala Wheel of Brisbane.",
      en: "Brisbane River South Bank featuring the human-made Streets Beach white lagoon and the giant Wheel of Brisbane."
    },
    hints: {
      cars: { id: "Kapal feri katamaran CityCat warna biru meluncur kencang di sungai.", en: "Blue CityCat high-speed river catamarans carving through the river." },
      architecture: { id: "Bianglala raksasa putih 60 meter dan kanopi lengkung baja berhias bugenvil.", en: "60-meter white Ferris wheel and bougainvillea-covered arbour." },
      cultureOrFashion: { id: "Warga berenang di pantai berpasir tepat di depan pencakar langit.", en: "Swimmers relaxing on white sands right across from high-rise towers." }
    },
    streetViewOptions: { position: { lat: -27.4753, lng: 153.0205 }, pov: { heading: 30, pitch: 5, zoom: 1 } }
  },
  70: {
    id: "lvl-70-kyoto-arashiyama-bamboo",
    levelNumber: 70,
    regions: ["global", "asia"],
    title: { id: "Hutan Bambu Arashiyama & Sagano: Gemerisik Angin Hijau", en: "Arashiyama Bamboo Grove Kyoto" },
    city: "Kyoto",
    country: { id: "Jepang", en: "Japan" },
    realLocation: { lat: 35.0169, lng: 135.6713 },
    targetYear: 2012,
    targetDateStr: { id: "April 2012", en: "April 2012" },
    description: {
      id: "Lorong hutan bambu raksasa Arashiyama di barat Kyoto saat sinar matahari menembus batang bambu hijau yang menjulang ke langit.",
      en: "The towering green Arashiyama Bamboo Grove in western Kyoto as sunlight filters through soaring bamboo stalks."
    },
    hints: {
      cars: { id: "Becak tarik tradisional jinrikisha ditarik pemuda berkaos kaki tabi.", en: "Traditional human-drawn jinrikisha rickshaws." },
      architecture: { id: "Pagar anyaman bambu alami komi-gaki di kedua sisi jalan setapak.", en: "Intricate dry bamboo fencing lining both sides of the narrow path." },
      cultureOrFashion: { id: "Wisatawan mengenakan pakaian yukata dan sandal kayu geta.", en: "Visitors dressed in colorful seasonal yukata robes and geta clogs." }
    },
    streetViewOptions: { position: { lat: 35.0169, lng: 135.6713 }, pov: { heading: 280, pitch: 6, zoom: 1 } }
  }
};

const chap5Replacements = {
  82: {
    id: "lvl-82-beijing-forbidden-city",
    levelNumber: 82,
    regions: ["global", "asia"],
    title: { id: "Kota Terlarang Beijing: Gerbang Tiananmen & Dinasti Abadi", en: "Forbidden City & Tiananmen Gate Beijing" },
    city: "Beijing",
    country: { id: "Tiongkok", en: "China" },
    realLocation: { lat: 39.9055, lng: 116.3976 },
    targetYear: 2011,
    targetDateStr: { id: "Oktober 2011", en: "October 2011" },
    description: {
      id: "Gerbang Selatan Tiananmen menuju Kota Terlarang di Beijing dengan dinding merah bata, atap genteng kuning kekaisaran, dan potret raksasa bersejarah.",
      en: "Tiananmen Gate approaching the Forbidden City in Beijing with its crimson bastion walls and imperial glazed yellow roof tiles."
    },
    hints: {
      cars: { id: "Taksi sedan Hyundai Elantra hijau-kuning khas Beijing.", en: "Green-and-yellow Hyundai Elantra Beijing taxi sedans." },
      architecture: { id: "Gerbang istana kayu kekaisaran Tiongkok dengan jembatan batu marmer putih Jinshui.", en: "Imperial palace wooden gatehouse flanked by white marble Jinshui bridges." },
      cultureOrFashion: { id: "Kerumunan turis domestik membawa bendera pemandu wisata kecil.", en: "Tour groups following guides with numbered pennants." }
    },
    streetViewOptions: { position: { lat: 39.9055, lng: 116.3976 }, pov: { heading: 0, pitch: 5, zoom: 1 } }
  },
  87: {
    id: "lvl-87-frankfurt-romerberg",
    levelNumber: 87,
    regions: ["global", "europe"],
    title: { id: "Römerberg Frankfurt: Alun-Alun Kayu & Pencakar Langit Main", en: "Römerberg Frankfurt: Half-Timber Plaza & Skyline" },
    city: "Frankfurt",
    country: { id: "Jerman", en: "Germany" },
    realLocation: { lat: 50.1109, lng: 8.6821 },
    targetYear: 2008,
    targetDateStr: { id: "Juli 2008", en: "July 2008" },
    description: {
      id: "Alun-alun bersejarah Römerberg di Frankfurt dengan rumah kayu bertingkat Fachwerk abad pertengahan berlatar pencakar langit modern 'Mainhattan'.",
      en: "Historic Römerberg square in Frankfurt with half-timbered merchant facades contrasted against 'Mainhattan' bank towers."
    },
    hints: {
      cars: { id: "Mobil sedan Opel Vectra dan Volkswagen Golf generasi ke-4.", en: "Classic German Opel Vectra and Golf Mk4 hatchbacks." },
      architecture: { id: "Balai kota kuno Römer dengan fasad tiga atap pelana bertingkat gabled.", en: "The iconic tripartite gabled facade of the Römer city hall." },
      cultureOrFashion: { id: "Air Mancur Keadilan Gerechtigkeitsbrunnen dan cangkir jus apel Apfelwein.", en: "Statue of Justitia and outdoor tavern patrons drinking Apfelwein." }
    },
    streetViewOptions: { position: { lat: 50.1109, lng: 8.6821 }, pov: { heading: 290, pitch: 5, zoom: 1 } }
  },
  88: {
    id: "lvl-88-sao-paulo-paulista",
    levelNumber: 88,
    regions: ["global", "americas"],
    title: { id: "Avenida Paulista & Museum Seni MASP: Megapolitan Amerika Latin", en: "Avenida Paulista & MASP Sao Paulo" },
    city: "Sao Paulo",
    country: { id: "Brasil", en: "Brazil" },
    realLocation: { lat: -23.5615, lng: -46.6559 },
    targetYear: 2012,
    targetDateStr: { id: "Agustus 2012", en: "August 2012" },
    description: {
      id: "Jantung finansial Amerika Latin di Avenida Paulista Sao Paulo dengan Museum Seni Modern MASP ditopang empat balok beton merah melayang.",
      en: "Latin America's financial pulse along Avenida Paulista in Sao Paulo featuring MASP suspended on four red concrete pillars."
    },
    hints: {
      cars: { id: "Bus kota gandeng kuning SPTrans dan mobil Fiat Uno kotak.", en: "Yellow SPTrans articulated city buses and classic boxy Fiat Unos." },
      architecture: { id: "Gedung museum brutalist MASP karya Lina Bo Bardi melayang bebas di atas plaza.", en: "Brutalist glass box of MASP floating above the open public esplanade." },
      cultureOrFashion: { id: "Seniman jalanan dan kerumunan pekerja kantoran berbusana santai.", en: "Street vendors, musicians, and bustling urban crowds." }
    },
    streetViewOptions: { position: { lat: -23.5615, lng: -46.6559 }, pov: { heading: 40, pitch: 5, zoom: 1 } }
  },
  89: {
    id: "lvl-89-bogota-plaza-bolivar",
    levelNumber: 89,
    regions: ["global", "americas"],
    title: { id: "Plaza de Bolívar Bogota: Jantung Pegunungan Andes", en: "Plaza de Bolívar Bogota: Andean Capital Square" },
    city: "Bogota",
    country: { id: "Kolombia", en: "Colombia" },
    realLocation: { lat: 4.5981, lng: -74.0760 },
    targetYear: 2013,
    targetDateStr: { id: "September 2013", en: "September 2013" },
    description: {
      id: "Plaza de Bolívar di ketinggian 2.600 meter di Bogota Kolombia menghadap Katedral Primada dengan latar tebing hijau Monserrate.",
      en: "Plaza de Bolívar at 2,600m elevation in Bogota Colombia facing the Primatial Cathedral against Mount Monserrate."
    },
    hints: {
      cars: { id: "Bus TransMilenio merah gandeng di koridor jalan raya Carrera 10.", en: "Red articulated TransMilenio BRT buses on nearby avenues." },
      architecture: { id: "Katedral batu kapur neoklasik beratap kembar dan Istana Kehakiman.", en: "Neoclassical cathedral and the Palace of Justice framing the stone plaza." },
      cultureOrFashion: { id: "Ribuan merpati beterbangan diberi makan oleh keluarga berjaket tebal pegunungan.", en: "Thousands of pigeons flocking around families in Andean wool jackets." }
    },
    streetViewOptions: { position: { lat: 4.5981, lng: -74.0760 }, pov: { heading: 90, pitch: 5, zoom: 1 } }
  },
  94: {
    id: "lvl-94-rotterdam-erasmus-bridge",
    levelNumber: 94,
    regions: ["global", "europe"],
    title: { id: "Jembatan Erasmus 'Sang Angsa': Pelabuhan Terbesar Eropa", en: "Erasmus Bridge 'The Swan' Rotterdam" },
    city: "Rotterdam",
    country: { id: "Belanda", en: "Netherlands" },
    realLocation: { lat: 51.9090, lng: 4.4870 },
    targetYear: 2009,
    targetDateStr: { id: "September 2009", en: "September 2009" },
    description: {
      id: "Jembatan gantung kabel Erasmusbrug setinggi 139 meter di Rotterdam melintasi Sungai Nieuwe Maas menghubungkan distrik pelabuhan futuristik.",
      en: "The 139-meter cable-stayed Erasmus Bridge nicknamed 'The Swan' spanning the Nieuwe Maas river in Rotterdam."
    },
    hints: {
      cars: { id: "Trem RET abu-abu perak melintas di lajur tengah jembatan.", en: "Silver RET city trams crossing the bridge's dedicated central tracks." },
      architecture: { id: "Tiang pylon tunggal asimetris warna putih menjulang berbentuk leher angsa.", en: "Iconic white asymmetric pylon towering 139 meters skyward." },
      cultureOrFashion: { id: "Kapal tongkang kargo sungai kontainer melaju tenang di bawah bentang jembatan.", en: "Inland container cargo barges cruising toward Rotterdam Europort." }
    },
    streetViewOptions: { position: { lat: 51.9090, lng: 4.4870 }, pov: { heading: 170, pitch: 6, zoom: 1 } }
  },
  99: {
    id: "lvl-99-geneva-jet-deau",
    levelNumber: 99,
    regions: ["global", "europe"],
    title: { id: "Jet d'Eau Jenewa: Air Mancur 140 Meter Danau Jenewa", en: "Jet d'Eau Geneva: 140m Fountain on Lake Geneva" },
    city: "Geneva",
    country: { id: "Swiss", en: "Switzerland" },
    realLocation: { lat: 46.2074, lng: 6.1559 },
    targetYear: 2009,
    targetDateStr: { id: "Agustus 2009", en: "August 2009" },
    description: {
      id: "Semburan air raksasa Jet d'Eau setinggi 140 meter di Danau Jenewa Swiss dengan latar belakang pegunungan Alpen dan Mont Blanc.",
      en: "The soaring 140-meter Jet d'Eau water plume on Lake Geneva in Switzerland against the panoramic backdrop of the Alps."
    },
    hints: {
      cars: { id: "Taksi perahu air kuning 'Mouettes Genevoises' menyeberangi danau.", en: "Yellow 'Mouettes Genevoises' passenger water-taxi boats." },
      architecture: { id: "Dermaga batu pelindung ombak dan hotel-hotel mewah bergaya belle époque.", en: "Stone jetty pier leading to the nozzle and Belle Époque waterfront hotels." },
      cultureOrFashion: { id: "Pelangi air terbentuk di kabut semprotan Jet d'Eau diterpa angin musim panas.", en: "Air mist rainbows forming in the 500-liter-per-second water geyser." }
    },
    streetViewOptions: { position: { lat: 46.2074, lng: 6.1559 }, pov: { heading: 60, pitch: 6, zoom: 1 } }
  }
};

function formatLevel(lvl) {
  return `  {
    id: ${JSON.stringify(lvl.id)},
    levelNumber: ${lvl.levelNumber},
    regions: ${JSON.stringify(lvl.regions)},
    title: ${JSON.stringify(lvl.title)},
    city: ${JSON.stringify(lvl.city)},
    country: ${JSON.stringify(lvl.country)},
    realLocation: { lat: ${lvl.realLocation.lat}, lng: ${lvl.realLocation.lng} },
    targetYear: ${lvl.targetYear},
    targetDateStr: ${JSON.stringify(lvl.targetDateStr)},
    description: ${JSON.stringify(lvl.description)},
    hints: {
      cars: ${JSON.stringify(lvl.hints.cars)},
      architecture: ${JSON.stringify(lvl.hints.architecture)},
      cultureOrFashion: ${JSON.stringify(lvl.hints.cultureOrFashion)}
    },
    streetViewOptions: { position: { lat: ${lvl.streetViewOptions.position.lat}, lng: ${lvl.streetViewOptions.position.lng} }, pov: { heading: ${lvl.streetViewOptions.pov.heading}, pitch: ${lvl.streetViewOptions.pov.pitch}, zoom: ${lvl.streetViewOptions.pov.zoom} } }
  }`;
}

// Function to update a file
function updateChapterFile(filename, replacements, exportName) {
  const filePath = `./src/data/${filename}`;
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Parse blocks
  const blockRegex = /\{\s*id:\s*"[^"]+"[\s\S]*?\n  \}/g;
  const blocks = content.match(blockRegex);
  if (!blocks) {
    throw new Error(`Could not parse blocks in ${filename}`);
  }
  
  console.log(`${filename}: parsed ${blocks.length} blocks`);
  
  const updatedBlocks = blocks.map(block => {
    const numMatch = block.match(/levelNumber:\s*(\d+)/);
    if (!numMatch) return block;
    const num = parseInt(numMatch[1], 10);
    if (replacements[num]) {
      console.log(`  Replacing level ${num} in ${filename} with ${replacements[num].city}`);
      return formatLevel(replacements[num]);
    }
    return block;
  });
  
  const newContent = `import { HistoricalPano } from './challenges';\n\nexport const ${exportName}: HistoricalPano[] = [\n${updatedBlocks.join(',\n')}\n];\n`;
  fs.writeFileSync(filePath, newContent);
  console.log(`Successfully updated ${filename}!`);
}

updateChapterFile('levelsChapter1.ts', chap1Replacements, 'LEVELS_1_TO_20');
updateChapterFile('levelsChapter2.ts', chap2Replacements, 'LEVELS_21_TO_40');
updateChapterFile('levelsChapter4.ts', chap4Replacements, 'LEVELS_61_TO_80');
updateChapterFile('levelsChapter5.ts', chap5Replacements, 'LEVELS_81_TO_100');
