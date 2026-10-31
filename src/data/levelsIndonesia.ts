import { HistoricalPano } from './challenges';

/**
 * 50 Kasus Arsip Sejarah Nusantara - Mode Khusus 'Jelajah Indonesia'
 * Menjelajahi jejak sejarah ikonik dari Sabang sampai Merauke
 */
export const LEVELS_JELAJAH_INDONESIA: HistoricalPano[] = [
{
    id: "indo-1-jakarta-bundaran-hi",
    levelNumber: 1,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Bundaran HI: Awal Penggalian MRT", en: "Bundaran HI: Dawn of Jakarta MRT" },
    city: "Jakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.1950, lng: 106.8230 },
    targetYear: 2014,
    targetDateStr: { id: "September 2014", en: "September 2014" },
    description: {
      id: "Bundaran HI Jakarta saat Street View resmi pertama kali meluncur di Indonesia. Tampak pagar proyek MRT baru dipasang.",
      en: "Bundaran HI when Street View launched in Indonesia, showing newly erected MRT green construction fences."
    },
    hints: {
      cars: { id: "Taksi Blue Bird Toyota Limo biru lawas.", en: "Classic Blue Bird Toyota Limo sedans." },
      architecture: { id: "Pagar seng proyek MRT Fase 1 baru terpasang.", en: "Green construction hoardings for MRT Phase 1 excavation." },
      cultureOrFashion: { id: "Bus TransJakarta gandeng oranye-merah lawas.", en: "Vintage orange-red articulated TransJakarta BRT bus." }
    },
    streetViewOptions: { position: { lat: -6.1950, lng: 106.8230 }, pov: { heading: 320, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-2-yogyakarta-malioboro",
    levelNumber: 2,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Malioboro: Sebelum Zona Pedestrian", en: "Malioboro: Before Pedestrian Plaza" },
    city: "Yogyakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.7928, lng: 110.3658 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Jalan Malioboro Yogyakarta saat trotoar masih dipadati deretan sepeda motor parkir dan pedagang tenda terpal sebelum direvitalisasi.",
      en: "Malioboro Street Yogyakarta before full pedestrianization, lined with parked scooters and tarp-roof kiosks."
    },
    hints: {
      cars: { id: "Andong delman kuda dan motor Yamaha Mio karbu.", en: "Horse carriages (andong) and older Mio scooters." },
      architecture: { id: "Trotoar semen lawas tanpa bangku besi tempa modern.", en: "Old concrete walkway before andesite stone benches." },
      cultureOrFashion: { id: "Spanduk kain sablon toko batik klasik.", en: "Traditional fabric batik shop signboards." }
    },
    streetViewOptions: { position: { lat: -7.7928, lng: 110.3658 }, pov: { heading: 185, pitch: 3, zoom: 1 } }
  },
{
    id: "indo-3-bandung-gedung-sate",
    levelNumber: 3,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Gedung Sate & Gasibu Tempo 2015", en: "Gedung Sate Bandung 2015" },
    city: "Bandung",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.9024, lng: 107.6186 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Kawasan Gasibu dan Gedung Sate Bandung sebelum revitalisasi lintasan lari sintetis modern.",
      en: "Gasibu field and Gedung Sate before the modern synthetic running track upgrade."
    },
    hints: {
      cars: { id: "Angkot hijau bergaris kuning dengan trayek lokal melintas di depan kompleks berpohon rindang.", en: "Green-and-yellow local minibuses (Angkot) navigating tree-lined provincial avenues." },
      architecture: { id: "Pagar taman luar Gasibu model lawas.", en: "Old outer boundary fence of Gasibu park." },
      cultureOrFashion: { id: "Kaos distro indie khas Bandung 2015.", en: "Bandung indie fashion distro t-shirts." }
    },
    streetViewOptions: { position: { lat: -6.9024, lng: 107.6186 }, pov: { heading: 25, pitch: 6, zoom: 1 } }
  },
{
    id: "indo-4-surabaya-jembatan-merah",
    levelNumber: 4,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Merah: Kota Tua Surabaya", en: "Red Bridge & Surabaya Old Town" },
    city: "Surabaya",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.2355, lng: 112.7381 },
    targetYear: 2015,
    targetDateStr: { id: "Mei 2015", en: "May 2015" },
    description: {
      id: "Kawasan bersejarah Jembatan Merah Surabaya tahun 2015 dengan lalu lalang angkot bemo lyn khas.",
      en: "Historical Red Bridge in Surabaya during 2015 with classic Bemo Lyn passenger vans."
    },
    hints: {
      cars: { id: "Angkot Bemo Lyn Suzuki Carry warna kuning-hijau.", en: "Yellow-green Suzuki Carry Bemo minibuses." },
      architecture: { id: "Gedung kolonial tua sebelum renovasi cat Kota Lama.", en: "Old colonial warehouses before the Old Town revitalization." },
      cultureOrFashion: { id: "Gerobak dorong pasar tradisional Pabean.", en: "Traditional wooden handcarts near Pabean market." }
    },
    streetViewOptions: { position: { lat: -7.2355, lng: 112.7381 }, pov: { heading: 140, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-5-bali-kuta-beach",
    levelNumber: 5,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Kuta: Dinding Merah Lawas 2014", en: "Kuta Beach: Classic Red Wall 2014" },
    city: "Kuta, Bali",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.7180, lng: 115.1685 },
    targetYear: 2014,
    targetDateStr: { id: "September 2014", en: "September 2014" },
    description: {
      id: "Jalan Pantai Kuta Bali tahun 2014 sebelum dibangunnya dinding penahan ombak beton tinggi pada 2022.",
      en: "Kuta Beach road Bali in 2014 before the tall concrete tsunami-revetment wall was built in 2022."
    },
    hints: {
      cars: { id: "Suzuki Katana rental dan motor bebek Vario karburator.", en: "Suzuki Katana rentals and carbureted Vario scooters." },
      architecture: { id: "Dinding bata merah rendah pantai Kuta lama.", en: "Original low red-brick beach boundary wall." },
      cultureOrFashion: { id: "Singlet Bir Bintang dan kacamata surfer 2014.", en: "Bintang Beer tank tops and 2014 neon surf gear." }
    },
    streetViewOptions: { position: { lat: -8.7180, lng: 115.1685 }, pov: { heading: 290, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-6-jakarta-kota-tua",
    levelNumber: 6,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Museum Fatahillah: Kota Tua Jakarta", en: "Fatahillah Square: Old Batavia Jakarta" },
    city: "Jakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.1352, lng: 106.8133 },
    targetYear: 2014,
    targetDateStr: { id: "Oktober 2014", en: "October 2014" },
    description: {
      id: "Taman Fatahillah Kota Tua Jakarta pada 2014 dengan sepeda ontel warna-warni dan topi laken noni Belanda.",
      en: "Fatahillah Square in Jakarta's Old Town with colorful rental vintage bicycles and sun hats in 2014."
    },
    hints: {
      cars: { id: "Bajaj oranye 2-tak masih berseliweran di tepi jalan.", en: "Classic 2-stroke orange Bajaj 3-wheelers nearby." },
      architecture: { id: "Gedung Museum Fatahillah sebelum penataan plaza modern.", en: "Fatahillah Museum before latest plaza paving upgrade." },
      cultureOrFashion: { id: "Sepeda ontel warna merah-kuning dengan topi laken.", en: "Rental colonial bicycles with broad sun hats." }
    },
    streetViewOptions: { position: { lat: -6.1352, lng: 106.8133 }, pov: { heading: 200, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-7-yogyakarta-tugu",
    levelNumber: 7,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Tugu Pal Putih Yogyakarta", en: "Tugu Yogyakarta Heritage" },
    city: "Yogyakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.7829, lng: 110.3671 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Simpang Tugu Pal Putih Yogyakarta pada 2015 sebelum penataan kabel bawah tanah dan pembatasan pagar pembatas batu melingkar.",
      en: "Tugu Yogyakarta intersection in 2015 before overhead wire removal and modern plaza paving."
    },
    hints: {
      cars: { id: "Becak kayuh kayu dan motor bebek Honda Astrea Grand.", en: "Traditional cycle rickshaws and old Honda Astrea Grand bikes." },
      architecture: { id: "Kabel listrik udara yang masih melintang di sekitar Tugu Pal Putih.", en: "Overhead power cables still crisscrossing around Tugu." },
      cultureOrFashion: { id: "Spanduk warung angkringan nasi kucing khas Yogya.", en: "Angkringan street food stall cloth banners." }
    },
    streetViewOptions: { position: { lat: -7.7829, lng: 110.3671 }, pov: { heading: 180, pitch: 6, zoom: 1 } }
  },
{
    id: "indo-8-borobudur-magelang",
    levelNumber: 8,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Candi Borobudur: Pelataran Kenari", en: "Borobudur Temple Grounds" },
    city: "Magelang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.6079, lng: 110.2038 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Jalur pejalan kaki menuju Candi Borobudur saat dokumentasi khusus Street View Trekker tempat wisata warisan dunia UNESCO.",
      en: "Walkway approaching Borobudur Temple documented by Google's backpack Trekker cameras."
    },
    hints: {
      cars: { id: "Kereta kelinci odong-odong wisata di jalan akses luar.", en: "Tourist tram carts on the perimeter service roads." },
      architecture: { id: "Siluet stupa batu vulkanik megah Candi Borobudur.", en: "Majestic volcanic stone stupas of Borobudur." },
      cultureOrFashion: { id: "Wisatawan mengenakan sarung batik kain jarik biru.", en: "Visitors wearing mandatory blue batik visitor sarongs." }
    },
    streetViewOptions: { position: { lat: -7.6079, lng: 110.2038 }, pov: { heading: 250, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-9-bandung-braga",
    levelNumber: 9,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jalan Braga: Parijs van Java 2015", en: "Braga Street Bandung 2015" },
    city: "Bandung",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.9175, lng: 107.6098 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Jalan Braga Kota Bandung dengan lantai batu andesit legendaris dan etalase lukisan cat minyak trotoar.",
      en: "Historic Braga Street in Bandung with cobblestone paving and roadside oil paintings on display."
    },
    hints: {
      cars: { id: "Mobil sedan lawas dan motor Vespa klasik 2-tak.", en: "Old retro sedans and vintage 2-stroke Vespa scooters." },
      architecture: { id: "Gedung art-deco peninggalan Belanda era Hindia Belanda.", en: "Art deco colonial storefronts from Dutch East Indies." },
      cultureOrFashion: { id: "Pelukis trotoar jalanan dan pemuda berjaket jeans.", en: "Street artists and locals in denim jackets." }
    },
    streetViewOptions: { position: { lat: -6.9175, lng: 107.6098 }, pov: { heading: 175, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-10-semarang-simpang-lima",
    levelNumber: 10,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Simpang Lima Semarang 2015", en: "Simpang Lima Square Semarang" },
    city: "Semarang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.9903, lng: 110.4229 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Kawasan pusat keramaian Lapangan Simpang Lima Semarang tahun 2015 menghadap Mal Ciputra dan Masjid Baiturrahman.",
      en: "Simpang Lima square in Semarang during 2015 facing Ciputra Mall and Baiturrahman Grand Mosque."
    },
    hints: {
      cars: { id: "Mobil hias gowes kayuh lampu LED hias Simpang Lima.", en: "Illuminated pedal carts parked around the grass field." },
      architecture: { id: "Gedung Mal Ciputra dengan baliho merek ponsel 2015.", en: "Ciputra Mall facade with mid-2010s smartphone ads." },
      cultureOrFashion: { id: "Warung tenda kuliner tahu gimbal dan lunpia Semarang.", en: "Semarang culinary food stalls for tahu gimbal and lunpia." }
    },
    streetViewOptions: { position: { lat: -6.9903, lng: 110.4229 }, pov: { heading: 320, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-11-solo-pasar-gede",
    levelNumber: 11,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pasar Gede Harjonagoro Solo", en: "Pasar Gede Heritage Solo" },
    city: "Surakarta (Solo)",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.5701, lng: 110.8296 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Pasar Gede Solo karya arsitek Thomas Karsten dengan gapura atap limasan Belanda-Jawa yang khas.",
      en: "Pasar Gede market in Solo designed by architect Thomas Karsten combining Dutch and Javanese roofing."
    },
    hints: {
      cars: { id: "Becak kayuh tradisional beratap lengkung bulat khas wilayah Mataram Islam.", en: "Traditional round-canopy cycle rickshaws lined up outside the bustling market." },
      architecture: { id: "Menara jam pasar kuno dan gapura bertuliskan aksara Jawa.", en: "Historic market clock tower and Javanese script carvings." },
      cultureOrFashion: { id: "Ibu-ibu penjual dawet selasih memakai kain lurik.", en: "Market vendors in traditional Javanese lurik aprons." }
    },
    streetViewOptions: { position: { lat: -7.5701, lng: 110.8296 }, pov: { heading: 350, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-12-malang-kayutangan",
    levelNumber: 12,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Kayutangan Malang: Sebelum Jalur Heritage", en: "Kayutangan Malang: Pre-Heritage Overhaul" },
    city: "Malang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.9774, lng: 112.6305 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Jalan Basuki Rahmat (Kayutangan) Kota Malang sebelum proyek koridor pedestrian heritage dan lampu gantung klasik.",
      en: "Kayutangan corridor in Malang before the recent heritage pedestrian revitalization and historic streetlamps."
    },
    hints: {
      cars: { id: "Mikrolet angkot warna biru dengan kode trayek singkatan di kaca depan (AG/LDG).", en: "Iconic blue passenger minibuses (Mikrolet) with route code acronyms on windshields." },
      architecture: { id: "Gereja Kayutangan Hati Kudus Yesus berarsitektur neo-gotik.", en: "Neo-gothic Sacred Heart Church Kayutangan." },
      cultureOrFashion: { id: "Spanduk kuliner toko roti Oen jadul.", en: "Vintage Toko Oen bakery advertising banners." }
    },
    streetViewOptions: { position: { lat: -7.9774, lng: 112.6305 }, pov: { heading: 170, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-13-suramadu-bridge",
    levelNumber: 13,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Suramadu: Gerbang Tol Selat Madura", en: "Suramadu Bridge Toll Plaza" },
    city: "Surabaya",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.1996, lng: 112.7797 },
    targetYear: 2015,
    targetDateStr: { id: "Mei 2015", en: "May 2015" },
    description: {
      id: "Jembatan Nasional Suramadu yang menghubungkan Surabaya dan Pulau Madura saat tarif tol jembatan masih berbayar.",
      en: "Suramadu National Bridge connecting Java and Madura island while it was still a paid toll expressway."
    },
    hints: {
      cars: { id: "Jalur motor roda dua terpisah di sisi luar jembatan.", en: "Dedicated motorcycle lanes on the outer flanks." },
      architecture: { id: "Menara kabel jembatan cable-stayed bentang tengah megah.", en: "Cable-stayed pylon towers crossing Madura Strait." },
      cultureOrFashion: { id: "Gerbang tol tarif tunai sebelum sistem kartu tap e-toll penuh.", en: "Cash toll booths before 100% cashless payment." }
    },
    streetViewOptions: { position: { lat: -7.1996, lng: 112.7797 }, pov: { heading: 30, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-14-bali-ubud-monkey-forest",
    levelNumber: 14,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Ubud Monkey Forest: Hutan Suci Wanara Wana", en: "Ubud Monkey Forest Sanctuary Bali" },
    city: "Ubud, Bali",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.5188, lng: 115.2588 },
    targetYear: 2014,
    targetDateStr: { id: "Oktober 2014", en: "October 2014" },
    description: {
      id: "Jalan Monkey Forest Ubud Bali tahun 2014 dengan butik seni perak dan kafe organik khas pegunungan Gianyar.",
      en: "Monkey Forest road in Ubud Bali in 2014 lined with silver jewelry boutiques and organic hillside cafes."
    },
    hints: {
      cars: { id: "Mobil van pariwisata Isuzu Elf dan Suzuki APV warna perak dengan plat nomor DK.", en: "Silver Isuzu Elf tourist vans and Suzuki APV shuttles bearing DK registration plates." },
      architecture: { id: "Gapura candi bentar batu paras abu-abu khas Bali.", en: "Carved volcanic tuff stone split gates (candi bentar)." },
      cultureOrFashion: { id: "Papan tanda kelas yoga dan toko pakaian katun bohemian.", en: "Yoga class signboards and bohemian linen clothing stalls." }
    },
    streetViewOptions: { position: { lat: -8.5188, lng: 115.2588 }, pov: { heading: 190, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-15-bali-tanah-lot",
    levelNumber: 15,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pura Tanah Lot: Karang Laut Tabanan", en: "Tanah Lot Sea Temple Bali" },
    city: "Tabanan, Bali",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.6212, lng: 115.0868 },
    targetYear: 2014,
    targetDateStr: { id: "Oktober 2014", en: "October 2014" },
    description: {
      id: "Jalur tebing memandang Pura Tanah Lot di atas bongkahan karang laut saat air laut surut sore hari.",
      en: "Cliffside viewpoint of Tanah Lot sea temple perched on offshore sea rocks at low tide."
    },
    hints: {
      cars: { id: "Kendaraan golf cart wisata pengangkut lansia di area taman.", en: "Shuttle golf carts traversing the garden park." },
      architecture: { id: "Pelinggih meru bertingkat di atas karang laut terhempas ombak.", en: "Multi-tiered meru shrine perched on the ocean islet." },
      cultureOrFashion: { id: "Wisatawan mengenakan selendang kuning persembahyangan.", en: "Visitors tying yellow prayer sashes around waists." }
    },
    streetViewOptions: { position: { lat: -8.6212, lng: 115.0868 }, pov: { heading: 245, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-16-lombok-senggigi",
    levelNumber: 16,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Senggigi Lombok Barat 2015", en: "Senggigi Beach Lombok 2015" },
    city: "Lombok Barat",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.4988, lng: 116.0461 },
    targetYear: 2015,
    targetDateStr: { id: "Agustus 2015", en: "August 2015" },
    description: {
      id: "Jalan pesisir Pantai Senggigi Lombok dengan deretan perahu cadik nelayan tradisional dan pemandangan Gunung Agung Bali di kejauhan.",
      en: "Coastal road of Senggigi Beach Lombok with traditional outrigger fishing boats and views of Mount Agung."
    },
    hints: {
      cars: { id: "Mobil pick-up angkutan pedesaan dengan bangku kayu dan motor bebek berplat DR.", en: "Rural open-bed pick-up passenger trucks and scooters bearing DR registration plates." },
      architecture: { id: "Resor pantai beratapkan alang-alang jerami Sasak.", en: "Beachfront thatch-roof bungalows built in Sasak style." },
      cultureOrFashion: { id: "Perahu kayu cadik warna-warni bersandar di pasir putih.", en: "Brightly painted wooden outrigger boats on the sand." }
    },
    streetViewOptions: { position: { lat: -8.4988, lng: 116.0461 }, pov: { heading: 270, pitch: 3, zoom: 1 } }
  },
{
    id: "indo-17-bukittinggi-jam-gadang",
    levelNumber: 17,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jam Gadang: Jantung Bukittinggi 2015", en: "Jam Gadang Clock Tower Bukittinggi" },
    city: "Bukittinggi",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.3052, lng: 100.3693 },
    targetYear: 2015,
    targetDateStr: { id: "Desember 2015", en: "December 2015" },
    description: {
      id: "Taman Jam Gadang Bukittinggi Sumatera Barat sebelum revitalisasi plaza pedestrian besar tahun 2018.",
      en: "Jam Gadang public park in Bukittinggi West Sumatra prior to the major 2018 plaza renovation."
    },
    hints: {
      cars: { id: "Kuda bendi Minangkabau penarik kereta wisata berhias.", en: "Traditional Minangkabau horse carriages (Bendi)." },
      architecture: { id: "Atap gonjong bertanduk runcing khas Minangkabau di pucuk menara.", en: "Curved buffalo-horn gonjong roof topping the clock tower." },
      cultureOrFashion: { id: "Penjual kerupuk sanjai balado dan souvenir khas ranah Minang.", en: "Stalls selling sanjai balado spicy cassava chips." }
    },
    streetViewOptions: { position: { lat: -0.3052, lng: 100.3693 }, pov: { heading: 20, pitch: 7, zoom: 1 } }
  },
{
    id: "indo-18-palembang-ampera",
    levelNumber: 18,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Ampera & Sungai Musi", en: "Ampera Bridge Palembang" },
    city: "Palembang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.9918, lng: 104.7634 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Jembatan Ampera Palembang sebelum dibangunnya jalur rel layang LRT Sumatera Selatan di samping jembatan untuk Asian Games 2018.",
      en: "Ampera Bridge across Musi River before the elevated South Sumatra LRT railway was constructed for Asian Games 2018."
    },
    hints: {
      cars: { id: "Belum tampak lintasan rel LRT layang di sebelah jembatan.", en: "Zero elevated LRT viaduct rails beside the bridge yet." },
      architecture: { id: "Dua menara pilon jembatan Ampera merah cerah di atas Musi.", en: "Two towering bright red pylons rising above the river." },
      cultureOrFashion: { id: "Perahu getek tradisional dan warung terapung pempek.", en: "Getek riverboats and floating pempek eateries." }
    },
    streetViewOptions: { position: { lat: -2.9918, lng: 104.7634 }, pov: { heading: 140, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-19-medan-istana-maimun",
    levelNumber: 19,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Istana Maimun: Kesultanan Deli Medan", en: "Maimun Palace Sultanate of Deli" },
    city: "Medan",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 3.5753, lng: 98.6838 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Halaman Istana Maimun Kota Medan peninggalan Kesultanan Deli dengan perpaduan gaya Melayu, Islam, Spanyol, dan Italia.",
      en: "Grounds of Maimun Palace in Medan, royal seat of Sultanate of Deli blending Malay and Islamic architecture."
    },
    hints: {
      cars: { id: "Becak motor (Bentor) bermesin 2-tak dengan posisi sespan penumpang berada di samping kemudi.", en: "Motorized sidecar tricycles (Bentor) with passenger cabins mounted directly beside the driver." },
      architecture: { id: "Istana megah warna kuning keemasan dengan kubah kurva Mogul.", en: "Golden-yellow palace facade with Mughal-style domes." },
      cultureOrFashion: { id: "Penyewaan baju adat Melayu Deli berpayet emas.", en: "Rental gold-embroidered Malay royal costumes." }
    },
    streetViewOptions: { position: { lat: 3.5753, lng: 98.6838 }, pov: { heading: 250, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-20-danau-toba-parapat",
    levelNumber: 20,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Danau Toba: Pesisir Parapat & Pulau Samosir", en: "Lake Toba: Parapat Harbor View" },
    city: "Parapat, Simalungun",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 2.6625, lng: 98.9348 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Dermaga kapal feri Parapat menghadap danau vulkanik terbesar di dunia Danau Toba dan perbukitan Pulau Samosir.",
      en: "Parapat ferry terminal overlooking Lake Toba, the world's largest volcanic caldera lake."
    },
    hints: {
      cars: { id: "Bus angkutan antarkota Sumatera Sejahtera/KBT bertuliskan aksara Batak.", en: "Sumatran intercity buses with Batak motifs." },
      architecture: { id: "Atap pelana rumah adat Batak Toba berukir gorga merah-hitam.", en: "Saddle-shaped Batak Toba roofs with carved gorga motifs." },
      cultureOrFashion: { id: "Kain ulos tenun Batak dipajang di gerai cenderamata.", en: "Traditional handwoven Batak Ulos textiles on display." }
    },
    streetViewOptions: { position: { lat: 2.6625, lng: 98.9348 }, pov: { heading: 290, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-21-samarinda-mahakam",
    levelNumber: 21,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Mahakam: Sungai Mahakam Samarinda", en: "Mahakam River Bridge Samarinda" },
    city: "Samarinda",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.5284, lng: 117.1197 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Jembatan Mahakam I menghubungkan Samarinda Seberang dan Kota Samarinda dengan tongkang batubara melintas di bawahnya.",
      en: "Mahakam I Bridge linking Samarinda with coal tugboats and barges navigating the wide river below."
    },
    hints: {
      cars: { id: "Truk gandeng ekspedisi dan mobil minibus Suzuki Carry angkot KT.", en: "East Kalimantan KT-plate minibuses and logistics trucks." },
      architecture: { id: "Rangka baja lengkung truss jembatan Mahakam pertama tahun 1986.", en: "Steel through-truss bridge arches spanning the Mahakam." },
      cultureOrFashion: { id: "Tongkang ponton batubara ditarik kapal tugboat di sungai.", en: "Massive open coal barges pulled by river tugs." }
    },
    streetViewOptions: { position: { lat: -0.5285, lng: 117.1225 }, pov: { heading: 40, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-22-balikpapan-melawai",
    levelNumber: 22,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Melawai: Teluk Minyak Balikpapan", en: "Melawai Beach: Balikpapan Oil Bay" },
    city: "Balikpapan",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -1.2789, lng: 116.8188 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Jalan Jenderal Sudirman di Pantai Melawai Balikpapan tempat warga menikmati pemandangan kapal tanker di Teluk Balikpapan.",
      en: "Melawai coastal boulevard in Balikpapan where locals watch oil tanker ships anchored in the bay."
    },
    hints: {
      cars: { id: "Angkot berlabel nomor rute 5 dan 6 warna biru dan kuning di koridor jalan tepi teluk.", en: "Numbered route 5 and 6 minibuses in contrasting blue and yellow livery cruising the coastal avenue." },
      architecture: { id: "Kilang minyak Pertamina RU V dengan cerobong api membakar gas suar.", en: "Pertamina oil refinery flares in the distant bay." },
      cultureOrFashion: { id: "Warung tenda kuliner pisang gapit panggang saus gula merah.", en: "Street food stalls serving grilled sweet banana gapit." }
    },
    streetViewOptions: { position: { lat: -1.2789, lng: 116.8188 }, pov: { heading: 240, pitch: 3, zoom: 1 } }
  },
{
    id: "indo-23-banjarmasin-lok-baintan",
    levelNumber: 23,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pasar Terapung Lok Baintan Martapura", en: "Lok Baintan Floating Market" },
    city: "Banjarmasin",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -3.2974, lng: 114.6542 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Pemandangan sungai Martapura tempat puluhan perahu jukung pedagang pasar terapung berkumpul di pagi hari.",
      en: "Martapura River where traditional wooden jukung canoes congregate for early morning river trading."
    },
    hints: {
      cars: { id: "Jalur darat dermaga titian kayu ulin di tepian sungai Martapura.", en: "Ironwood (kayu ulin) riverbank boardwalk trails." },
      architecture: { id: "Rumah panggung bubungan tinggi khas Banjar bertiang kayu ulin.", en: "Elevated stilt houses along the muddy tidal banks." },
      cultureOrFashion: { id: "Acil-acil memakai topi caping lebar tanggui dan bedak pupur dingin.", en: "Female boat traders in broad tanggui sun hats and rice powder." }
    },
    streetViewOptions: { position: { lat: -3.2948, lng: 114.6553 }, pov: { heading: 110, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-24-pontianak-khatulistiwa",
    levelNumber: 24,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Tugu Khatulistiwa: Garis Equator 0° 0' 0\"", en: "Equator Monument Pontianak" },
    city: "Pontianak",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 0.0000, lng: 109.3217 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Tugu Khatulistiwa tepat di garis lintang nol derajat di tepi Sungai Kapuas Kota Pontianak Kalimantan Barat.",
      en: "The Equator Monument located exactly at zero degrees latitude on the banks of Kapuas River in Pontianak."
    },
    hints: {
      cars: { id: "Sepeda motor bebek plat KB Kalimantan Barat.", en: "Commuter underbone motorbikes with West Kalimantan KB plates." },
      architecture: { id: "Monumen kubah dengan tiang kayu ulin dan anak panah penunjuk equator.", en: "Ironwood spire structure with circle arrows pointing east-west." },
      cultureOrFashion: { id: "Papan prasasti penanda garis belahan bumi utara dan selatan.", en: "Marble plaques marking the northern and southern hemispheres." }
    },
    streetViewOptions: { position: { lat: 0.0000, lng: 109.3217 }, pov: { heading: 355, pitch: 6, zoom: 1 } }
  },
{
    id: "indo-25-makassar-pantai-losari",
    levelNumber: 25,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Losari: Ikon Anging Mammiri Makassar", en: "Losari Beach Promenade Makassar" },
    city: "Makassar",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -5.1448, lng: 119.4069 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Anjungan Pantai Losari Makassar sebelum Masjid 99 Kubah reklamasi CPI selesai dibangun di hadapannya.",
      en: "Losari Beach promenade in Makassar before the 99 Domes Mosque on the reclaimed island was built."
    },
    hints: {
      cars: { id: "Angkutan kota mikrolet 'Pete-pete' warna biru tua dengan pintu samping terbuka.", en: "Iconic dark blue 'Pete-pete' passenger minibuses navigating the seaside promenade." },
      architecture: { id: "Kawasan reklamasi Centre Point of Indonesia (CPI) masih berupa pasir laut.", en: "The offshore reclamation sand fill before the mosque stood." },
      cultureOrFashion: { id: "Pedagang kuliner pisang epe panggang manis di trotoar pantai.", en: "Roadside carts grilling sweet pressed pisang epe bananas." }
    },
    streetViewOptions: { position: { lat: -5.1448, lng: 119.4069 }, pov: { heading: 250, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-26-manado-jembatan-soekarno",
    levelNumber: 26,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Soekarno: Teluk Manado 2015", en: "Soekarno Bridge: Manado Bay 2015" },
    city: "Manado",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 1.4938, lng: 124.8398 },
    targetYear: 2015,
    targetDateStr: { id: "September 2015", en: "September 2015" },
    description: {
      id: "Jembatan kabel gantun Soekarno diresmikan pada pertengahan 2015 menghadap Pulau Bunaken dan Gunung Manado Tua.",
      en: "The newly completed cable-stayed Soekarno Bridge in Manado looking out toward Bunaken and Manado Tua volcano."
    },
    hints: {
      cars: { id: "Angkot mikro warna biru muda ceper dengan modifikasi velg, kaca film gelap, dan speaker besar.", en: "Custom light-blue lowered minibuses boasting tuned sound systems and tinted windshields." },
      architecture: { id: "Pilon jembatan cable-stayed baru dicat putih dengan kabel suspensi merah.", en: "Freshly inaugurated white cable-stayed bridge pylon." },
      cultureOrFashion: { id: "Pemandangan siluet kerucut sempurna Gunung Manado Tua di laut.", en: "The dramatic conical silhouette of Manado Tua volcanic island." }
    },
    streetViewOptions: { position: { lat: 1.4938, lng: 124.8398 }, pov: { heading: 310, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-27-toraja-tongkonan",
    levelNumber: 27,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Desa Adat Kete Kesu: Tongkonan Toraja", en: "Kete Kesu Village: Toraja Tongkonan" },
    city: "Tana Toraja",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.9902, lng: 119.9077 },
    targetYear: 2016,
    targetDateStr: { id: "Mei 2016", en: "May 2016" },
    description: {
      id: "Deretan rumah adat Tongkonan beratap perahu di Desa Kete Kesu Toraja dengan lumbung padi Alang di hadapannya.",
      en: "Row of traditional Tongkonan boat-roof houses in Kete Kesu Toraja facing carved rice barns (alang)."
    },
    hints: {
      cars: { id: "Mobil pick-up pengangkut kerbau belang Tedong Bonga.", en: "Light pick-up trucks transporting ceremonial water buffaloes." },
      architecture: { id: "Atap lengkung menjulang tinggi menyerupai haluan perahu bersusun bambu.", en: "Dramatic soaring bamboo roofs resembling boat bows." },
      cultureOrFashion: { id: "Susunan tanduk kerbau berjejer rapi di tiang utama rumah adat.", en: "Vertical stacks of buffalo horns mounted on front pillars." }
    },
    streetViewOptions: { position: { lat: -2.9926, lng: 119.9063 }, pov: { heading: 200, pitch: 6, zoom: 1 } }
  },
{
    id: "indo-28-ambon-merah-putih",
    levelNumber: 28,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Merah Putih Teluk Ambon", en: "Merah Putih Bridge Ambon Bay" },
    city: "Ambon",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -3.6702, lng: 128.1963 },
    targetYear: 2016,
    targetDateStr: { id: "April 2016", en: "April 2016" },
    description: {
      id: "Jembatan terpanjang di Indonesia Timur Jembatan Merah Putih sesaat setelah diresmikan Presiden Joko Widodo awal 2016.",
      en: "Merah Putih Bridge over Ambon Bay, the longest bridge in Eastern Indonesia shortly after its 2016 opening."
    },
    hints: {
      cars: { id: "Angkot warna merah menyala dengan musik disko keras dan plat nomor berawalan huruf DE.", en: "Bright red passenger minibuses equipped with sound systems and DE registration plates." },
      architecture: { id: "Dua pilon kabel bentang tengah berwarna merah dan putih di Teluk Ambon.", en: "Cable-stayed bridge towers painted in national red and white." },
      cultureOrFashion: { id: "Perahu nelayan jaring tonda melaut di bawah jembatan.", en: "Traditional coastal fishing boats cruising under the central span." }
    },
    streetViewOptions: { position: { lat: -3.6702, lng: 128.1963 }, pov: { heading: 140, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-29-jayapura-youtefa",
    levelNumber: 29,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Youtefa: Teluk Youtefa Jayapura", en: "Youtefa Bridge Jayapura Papua" },
    city: "Jayapura",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.5975, lng: 140.7161 },
    targetYear: 2018,
    targetDateStr: { id: "September 2018", en: "September 2018" },
    description: {
      id: "Jembatan pelengkung baja merah kembar Youtefa (Jembatan Holtekamp) di Teluk Youtefa Kota Jayapura Papua.",
      en: "Twin red steel arch Youtefa Bridge spanning Youtefa Bay in Jayapura, Papua."
    },
    hints: {
      cars: { id: "Mobil pick-up dobel kabin Toyota Hilux plat PA Papua.", en: "Double-cabin 4x4 Toyota Hilux pick-ups with Papua PA plates." },
      architecture: { id: "Dua bentang pelengkung baja merah raksasa di atas perairan teluk.", en: "Two massive crimson steel arch trusses across the bay." },
      cultureOrFashion: { id: "Noken rajut anggrek tas tradisional Papua disandang warga.", en: "Locals carrying traditional woven noken bags." }
    },
    streetViewOptions: { position: { lat: -2.5995, lng: 140.7138 }, pov: { heading: 50, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-30-sabang-nol-km",
    levelNumber: 30,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Tugu Nol Kilometer: Ujung Barat Indonesia", en: "Kilometer Zero Monument Sabang" },
    city: "Sabang, Pulau Weh",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 5.9042, lng: 95.2178 },
    targetYear: 2016,
    targetDateStr: { id: "Oktober 2016", en: "October 2016" },
    description: {
      id: "Tugu Nol Kilometer Indonesia di Pulau Weh Kota Sabang menghadap langsung Samudra Hindia lepas.",
      en: "Kilometer Zero Monument on Weh Island, Sabang, marking the westernmost point of Indonesia."
    },
    hints: {
      cars: { id: "Sepeda motor sewaan turis berplat BL Aceh.", en: "Tourist rental motorbikes with Aceh BL plates." },
      architecture: { id: "Monumen megah bertingkat empat dengan patung Garuda di atasnya.", en: "Multi-tiered concrete monument topped by a bronze Garuda." },
      cultureOrFashion: { id: "Sertifikat resmi tanda singgah Nol Kilometer di kios cinderamata.", en: "Souvenir booths issuing official visitor Zero KM certificates." }
    },
    streetViewOptions: { position: { lat: 5.9052, lng: 95.2178 }, pov: { heading: 320, pitch: 6, zoom: 1 } }
  },
{
    id: "indo-31-jakarta-gbk-senayan",
    levelNumber: 31,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Gelora Bung Karno: Senayan Pra-Asian Games 2014", en: "GBK Senayan Stadium Jakarta 2014" },
    city: "Jakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.2185, lng: 106.8018 },
    targetYear: 2014,
    targetDateStr: { id: "September 2014", en: "September 2014" },
    description: {
      id: "Kompleks Stadion Gelora Bung Karno (GBK) Senayan Jakarta sebelum renovasi megah persiapan Asian Games 2018.",
      en: "Gelora Bung Karno (GBK) sports complex in Senayan before the major overhaul for the 2018 Asian Games."
    },
    hints: {
      cars: { id: "Mobil sedan Toyota Corolla tua dan motor bebek parkir di ring luar.", en: "Older sedans and commuter bikes on the outer perimeter ring." },
      architecture: { id: "Bangku stadion luar stadion madya dan kolam renang model lama sebelum dibangun aquatics center modern.", en: "Old swimming arena before the world-class enclosed aquatics center was built." },
      cultureOrFashion: { id: "Warga berolahraga lari pagi berseragam sepak bola klub lokal ISL.", en: "Morning runners wearing Indonesian Super League club shirts." }
    },
    streetViewOptions: { position: { lat: -6.2185, lng: 106.8018 }, pov: { heading: 330, pitch: 4, zoom: 1 } }
  },
{
    id: "indo-32-bandung-alun-alun",
    levelNumber: 32,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Alun-Alun Bandung & Rumput Sintetis Baru 2015", en: "Bandung Square & Green Turf 2015" },
    city: "Bandung",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.9218, lng: 107.6069 },
    targetYear: 2015,
    targetDateStr: { id: "Januari 2015", en: "January 2015" },
    description: {
      id: "Alun-Alun Kota Bandung sesaat setelah diresmikan Wali Kota Ridwan Kamil dengan karpet rumput sintetis hijau cerah di depan Masjid Raya.",
      en: "Bandung City Square immediately following its inauguration with bright green artificial grass facing the Grand Mosque."
    },
    hints: {
      cars: { id: "Jalan raya bersejarah di depan alun-alun dipadati mobil Avanza, angkot hijau, dan motor matic.", en: "Historic downtown boulevard flanked by bustling car traffic, local green vans, and scooters." },
      architecture: { id: "Dua menara kembar kembar Masjid Raya Bandung setinggi 81 meter.", en: "Twin 81-meter minarets of the Grand Mosque of Bandung." },
      cultureOrFashion: { id: "Masyarakat duduk tanpa alas kaki di hamparan rumput sintetis baru.", en: "Crowds relaxing barefoot on the brand-new synthetic turf." }
    },
    streetViewOptions: { position: { lat: -6.9218, lng: 107.6069 }, pov: { heading: 270, pitch: 5, zoom: 1 } }
  },
{
    id: "indo-33-surabaya-tugu-pahlawan",
    levelNumber: 33,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Tugu Pahlawan: Simbol Kota Pahlawan 2015", en: "Heroes Monument Tugu Pahlawan Surabaya" },
    city: "Surabaya",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.2458, lng: 112.7378 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Monumen Tugu Pahlawan setinggi 41 meter berbentuk lingga pakupensil memperingati pertempuran 10 November 1945 di Surabaya.",
      en: "The 41-meter Heroes Monument shaped like an upside-down nail commemorating the Battle of Surabaya on Nov 10, 1945."
    },
    hints: {
      cars: { id: "Armada angkot mikrolet Bemo warna kuning/lyn dan padatnya sepeda motor komuter plat L.", en: "Yellow lyn minibuses (Bemo) surrounded by fleets of commuter motorbikes with L plates." },
      architecture: { id: "Monumen tugu paku berbentuk 10 lengkungan dan 11 ruas di tengah lapangan hijau.", en: "Monument column with 10 arch curves and 11 segments." },
      cultureOrFashion: { id: "Patung Presiden Pertama Ir. Soekarno dan Bung Hatta di pintu gerbang utama.", en: "Bronze statues of Sukarno and Hatta at the entry gate." }
    },
    streetViewOptions: { position: { lat: -7.2458, lng: 112.7378 }, pov: { heading: 160, pitch: 6, zoom: 1 } }
  },
{
    id: "indo-34-bali-gwk-sculpture",
    levelNumber: 34,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Taman Budaya GWK: Patung Terpisah 2014", en: "Garuda Wisnu Kencana: Separate Statues 2014" },
    city: "Jimbaran, Bali",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.8104, lng: 115.1676 },
    targetYear: 2014,
    targetDateStr: { id: "September 2014", en: "September 2014" },
    description: {
      id: "Taman Budaya GWK Jimbaran Bali saat patung setengah badan Dewa Wisnu dan kepala burung Garuda masih terpisah di atas bukit kapur sebelum disatukan pada 2018.",
      en: "GWK Cultural Park in Bali when Lord Vishnu's torso and Garuda's head sat separately before being assembled into the 121m giant statue in 2018."
    },
    hints: {
      cars: { id: "Kendaraan shuttle bus wisata terbuka pengangkut turis keliling tebing kapur.", en: "Open-air tour shuttle buggies navigating limestone canyons." },
      architecture: { id: "Dinding tebing batu kapur putih terpotong rapi dengan patung perunggu Wisnu belum dipasang pada burung Garuda.", en: "Quarried limestone canyon with Lord Vishnu torso standalone." },
      cultureOrFashion: { id: "Tari kecak diselenggarakan di amfiteater terbuka sore hari.", en: "Balinese dance amphitheater performances." }
    },
    streetViewOptions: { position: { lat: -8.8104, lng: 115.1676 }, pov: { heading: 350, pitch: 7, zoom: 1 } }
  },
{
    id: "indo-35-jakarta-bundaran-senayan",
    levelNumber: 35,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Bundaran Senayan & Patung Pemuda Membangun 2014", en: "Bundaran Senayan: Youth Monument 2014" },
    city: "Jakarta",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.2272, lng: 106.8000 },
    targetYear: 2014,
    targetDateStr: { id: "September 2014", en: "September 2014" },
    description: {
      id: "Bundaran Senayan di depan Mal Senayan City dan Ratu Plaza saat halte layang CSW dan stasiun MRT Senayan belum berdiri.",
      en: "Bundaran Senayan facing Ratu Plaza and Senayan City before the underground MRT Senayan station opened."
    },
    hints: {
      cars: { id: "Bus Kopaja AC putih-hijau dan armada taksi Express sedan putih.", en: "Green Kopaja AC buses and white Express taxi sedans." },
      architecture: { id: "Patung Pemuda Membangun memegang obor menyala di tengah bundaran hijau asri.", en: "Youth Monument holding a torch atop the central garden roundabout." },
      cultureOrFashion: { id: "Jembatan penyeberangan orang (JPO) Senayan model besi lawas sebelum model artistik 2019.", en: "Old steel footbridge before the illuminated 2019 artistic JPO." }
    },
    streetViewOptions: { position: { lat: -6.2272, lng: 106.8000 }, pov: { heading: 40, pitch: 4, zoom: 1 } }
  },
  {
    id: "indo-36-prambanan-temple",
    levelNumber: 36,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Candi Prambanan: Mahakarya Roro Jonggrang", en: "Prambanan Temple Complex Yogyakarta" },
    city: "Sleman / Klaten",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.7520, lng: 110.4915 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Kompleks candi Hindu terbesar di Indonesia Candi Prambanan dengan tiga candi utama pemujaan Trimurti: Brahma, Wisnu, dan Siwa.",
      en: "The grandest Hindu temple compound in Indonesia, Prambanan, dedicated to Brahma, Vishnu, and Shiva."
    },
    hints: {
      cars: { id: "Taman rumput luas di dalam kompleks warisan dunia tanpa kendaraan bermotor.", en: "UNESCO world heritage green parkland grounds." },
      architecture: { id: "Tiga candi utama menjulang setinggi 47 meter dengan pahatan relief epik Ramayana.", en: "47-meter soaring volcanic stone spires carved with the Ramayana epic." },
      cultureOrFashion: { id: "Panggung teater terbuka Sendratari Ramayana Prambanan di seberang Sungai Opak.", en: "Open-air stage backdrop for the Ramayana ballet." }
    },
    streetViewOptions: { position: { lat: -7.7520, lng: 110.4915 }, pov: { heading: 100, pitch: 6, zoom: 1 } }
  },
  {
    id: "indo-37-aceh-baiturrahman",
    levelNumber: 37,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Masjid Raya Baiturrahman: Ikon Ketangguhan Aceh", en: "Baiturrahman Grand Mosque Banda Aceh" },
    city: "Banda Aceh",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 5.5536, lng: 95.3192 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Masjid Raya Baiturrahman Banda Aceh berarsitektur kesultanan Mughal dengan 7 kubah hitam megah, saksi sejarah ketangguhan masyarakat Aceh melewati bencana Tsunami 2004.",
      en: "Baiturrahman Grand Mosque in Banda Aceh with its 7 majestic black Mughal domes, standing as a resilient symbol of Aceh following the 2004 Indian Ocean Tsunami."
    },
    hints: {
      cars: { id: "Becak motor (bentor) berplat BL dan minibus angkutan umum Kijang 'Labi-labi' warna biru.", en: "Motorized passenger trishaws with BL plates and blue 'labi-labi' public commuter vans." },
      architecture: { id: "Tujuh kubah hitam megah dan menara setinggi 35 meter sebelum pemasangan 12 payung elektrik raksasa 2017.", en: "Seven black domes and 35m minaret before the 2017 installation of 12 giant electric umbrellas." },
      cultureOrFashion: { id: "Pekalongan sarung dan busana muslim gamis putih jamaah salat.", en: "Worshipers in traditional Acehnese Islamic attire and white robes." }
    },
    streetViewOptions: { position: { lat: 5.5536, lng: 95.3192 }, pov: { heading: 140, pitch: 4, zoom: 1 } }
  },
  {
    id: "indo-38-sumbar-kelok-9",
    levelNumber: 38,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Jembatan Kelok 9: Mahakarya Ngarai Bukit Barisan", en: "Kelok 9 Flyover Bridge West Sumatra" },
    city: "Limapuluh Kota, Sumbar",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.0708, lng: 100.6978 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Jembatan layang Kelok 9 yang diresmikan 2013, membentang meliuk-liuk di antara dua bukit cagar alam lembah nan hijau menghubungkan Sumatera Barat dan Riau.",
      en: "The winding Kelok 9 viaduct bridges, officially opened in 2013, soaring above the lush tropical river valley between West Sumatra and Riau."
    },
    hints: {
      cars: { id: "Truk ekspedisi Fuso oranye dan bus AKAP antarprovinsi ANS / NPM.", en: "Heavy cargo trucks and classic West Sumatran NPM / ANS intercity buses." },
      architecture: { id: "Jembatan layang pilar beton bertingkat yang meliuk anggun di atas lembah curam.", en: "Curved multi-tiered concrete flyover piers engineered against the steep green canyon." },
      cultureOrFashion: { id: "Deretan warung kopi terpal di bahu jalan tempat pengendara menikmati panorama ngarai.", en: "Roadside coffee stalls overlooking the majestic Bukit Barisan mountain gorge." }
    },
    streetViewOptions: { position: { lat: -0.0708, lng: 100.6978 }, pov: { heading: 310, pitch: 6, zoom: 1 } }
  },
  {
    id: "indo-39-belitung-tanjung-tinggi",
    levelNumber: 39,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pantai Tanjung Tinggi: Granit Raksasa Laskar Pelangi", en: "Tanjung Tinggi Beach Belitung Granites" },
    city: "Belitung",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.5518, lng: 107.7126 },
    targetYear: 2015,
    targetDateStr: { id: "September 2015", en: "September 2015" },
    description: {
      id: "Pantai eksotis Tanjung Tinggi di Pulau Belitung dengan batu granit raksasa purba berusia ratusan juta tahun yang menjadi lokasi syuting film legendaris Laskar Pelangi.",
      en: "The breathtaking Tanjung Tinggi Beach in Belitung, famed for its massive prehistoric granite boulders and turquoise waters from the film Rainbow Troops."
    },
    hints: {
      cars: { id: "Mobil sewaan Toyota Avanza wisatawan berjejer di bawah rimbun pohon cemara laut.", en: "Tourist rental MPVs parked beneath coastal pine trees." },
      architecture: { id: "Gugusan batu granit putih setinggi rumah di bibir pantai berair jernih kehijauan.", en: "House-sized smooth monolithic granite rock formations scattered across the white sand bay." },
      cultureOrFashion: { id: "Warung tenda kelapa muda dan gangan ikan khas Belitung di tepi teluk.", en: "Seaside coconut stalls and Belitung seafood warungs." }
    },
    streetViewOptions: { position: { lat: -2.5518, lng: 107.7126 }, pov: { heading: 25, pitch: 3, zoom: 1 } }
  },
  {
    id: "indo-40-lampung-menara-siger",
    levelNumber: 40,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Menara Siger: Mahkota Gerbang Pulau Sumatera", en: "Menara Siger Gateway of Sumatra Lampung" },
    city: "Bakauheni, Lampung",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -5.8674, lng: 105.7548 },
    targetYear: 2015,
    targetDateStr: { id: "September 2015", en: "September 2015" },
    description: {
      id: "Menara Siger berbentuk mahkota pengantin wanita khas adat Lampung berwarna emas-merah, berdiri megah di atas bukit menghadap perairan Selat Sunda dan pelabuhan Bakauheni.",
      en: "Menara Siger, a grand cultural monument shaped like Lampung's traditional golden bridal crown, overlooking Bakauheni Harbor and the Sunda Strait."
    },
    hints: {
      cars: { id: "Truk logistik Lintas Sumatera dan mobil pribadi menuju dermaga feri penyeberangan.", en: "Trans-Sumatra cargo trucks heading towards the ferry terminal." },
      architecture: { id: "Gedung berarsitektur mahkota Siger 9 pucuk berwarna kuning emas dan merah menyala.", en: "Nine-pointed golden-yellow and crimson crown structure atop the highest coastal hilltop." },
      cultureOrFashion: { id: "Tugu titik nol Jalan Lintas Sumatera di pelataran puncak menara.", en: "Kilometer Zero marker plaque for the Trans-Sumatra Highway." }
    },
    streetViewOptions: { position: { lat: -5.8674, lng: 105.7548 }, pov: { heading: 220, pitch: 5, zoom: 1 } }
  },
  {
    id: "indo-41-banten-mercusuar-anyer",
    levelNumber: 41,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Mercusuar Anyer: Titik Nol Jalan Raya Pos 1808", en: "Anyer Lighthouse: Great Post Road Kilometer Zero" },
    city: "Anyer, Banten",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.0712, lng: 105.8845 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Mercusuar Cikoneng Anyer setinggi 75 meter buatan tahun 1885 di Selat Sunda, titik mula bersejarah pembangunan Jalan Raya Pos (Anyer-Panarukan 1.000 km) oleh Daendels pada 1808.",
      en: "The 75-meter white Cikoneng Lighthouse in Anyer built in 1885, commemorating Kilometer Zero of Daendels' 1,000-km Great Post Road (Anyer to Panarukan)."
    },
    hints: {
      cars: { id: "Angkot lokal berplat nomor A dan mobil pikap nelayan pengangkut hasil tangkapan laut.", en: "Local route minibuses with A license plates alongside open pickup trucks carrying fresh seafood." },
      architecture: { id: "Menara suar besi tempa putih 16 lantai peninggalan Raja Belanda Willem III 1885.", en: "16-story white cast-iron lighthouse erected by King Willem III of the Netherlands in 1885." },
      cultureOrFashion: { id: "Tugu prasasti Titik Nol Kilometer Anyer-Panarukan berlatar ombak Selat Sunda.", en: "Kilometer Zero historical monument inscription facing the waves of Sunda Strait." }
    },
    streetViewOptions: { position: { lat: -6.0712, lng: 105.8845 }, pov: { heading: 280, pitch: 8, zoom: 1 } }
  },
  {
    id: "indo-42-semarang-lawang-sewu",
    levelNumber: 42,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Lawang Sewu & Tugu Muda: Ikon Seribu Pintu", en: "Lawang Sewu & Tugu Muda Monument Semarang" },
    city: "Semarang",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -6.9839, lng: 110.4104 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Gedung megah peninggalan kantor pusat kereta api Hindia Belanda (NIS) dengan julukan Lawang Sewu karena memiliki ratusan pintu jendela lengkung, menghadap Tugu Muda Semarang.",
      en: "The iconic colonial headquarters of the Dutch East Indies Railway Company (NIS), nicknamed Lawang Sewu (Thousand Doors), facing the historic Tugu Muda roundabout in Semarang."
    },
    hints: {
      cars: { id: "Bus BRT bertubuh merah melintas di bundaran tugu bersama mikrolet angkot kuning.", en: "Red municipal BRT feeder buses and bright yellow public minivans circling the roundabout." },
      architecture: { id: "Gedung megah Art Deco Belanda dengan menara kubah kembar dan ratusan jendela busur.", en: "Stately Dutch Art Deco facade with twin domes and hundreds of arched shuttered doors." },
      cultureOrFashion: { id: "Monumen lilin Tugu Muda memperingati Pertempuran Lima Hari di Semarang.", en: "Torch-shaped Tugu Muda monument commemorating the Five-Day Battle of Semarang." }
    },
    streetViewOptions: { position: { lat: -6.9839, lng: 110.4104 }, pov: { heading: 120, pitch: 4, zoom: 1 } }
  },
  {
    id: "indo-43-dieng-candi-arjuna",
    levelNumber: 43,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Candi Arjuna Dieng: Percandian Tertua Tanah Jawa", en: "Arjuna Temple Complex Dieng Plateau" },
    city: "Banjarnegara / Wonosobo",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.2045, lng: 109.9022 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Kompleks Candi Arjuna abad ke-7 di Dataran Tinggi Dieng pada ketinggian 2.093 mdpl, candi Hindu tertua di Jawa yang sering diselimuti kabut dan fenomena embun upas es di musim kemarau.",
      en: "The 7th-century Arjuna temple compound atop the 2,093m Dieng Plateau, among the earliest surviving Hindu temples in Java, cloaked in high-altitude volcanic mist."
    },
    hints: {
      cars: { id: "Sepeda motor modifikasi petani pengangkut pupuk dan minibus mikro travel antar-kota pegunungan.", en: "Highland farmers' utility motorbikes and compact intercity mountain tour vans." },
      architecture: { id: "Struktur candi batu andesit mungil abad ke-7 dengan atap limas bertingkat berlatar perbukitan hijau.", en: "7th-century andesite shrines with stepped pyramid roofs against terraced hillsides." },
      cultureOrFashion: { id: "Wisatawan mengenakan kupluk rajut tebal dan sarung menghalau dingin pegunungan Dieng.", en: "Visitors wearing heavy knit beanies and jackets against the brisk mountain chill." }
    },
    streetViewOptions: { position: { lat: -7.2045, lng: 109.9022 }, pov: { heading: 85, pitch: 4, zoom: 1 } }
  },
  {
    id: "indo-44-bromo-lautan-pasir",
    levelNumber: 44,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Lautan Pasir Bromo & Pura Luhur Poten Tengger", en: "Bromo Sand Sea & Pura Poten Temple" },
    city: "Probolinggo / Pasuruan",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -7.9425, lng: 112.9531 },
    targetYear: 2015,
    targetDateStr: { id: "September 2015", en: "September 2015" },
    description: {
      id: "Kaldera lautan pasir berbisik Gunung Bromo seluas 10 kilometer persegi dengan Pura Luhur Poten tempat peribadatan suci masyarakat suku Tengger penganut Hindu Bromo.",
      en: "The sweeping 10 sq km Sea of Sand caldera of Mount Bromo featuring Pura Luhur Poten, the sacred temple of the indigenous Hindu Tengger community."
    },
    hints: {
      cars: { id: "Deretan mobil 4x4 Toyota Land Cruiser Hardtop FJ40 klasik khas wisata Bromo.", en: "Iconic vintage Toyota Land Cruiser FJ40 4x4 hardtops lined across the volcanic sand." } ,
      architecture: { id: "Pura dari batu hitam vulkanik berdiri megah di tengah bentangan pasir tanpa vegetasi.", en: "Black volcanic stone temple rising dramatically amidst barren caldera sands." },
      cultureOrFashion: { id: "Kuda tunggang suku Tengger dan warga berpakaian sarung batik hangat melilit leher.", en: "Tengger horsemen with wool scarves and batiks wrapped around their shoulders." }
    },
    streetViewOptions: { position: { lat: -7.9425, lng: 112.9531 }, pov: { heading: 300, pitch: 5, zoom: 1 } }
  },
  {
    id: "indo-45-bali-ulun-danu-beratan",
    levelNumber: 45,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Pura Ulun Danu Beratan: Ikon Tirta Kahyangan Bedugul", en: "Ulun Danu Beratan Water Temple Bali" },
    city: "Tabanan, Bali",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.2751, lng: 115.1668 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Pura air suci Ulun Danu di tepi Danau Beratan Bedugul pada ketinggian 1.200 mdpl yang tampak mengapung di atas air dan menjadi gambar legendaris pada uang kertas rupiah.",
      en: "The ethereal Ulun Danu Beratan water temple appearing to float on the volcanic lake at 1,200m altitude, immortalized on the Indonesian 50,000 Rupiah banknote."
    },
    hints: {
      cars: { id: "Perahu motor dan kano dayung tradisional bersandar di dermaga danau.", en: "Traditional wooden paddle canoes and tour boats moored by the shore." },
      architecture: { id: "Pelinggih Meru tumpang 11 dengan atap ijuk hitam tampak terapung di atas permukaan air danau.", en: "11-tiered thatched black-palm Meru tower perched serenely on lake waters." },
      cultureOrFashion: { id: "Umbul-umbul tedung kain kuning dan putih persembahyangan umat Hindu Bali.", en: "Ceremonial Balinese yellow and white umbrellas and penjor decorations." }
    },
    streetViewOptions: { position: { lat: -8.2751, lng: 115.1668 }, pov: { heading: 45, pitch: 2, zoom: 1 } }
  },
  {
    id: "indo-46-ntt-labuan-bajo",
    levelNumber: 46,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Labuan Bajo: Gerbang Bahari Komodo Tempo 2016", en: "Labuan Bajo Phinisi Harbor Flores NTT" },
    city: "Manggarai Barat, NTT",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -8.4965, lng: 119.8825 },
    targetYear: 2016,
    targetDateStr: { id: "Agustus 2016", en: "August 2016" },
    description: {
      id: "Pemandangan pesisir Labuan Bajo di barat Pulau Flores saat dermaga kapal phinisi tradisional kayu masih asri sebelum pembangunan mega proyek marina dan waterfront modern.",
      en: "The picturesque coastal harbor of Labuan Bajo in Flores before modern marina redevelopment, filled with majestic wooden phinisi liveaboard schooners."
    },
    hints: {
      cars: { id: "Mobil pikap angkutan sewa pelabuhan dan deretan kapal phinisi kayu di perairan teluk.", en: "Port pickup trucks and multi-masted traditional phinisi schooners anchored in the bay." },
      architecture: { id: "Jalanan berbukit sempit dengan deretan agen selam (dive shop) berdinding papan kayu.", en: "Narrow hillside street lined with wooden-walled dive shops and local cafes." },
      cultureOrFashion: { id: "Kain tenun ikat Manggarai Flores dipajang di etalase toko kerajinan lokal.", en: "Handwoven Manggarai ikat textiles displayed in local handicraft storefronts." }
    },
    streetViewOptions: { position: { lat: -8.4965, lng: 119.8825 }, pov: { heading: 275, pitch: 4, zoom: 1 } }
  },
  {
    id: "indo-47-kalbar-rumah-radakng",
    levelNumber: 47,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Rumah Radakng: Rumah Panjang Terbesar Dayak", en: "Rumah Radakng Longhouse Pontianak West Kalimantan" },
    city: "Pontianak",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -0.0460, lng: 109.3243 },
    targetYear: 2015,
    targetDateStr: { id: "November 2015", en: "November 2015" },
    description: {
      id: "Replika rumah adat panjang suku Dayak Kanayatn termegah di Indonesia dengan panjang 138 meter dan tinggi 7 meter, simbol persatuan dan kearifan lokal suku Dayak Kalimantan Barat.",
      en: "The grandest Dayak longhouse replica in Indonesia measuring 138 meters in length, representing the communal heritage and architecture of West Kalimantan's indigenous tribes."
    },
    hints: {
      cars: { id: "Pelataran parkir luas perkampungan budaya dengan deretan motor bebek berplat KB.", en: "Spacious cultural park grounds filled with visiting scooters bearing KB license plates." },
      architecture: { id: "Rumah panggung kayu ulin raksasa bertiang tinggi dengan tangga kayu bulat (tangke).", en: "Colossal ironwood stilt longhouse supported by giant pillars and carved log ladders." },
      cultureOrFashion: { id: "Ornamen ukiran khas Dayak motif sulur flora dan patung penjaga burung enggang.", en: "Intricate Dayak spiral carvings and sacred hornbill bird totems." }
    },
    streetViewOptions: { position: { lat: -0.0460, lng: 109.3243 }, pov: { heading: 15, pitch: 5, zoom: 1 } }
  },
  {
    id: "indo-48-makassar-fort-rotterdam",
    levelNumber: 48,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Benteng Rotterdam: Saksi Sejarah Gowa-VOC Makassar", en: "Fort Rotterdam Jumpandang Makassar" },
    city: "Makassar",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -5.1339, lng: 119.4048 },
    targetYear: 2015,
    targetDateStr: { id: "Oktober 2015", en: "October 2015" },
    description: {
      id: "Benteng peninggalan Kerajaan Gowa abad ke-16 berbentuk penyu (Benteng Ujung Pandang) yang kemudian diambil alih VOC Belanda dan diubah menjadi pusat administrasi Fort Rotterdam.",
      en: "The 16th-century sea-facing fortress of the Kingdom of Gowa, known as Benteng Jumpandang (Turtle Fort), later rebuilt as Dutch Fort Rotterdam."
    },
    hints: {
      cars: { id: "Petepete (angkot mikrolet biru muda) bertulisan kode trayek melintas di jalanan pesisir dekat benteng.", en: "Blue petepete passenger minibuses bustling along the coastal avenue near the fortress." },
      architecture: { id: "Tembok benteng batu andesit tebal dengan bangunan beratap pelana khas kolonial Belanda abad ke-17.", en: "Massive dark stone bastions enclosing Dutch colonial whitewashed tile-roofed storehouses." },
      cultureOrFashion: { id: "Museum La Galigo di dalam kompleks benteng yang menyimpan naskah epos terpanjang dunia.", en: "Museum La Galigo housing the world's longest epic literary manuscripts." }
    },
    streetViewOptions: { position: { lat: -5.1339, lng: 119.4048 }, pov: { heading: 95, pitch: 4, zoom: 1 } }
  },
  {
    id: "indo-49-ternate-benteng-tolukko",
    levelNumber: 49,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Benteng Tolukko: Jejak Jalur Rempah Ternate", en: "Fort Tolukko Spice Island Ternate" },
    city: "Ternate, Maluku Utara",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: 0.8123, lng: 127.3879 },
    targetYear: 2016,
    targetDateStr: { id: "Agustus 2016", en: "August 2016" },
    description: {
      id: "Benteng batu karang dan lahar beku yang dibangun bangsa Portugis pada tahun 1540 di atas bukit batu Ternate untuk mengawasi perdagangan cengkih dunia di kaki Gunung Gamalama.",
      en: "Built by the Portuguese in 1540 on a volcanic stone rise, Fort Tolukko guarded the lucrative global clove trade beneath the peaks of Mount Gamalama."
    },
    hints: {
      cars: { id: "Angkot mikrolet berstiker mencolok dan perahu motor kayu tradisional yang melayani rute antar-pulau vulkanik.", en: "Decorated minibuses and wooden inter-island motorboat taxis navigating the volcanic strait." },
      architecture: { id: "Benteng batu karang hitam kompak dengan menara pengawas bundar menghadap Selat Maluku.", en: "Compact black coral-stone fort with circular bastions overlooking the sapphire sea." },
      cultureOrFashion: { id: "Aroma harum cengkih yang dijemur warga di terpal depan rumah di pesisir pulau.", en: "Cloves laid out on blue tarps drying in the sun along the island road." }
    },
    streetViewOptions: { position: { lat: 0.8123, lng: 127.3879 }, pov: { heading: 110, pitch: 5, zoom: 1 } }
  },
  {
    id: "indo-50-papua-danau-sentani",
    levelNumber: 50,
    regions: ["global", "asia", "indonesia"],
    title: { id: "Danau Sentani & Bukit Tungkuwiri: Mahakarya Timur", en: "Lake Sentani & Tungkuwiri Hills Jayapura Papua" },
    city: "Jayapura, Papua",
    country: { id: "Indonesia", en: "Indonesia" },
    realLocation: { lat: -2.5770, lng: 140.5028 },
    targetYear: 2016,
    targetDateStr: { id: "Oktober 2016", en: "October 2016" },
    description: {
      id: "Panorama megah perbukitan sabana hijau Bukit Tungkuwiri (Bukit Teletubbies) yang menghadap hamparan Danau Sentani seluas 9.360 hektar di bawah kaki Pegunungan Cycloop Papua.",
      en: "The breathtaking emerald hills of Tungkuwiri overlooking expansive Lake Sentani and its island villages, nested below Papua's Cycloop Mountains."
    },
    hints: {
      cars: { id: "Taksi angkot minibus putih jalur Sentani-Abepura melintasi jalan aspal perbukitan.", en: "White Sentani-Abepura route vans navigating winding mountain asphalt." },
      architecture: { id: "Rumah panggung kayu tradisional suku Sentani di pulau-pulau kecil di tengah danau.", en: "Traditional stilt homes of the Sentani tribe dotting 21 lake islands." },
      cultureOrFashion: { id: "Lukisan kulit kayu Khombow dan mahkota bulu kasuari khas kebudayaan Sentani.", en: "Traditional Khombow bark cloth paintings and cassowary feather headdresses." }
    },
    panoId: "CAoSF0NJSE0wb2dLRUlDQWdJRFpyS3FVekFF",
    streetViewOptions: { position: { lat: -2.5770, lng: 140.5028 }, pov: { heading: 175, pitch: 4, zoom: 1 } }
  }
];

