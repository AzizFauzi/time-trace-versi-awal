import { HistoricalPano } from './challenges';

export const LEVELS_1_TO_20: HistoricalPano[] = [
{
    id: "lvl-1-times-square",
    levelNumber: 1,
    regions: ["global", "americas"],
    title: { id: "Times Square: Era Jalan Raya Aspal", en: "Times Square: Asphalt Avenue Era" },
    city: "New York City",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 40.7580, lng: -73.9855 },
    targetYear: 2008,
    targetDateStr: { id: "Juli 2008", en: "July 2008" },
    description: {
      id: "Times Square sebelum Broadway ditutup untuk mobil pada 2009. Taksi sedan Ford Crown Victoria kuning mendominasi jalan raya penuh aspal.",
      en: "Times Square before Broadway became pedestrian-only in 2009. Classic boxy yellow Ford Crown Victoria cabs dominate the roadway."
    },
    hints: {
      cars: { id: "Taksi sedan Ford Crown Victoria kuning mendominasi.", en: "Fleet of yellow Ford Crown Victoria cabs." },
      architecture: { id: "Broadway masih aspal mobil tanpa kursi santai.", en: "Broadway is fully asphalt for cars without pedestrian plaza chairs." },
      cultureOrFashion: { id: "Billboard bioskop musim panas 2008 dan ponsel flip.", en: "Summer 2008 movie premiere billboards and flip-phone ads." }
    },
    streetViewOptions: { position: { lat: 40.7580, lng: -73.9855 }, pov: { heading: 20, pitch: 8, zoom: 1 } }
  },
{
    id: "lvl-2-shibuya-crossing",
    levelNumber: 2,
    regions: ["global", "asia"],
    title: { id: "Persimpangan Shibuya: Masa Gyaru & Flip Phone", en: "Shibuya Crossing: Gyaru & Flip Phone Era" },
    city: "Tokyo",
    country: { id: "Jepang", en: "Japan" },
    realLocation: { lat: 35.6595, lng: 139.7005 },
    targetYear: 2009,
    targetDateStr: { id: "Oktober 2009", en: "October 2009" },
    description: {
      id: "Persimpangan Shibuya Tokyo pada era kejayaan Shibuya 109 sebelum gedung Shibuya Scramble Square dibangun.",
      en: "Shibuya Crossing Tokyo during the 109 fashion era long before Shibuya Scramble Square skyscraper existed."
    },
    hints: {
      cars: { id: "Taksi Toyota Comfort hijau-kuning lawas.", en: "Classic green-yellow Toyota Comfort taxis." },
      architecture: { id: "Gedung Scramble Square belum ada di langit Shibuya.", en: "Shibuya Scramble Square skyscraper is absent." },
      cultureOrFashion: { id: "Ponsel lipat keitai dan iklan album CD 2009.", en: "Japanese flip phones and late 2000s J-Pop album posters." }
    },
    streetViewOptions: { position: { lat: 35.6595, lng: 139.7005 }, pov: { heading: 15, pitch: 10, zoom: 1 } }
  },
  {
    id: "lvl-3-jakarta-monas",
    levelNumber: 3,
    regions: ["global","asia","indonesia"],
    title: {"id":"Monas: Simbol Kejayaan & Jantung Ibu Kota","en":"Monas: Icon of National Glory & Capital Heart"},
    city: "Jakarta",
    country: {"id":"Indonesia","en":"Indonesia"},
    realLocation: { lat: -6.1754, lng: 106.8272 },
    targetYear: 2014,
    targetDateStr: {"id":"September 2014","en":"September 2014"},
    description: {"id":"Monumen Nasional (Monas) Jakarta saat peluncuran perdana Google Street View di Indonesia. Satu-satunya arsip kasus Nusantara di petualangan 100 dunia!","en":"The National Monument (Monas) in Jakarta during Street View's inaugural Indonesian launch. The sole Indonesian archive in the 100 world adventures!"},
    hints: {
      cars: { id: "Taksi sedan Blue Bird warna biru dan armada busway gandeng merah-oranye lawas.", en: "Blue Bird sedan taxis and vintage articulated rapid transit buses." },
      architecture: {"id":"Tugu Monas 132 meter dengan lidah api berlapis emas murni.","en":"132-meter Monas obelisk crowned by the gilded bronze flame."},
      cultureOrFashion: {"id":"Wisatawan keluarga berpiknik di taman Medan Merdeka.","en":"Families relaxing in the leafy Merdeka Square park grounds."}
    },
    streetViewOptions: { position: { lat: -6.1754, lng: 106.8272 }, pov: { heading: 10, pitch: 7, zoom: 1 } }
  },
{
    id: "lvl-4-london-olympic",
    levelNumber: 4,
    regions: ["global", "europe"],
    title: { id: "Stratford London: Konstruksi Olimpiade 2012", en: "Stratford London: Olympic 2012 Construction" },
    city: "London",
    country: { id: "Inggris Raya", en: "United Kingdom" },
    realLocation: { lat: 51.5387, lng: -0.0166 },
    targetYear: 2008,
    targetDateStr: { id: "Agustus 2008", en: "August 2008" },
    description: {
      id: "Stratford di London Timur tepat saat penggalian tanah awal stadion Olimpiade London 2012 dimulai.",
      en: "Stratford in East London right as foundation works for the London 2012 Olympic Stadium began."
    },
    hints: {
      cars: { id: "Taksi hitam klasik LTI TX1 dan Vauxhall lawas.", en: "Black cabs LTI TX1 and old Vauxhall hatchbacks." },
      architecture: { id: "Derek derek konstruksi raksasa Olympic Park.", en: "Giant cranes building the Olympic Stadium." },
      cultureOrFashion: { id: "Papan pengumuman menyambut Olimpiade 2012.", en: "Signboards counting down 4 years to London 2012." }
    },
    streetViewOptions: { position: { lat: 51.5387, lng: -0.0166 }, pov: { heading: 240, pitch: 5, zoom: 1 } }
  },
{
    id: "lvl-5-paris-champs-elysees",
    levelNumber: 5,
    regions: ["global", "europe"],
    title: { id: "Champs-Élysées & Virgin Megastore", en: "Champs-Élysées & Virgin Megastore" },
    city: "Paris",
    country: { id: "Prancis", en: "France" },
    realLocation: { lat: 48.8705, lng: 2.3045 },
    targetYear: 2011,
    targetDateStr: { id: "Juni 2011", en: "June 2011" },
    description: {
      id: "Champs-Élysées Paris di mana toko Virgin Megastore masih berdiri sebelum tutup permanen pada 2013.",
      en: "Champs-Élysées Paris while Virgin Megastore was still bustling prior to closing in 2013."
    },
    hints: {
      cars: { id: "Peugeot 206 dan Renault Clio generasi 2000-an.", en: "Peugeot 206 and Renault Clio 3rd gen." },
      architecture: { id: "Toko megah Virgin Megastore masih buka.", en: "Virgin Megastore flagship storefront active." },
      cultureOrFashion: { id: "Busana kasual musim panas Paris 2011.", en: "Summer 2011 casual Parisian style." }
    },
    streetViewOptions: { position: { lat: 48.8705, lng: 2.3045 }, pov: { heading: 110, pitch: 4, zoom: 1 } }
  },
{
    id: "lvl-6-singapore-marina-bay",
    levelNumber: 6,
    regions: ["global", "asia"],
    title: { id: "Marina Bay: Menara Sands Sedang Dibangun", en: "Marina Bay: Marina Bay Sands Under Construction" },
    city: "Singapore",
    country: { id: "Singapura", en: "Singapore" },
    realLocation: { lat: 1.2868, lng: 103.8545 },
    targetYear: 2009,
    targetDateStr: { id: "Maret 2009", en: "March 2009" },
    description: {
      id: "Pemandangan dari Merlion Park menghadap tiga menara Marina Bay Sands yang masih berupa beton telanjang tanpa SkyPark di atasnya.",
      en: "View from Merlion Park showing the three Marina Bay Sands towers under bare concrete construction without the SkyPark."
    },
    hints: {
      cars: { id: "Taksi Hyundai Sonata ComfortDelGro biru era 2000-an.", en: "ComfortDelGro Hyundai Sonata blue taxis." },
      architecture: { id: "Tiga menara Sands belum memiliki atap perahu kapal SkyPark.", en: "The 3 towers lack the iconic surfboard SkyPark roof." },
      cultureOrFashion: { id: "Turis memegang kamera poket digital tebal.", en: "Tourists with chunky point-and-shoot digital cameras." }
    },
    streetViewOptions: { position: { lat: 1.2868, lng: 103.8545 }, pov: { heading: 115, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-7-san-francisco-market-st",
    levelNumber: 7,
    regions: ["global", "americas"],
    title: { id: "Market Street: Era Awal Kamera Street View", en: "Market Street: Dawn of Street View Vans" },
    city: "San Francisco",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 37.7885, lng: -122.4072 },
    targetYear: 2008,
    targetDateStr: { id: "Mei 2008", en: "May 2008" },
    description: {
      id: "Market Street San Francisco dekat Powell Street turntable, terekam van kamera Street View generasi awal resolusi 2008.",
      en: "Market Street near Powell Street turnaround, captured by Google's first-gen Street View van cameras."
    },
    hints: {
      cars: { id: "Bus listrik Muni livery putih-oranye lawas.", en: "Classic white-orange Muni trolley buses." },
      architecture: { id: "Etalase toko elektronik sebelum booming startup tech.", en: "Pre-tech boom retail stores and old neon signs." },
      cultureOrFashion: { id: "Iklan ponsel 3G awal di halte bus.", en: "Early 3G phone transit ads." }
    },
    streetViewOptions: { position: { lat: 37.7885, lng: -122.4072 }, pov: { heading: 60, pitch: 3, zoom: 1 } }
  },
{
    id: "lvl-8-berlin-potsdamer",
    levelNumber: 8,
    regions: ["global", "europe"],
    title: { id: "Potsdamer Platz: Peluncuran Jerman 2010", en: "Potsdamer Platz: German 2010 Launch" },
    city: "Berlin",
    country: { id: "Jerman", en: "Germany" },
    realLocation: { lat: 52.5096, lng: 13.3760 },
    targetYear: 2010,
    targetDateStr: { id: "Juli 2010", en: "July 2010" },
    description: {
      id: "Potsdamer Platz Berlin saat Google Street View pertama kali hadir di Jerman di tengah perdebatan privasi.",
      en: "Potsdamer Platz Berlin during the first Street View launch in Germany amidst privacy debates."
    },
    hints: {
      cars: { id: "Mercedes W211 taxi warna krem gading khas Jerman.", en: "Ivory cream Mercedes E-Class taxi cabs." },
      architecture: { id: "Sony Center dengan logo Sony lama.", en: "Sony Center with vintage Sony styling." },
      cultureOrFashion: { id: "Atribut nobar Piala Dunia 2010 Afrika Selatan.", en: "World Cup 2010 public viewing flags." }
    },
    streetViewOptions: { position: { lat: 52.5096, lng: 13.3760 }, pov: { heading: 190, pitch: 5, zoom: 1 } }
  },
  {
    id: "lvl-9-dublin-temple-bar",
    levelNumber: 9,
    regions: ["global","europe"],
    title: {"id":"Temple Bar Dublin: Lorong Musik & Budaya","en":"Temple Bar Dublin: Cultural Heart"},
    city: "Dublin",
    country: {"id":"Irlandia","en":"Ireland"},
    realLocation: { lat: 53.3458, lng: -6.2628 },
    targetYear: 2009,
    targetDateStr: {"id":"Juli 2009","en":"July 2009"},
    description: {"id":"Kawasan berbatu Temple Bar di Dublin saat Street View pertama kali memetakan ibu kota Irlandia dengan pub-pub tradisional merah menyala.","en":"Cobblestone streets of Temple Bar Dublin when Street View first mapped Ireland, lined with vibrant scarlet pub facades."},
    hints: {
      cars: { id: "Taksi sedan Skoda Octavia dan Ford Mondeo dengan lampu atap taksi kuning-hijau.", en: "Skoda Octavia and Ford Mondeo taxi cabs with standard illuminated roof bars." },
      architecture: {"id":"Fasad pub Temple Bar berwarna merah terang dengan pot bunga gantung.","en":"Vibrant red exterior of the iconic Temple Bar pub."},
      cultureOrFashion: {"id":"Musisi jalanan memainkan alat musik biola tradisional Celtic.","en":"Busking musicians with traditional Celtic violins."}
    },
    streetViewOptions: { position: { lat: 53.3458, lng: -6.2628 }, pov: { heading: 240, pitch: 5, zoom: 1 } }
  },
{
    id: "lvl-10-rome-colosseum",
    levelNumber: 10,
    regions: ["global", "europe"],
    title: { id: "Colosseum Roma: Arus Lalu Lintas Lawas", en: "Rome Colosseum: Vintage Traffic Flow" },
    city: "Rome",
    country: { id: "Italia", en: "Italy" },
    realLocation: { lat: 41.8902, lng: 12.4922 },
    targetYear: 2009,
    targetDateStr: { id: "Mei 2009", en: "May 2009" },
    description: {
      id: "Jalanan sekitar Colosseum sebelum pembatasan ketat lalu lintas Via dei Fori Imperiali dan galian besar Metro C.",
      en: "Colosseum vicinity before stricter traffic restrictions and large Metro Line C excavation enclosures."
    },
    hints: {
      cars: { id: "Fiat Punto dan skuter Piaggio Beverly lawas.", en: "Fiat Punto and older Piaggio Beverly scooters." },
      architecture: { id: "Amfiteater Colosseum sebelum pembersihan fasad batu.", en: "Colosseum exterior prior to multi-year restoration." },
      cultureOrFashion: { id: "Turis memegang peta kertas lipat fisik.", en: "Tourists navigating with paper fold-out maps." }
    },
    streetViewOptions: { position: { lat: 41.8902, lng: 12.4922 }, pov: { heading: 140, pitch: 7, zoom: 1 } }
  },
  {
    id: "lvl-11-lisbon-praca-comercio",
    levelNumber: 11,
    regions: ["global","europe"],
    title: {"id":"Praça do Comércio & Trem Kuning Lisboa","en":"Praça do Comércio & Yellow Tram Lisbon"},
    city: "Lisbon",
    country: {"id":"Portugal","en":"Portugal"},
    realLocation: { lat: 38.7075, lng: -9.1364 },
    targetYear: 2009,
    targetDateStr: {"id":"Mei 2009","en":"May 2009"},
    description: {"id":"Alun-alun megah Praça do Comércio tepi Sungai Tagus di Lisbon saat trem kuning Remodelado nomor 28 melintas perlahan.","en":"Magnificent Praça do Comércio square along the Tagus River in Lisbon as iconic yellow Tram 28 rattles past."},
    hints: {
      cars: {"id":"Trem kayu kuning lawas dan taksi Mercedes-Benz hijau-hitam.","en":"Vintage yellow wooden trams and green-and-black Mercedes taxis."},
      architecture: {"id":"Gerbang kemenangan Arco da Rua Augusta dan deretan arkade kuning.","en":"Arco da Rua Augusta triumphal arch and yellow colonnades."},
      cultureOrFashion: {"id":"Warga menikmati kopi bica dan kue pastel de nata di kafe teras.","en":"Patrons sipping bica espresso and pastel de nata on open terraces."}
    },
    streetViewOptions: { position: { lat: 38.7075, lng: -9.1364 }, pov: { heading: 10, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-12-sydney-circular-quay",
    levelNumber: 12,
    regions: ["global"],
    title: { id: "Circular Quay Sydney: Feri Hijau-Emas", en: "Sydney Harbour: Green & Gold Ferries" },
    city: "Sydney",
    country: { id: "Australia", en: "Australia" },
    realLocation: { lat: -33.8615, lng: 151.2110 },
    targetYear: 2010,
    targetDateStr: { id: "Maret 2010", en: "March 2010" },
    description: {
      id: "Circular Quay Sydney menghadap Opera House dengan kapal feri First Fleet klasik sebelum renovasi dermaga.",
      en: "Circular Quay facing Sydney Opera House with First Fleet ferries before ferry terminal revamps."
    },
    hints: {
      cars: { id: "Sedan Holden Commodore dan Ford Falcon Australia.", en: "Australian Holden Commodore and Ford Falcon sedans." },
      architecture: { id: "Dermaga feri Circular Quay dengan papan tanda lawas.", en: "Circular Quay wharves with legacy transit signage." },
      cultureOrFashion: { id: "Pakaian santai wisatawan musim gugur 2010.", en: "Autumn 2010 casual tourist fashion." }
    },
    streetViewOptions: { position: { lat: -33.8615, lng: 151.2110 }, pov: { heading: 40, pitch: 8, zoom: 1 } }
  },
  {
    id: "lvl-13-stockholm-gamla-stan",
    levelNumber: 13,
    regions: ["global","europe"],
    title: {"id":"Gamla Stan: Kota Tua Stockholm Abad Pertengahan","en":"Gamla Stan: Stockholm Medieval Old Town"},
    city: "Stockholm",
    country: {"id":"Swedia","en":"Sweden"},
    realLocation: { lat: 59.3258, lng: 18.0711 },
    targetYear: 2009,
    targetDateStr: {"id":"Juni 2009","en":"June 2009"},
    description: {"id":"Alun-alun Stortorget di Gamla Stan Stockholm dengan townhouse berwarna ochre dan terakota khas abad ke-17 Skandinavia.","en":"Stortorget square in Gamla Stan Stockholm featuring ochre and terracotta 17th-century Scandinavian merchant houses."},
    hints: {
      cars: {"id":"Volvo V70 estate dan Saab 9-5 khas Swedia era 2000-an.","en":"Classic Swedish Volvo V70 estates and Saab 9-5 wagons."},
      architecture: {"id":"Bangunan gabled atap bertingkat berwarna jingga cerah mengelilingi plaza.","en":"Gabled merchant houses flanking the cobblestone central square."},
      cultureOrFashion: {"id":"Turis menikmati tradisi 'fika' kopi kue kayu manis di kafe luar.","en":"Patrons enjoying traditional Swedish fika cinnamon buns at outdoor tables."}
    },
    streetViewOptions: { position: { lat: 59.3258, lng: 18.0711 }, pov: { heading: 320, pitch: 5, zoom: 1 } }
  },
{
    id: "lvl-14-chicago-millennium-park",
    levelNumber: 14,
    regions: ["global", "americas"],
    title: { id: "Millennium Park Chicago & 'The Bean'", en: "Chicago Millennium Park & 'The Bean'" },
    city: "Chicago",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 41.8826, lng: -87.6226 },
    targetYear: 2008,
    targetDateStr: { id: "Agustus 2008", en: "August 2008" },
    description: {
      id: "Michigan Avenue dan Millennium Park di Chicago tahun 2008 beberapa tahun setelah Cloud Gate dibuka.",
      en: "Michigan Avenue and Millennium Park Chicago in 2008 shortly after Cloud Gate was unveiled."
    },
    hints: {
      cars: { id: "Bus CTA New Flyer putih-biru era 2000-an.", en: "Older white-and-blue CTA buses." },
      architecture: { id: "Dinding pencakar langit bersejarah Michigan Avenue.", en: "Historic Michigan Avenue skyline." },
      cultureOrFashion: { id: "Turis dengan celana kargo dan kamera saku poket.", en: "Tourists with cargo shorts and digital cameras." }
    },
    streetViewOptions: { position: { lat: 41.8826, lng: -87.6226 }, pov: { heading: 75, pitch: 6, zoom: 1 } }
  },
  {
    id: "lvl-15-honolulu-waikiki",
    levelNumber: 15,
    regions: ["global","americas"],
    title: {"id":"Pantai Waikiki: Kalakaua Avenue Honolulu","en":"Waikiki Beach: Kalakaua Avenue Honolulu"},
    city: "Honolulu",
    country: {"id":"Amerika Serikat","en":"United States"},
    realLocation: { lat: 21.277, lng: -157.8265 },
    targetYear: 2008,
    targetDateStr: {"id":"Agustus 2008","en":"August 2008"},
    description: {"id":"Kalakaua Avenue sepanjang Pantai Waikiki di Honolulu dengan deretan pohon kelapa melambai dan patung legenda selancar Duke Kahanamoku.","en":"Kalakaua Avenue along Waikiki Beach in Honolulu with swaying palms and the Duke Kahanamoku surf statue."},
    hints: {
      cars: {"id":"Bus tingkat terbuka Waikiki Trolley dan Ford Mustang sewaan.","en":"Open-air Waikiki Trolley tour buses and rental convertibles."},
      architecture: {"id":"Hotel bersejarah Moana Surfrider 'First Lady of Waikiki' serba putih.","en":"Historic white neoclassical facade of Moana Surfrider hotel."},
      cultureOrFashion: {"id":"Peselancar membawa papan selancar longboard mengenakan kemeja Aloha.","en":"Surfers carrying longboards and locals in vibrant Aloha shirts."}
    },
    streetViewOptions: { position: { lat: 21.277, lng: -157.8265 }, pov: { heading: 140, pitch: 4, zoom: 1 } }
  },
{
    id: "lvl-16-hollywood-boulevard",
    levelNumber: 16,
    regions: ["global", "americas"],
    title: { id: "Hollywood Walk of Fame & Teater Kodak", en: "Hollywood Walk of Fame & Kodak Theatre" },
    city: "Los Angeles",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 34.1016, lng: -118.3405 },
    targetYear: 2009,
    targetDateStr: { id: "Maret 2009", en: "March 2009" },
    description: {
      id: "Hollywood Boulevard dekat Teater TCL Chinese ketika Teater Kodak belum berganti nama menjadi Dolby Theatre.",
      en: "Hollywood Boulevard near TCL Chinese Theatre when Kodak Theatre hadn't yet rebranded to Dolby Theatre."
    },
    hints: {
      cars: { id: "Ford Mustang convertible generasi ke-5 tahun 2005-2009.", en: "5th-gen Ford Mustang convertibles." },
      architecture: { id: "Papan nama 'Kodak Theatre' masih terpasang megah.", en: "Original Kodak Theatre marquee signage." },
      cultureOrFashion: { id: "Poster film bioskop musim semi 2009.", en: "Spring 2009 theatrical promo posters." }
    },
    streetViewOptions: { position: { lat: 34.1016, lng: -118.3405 }, pov: { heading: 260, pitch: 5, zoom: 1 } }
  },
{
    id: "lvl-17-amsterdam-prinsengracht",
    levelNumber: 17,
    regions: ["global", "europe"],
    title: { id: "Kanal Prinsengracht Amsterdam", en: "Prinsengracht Canal Amsterdam" },
    city: "Amsterdam",
    country: { id: "Belanda", en: "Netherlands" },
    realLocation: { lat: 52.3752, lng: 4.8839 },
    targetYear: 2009,
    targetDateStr: { id: "April 2009", en: "April 2009" },
    description: {
      id: "Pemandangan kanal Prinsengracht dekat Anne Frank House saat peluncuran Street View perdana di Belanda pada 2009.",
      en: "Prinsengracht canal near Anne Frank House during the initial 2009 Netherlands Street View launch."
    },
    hints: {
      cars: { id: "Volkswagen Polo Mk4 dan Opel Corsa generasi awal.", en: "VW Polo Mk4 and Opel Corsa 2000s models." },
      architecture: { id: "Rumah pabean kanalisasi Belanda abad ke-17.", en: "Historic 17th-century Dutch canal houses." },
      cultureOrFashion: { id: "Sepeda onthel omafiets dengan keranjang kayu klasik.", en: "Classic Dutch omafiets city bicycles with crates." }
    },
    streetViewOptions: { position: { lat: 52.3752, lng: 4.8839 }, pov: { heading: 160, pitch: 3, zoom: 1 } }
  },
  {
    id: "lvl-18-brussels-grand-place",
    levelNumber: 18,
    regions: ["global","europe"],
    title: {"id":"Grand-Place Brussels: Alun-Alun Emas Eropa","en":"Grand Place Brussels: Golden Central Square"},
    city: "Brussels",
    country: {"id":"Belgia","en":"Belgium"},
    realLocation: { lat: 50.8467, lng: 4.3524 },
    targetYear: 2009,
    targetDateStr: {"id":"November 2009","en":"November 2009"},
    description: {"id":"Grand-Place di Brussels yang dikelilingi aula serikat pekerja baroque berukir emas dan Balai Kota Gotik Hôtel de Ville setinggi 96 meter.","en":"The Grand Place in Brussels surrounded by opulent baroque guildhalls adorned with gold leaf and the 96m Gothic Town Hall."},
    hints: {
      cars: {"id":"Kawasan pejalan kaki berbatu bundar tanpa kendaraan bermotor.","en":"Fully pedestrianized cobblestone square with delivery vans restricted."},
      architecture: {"id":"Menara Gotik runcing Hôtel de Ville dan fasad berlapis aksen emas murni.","en":"Intricate Gothic spire of Brussels Town Hall flanked by ornate guildhalls."},
      cultureOrFashion: {"id":"Aroma waffle Belgia dan etalase toko cokelat praline mewah.","en":"Fragrance of warm Belgian waffles and luxurious chocolatier boutiques."}
    },
    streetViewOptions: { position: { lat: 50.8467, lng: 4.3524 }, pov: { heading: 180, pitch: 7, zoom: 1 } }
  },
{
    id: "lvl-19-madrid-puerta-del-sol",
    levelNumber: 19,
    regions: ["global", "europe"],
    title: { id: "Puerta del Sol: Titik Nol Spanyol", en: "Puerta del Sol: Kilometer Zero Madrid" },
    city: "Madrid",
    country: { id: "Spanyol", en: "Spain" },
    realLocation: { lat: 40.4168, lng: -3.7038 },
    targetYear: 2008,
    targetDateStr: { id: "Mei 2008", en: "May 2008" },
    description: {
      id: "Alun-alun Puerta del Sol Madrid saat konstruksi stasiun bawah tanah komuter Cercanías Sol masih berlangsung.",
      en: "Puerta del Sol plaza in Madrid during construction of the Sol underground commuter train station."
    },
    hints: {
      cars: { id: "SEAT Ibiza dan Toledo taxi putih dengan garis diagonal merah menyilang di pintu depan.", en: "White SEAT Ibiza & Toledo taxis featuring a distinctive diagonal red stripe on the front doors." },
      architecture: { id: "Kubah kaca stasiun bawah tanah Sol masih dalam proyek tertutup.", en: "Glass dome of Sol underground rail station under construction." },
      cultureOrFashion: { id: "Papan iklan neon 'Tío Pepe' legendaris di atas gedung.", en: "Iconic 'Tío Pepe' neon rooftop sign in original spot." }
    },
    streetViewOptions: { position: { lat: 40.4168, lng: -3.7038 }, pov: { heading: 310, pitch: 8, zoom: 1 } }
  },
{
    id: "lvl-20-kyoto-gion-yasaka",
    levelNumber: 20,
    regions: ["global", "asia"],
    title: { id: "Gion Shijo: Gerbang Kuil Yasaka", en: "Gion Shijo: Yasaka Shrine Gate Kyoto" },
    city: "Kyoto",
    country: { id: "Jepang", en: "Japan" },
    realLocation: { lat: 35.0037, lng: 135.7772 },
    targetYear: 2010,
    targetDateStr: { id: "Maret 2010", en: "March 2010" },
    description: {
      id: "Ujung jalan Shijo-dori di distrik Gion Kyoto menghadap gerbang merah cerah Kuil Yasaka Jinja.",
      en: "End of Shijo-dori avenue in Kyoto's historic Gion district facing the vermilion Yasaka Shrine gate."
    },
    hints: {
      cars: { id: "Taksi sedan Toyota Crown Comfort warna hitam dengan lampu atap simbol daun semanggi (clover).", en: "Black MK taxis and Crown Comfort cabs topped with clover roof lights." },
      architecture: { id: "Gerbang kuil Yasaka merah dan toko teh machiya tradisional.", en: "Red shrine gate and traditional wooden machiya teahouses." },
      cultureOrFashion: { id: "Geiko dan wisatawan berkimono musim semi 2010.", en: "Geiko and visitors wearing traditional spring kimonos." }
    },
    streetViewOptions: { position: { lat: 35.0037, lng: 135.7772 }, pov: { heading: 90, pitch: 6, zoom: 1 } }
  }
];
