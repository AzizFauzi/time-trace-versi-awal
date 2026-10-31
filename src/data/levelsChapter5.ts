import { HistoricalPano } from './challenges';

export const LEVELS_81_TO_100: HistoricalPano[] = [
{
    id: "lvl-81-tokyo-skytree",
    levelNumber: 81,
    regions: ["global", "asia"],
    title: { id: "Tokyo Skytree: Derek Raksasa Puncak 2011", en: "Tokyo Skytree: Under Construction 2011" },
    city: "Tokyo",
    country: { id: "Jepang", en: "Japan" },
    realLocation: { lat: 35.7100, lng: 139.8107 },
    targetYear: 2011,
    targetDateStr: { id: "April 2011", en: "April 2011" },
    description: {
      id: "Tokyo Skytree setinggi 634 meter di Sumida Tokyo sesaat setelah mencapai ketinggian penuhnya dengan derek konstruksi masih bertengger di puncak.",
      en: "The 634-meter Tokyo Skytree shortly after reaching its maximum height with heavy construction cranes still at the summit."
    },
    hints: {
      cars: { id: "Mobil kei car kotak Honda N-Box dan Daihatsu Tanto.", en: "Japanese boxy kei cars and delivery vans." },
      architecture: { id: "Dua derek perayap raksasa masih terpasang di antena puncak menara kisi baja.", en: "Massive construction cranes perched on top of the lattice tower." },
      cultureOrFashion: { id: "Warga lokal mendongak takjub memotret menara yang hampir selesai.", en: "Locals staring upward taking photos of the unfinished tower." }
    },
    streetViewOptions: { position: { lat: 35.7100, lng: 139.8107 }, pov: { heading: 10, pitch: 9, zoom: 1 } }
  },
  {
    id: "lvl-82-beijing-forbidden-city",
    levelNumber: 82,
    regions: ["global","asia"],
    title: {"id":"Kota Terlarang Beijing: Gerbang Tiananmen & Dinasti Abadi","en":"Forbidden City & Tiananmen Gate Beijing"},
    city: "Beijing",
    country: {"id":"Tiongkok","en":"China"},
    realLocation: { lat: 39.9055, lng: 116.3976 },
    targetYear: 2011,
    targetDateStr: {"id":"Oktober 2011","en":"October 2011"},
    description: {"id":"Gerbang Selatan Tiananmen menuju Kota Terlarang di Beijing dengan dinding merah bata, atap genteng kuning kekaisaran, dan potret raksasa bersejarah.","en":"Tiananmen Gate approaching the Forbidden City in Beijing with its crimson bastion walls and imperial glazed yellow roof tiles."},
    hints: {
      cars: { id: "Taksi sedan Hyundai Elantra dengan kombinasi warna dua nada hijau dan kuning.", en: "Two-tone green-and-yellow Hyundai Elantra taxi sedans on the wide boulevards." },
      architecture: {"id":"Gerbang istana kayu kekaisaran Tiongkok dengan jembatan batu marmer putih Jinshui.","en":"Imperial palace wooden gatehouse flanked by white marble Jinshui bridges."},
      cultureOrFashion: {"id":"Kerumunan turis domestik membawa bendera pemandu wisata kecil.","en":"Tour groups following guides with numbered pennants."}
    },
    streetViewOptions: { position: { lat: 39.9055, lng: 116.3976 }, pov: { heading: 0, pitch: 5, zoom: 1 } }
  },
{
    id: "lvl-83-london-kings-cross",
    levelNumber: 83,
    regions: ["global", "europe"],
    title: { id: "Stasiun King's Cross London 2008", en: "King's Cross Station London 2008" },
    city: "London",
    country: { id: "Inggris Raya", en: "United Kingdom" },
    realLocation: { lat: 51.5308, lng: -0.1238 },
    targetYear: 2008,
    targetDateStr: { id: "Agustus 2008", en: "August 2008" },
    description: {
      id: "Bagian depan Stasiun King's Cross London saat kanopi kubah kisi putih modern rancangan John McAslan belum dibangun di concourse barat.",
      en: "Front of King's Cross Station before the dramatic diagrid glass-and-steel western concourse roof was built."
    },
    hints: {
      cars: { id: "Bus merah bertingkat dua dan taksi kabin hitam klasik berplat nomor tahun 2008.", en: "Red double-deckers and classic black hackney carriages with 2008 British registration plates." },
      architecture: { id: "Fasad bata hijau tua sementara sebelum revitalisasi plaza batu King's Cross.", en: "Green prefabricated booking hall covering the Victorian brick arches." },
      cultureOrFashion: { id: "Penggemar Harry Potter mencari tanda Platform 9 3/4 di dinding bata lama.", en: "Harry Potter tourists looking for Platform 9 3/4." }
    },
    streetViewOptions: { position: { lat: 51.5308, lng: -0.1238 }, pov: { heading: 350, pitch: 5, zoom: 1 } }
  },
{
    id: "lvl-84-paris-bastille",
    levelNumber: 84,
    regions: ["global", "europe"],
    title: { id: "Place de la Bastille Paris 2008", en: "Place de la Bastille Paris 2008" },
    city: "Paris",
    country: { id: "Prancis", en: "France" },
    realLocation: { lat: 48.8532, lng: 2.3698 },
    targetYear: 2008,
    targetDateStr: { id: "Juni 2008", en: "June 2008" },
    description: {
      id: "Bundaran Place de la Bastille dengan Kolom Juli (Colonne de Juillet) saat Opera Bastille masih mendominasi bundaran penuh mobil.",
      en: "Place de la Bastille roundabout with the July Column while the plaza was still a busy multi-lane traffic circle."
    },
    hints: {
      cars: { id: "Peugeot 206 dan Renault Megane generasi awal 2000-an mengitari bundaran.", en: "Early 2000s Peugeot 206 and Renault Megane cars encircling the roundabout." },
      architecture: { id: "Bundaran masih dikelilingi aspal mobil penuh sebelum diperluas menjadi taman pejalan kaki.", en: "Roundabout has zero pedestrian extension toward the canal basin." },
      cultureOrFashion: { id: "Poster pengumuman pameran seni musim panas Paris 2008 di halte koran kiosque.", en: "Paris summer 2008 theater and opera posters on kiosks." }
    },
    streetViewOptions: { position: { lat: 48.8532, lng: 2.3698 }, pov: { heading: 70, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-85-new-york-high-line",
    levelNumber: 85,
    regions: ["global", "americas"],
    title: { id: "The High Line: Meatpacking District 2009", en: "The High Line: Meatpacking District 2009" },
    city: "New York City",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 40.7420, lng: -74.0080 },
    targetYear: 2009,
    targetDateStr: { id: "Juni 2009", en: "June 2009" },
    description: {
      id: "Taman layang The High Line di Manhattan tepat saat Seksi 1 pertama kali dibuka untuk umum pada Juni 2009.",
      en: "The High Line elevated linear park in Manhattan right as Section 1 first opened to the public in June 2009."
    },
    hints: {
      cars: { id: "Jalur rel layang di atas jalan Tenth Avenue dengan taksi Ford Crown Victoria kuning.", en: "Tenth Avenue below filled with yellow Crown Victoria cabs." },
      architecture: { id: "Bekas rel kereta barang layang yang baru ditanami ilalang taman dan rel kayu tua.", en: "Newly landscaped rail trestle with wildflowers and integrated wooden ties." },
      cultureOrFashion: { id: "Warga New York berbondong-bondong melihat taman layang baru dengan kamera digital.", en: "Crowds walking the brand-new elevated promenade." }
    },
    streetViewOptions: { position: { lat: 40.7420, lng: -74.0080 }, pov: { heading: 10, pitch: 4, zoom: 1 } }
  },
{
    id: "lvl-86-kyoto-fushimi-inari",
    levelNumber: 86,
    regions: ["global", "asia"],
    title: { id: "Fushimi Inari: Terowongan Seribu Gerbang Torii", en: "Fushimi Inari Thousand Torii Shrine" },
    city: "Kyoto",
    country: { id: "Jepang", en: "Japan" },
    realLocation: { lat: 34.9671, lng: 135.7727 },
    targetYear: 2012,
    targetDateStr: { id: "April 2012", en: "April 2012" },
    description: {
      id: "Lorong gerbang torii merah Senbon Torii di lereng Gunung Inari tempat pemujaan dewa kesuburan dan pertanian Shinto.",
      en: "Path through the thousands of vermilion torii gates (Senbon Torii) winding up sacred Mount Inari."
    },
    hints: {
      cars: { id: "Jalur tangga batu jalan kaki di lereng hutan tanpa jalan kendaraan.", en: "Stone pedestrian stairs winding into forest." },
      architecture: { id: "Ribuan tiang gerbang torii kayu merah dengan kaligrafi kanji nama donatur hitam.", en: "Endless corridor of vermilion torii gates carved with black kanji." },
      cultureOrFashion: { id: "Patung rubah kitsune memegang kunci lumbung padi di mulutnya.", en: "Stone fox (kitsune) statues holding scroll keys." }
    },
    streetViewOptions: { position: { lat: 34.9671, lng: 135.7727 }, pov: { heading: 120, pitch: 4, zoom: 1 } }
  },
  {
    id: "lvl-87-frankfurt-romerberg",
    levelNumber: 87,
    regions: ["global","europe"],
    title: {"id":"Römerberg Frankfurt: Alun-Alun Kayu & Pencakar Langit Main","en":"Römerberg Frankfurt: Half-Timber Plaza & Skyline"},
    city: "Frankfurt",
    country: {"id":"Jerman","en":"Germany"},
    realLocation: { lat: 50.1109, lng: 8.6821 },
    targetYear: 2008,
    targetDateStr: {"id":"Juli 2008","en":"July 2008"},
    description: {"id":"Alun-alun bersejarah Römerberg di Frankfurt dengan rumah kayu bertingkat Fachwerk abad pertengahan berlatar pencakar langit modern 'Mainhattan'.","en":"Historic Römerberg square in Frankfurt with half-timbered merchant facades contrasted against 'Mainhattan' bank towers."},
    hints: {
      cars: {"id":"Mobil sedan Opel Vectra dan Volkswagen Golf generasi ke-4.","en":"Classic German Opel Vectra and Golf Mk4 hatchbacks."},
      architecture: {"id":"Balai kota kuno Römer dengan fasad tiga atap pelana bertingkat gabled.","en":"The iconic tripartite gabled facade of the Römer city hall."},
      cultureOrFashion: {"id":"Air Mancur Keadilan Gerechtigkeitsbrunnen dan cangkir jus apel Apfelwein.","en":"Statue of Justitia and outdoor tavern patrons drinking Apfelwein."}
    },
    streetViewOptions: { position: { lat: 50.1109, lng: 8.6821 }, pov: { heading: 290, pitch: 5, zoom: 1 } }
  },
  {
    id: "lvl-88-sao-paulo-paulista",
    levelNumber: 88,
    regions: ["global","americas"],
    title: {"id":"Avenida Paulista & Museum Seni MASP: Megapolitan Amerika Latin","en":"Avenida Paulista & MASP Sao Paulo"},
    city: "Sao Paulo",
    country: {"id":"Brasil","en":"Brazil"},
    realLocation: { lat: -23.5615, lng: -46.6559 },
    targetYear: 2012,
    targetDateStr: {"id":"Agustus 2012","en":"August 2012"},
    description: {"id":"Jantung finansial Amerika Latin di Avenida Paulista Sao Paulo dengan Museum Seni Modern MASP ditopang empat balok beton merah melayang.","en":"Latin America's financial pulse along Avenida Paulista in Sao Paulo featuring MASP suspended on four red concrete pillars."},
    hints: {
      cars: {"id":"Bus kota gandeng kuning SPTrans dan mobil Fiat Uno kotak.","en":"Yellow SPTrans articulated city buses and classic boxy Fiat Unos."},
      architecture: {"id":"Gedung museum brutalist MASP karya Lina Bo Bardi melayang bebas di atas plaza.","en":"Brutalist glass box of MASP floating above the open public esplanade."},
      cultureOrFashion: {"id":"Seniman jalanan dan kerumunan pekerja kantoran berbusana santai.","en":"Street vendors, musicians, and bustling urban crowds."}
    },
    streetViewOptions: { position: { lat: -23.5615, lng: -46.6559 }, pov: { heading: 40, pitch: 5, zoom: 1 } }
  },
  {
    id: "lvl-89-bogota-plaza-bolivar",
    levelNumber: 89,
    regions: ["global","americas"],
    title: {"id":"Plaza de Bolívar Bogota: Jantung Pegunungan Andes","en":"Plaza de Bolívar Bogota: Andean Capital Square"},
    city: "Bogota",
    country: {"id":"Kolombia","en":"Colombia"},
    realLocation: { lat: 4.5981, lng: -74.076 },
    targetYear: 2013,
    targetDateStr: {"id":"September 2013","en":"September 2013"},
    description: {"id":"Plaza de Bolívar di ketinggian 2.600 meter di Bogota Kolombia menghadap Katedral Primada dengan latar tebing hijau Monserrate.","en":"Plaza de Bolívar at 2,600m elevation in Bogota Colombia facing the Primatial Cathedral against Mount Monserrate."},
    hints: {
      cars: {"id":"Bus TransMilenio merah gandeng di koridor jalan raya Carrera 10.","en":"Red articulated TransMilenio BRT buses on nearby avenues."},
      architecture: {"id":"Katedral batu kapur neoklasik beratap kembar dan Istana Kehakiman.","en":"Neoclassical cathedral and the Palace of Justice framing the stone plaza."},
      cultureOrFashion: {"id":"Ribuan merpati beterbangan diberi makan oleh keluarga berjaket tebal pegunungan.","en":"Thousands of pigeons flocking around families in Andean wool jackets."}
    },
    streetViewOptions: { position: { lat: 4.5981, lng: -74.076 }, pov: { heading: 90, pitch: 5, zoom: 1 } }
  },
{
    id: "lvl-90-rio-maracana-stadium",
    levelNumber: 90,
    regions: ["global", "americas"],
    title: { id: "Stadion Maracanã: Renovasi Piala Dunia 2012", en: "Maracanã Stadium Rio: World Cup Overhaul 2012" },
    city: "Rio de Janeiro",
    country: { id: "Brasil", en: "Brazil" },
    realLocation: { lat: -22.9121, lng: -43.2302 },
    targetYear: 2012,
    targetDateStr: { id: "Januari 2012", en: "January 2012" },
    description: {
      id: "Stadion legendaris Maracanã di Rio de Janeiro saat atap beton lama dibongkar dan diganti atap membran kabel menjelang Piala Dunia FIFA 2014.",
      en: "Legendary Maracanã Stadium in Rio de Janeiro under massive reconstruction replacing the concrete roof with tensile fabric."
    },
    hints: {
      cars: { id: "Mobil sedan Volkswagen Gol dan Chevrolet Celta warna silver khas Brasil.", en: "Volkswagen Gol and Chevrolet Celta compact cars." },
      architecture: { id: "Derek konstruksi crane raksasa menjulang di dalam stadion merombak tribun.", en: "Giant yellow crawler cranes inside the gutted stadium bowl." },
      cultureOrFashion: { id: "Papan pengumuman persiapan tuan rumah Piala Dunia 2014 dan Olimpiade Rio 2016.", en: "Signs advertising FIFA World Cup 2014 host preparations." }
    },
    streetViewOptions: { position: { lat: -22.9121, lng: -43.2302 }, pov: { heading: 110, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-91-dubai-palm-atlantis",
    levelNumber: 91,
    regions: ["global"],
    title: { id: "Palm Jumeirah & Atlantis The Palm 2014", en: "Palm Jumeirah & Atlantis Resort 2014" },
    city: "Dubai",
    country: { id: "Uni Emirat Arab", en: "United Arab Emirates" },
    realLocation: { lat: 25.1305, lng: 55.1172 },
    targetYear: 2014,
    targetDateStr: { id: "Oktober 2014", en: "October 2014" },
    description: {
      id: "Ujung lengkung sabit pulau buatan Palm Jumeirah di depan gerbang megah resor Atlantis The Palm.",
      en: "Crescent breakwater of the artificial Palm Jumeirah island facing the monumental Atlantis The Palm resort."
    },
    hints: {
      cars: { id: "Kereta layang Palm Monorail melintas di jalur rel tunggal di atas air teluk.", en: "Palm Jumeirah elevated straddle monorail track." },
      architecture: { id: "Istana megah merah muda berarsitektur kubah Arab dan gerbang lengkung dongeng.", en: "Pink Arabian-themed palace hotel with grand central keyhole arch." },
      cultureOrFashion: { id: "Wisatawan taman air aquaventure membawa pelampung ban.", en: "Waterpark tourists carrying swim tubes and beachwear." }
    },
    streetViewOptions: { position: { lat: 25.1305, lng: 55.1172 }, pov: { heading: 0, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-92-san-francisco-lombard",
    levelNumber: 92,
    regions: ["global", "americas"],
    title: { id: "Lombard Street: Jalan Paling Berkelok di Dunia", en: "Lombard Street: Crookedest Street 2008" },
    city: "San Francisco",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 37.8021, lng: -122.4187 },
    targetYear: 2008,
    targetDateStr: { id: "Mei 2008", en: "May 2008" },
    description: {
      id: "Jalan Lombard Street San Francisco dengan 8 tikungan tajam beraspal bata merah dihiasi bunga hydrangea.",
      en: "Lombard Street in Russian Hill featuring eight hairpin turns on a steep red-brick road lined with hydrangeas."
    },
    hints: {
      cars: { id: "Mobil-mobil menuruni jalan dengan kecepatan 5 mil per jam satu per satu.", en: "Cars creeping down hairpin turns single-file at 5 mph." },
      architecture: { id: "Rumah-rumah bergaya Victoria dan Edwardian bertingkat di lereng Russian Hill.", en: "Victorian and Edwardian townhouses on steep hills." },
      cultureOrFashion: { id: "Pemandangan menara Coit Tower di bukit Telegraph Hill di seberang timur.", en: "Coit Tower visible atop Telegraph Hill to the east." }
    },
    streetViewOptions: { position: { lat: 37.8021, lng: -122.4187 }, pov: { heading: 85, pitch: 4, zoom: 1 } }
  },
{
    id: "lvl-93-rome-trevi-fountain",
    levelNumber: 93,
    regions: ["global", "europe"],
    title: { id: "Air Mancur Trevi: Renovasi Perancah 2014", en: "Trevi Fountain Scaffolding Restoration 2014" },
    city: "Rome",
    country: { id: "Italia", en: "Italy" },
    realLocation: { lat: 41.9009, lng: 12.4833 },
    targetYear: 2014,
    targetDateStr: { id: "Juli 2014", en: "July 2014" },
    description: {
      id: "Air mancur barok paling terkenal di dunia Fontana di Trevi saat airnya dikuras dan dipasangi jembatan kaca observasi saat pemugaran Fendi 2014.",
      en: "Fontana di Trevi during its major 2014 restoration, drained of water with a clear footbridge for tourists to view the stone sculptures."
    },
    hints: {
      cars: { id: "Gang-gang sempit berbatu bulat sanpietrini bebas kendaraan bermotor.", en: "Sanpietrini cobblestone pedestrian alleyways." },
      architecture: { id: "Kolam marmer air mancur dikeringkan dengan jembatan suspended transparan melintang.", en: "Drained fountain basin with a temporary suspended footbridge." },
      cultureOrFashion: { id: "Turis melempar koin ke dalam bak kecil sementara di depan patung Oceanus.", en: "Tourists tossing coins into a temporary small pool trough." }
    },
    streetViewOptions: { position: { lat: 41.9009, lng: 12.4833 }, pov: { heading: 140, pitch: 6, zoom: 1 } }
  },
  {
    id: "lvl-94-rotterdam-erasmus-bridge",
    levelNumber: 94,
    regions: ["global","europe"],
    title: {"id":"Jembatan Erasmus 'Sang Angsa': Pelabuhan Terbesar Eropa","en":"Erasmus Bridge 'The Swan' Rotterdam"},
    city: "Rotterdam",
    country: {"id":"Belanda","en":"Netherlands"},
    realLocation: { lat: 51.909, lng: 4.487 },
    targetYear: 2009,
    targetDateStr: {"id":"September 2009","en":"September 2009"},
    description: {"id":"Jembatan gantung kabel Erasmusbrug setinggi 139 meter di Rotterdam melintasi Sungai Nieuwe Maas menghubungkan distrik pelabuhan futuristik.","en":"The 139-meter cable-stayed Erasmus Bridge nicknamed 'The Swan' spanning the Nieuwe Maas river in Rotterdam."},
    hints: {
      cars: {"id":"Trem RET abu-abu perak melintas di lajur tengah jembatan.","en":"Silver RET city trams crossing the bridge's dedicated central tracks."},
      architecture: {"id":"Tiang pylon tunggal asimetris warna putih menjulang berbentuk leher angsa.","en":"Iconic white asymmetric pylon towering 139 meters skyward."},
      cultureOrFashion: {"id":"Kapal tongkang kargo sungai kontainer melaju tenang di bawah bentang jembatan.","en":"Inland container cargo barges cruising toward Rotterdam Europort."}
    },
    streetViewOptions: { position: { lat: 51.909, lng: 4.487 }, pov: { heading: 170, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-95-sydney-bondi-beach",
    levelNumber: 95,
    regions: ["global"],
    title: { id: "Pantai Bondi & Kolam Ombak Icebergs 2010", en: "Bondi Beach & Icebergs Pool Sydney 2010" },
    city: "Sydney",
    country: { id: "Australia", en: "Australia" },
    realLocation: { lat: -33.8915, lng: 151.2767 },
    targetYear: 2010,
    targetDateStr: { id: "April 2010", en: "April 2010" },
    description: {
      id: "Jalur tebing Pantai Bondi Sydney menghadap kolam renang air laut ikonik Bondi Icebergs yang terhempas ombak Samudra Pasifik.",
      en: "Bondi to Bronte coastal path overlooking Bondi Icebergs ocean saltwater pool crashing with waves."
    },
    hints: {
      cars: { id: "Mobil ute pick-up Holden Commodore dan Ford Falcon di tempat parkir pantai.", en: "Australian Holden and Ford utes parked by the pavilion." },
      architecture: { id: "Kolam renang pualam putih bertingkat langsung bersentuhan dengan pecahan ombak laut.", en: "Ocean baths pool jutting directly into the Pacific breakers." },
      cultureOrFashion: { id: "Peselancar membawa papan selancar fiberglass tanpa wetsuit tebal musim gugur.", en: "Surfers carrying fiberglass shortboards along Campbell Parade." }
    },
    streetViewOptions: { position: { lat: -33.8915, lng: 151.2767 }, pov: { heading: 10, pitch: 4, zoom: 1 } }
  },
{
    id: "lvl-96-berlin-checkpoint-charlie",
    levelNumber: 96,
    regions: ["global", "europe"],
    title: { id: "Checkpoint Charlie: Friedrichstraße Berlin 2008", en: "Checkpoint Charlie Berlin 2008" },
    city: "Berlin",
    country: { id: "Jerman", en: "Germany" },
    realLocation: { lat: 52.5074, lng: 13.3904 },
    targetYear: 2008,
    targetDateStr: { id: "Juli 2008", en: "July 2008" },
    description: {
      id: "Pos perbatasan legendaris Perang Dingin Checkpoint Charlie di Friedrichstraße Berlin memisahkan sektor Amerika dan Soviet.",
      en: "Cold War border crossing Checkpoint Charlie on Friedrichstraße in Berlin during the early Street View era."
    },
    hints: {
      cars: { id: "Mobil Trabant P601 2-tak klasik warna pastel diparkir untuk tur 'Trabi Safari'.", en: "Classic East German Trabant cars parked for safari tours." },
      architecture: { id: "Pos jaga kayu putih berkarung pasir 'US Army Checkpoint' di tengah jalan raya.", en: "White wooden guardhouse with sandbags in the street median." },
      cultureOrFashion: { id: "Papan tanda terkenal empat bahasa: 'YOU ARE LEAVING THE AMERICAN SECTOR'.", en: "Famous quad-lingual sign: 'YOU ARE LEAVING THE AMERICAN SECTOR'." }
    },
    streetViewOptions: { position: { lat: 52.5074, lng: 13.3904 }, pov: { heading: 180, pitch: 4, zoom: 1 } }
  },
{
    id: "lvl-97-singapore-gardens-by-the-bay",
    levelNumber: 97,
    regions: ["global", "asia"],
    title: { id: "Gardens by the Bay: Supertree Grove 2012", en: "Gardens by the Bay: Supertree Grove 2012" },
    city: "Singapore",
    country: { id: "Singapura", en: "Singapore" },
    realLocation: { lat: 1.2816, lng: 103.8636 },
    targetYear: 2012,
    targetDateStr: { id: "Juli 2012", en: "July 2012" },
    description: {
      id: "Taman futuristik Gardens by the Bay Singapura sesaat setelah pertama kali dibuka untuk umum pada pertengahan 2012.",
      en: "Futuristic Gardens by the Bay in Singapore shortly after its grand opening in mid-2012."
    },
    hints: {
      cars: { id: "Jalur internal taman bebas mobil dengan buggy listrik ramah lingkungan.", en: "Green garden interior path with electric shuttle buggies." },
      architecture: { id: "Struktur menara vertikal Supertree setinggi 25-50 meter dengan jembatan gantung OCBC Skyway.", en: "Supertree vertical gardens connected by the aerial skyway bridge." },
      cultureOrFashion: { id: "Dua kubah kaca raksasa Flower Dome dan Cloud Forest baru beroperasi.", en: "The two massive glass conservatories freshly opened." }
    },
    streetViewOptions: { position: { lat: 1.2816, lng: 103.8636 }, pov: { heading: 320, pitch: 7, zoom: 1 } }
  },
{
    id: "lvl-98-santa-monica-pier",
    levelNumber: 98,
    regions: ["global", "americas"],
    title: { id: "Santa Monica Pier: Ujung Rute 66 California", en: "Santa Monica Pier & Route 66 End" },
    city: "Santa Monica",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 34.0099, lng: -118.4965 },
    targetYear: 2009,
    targetDateStr: { id: "Maret 2009", en: "March 2009" },
    description: {
      id: "Dermaga kayu Santa Monica Pier menghadap wahana bianglala bertenaga surya Pacific Park dan plang ujung barat Route 66.",
      en: "Wooden Santa Monica Pier featuring Pacific Park's solar-powered Ferris wheel and the 'End of the Trail' Route 66 sign."
    },
    hints: {
      cars: { id: "Dek kayu dermaga dengan mobil patroli pantai Lifeguard Toyota Tacoma.", en: "Beach lifeguard trucks parked on the heavy wooden planks." },
      architecture: { id: "Bianglala Pacific Wheel dan roller coaster West Coaster di atas laut.", en: "Ferris wheel and roller coaster perched above the ocean." },
      cultureOrFashion: { id: "Plang penanda legendaris 'Santa Monica 66: End of the Trail'.", en: "Iconic sign: 'Route 66 End of the Trail'." }
    },
    streetViewOptions: { position: { lat: 34.0099, lng: -118.4965 }, pov: { heading: 250, pitch: 4, zoom: 1 } }
  },
  {
    id: "lvl-99-geneva-jet-deau",
    levelNumber: 99,
    regions: ["global","europe"],
    title: {"id":"Jet d'Eau Jenewa: Air Mancur 140 Meter Danau Jenewa","en":"Jet d'Eau Geneva: 140m Fountain on Lake Geneva"},
    city: "Geneva",
    country: {"id":"Swiss","en":"Switzerland"},
    realLocation: { lat: 46.2074, lng: 6.1559 },
    targetYear: 2009,
    targetDateStr: {"id":"Agustus 2009","en":"August 2009"},
    description: {"id":"Semburan air raksasa Jet d'Eau setinggi 140 meter di Danau Jenewa Swiss dengan latar belakang pegunungan Alpen dan Mont Blanc.","en":"The soaring 140-meter Jet d'Eau water plume on Lake Geneva in Switzerland against the panoramic backdrop of the Alps."},
    hints: {
      cars: {"id":"Taksi perahu air kuning 'Mouettes Genevoises' menyeberangi danau.","en":"Yellow 'Mouettes Genevoises' passenger water-taxi boats."},
      architecture: {"id":"Dermaga batu pelindung ombak dan hotel-hotel mewah bergaya belle époque.","en":"Stone jetty pier leading to the nozzle and Belle Époque waterfront hotels."},
      cultureOrFashion: {"id":"Pelangi air terbentuk di kabut semprotan Jet d'Eau diterpa angin musim panas.","en":"Air mist rainbows forming in the 500-liter-per-second water geyser."}
    },
    streetViewOptions: { position: { lat: 46.2074, lng: 6.1559 }, pov: { heading: 60, pitch: 6, zoom: 1 } }
  },
{
    id: "lvl-100-googleplex-mountain-view",
    levelNumber: 100,
    regions: ["global", "americas"],
    title: { id: "Grandmaster Finale: Kelahiran Google Street View 2007", en: "Grandmaster Finale: Birthplace of Street View 2007" },
    city: "Mountain View, California",
    country: { id: "Amerika Serikat", en: "United States" },
    realLocation: { lat: 37.4220, lng: -122.0841 },
    targetYear: 2007,
    targetDateStr: { id: "Mei 2007", en: "May 2007" },
    description: {
      id: "LEVEL 100 FINALE: Markas Besar Googleplex di Mountain View California pada Mei 2007 saat Larry Page dan tim pertama kali menguji mobil kamera van Street View di jalanan kantor sebelum meluncurkannya ke seluruh dunia!",
      en: "LEVEL 100 FINALE: Googleplex Headquarters in Mountain View California in May 2007 where Larry Page and the earliest team test-drove the very first Street View camera vans before launching to the globe!"
    },
    hints: {
      cars: { id: "Mobil hybrid Toyota Prius generasi ke-2 dengan logo 'Google' dan kamera laser tiang atas.", en: "Second-gen Toyota Prius hybrids with early rooftop camera masts." },
      architecture: { id: "Gedung ikonik Google Building 43 dengan panel surya dan payung pantai warna primer Google.", en: "Googleplex Building 43 with primary-color patio umbrellas." },
      cultureOrFashion: { id: "Sepeda warna-warni Google Bike G-Bike dan karyawan membawa laptop ThinkPad era 2007.", en: "Colorful G-Bikes and engineers with 2007 laptops." }
    },
    streetViewOptions: { position: { lat: 37.4220, lng: -122.0841 }, pov: { heading: 340, pitch: 4, zoom: 1 } }
  }
];
