export type Language = 'id' | 'en';

export type RegionId = 'global' | 'indonesia' | 'asia' | 'europe' | 'americas';

export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  round: string;
  score: string;
  restart: string;
  languageName: string;

  // Intro Screen
  welcomeBadge: string;
  welcomeTitle: string;
  welcomeDesc: string;
  howToPlayTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  selectRegionTitle: string;
  selectRegionDesc: string;
  startButton: string;
  loadingMaps: string;

  // Regions
  regions: Record<
    RegionId,
    {
      name: string;
      desc: string;
      flag: string;
    }
  >;

  // Street View HUD
  streetViewActive: string;
  investigationMission: string;
  investigationMissionDesc: string;
  zoomIn: string;
  zoomOut: string;
  resetPov: string;
  vintageFilter: string;
  loadingStreetView: string;
  loadingStreetViewDesc: string;
  streetViewErrorTitle: string;
  reloadPage: string;

  // Guess Map
  clickMapToGuess: string;
  pinPlaced: string;
  readyToGuess: string;
  distanceScoreNotice: string;
  expandMap: string;
  minimizeMap: string;
  resetPin: string;

  // Year Timeline
  guessYearTitle: string;
  guessYearDesc: string;
  forensicGuideBtn: string;
  closeForensicGuide: string;
  forensicGuideTitle: string;
  tabCars: string;
  tabArchitecture: string;
  tabCulture: string;
  labelCars: string;
  labelArchitecture: string;
  labelCulture: string;
  selectedYearLabel: string;
  targetYearLabel: string;
  earlyLaunch: string;
  modernEra: string;

  // Time Shift Feature
  timeShiftTitle: string;
  timeShiftDesc: string;
  timeShiftEquippedBadge: string;
  timeShiftUseBtn: (cost: number) => string;
  timeShiftActiveBanner: (min: number, max: number) => string;
  timeShiftNotEquippedPrompt: string;
  timeShiftCoinsNeeded: (needed: number) => string;
  timeShiftChargesLeft: (remaining: number, max: number) => string;
  timeShiftLimitReached: string;

  // Submit Button
  submitGuessBtn: (year: number) => string;
  markMapFirstBtn: string;

  // Round Results Modal
  roundResultHeader: (current: number, total: number) => string;
  gameOverHeader: string;
  originalArchiveLabel: string;
  locationPrecision: string;
  yearGuessTitle: string;
  exactYearMatch: string;
  yearDiffNotice: (diff: number) => string;
  maxPointsNotice: string;
  yourPick: string;
  historicalDossierTitle: string;
  roundPointsTotal: string;
  totalGameScore: string;
  shareScoreBtn: string;
  nextLocationBtn: string;
  restartExpeditionBtn: string;
  shareNoticeCopied: string;
  shareTextTemplate: (city: string, year: number, score: number) => string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  id: {
    appTitle: 'Time Trace',
    appSubtitle: 'Misteri Kronologis & Eksplorasi Arsip Masa Lalu',
    round: 'Ronde',
    score: 'Skor',
    restart: 'Mulai Ulang',
    languageName: 'Bahasa Indonesia',

    welcomeBadge: 'Petualangan Penjelajah Waktu & Detektif Arsip',
    welcomeTitle: 'Time Trace',
    welcomeDesc:
      'Kamu akan diterjunkan ke panorama 360° rekaman arsip masa lalu Google Street View. Tugasmu adalah mengungkap di mana lokasinya dan tahun berapa gambar tersebut diambil berdasarkan petunjuk visual seperti model kendaraan, arsitektur toko kuno, billboard iklan, dan busana masa itu!',
    howToPlayTitle: 'Cara Kerja Detektif Waktu',
    step1Title: '01. Eksplorasi 360°',
    step1Desc:
      'Jelajahi jalanan, perbesar sudut pandang, amati plat nomor, armada mobil, billboard iklan, atau gedung dalam pembangunan.',
    step2Title: '02. Pin Peta Dunia',
    step2Desc:
      'Tebak lokasi di peta interaktif. Semakin dekat tebakanmu ke koordinat asli, semakin tinggi skormu (hingga 5.000 pts).',
    step3Title: '03. Garis Waktu',
    step3Desc:
      'Tentukan tahun arsip pada garis waktu (2007–2024). Analisis akurat tahun memberikan bonus hingga 5.000 pts.',
    selectRegionTitle: 'Pilih Wilayah Eksplorasi',
    selectRegionDesc: 'Tentukan apakah ingin bertualang secara Global atau fokus di kawasan tertentu:',
    startButton: 'Mulai Perjalanan Waktu',
    loadingMaps: 'Menghubungkan ke Mesin Waktu...',

    regions: {
      global: {
        name: 'Seluruh Dunia (Global)',
        desc: 'Koleksi acak panorama arsip dari berbagai penjuru bumi',
        flag: '🌍',
      },
      indonesia: {
        name: 'Spesial Indonesia',
        desc: 'Nostalgia kota-kota di Indonesia (Jakarta, Yogya, Bandung, Surabaya, Bali)',
        flag: '🇮🇩',
      },
      asia: {
        name: 'Kawasan Asia',
        desc: 'Misteri kota-kota ikonik di Asia seperti Tokyo, Singapura, Kyoto & Nusantara',
        flag: '⛩️',
      },
      europe: {
        name: 'Benua Eropa',
        desc: 'Jejak arsip London, Paris, Berlin, Roma, hingga Amsterdam',
        flag: '🏛️',
      },
      americas: {
        name: 'Benua Amerika',
        desc: 'Kilas balik New York, San Francisco, Los Angeles, dan Chicago',
        flag: '🗽',
      },
    },

    streetViewActive: 'ARSIP STREET VIEW AKTIF',
    investigationMission: 'MISI INVESTIGASI:',
    investigationMissionDesc:
      'Perhatikan mobil, marka jalan, busana orang & bangunan untuk memecahkan misteri tahun!',
    zoomIn: 'Perbesar Sudut Pandang',
    zoomOut: 'Perkecil Sudut Pandang',
    resetPov: 'Kembali ke Sudut Awal',
    vintageFilter: 'Toggle Filter Lensa Vintage 2000-an',
    loadingStreetView: 'MEMUAT MESIN WAKTU STREET VIEW...',
    loadingStreetViewDesc: 'Mengambil rekaman arsip fotografi 360° resolusi tinggi',
    streetViewErrorTitle: 'Street View Tidak Dapat Dimuat',
    reloadPage: 'Muat Ulang Halaman',

    clickMapToGuess: 'Klik Peta Untuk Menebak Lokasi',
    pinPlaced: 'Pin Lokasi Diletakkan',
    readyToGuess: 'Siap Diuji',
    distanceScoreNotice: 'Makin dekat pin, makin tinggi skor (Maks 5.000)',
    expandMap: 'Perbesar Peta Penuh',
    minimizeMap: 'Perkecil Peta',
    resetPin: 'Reset Pin',

    guessYearTitle: 'Tebak Tahun Rekaman Arsip',
    guessYearDesc: 'Analisis kendaraan, gadget, fesyen, & arsitektur sekitarmu',
    forensicGuideBtn: 'Buku Petunjuk Forensik',
    closeForensicGuide: 'Tutup Petunjuk',
    forensicGuideTitle: 'Panduan Detektif Kronologis',
    tabCars: 'Mobil & Angkutan',
    tabArchitecture: 'Bangunan & Toko',
    tabCulture: 'Fesyen & Budaya',
    labelCars: 'Petunjuk Kendaraan:',
    labelArchitecture: 'Petunjuk Bangunan:',
    labelCulture: 'Petunjuk Budaya Pop / Fesyen:',
    selectedYearLabel: 'Tahun Dipilih:',
    targetYearLabel: 'Target:',
    earlyLaunch: '2007 (Peluncuran Awal)',
    modernEra: '2024 (Modern)',

    timeShiftTitle: 'Kronometer Pergeseran Waktu (Time Shift)',
    timeShiftDesc: 'Sensor krono memindai anomali masa lalu untuk mempersempit rentang tahun target (±2 tahun).',
    timeShiftEquippedBadge: 'Time Shift Terpasang',
    timeShiftUseBtn: (cost: number) => `Aktifkan Time Shift (${cost} Koin)`,
    timeShiftActiveBanner: (min: number, max: number) => `⏳ Sensor Temporal Aktif: Tahun target berada di rentang ${min} – ${max} (±2 tahun)!`,
    timeShiftNotEquippedPrompt: 'Beli & pasang Time Shift di Chrono Shop untuk mempersempit tahun!',
    timeShiftCoinsNeeded: (needed: number) => `Koin tidak cukup! Butuh ${needed} koin lagi.`,
    timeShiftChargesLeft: (remaining: number, max: number) => `Sisa ${remaining}/${max} Penggunaan Hari Ini`,
    timeShiftLimitReached: 'Batas harian habis (3/3 telah digunakan hari ini)',

    submitGuessBtn: (year: number) => `Kirim Tebakan (${year})`,
    markMapFirstBtn: 'Tandai Lokasi di Peta untuk Menebak',

    roundResultHeader: (current, total) => `HASIL RONDE ${current} / ${total}`,
    gameOverHeader: 'HASIL AKHIR INVESTIGASI WAKTU',
    originalArchiveLabel: 'Arsip Asli:',
    locationPrecision: 'Presisi Lokasi',
    yearGuessTitle: 'Tebakan Tahun',
    exactYearMatch: 'Tepat Sempurna!',
    yearDiffNotice: (diff) => `Selisih ${diff} tahun`,
    maxPointsNotice: 'Maksimal 5.000 pts',
    yourPick: 'Pilihan Anda:',
    historicalDossierTitle: 'Berkas Dokumen Masa Lalu',
    roundPointsTotal: 'Total Poin Ronde Ini',
    totalGameScore: 'Akumulasi Total Game',
    shareScoreBtn: 'Bagikan Skor',
    nextLocationBtn: 'Lanjut ke Lokasi Berikutnya',
    restartExpeditionBtn: 'Mulai Ekspedisi Waktu Baru',
    shareNoticeCopied: 'Teks hasil permainan berhasil disalin ke clipboard!',
    shareTextTemplate: (city, year, score) =>
      `🕵️‍♂️ Time Trace: Saya menebak arsip lokasi ${city} (${year}) dengan skor ${score.toLocaleString(
        'id-ID'
      )}/10.000 pts! Dapatkah kamu memecahkan misteri kronologis ini?`,
  },

  en: {
    appTitle: 'Time Trace',
    appSubtitle: 'Chronological Mystery & Historical Street View Explorer',
    round: 'Round',
    score: 'Score',
    restart: 'Restart',
    languageName: 'English',

    welcomeBadge: 'Time Traveler & Historical Detective Adventure',
    welcomeTitle: 'Time Trace',
    welcomeDesc:
      'You are dropped into 360° historical Google Street View archive footage. Your mission is to deduce WHERE you are and WHAT YEAR the panorama was captured by observing vehicle models, vintage storefronts, billboards, and fashion of that era!',
    howToPlayTitle: 'How to Play as a Chrono-Detective',
    step1Title: '01. 360° Exploration',
    step1Desc:
      'Inspect the surroundings, zoom in on license plates, car generations, billboards, and buildings under construction.',
    step2Title: '02. Pin the World Map',
    step2Desc:
      'Pin your location guess on the interactive mini-map. The closer your pin is to the true spot, the higher your score (up to 5,000 pts).',
    step3Title: '03. Timeline Guess',
    step3Desc:
      'Pick the year the archive was shot on the timeline (2007–2024). Accurate year matching earns up to 5,000 bonus pts.',
    selectRegionTitle: 'Choose Exploration Region',
    selectRegionDesc: 'Choose whether you want a worldwide expedition or focus on a specific region:',
    startButton: 'Start Time Journey',
    loadingMaps: 'Connecting to Time Machine...',

    regions: {
      global: {
        name: 'Worldwide (Global)',
        desc: 'Random archive panoramas from all corners of the globe',
        flag: '🌍',
      },
      indonesia: {
        name: 'Indonesia Special',
        desc: 'Nostalgic cities across Indonesia (Jakarta, Yogyakarta, Bandung, Surabaya, Bali)',
        flag: '🇮🇩',
      },
      asia: {
        name: 'Asia Pacific',
        desc: 'Iconic archive locations across Asia: Tokyo, Kyoto, Singapore & Jakarta',
        flag: '⛩️',
      },
      europe: {
        name: 'Europe',
        desc: 'Historical Street View records in London, Paris, Berlin, Rome & Amsterdam',
        flag: '🏛️',
      },
      americas: {
        name: 'Americas',
        desc: 'Flashback journeys across New York, San Francisco, Los Angeles & Chicago',
        flag: '🗽',
      },
    },

    streetViewActive: 'HISTORICAL ARCHIVE ACTIVE',
    investigationMission: 'INVESTIGATION MISSION:',
    investigationMissionDesc:
      'Observe cars, road markings, passerby fashion & architecture to crack the year mystery!',
    zoomIn: 'Zoom In View',
    zoomOut: 'Zoom Out View',
    resetPov: 'Reset Camera Angle',
    vintageFilter: 'Toggle 2000s Vintage Lens Filter',
    loadingStreetView: 'LOADING TIME-MACHINE STREET VIEW...',
    loadingStreetViewDesc: 'Fetching high-resolution 360° historical photo archives',
    streetViewErrorTitle: 'Unable to Load Street View',
    reloadPage: 'Reload Page',

    clickMapToGuess: 'Click Map to Guess Location',
    pinPlaced: 'Location Pin Dropped',
    readyToGuess: 'Ready to Confirm',
    distanceScoreNotice: 'Closer distance yields more points (Max 5,000)',
    expandMap: 'Expand Full Map',
    minimizeMap: 'Minimize Map',
    resetPin: 'Reset Pin',

    guessYearTitle: 'Guess Archival Year',
    guessYearDesc: 'Analyze vehicles, mobile phones, fashion, & architecture around you',
    forensicGuideBtn: 'Forensic Clue Dossier',
    closeForensicGuide: 'Close Clues',
    forensicGuideTitle: 'Chronological Detective Guide',
    tabCars: 'Cars & Transit',
    tabArchitecture: 'Buildings & Shops',
    tabCulture: 'Fashion & Pop Culture',
    labelCars: 'Vehicle Clues:',
    labelArchitecture: 'Architecture Clues:',
    labelCulture: 'Culture & Fashion Clues:',
    selectedYearLabel: 'Selected Year:',
    targetYearLabel: 'Target:',
    earlyLaunch: '2007 (Early Launch)',
    modernEra: '2024 (Modern)',

    timeShiftTitle: 'Time Shift Chronometer',
    timeShiftDesc: 'Temporal chronometer scans past anomalies to narrow down target year range (±2 years).',
    timeShiftEquippedBadge: 'Time Shift Equipped',
    timeShiftUseBtn: (cost: number) => `Activate Time Shift (${cost} Coins)`,
    timeShiftActiveBanner: (min: number, max: number) => `⏳ Anomaly Detected: Target year is within ${min} – ${max} (±2 years)!`,
    timeShiftNotEquippedPrompt: 'Buy & equip Time Shift in the Chrono Shop to reveal the year range!',
    timeShiftCoinsNeeded: (needed: number) => `Not enough coins! Need ${needed} more coins.`,
    timeShiftChargesLeft: (remaining: number, max: number) => `${remaining}/${max} Uses Left Today`,
    timeShiftLimitReached: 'Daily limit reached (3/3 used today)',

    submitGuessBtn: (year: number) => `Submit Guess (${year})`,
    markMapFirstBtn: 'Pin Location on Map to Submit',

    roundResultHeader: (current, total) => `ROUND ${current} / ${total} RESULT`,
    gameOverHeader: 'FINAL EXPEDITION SUMMARY',
    originalArchiveLabel: 'Actual Archive:',
    locationPrecision: 'Location Precision',
    yearGuessTitle: 'Year Deduction',
    exactYearMatch: 'Bullseye! Perfect Match!',
    yearDiffNotice: (diff) => `${diff} year${diff > 1 ? 's' : ''} difference`,
    maxPointsNotice: 'Max 5,000 pts',
    yourPick: 'Your Guess:',
    historicalDossierTitle: 'Historical Archive Dossier',
    roundPointsTotal: 'Points This Round',
    totalGameScore: 'Total Expedition Score',
    shareScoreBtn: 'Share Score',
    nextLocationBtn: 'Next Mystery Location',
    restartExpeditionBtn: 'Start New Expedition',
    shareNoticeCopied: 'Score summary copied to clipboard!',
    shareTextTemplate: (city, year, score) =>
      `🕵️‍♂️ Time Trace: I deduced ${city} (${year}) with a score of ${score.toLocaleString(
        'en-US'
      )}/10,000 pts! Can you solve this chronological mystery?`,
  },
};
