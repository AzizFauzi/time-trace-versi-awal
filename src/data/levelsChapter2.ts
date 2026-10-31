import { HistoricalPano } from './challenges';

export const LEVELS_21_TO_40: HistoricalPano[] = [
  {
    id: "lvl-21-milan-duomo",
    levelNumber: 21,
    regions: ["global","europe"],
    title: {"id":"Duomo di Milano: Mahakarya Marmer Gotik","en":"Milan Duomo: Gothic Marble Cathedral"},
    city: "Milan",
    country: {"id":"Italia","en":"Italy"},
    realLocation: { lat: 45.4641, lng: 9.1919 },
    targetYear: 2008,
    targetDateStr: {"id":"Oktober 2008","en":"October 2008"},
    description: {"id":"Piazza del Duomo di Milan menghadap katedral marmer Candoglia berhias 135 menara runcing dan pintu masuk Galleria Vittorio Emanuele II.","en":"Piazza del Duomo in Milan facing the Candoglia marble cathedral adorned with 135 spires and the Galleria Vittorio Emanuele II entrance."},
    hints: {
      cars: { id: "Trem oranye Peter Witt model klasik tahun 1928 melintas di jalur rel pusat mode.", en: "Historic orange Peter Witt vintage 1928 streetcars clattering along the central rails." },
      architecture: {"id":"Fasad katedral gotik marmer putih-merah muda dengan ribuan patung.","en":"Candoglia pink-white marble Gothic facade with thousands of statues."},
      cultureOrFashion: {"id":"Warga berbusana setelan jas desainer elegan di ibu kota mode dunia.","en":"Locals wearing sharply tailored designer suits in the fashion capital."}
    },
    streetViewOptions: { position: { lat: 45.4641, lng: 9.1919 }, pov: { heading: 70, pitch: 7, zoom: 1 } }
  },
  {
    id: "lvl-22-zurich-bahnhofstrasse",
    levelNumber: 22,
    regions: ["global","europe"],
    title: {"id":"Bahnhofstrasse Zurich: Jantung Finansial Swiss","en":"Bahnhofstrasse Zurich: Financial Heart"},
    city: "Zurich",
    country: {"id":"Swiss","en":"Switzerland"},
    realLocation: { lat: 47.3686, lng: 8.5391 },
    targetYear: 2009,
    targetDateStr: {"id":"September 2009","en":"September 2009"},
    description: {"id":"Jalan boulevard belanja paling eksklusif di dunia Bahnhofstrasse Zurich menuju Danau Zurich saat trem biru Tram 2000 melintas tenang.","en":"World-famous Bahnhofstrasse shopping boulevard in Zurich toward Lake Zurich as blue Tram 2000 glides past."},
    hints: {
      cars: { id: "Trem listrik biru-putih bertingkat modern model Tram 2000 melintas di jalur perbelanjaan elegan.", en: "Blue-and-white Tram 2000 transit electric streetcars cruising the pedestrian boulevard." },
      architecture: {"id":"Gedung bank swasta neoklasik abad ke-19 dan butik jam tangan mewah.","en":"19th-century neoclassical private banking mansions and Swiss watchmakers."},
      cultureOrFashion: {"id":"Pejalan kaki berjas rapi membawa koper kulit di Paradeplatz.","en":"Financiers carrying leather briefcases through Paradeplatz."}
    },
    streetViewOptions: { position: { lat: 47.3686, lng: 8.5391 }, pov: { heading: 15, pitch: 5, zoom: 1 } }
  },
  {
    id: "lvl-23-munich-marienplatz",
    levelNumber: 23,
    regions: ["global","europe"],
    title: {"id":"Marienplatz Munich: Glockenspiel Balai Kota","en":"Marienplatz Munich: Neues Rathaus & Glockenspiel"},
    city: "Munich",
    country: {"id":"Jerman","en":"Germany"},
    realLocation: { lat: 48.1374, lng: 11.5755 },
    targetYear: 2010,
    targetDateStr: {"id":"November 2010","en":"November 2010"},
    description: {"id":"Alun-alun Marienplatz di jantung Bavaria Munich menghadap fasad Gotik Neues Rathaus dengan atraksi jam lonceng mekanik Glockenspiel.","en":"Marienplatz square in central Munich facing the Gothic Neues Rathaus and its mechanical Glockenspiel clock."},
    hints: {
      cars: {"id":"Zona pedestrian berbatu granit tanpa kendaraan bermotor.","en":"Cobblestone pedestrian zone strictly devoid of motor vehicles."},
      architecture: {"id":"Balai kota Gotik baru Neues Rathaus dengan menara jam 85 meter.","en":"Gothic Revival New Town Hall with its towering 85m belfry."},
      cultureOrFashion: {"id":"Wisatawan menengadah menunggu tarian lonceng Glockenspiel berputar.","en":"Spectators gazing up at the animated Glockenspiel bell show."}
    },
    streetViewOptions: { position: { lat: 48.1374, lng: 11.5755 }, pov: { heading: 0, pitch: 8, zoom: 1 } }
  },
  {
    id: "lvl-24-oslo-opera-house",
    levelNumber: 24,
    regions: ["global","europe"],
    title: {"id":"Gedung Opera Oslo: Marmer Carrara Tepi Fjord","en":"Oslo Opera House: Fjord Marble Roof"},
    city: "Oslo",
    country: {"id":"Norwegia","en":"Norway"},
    realLocation: { lat: 59.9075, lng: 10.7531 },
    targetYear: 2010,
    targetDateStr: {"id":"Juli 2010","en":"July 2010"},
    description: {"id":"Operahuset Oslo rancangan Snøhetta dengan lereng atap marmer putih Carrara yang miring masuk ke dalam air Oslofjord.","en":"The Snøhetta-designed Oslo Opera House with sloping white Carrara marble roofs dipping straight into Oslofjord."},
    hints: {
      cars: {"id":"Mobil listrik awal Think City dan sedan Saab di jalan pelabuhan.","en":"Early Norwegian electric Think City cars and Saab wagons."},
      architecture: {"id":"Atap miring marmer putih yang dapat diinjak pejalan kaki hingga ke puncak.","en":"Walkable white Italian marble and granite sloped rooftop."},
      cultureOrFashion: {"id":"Warga lokal berjemur menikmati musim panas Skandinavia di tepi air.","en":"Locals soaking up Nordic midnight sun warmth on the waterfront."}
    },
    streetViewOptions: { position: { lat: 59.9075, lng: 10.7531 }, pov: { heading: 140, pitch: 5, zoom: 1 } }
  },
  {
    id: "lvl-25-helsinki-senate-square",
    levelNumber: 25,
    regions: ["global","europe"],
    title: {"id":"Senaatintori Helsinki: Katedral Neoklasik Putih","en":"Helsinki Senate Square & White Cathedral"},
    city: "Helsinki",
    country: {"id":"Finlandia","en":"Finland"},
    realLocation: { lat: 60.1695, lng: 24.9525 },
    targetYear: 2010,
    targetDateStr: {"id":"Juni 2010","en":"June 2010"},
    description: {"id":"Alun-alun Senaatintori Helsinki dengan Katedral Lutheran putih berkubah hijau rancangan Carl Ludvig Engel.","en":"Senate Square Helsinki featuring the neoclassical white Helsinki Cathedral with green domes designed by Carl Ludvig Engel."},
    hints: {
      cars: {"id":"Trem hijau HKL Valmet Artic dan Volvo estate sedan.","en":"Green-and-yellow HKL city trams and Volvo estates."},
      architecture: {"id":"Katedral megah serba putih di atas tangga granit tinggi dan patung Tsar Alexander II.","en":"Pristine white cathedral atop massive granite flight of stairs."},
      cultureOrFashion: {"id":"Masyarakat duduk santai di tangga katedral menikmati hari panjang Juni.","en":"Locals lounging on cathedral stairs enjoying long June daylight."}
    },
    streetViewOptions: { position: { lat: 60.1695, lng: 24.9525 }, pov: { heading: 350, pitch: 7, zoom: 1 } }
  },
  {
    id: "lvl-26-copenhagen-nyhavn",
    levelNumber: 26,
    regions: ["global","europe"],
    title: {"id":"Nyhavn Kopenhagen: Kanal Rumah Warna-Warni","en":"Nyhavn Copenhagen: Colorful Canal Townhouses"},
    city: "Kopenhagen",
    country: {"id":"Denmark","en":"Denmark"},
    realLocation: { lat: 55.6795, lng: 12.591 },
    targetYear: 2010,
    targetDateStr: {"id":"Mei 2010","en":"May 2010"},
    description: {"id":"Kanal Nyhavn abad ke-17 di Kopenhagen dengan jajaran townhouse kayu warna-warni cerah dan kapal layar kayu bersejarah.","en":"17th-century Nyhavn waterfront canal in Copenhagen lined with brightly colored heritage townhouses and wooden sailing ships."},
    hints: {
      cars: {"id":"Sepeda kota Christiania bike beroda tiga dengan bak kargo depan.","en":"Classic three-wheeled Christiania cargo bikes."},
      architecture: {"id":"Deretan townhouse warna kuning kenari, merah bata, dan biru pastel.","en":"Canalside pastel merchant facades from Hans Christian Andersen's era."},
      cultureOrFashion: {"id":"Orang-orang duduk di bibir dermaga menikmati bir Carlsberg dingin.","en":"Patrons dangling feet over the canal edge with cold drinks."}
    },
    streetViewOptions: { position: { lat: 55.6795, lng: 12.591 }, pov: { heading: 75, pitch: 4, zoom: 1 } }
  },
  {
    id: "lvl-27-warsaw-old-town",
    levelNumber: 27,
    regions: ["global","europe"],
    title: {"id":"Rynek Starego Miasta: Rekonstruksi Epik Warsawa","en":"Warsaw Old Town Market: Post-War Rebirth"},
    city: "Warsawa",
    country: {"id":"Polandia","en":"Poland"},
    realLocation: { lat: 52.2497, lng: 21.0122 },
    targetYear: 2011,
    targetDateStr: {"id":"Juni 2011","en":"June 2011"},
    description: {"id":"Alun-alun Pasar Kota Tua Warsawa (Rynek) yang dibangun kembali dengan cermat pasca Perang Dunia II dengan patung Putri Duyung Syrenka.","en":"Warsaw Old Town Market Square meticulously reconstructed post-WWII, anchored by the bronze Syrenka Mermaid monument."},
    hints: {
      cars: {"id":"Kereta kuda wisata berhias lonceng di sekitar alun-alun pejalan kaki.","en":"Tourist horse carriages navigating paved cobblestone plazas."},
      architecture: {"id":"Townhouse Mannerist dan Renaisans dengan lukisan fresko dinding luar sgraffito.","en":"Mannerist tenement houses featuring detailed sgraffito wall paintings."},
      cultureOrFashion: {"id":"Pelukis jalanan memajang lukisan minyak panorama panorama Warsawa.","en":"Painters exhibiting oil canvasses of Warsaw streetscapes."}
    },
    streetViewOptions: { position: { lat: 52.2497, lng: 21.0122 }, pov: { heading: 180, pitch: 5, zoom: 1 } }
  },
  {
    id: "lvl-28-budapest-parliament",
    levelNumber: 28,
    regions: ["global","europe"],
    title: {"id":"Gedung Parlemen Hungaria: Mahkota Danube","en":"Hungarian Parliament Budapest: Crown of Danube"},
    city: "Budapest",
    country: {"id":"Hungaria","en":"Hungary"},
    realLocation: { lat: 47.5072, lng: 19.0456 },
    targetYear: 2011,
    targetDateStr: {"id":"Juli 2011","en":"July 2011"},
    description: {"id":"Gedung Parlemen Gotik Kebangkitan Hungaria di tepi timur Sungai Danube Budapest yang megah dengan kubah Renaissance 96 meter.","en":"The Gothic Revival Hungarian Parliament Building on the banks of the Danube in Budapest with its 96m Renaissance dome."},
    hints: {
      cars: {"id":"Trem kuning Ganz KCSV-7 jalur 2 menyusuri tanggul Danube.","en":"Classic yellow Ganz KCSV-7 Tram Line 2 along the river embankment."},
      architecture: {"id":"Ratusan menara runcing batu kapur putih dan atap kubah merah megah.","en":"Hundreds of limestone spires and the towering central red dome."},
      cultureOrFashion: {"id":"Kapal pesiar wisata sungai Danube melintas membawa bendera Hungaria.","en":"Danube sightseeing cruise boats waving Hungarian tricolor flags."}
    },
    streetViewOptions: { position: { lat: 47.5072, lng: 19.0456 }, pov: { heading: 60, pitch: 6, zoom: 1 } }
  },
  {
    id: "lvl-29-reykjavik-hallgrimskirkja",
    levelNumber: 29,
    regions: ["global","europe"],
    title: {"id":"Hallgrímskirkja Reykjavik: Kolom Basal Vulkanik","en":"Hallgrímskirkja Reykjavik: Basalt Column Spire"},
    city: "Reykjavik",
    country: {"id":"Islandia","en":"Iceland"},
    realLocation: { lat: 64.1417, lng: -21.9266 },
    targetYear: 2013,
    targetDateStr: {"id":"Agustus 2013","en":"August 2013"},
    description: {"id":"Gereja ekspresionis Hallgrímskirkja setinggi 74,5 meter di Reykjavik yang arsitekturnya meniru formasi batuan basal vulkanik Islandia.","en":"The 74.5-meter expressionist Hallgrímskirkja church in Reykjavik inspired by Iceland's natural volcanic basalt columns."},
    hints: {
      cars: {"id":"Mobil SUV 4x4 ban besar 'Super Jeep' modifikasi salju.","en":"Lifted 4x4 Super Jeeps built for glacier highland driving."},
      architecture: {"id":"Fasad beton bertingkat menyerupai kolom batu lava heksagonal.","en":"Stepped concrete wings mimicking cooling hexagonal lava flows."},
      cultureOrFashion: {"id":"Patung penjelajah Viking Leif Erikson dan sweater wol rajut Lopapeysa.","en":"Leif Erikson bronze statue and tourists in wool Lopapeysa sweaters."}
    },
    streetViewOptions: { position: { lat: 64.1417, lng: -21.9266 }, pov: { heading: 110, pitch: 7, zoom: 1 } }
  },
  {
    id: "lvl-30-montreal-notre-dame",
    levelNumber: 30,
    regions: ["global","americas"],
    title: {"id":"Vieux-Montréal & Basilika Notre-Dame","en":"Old Montreal & Notre-Dame Basilica"},
    city: "Montreal",
    country: {"id":"Kanada","en":"Canada"},
    realLocation: { lat: 45.5048, lng: -73.556 },
    targetYear: 2009,
    targetDateStr: {"id":"Juli 2009","en":"July 2009"},
    description: {"id":"Place d'Armes di Montreal Lama menghadap menara kembar Gotik Basilika Notre-Dame dengan arsitektur warisan Prancis di Quebec.","en":"Place d'Armes in Old Montreal facing the twin Gothic spires of Notre-Dame Basilica amidst historic Quebec French architecture."},
    hints: {
      cars: {"id":"Taksi sedan Chevrolet Impala dan kereta kuda calèche.","en":"Chevrolet Impala taxis and classic tourist horse calèches."},
      architecture: {"id":"Basilika Gotik megah batu kapur abu-abu dengan patung perunggu di fasad.","en":"Grey limestone Gothic Revival basilica with deep blue interior glow."},
      cultureOrFashion: {"id":"Plang toko bilingual Prancis-Inggris khas Quebec.","en":"Bilingual French-first street signs and cobblestone alley cafes."}
    },
    streetViewOptions: { position: { lat: 45.5048, lng: -73.556 }, pov: { heading: 210, pitch: 6, zoom: 1 } }
  },
  {
    id: "lvl-31-vancouver-gastown",
    levelNumber: 31,
    regions: ["global","americas"],
    title: {"id":"Gastown Steam Clock: Jam Uap Kuno Vancouver","en":"Gastown Steam Clock Vancouver"},
    city: "Vancouver",
    country: {"id":"Kanada","en":"Canada"},
    realLocation: { lat: 49.2844, lng: -123.1089 },
    targetYear: 2009,
    targetDateStr: {"id":"April 2009","en":"April 2009"},
    description: {"id":"Sudut Water Street di Gastown Vancouver tempat Jam Uap Gastown meniupkan uap panas dan memainkan bunyi lonceng Westminster setiap 15 menit.","en":"Water Street in historic Gastown Vancouver where the iconic 1977 Steam Clock whistles steam and chimes every quarter hour."},
    hints: {
      cars: { id: "Bus listrik troli putih-biru model New Flyer terhubung ke kabel listrik udara.", en: "Blue-and-white electric trolley buses powered by overhead catenary wires." },
      architecture: {"id":"Tiang jam besi perunggu antik mengeluarkan asap uap putih dari corong atas.","en":"Antique bronze steam clock puffing plumes of white steam."},
      cultureOrFashion: {"id":"Tiang lampu jalanan besi tempa berhias keranjang bunga gantung.","en":"Victorian lampposts with blooming summer flower baskets."}
    },
    streetViewOptions: { position: { lat: 49.2844, lng: -123.1089 }, pov: { heading: 240, pitch: 5, zoom: 1 } }
  },
  {
    id: "lvl-32-washington-lincoln-memorial",
    levelNumber: 32,
    regions: ["global","americas"],
    title: {"id":"Lincoln Memorial: Kolam Refleksi National Mall","en":"Lincoln Memorial & Reflecting Pool Washington D.C."},
    city: "Washington D.C.",
    country: {"id":"Amerika Serikat","en":"United States"},
    realLocation: { lat: 38.8893, lng: -77.0502 },
    targetYear: 2008,
    targetDateStr: {"id":"Agustus 2008","en":"August 2008"},
    description: {"id":"Tangga marmer Lincoln Memorial menghadap Kolam Refleksi dan Monumen Washington di National Mall ibu kota Amerika Serikat.","en":"Lincoln Memorial steps overlooking the Reflecting Pool and the Washington Monument obelisk on the National Mall."},
    hints: {
      cars: {"id":"Mobil dinas polisi federal Ford Crown Victoria Police Interceptor.","en":"Ford Crown Victoria Police Interceptors parked on perimeter drives."},
      architecture: {"id":"Kuil marmer Yundani bergaya Doria dengan 36 pilar marmer Yule raksasa.","en":"Neoclassical Doric temple with 36 fluted marble columns."},
      cultureOrFashion: {"id":"Keluarga mengenakan kausal patriotik dan topi baseball bintang garis.","en":"Tourists wearing stars-and-stripes baseball caps on the mall."}
    },
    streetViewOptions: { position: { lat: 38.8893, lng: -77.0502 }, pov: { heading: 90, pitch: 4, zoom: 1 } }
  },
  {
    id: "lvl-33-boston-quincy-market",
    levelNumber: 33,
    regions: ["global","americas"],
    title: {"id":"Quincy Market & Faneuil Hall: Jalur Kemerdekaan Boston","en":"Quincy Market & Faneuil Hall Boston"},
    city: "Boston",
    country: {"id":"Amerika Serikat","en":"United States"},
    realLocation: { lat: 42.3601, lng: -71.0544 },
    targetYear: 2008,
    targetDateStr: {"id":"September 2008","en":"September 2008"},
    description: {"id":"Pasar bersejarah Quincy Market di Boston di sepanjang Freedom Trail dengan pilar granit Yunani dan kubah tembaga Faneuil Hall.","en":"Historic Quincy Market in Boston along the Freedom Trail, with Doric granite colonnades and Faneuil Hall copper cupola."},
    hints: {
      cars: { id: "Taksi sedan kuning beratap putih dan kendaraan amfibi wisata 'Duck Tour' bercat warna-warni.", en: "Yellow sedans with white taxi roofs and colorful amphibious historic 'Duck Tour' vehicles." },
      architecture: {"id":"Bangunan pasar granit neoklasik panjang dengan kanopi kaca dan kubah tengah.","en":"Long granite Greek Revival market halls flank the cobblestone concourse."},
      cultureOrFashion: {"id":"Pengunjung mengantre semangkuk sup krim kerang New England clam chowder.","en":"Crowds lining up for warm New England clam chowder in bread bowls."}
    },
    streetViewOptions: { position: { lat: 42.3601, lng: -71.0544 }, pov: { heading: 70, pitch: 4, zoom: 1 } }
  },
  {
    id: "lvl-34-melbourne-flinders-street",
    levelNumber: 34,
    regions: ["global"],
    title: {"id":"Flinders Street Station: Jam Ikonik Melbourne","en":"Flinders Street Station Melbourne"},
    city: "Melbourne",
    country: {"id":"Australia","en":"Australia"},
    realLocation: { lat: -37.818, lng: 144.9671 },
    targetYear: 2010,
    targetDateStr: {"id":"Maret 2010","en":"March 2010"},
    description: {"id":"Simpang jalan Flinders dan Swanston di Melbourne menghadap fasad kuning keemasan stasiun kereta bersejarah Flinders Street Station.","en":"Intersection of Flinders and Swanston Streets in Melbourne facing the iconic yellow Edwardian Flinders Street railway station."},
    hints: {
      cars: {"id":"Trem hijau-kuning W-Class heritage dan trem modern Yarra Trams.","en":"Green heritage W-Class trams and sleek modern Yarra Trams."},
      architecture: {"id":"Kubah tembaga hijau dan deretan jam analog penunjuk jadwal kereta di pintu utama.","en":"Copper dome and the famous row of analog departure clocks under the arch."},
      cultureOrFashion: {"id":"Warga berkumpul di bawah deretan jam stasiun ('Under the clocks').","en":"Locals meeting 'under the clocks' outside the main entrance."}
    },
    streetViewOptions: { position: { lat: -37.818, lng: 144.9671 }, pov: { heading: 240, pitch: 5, zoom: 1 } }
  },
  {
    id: "lvl-35-edinburgh-royal-mile",
    levelNumber: 35,
    regions: ["global","europe"],
    title: {"id":"Royal Mile & Kastel Edinburgh: Batuan Vulkanik Kuno","en":"Royal Mile & Edinburgh Castle"},
    city: "Edinburgh",
    country: {"id":"Skotlandia","en":"United Kingdom"},
    realLocation: { lat: 55.9486, lng: -3.1999 },
    targetYear: 2009,
    targetDateStr: {"id":"Juli 2009","en":"July 2009"},
    description: {"id":"Jalan berbatu Royal Mile di Edinburgh menanjak menuju benteng megah Kastel Edinburgh di atas tebing batu Castle Rock.","en":"Cobblestone Royal Mile in Edinburgh sloping upward to the imposing fortress of Edinburgh Castle atop Castle Rock."},
    hints: {
      cars: {"id":"Taksi hitam London TX4 dan bus tingkat merah Lothian Buses.","en":"Black TX4 Hackney carriages and maroon Lothian double-deckers."},
      architecture: {"id":"Dinding batu benteng abad pertengahan menjulang di atas tebing batu basal gelap.","en":"Medieval stone battlements looming high atop volcanic crag."},
      cultureOrFashion: {"id":"Pemain bagpipe Skotlandia mengenakan kilt wol tartan tradisional.","en":"Bagpipers busking in full traditional tartan kilt regalia."}
    },
    streetViewOptions: { position: { lat: 55.9486, lng: -3.1999 }, pov: { heading: 270, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-36-bangkok-wat-arun",
    levelNumber: 36,
    regions: ["global", "asia"],
    title: { id: "Wat Arun: Candi Fajar Sungai Chao Phraya", en: "Wat Arun Temple of Dawn Bangkok" },
    city: "Bangkok",
    country: { id: "Thailand", en: "Thailand" },
    realLocation: { lat: 13.7437, lng: 100.4889 },
    targetYear: 2012,
    targetDateStr: { id: "Maret 2012", en: "March 2012" },
    description: {
      id: "Pemandangan dari seberang Sungai Chao Phraya menghadap prang menara Wat Arun sebelum pemugaran cat porselen 2017.",
      en: "View from across Chao Phraya river facing Wat Arun before the 2017 porcelain restoration."
    },
    hints: {
      cars: { id: "Tuk-tuk roda tiga bermesin kencang dan deretan perahu kayu longtail boat di tepian sungai.", en: "Motorized three-wheeled tuk-tuks and narrow wooden longtail riverboats docked on the river." },
      architecture: { id: "Menara prang Khmer kuno berhiaskan pecahan keramik Cina.", en: "Khmer-style spires encrusted in colorful Chinese porcelain." },
      cultureOrFashion: { id: "Biksu berjubah oranye safron dan pakaian linen santai.", en: "Buddhist monks in saffron robes crossing the pier." }
    },
    streetViewOptions: { position: { lat: 13.7437, lng: 100.4889 }, pov: { heading: 250, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-37-kuala-lumpur-klcc",
    levelNumber: 37,
    regions: ["global", "asia"],
    title: { id: "Menara Kembar Petronas KLCC 2013", en: "Petronas Twin Towers KLCC 2013" },
    city: "Kuala Lumpur",
    country: { id: "Malaysia", en: "Malaysia" },
    realLocation: { lat: 3.1579, lng: 101.7116 },
    targetYear: 2013,
    targetDateStr: { id: "Desember 2013", en: "December 2013" },
    description: {
      id: "Jalan Ampang di depan Menara Kembar Petronas KLCC sebelum proyek gedung MRT layang dan gedung pencakar langit sekitarnya padat.",
      en: "Jalan Ampang facing the Petronas Twin Towers prior to adjacent skyscraper construction."
    },
    hints: {
      cars: { id: "Sedan Proton Saga & Persona taxi bercat merah-putih bertuliskan 'Teksi'.", en: "Proton Saga and Persona two-tone red-and-white sedans badged as 'Teksi'." },
      architecture: { id: "Menara kembar 88 lantai berkilau baja tahan karat dan kaca.", en: "Stainless steel and glass 88-floor twin towers." },
      cultureOrFashion: { id: "Busana multikultural Melayu, Tionghoa, dan India di trotoar KLCC.", en: "Multicultural Malaysian commuters around KLCC park." }
    },
    streetViewOptions: { position: { lat: 3.1579, lng: 101.7116 }, pov: { heading: 205, pitch: 9, zoom: 1 } }
  },
{
    id: "lvl-38-manila-intramuros",
    levelNumber: 38,
    regions: ["global", "asia"],
    title: { id: "Intramuros: Kota Berbenteng Manila 2014", en: "Intramuros Walled City Manila 2014" },
    city: "Manila",
    country: { id: "Filipina", en: "Philippines" },
    realLocation: { lat: 14.5895, lng: 120.9747 },
    targetYear: 2014,
    targetDateStr: { id: "April 2014", en: "April 2014" },
    description: {
      id: "Kawasan bersejarah Intramuros benteng Spanyol di Manila dengan kalesa kereta kuda dan gereja Katedral Manila.",
      en: "Intramuros historic Spanish district in Manila with kalesa horse carriages and Manila Cathedral."
    },
    hints: {
      cars: { id: "Jeepney warna-warni khas Filipina melintas di jalan perimeter.", en: "Vibrantly painted Philippine public jeepneys." },
      architecture: { id: "Tembok benteng batu karang tua peninggalan kolonial Spanyol abad ke-16.", en: "Thick 16th-century Spanish stone fortification ramparts." },
      cultureOrFashion: { id: "Kalesa kereta kuda wisata beratap kanopi kain.", en: "Kalesa two-wheeled horse carriages for tourists." }
    },
    streetViewOptions: { position: { lat: 14.5895, lng: 120.9747 }, pov: { heading: 110, pitch: 4, zoom: 1 } }
  },
{
    id: "lvl-39-taipei-101",
    levelNumber: 39,
    regions: ["global", "asia"],
    title: { id: "Taipei 101: Distrik Xinyi 2010", en: "Taipei 101: Xinyi District 2010" },
    city: "Taipei",
    country: { id: "Taiwan", en: "Taiwan" },
    realLocation: { lat: 25.0339, lng: 121.5645 },
    targetYear: 2010,
    targetDateStr: { id: "Januari 2010", en: "January 2010" },
    description: {
      id: "Menara pencakar langit Taipei 101 berarsitektur pagoda bambu bertingkat saat stasiun MRT Taipei 101 masih dibangun di bawah tanah.",
      en: "Taipei 101 skyscraper designed as stepped bamboo stalks while the Red Line MRT station was under street construction."
    },
    hints: {
      cars: { id: "Taksi sedan Toyota Camry dan MPV Toyota Wish warna kuning cerah di lajur jalan bertingkat.", en: "Bright yellow Toyota Camry and Wish fleet taxis cruising beneath the elevated roadways." },
      architecture: { id: "Konstruksi stasiun MRT bawah tanah di sepanjang Xinyi Road.", en: "Underground MRT subway construction hoardings on Xinyi Road." },
      cultureOrFashion: { id: "Komuter dengan jas kantor dan payung lipat khas musim hujan Taipei.", en: "Office commuters carrying compact umbrellas." }
    },
    streetViewOptions: { position: { lat: 25.0339, lng: 121.5645 }, pov: { heading: 240, pitch: 10, zoom: 1 } }
  },
{
    id: "lvl-40-hong-kong-mong-kok",
    levelNumber: 40,
    regions: ["global", "asia"],
    title: { id: "Nathan Road Mong Kok: Hutan Lampu Neon", en: "Nathan Road Mong Kok: Forest of Neons" },
    city: "Hong Kong",
    country: { id: "Hong Kong", en: "Hong Kong" },
    realLocation: { lat: 22.3193, lng: 114.1694 },
    targetYear: 2009,
    targetDateStr: { id: "Desember 2009", en: "December 2009" },
    description: {
      id: "Nathan Road di Kowloon Hong Kong sebelum penertiban besar-besaran jutaan plang neon gantung raksasa khas film aksi Hong Kong.",
      en: "Nathan Road in Kowloon before mass municipal dismantling of classic suspended glowing neon billboards."
    },
    hints: {
      cars: { id: "Taksi sedan Toyota Crown merah-putih Urban Taxi dan bus bertingkat KMB.", en: "Red-and-silver Toyota Crown cabs and KMB double-deckers." },
      architecture: { id: "Ratusan papan nama neon menjorok keluar ke tengah jalan raya.", en: "Dense canopy of suspended neon signs over the avenue." },
      cultureOrFashion: { id: "Papan iklan film laga Kanton dan toko emas Chow Tai Fook.", en: "Cantonese cinema billboards and traditional gold jewelers." }
    },
    streetViewOptions: { position: { lat: 22.3193, lng: 114.1694 }, pov: { heading: 180, pitch: 8, zoom: 1 } }
  }
];
