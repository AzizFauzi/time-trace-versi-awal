export interface BlogArticle {
  id: string;
  slug: string;
  title: {
    id: string;
    en: string;
  };
  excerpt: {
    id: string;
    en: string;
  };
  category: {
    id: string;
    en: string;
  };
  readTime: string;
  date: string;
  author: {
    name: string;
    role: {
      id: string;
      en: string;
    };
    avatar: string;
  };
  coverImage: string;
  tags: string[];
  relatedLevel?: number;
  content: {
    id: {
      intro: string;
      sections: {
        heading: string;
        body: string;
        tip?: string;
      }[];
      conclusion: string;
    };
    en: {
      intro: string;
      sections: {
        heading: string;
        body: string;
        tip?: string;
      }[];
      conclusion: string;
    };
  };
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'streetview-gen-car-clues',
    slug: 'cara-tebak-tahun-street-view-kamera-mobil',
    title: {
      id: '5 Cara Mengetahui Tahun Foto Street View dari Ciri Mobil & Kualitas Kamera',
      en: '5 Ways to Deduce the Year in Street View Photos via Cars & Camera Generations',
    },
    excerpt: {
      id: 'Pelajari rahasia detektif kronologis dalam membaca kualitas resolusi lensa kamera, halo ungu, serta model kendaraan untuk menebak dekade dengan presisi tinggi.',
      en: 'Master the chronological detective secrets of spotting lens resolution, purple halo artifacts, and vehicle designs to pinpoint the decade with surgical accuracy.',
    },
    category: {
      id: 'Panduan Detektif',
      en: 'Detective Guide',
    },
    readTime: '4 min read',
    date: '12 Mei 2026',
    author: {
      name: 'Inspektur Krono',
      role: {
        id: 'Penyelidik Arsip Utama',
        en: 'Chief Archival Investigator',
      },
      avatar: '🕵️‍♂️',
    },
    coverImage: '/city-images/L1_Paris.png',
    tags: ['Street View', 'Tips Detektif', 'Geografi', 'Otomotif'],
    relatedLevel: 1,
    content: {
      id: {
        intro: 'Ketika menjelajahi panorama 360 derajat masa lalu, banyak pemain pemula terpaku hanya mencari tanggal pada spanduk atau papan reklame. Padahal, petunjuk terbesar sering kali tersembunyi tepat di depan mata: teknologi optik kamera dan model kendaraan yang melintas di aspal jalanan.',
        sections: [
          {
            heading: '1. Mengenali Generasi Kamera Street View (Gen 1 hingga Gen 4)',
            body: 'Google pertama kali meluncurkan Street View pada Mei 2007. Foto era 2007-2009 (Gen 1 & awal Gen 2) memiliki ciri khas resolusi rendah, artefak kompresi kasar, serta sering muncul efek "purple fringing" (pantulan ungu) saat kamera berhadapan dengan terik matahari. Sebaliknya, rekaman sejak 2017 ke atas (Gen 4) menampilkan warna tajam HDR, aspal yang jernih, dan bayangan yang sangat kontras.',
            tip: 'Jika langit tampak berbayang ungu keunguan dan dedaunan pohon tampak buram, hampir dipastikan foto tersebut diambil sebelum tahun 2010.',
          },
          {
            heading: '2. Siluet dan Evolusi Desain Mobil',
            body: 'Mobil adalah penunjuk waktu paling jujur di perkotaan. Di era 2005–2010, mobil sedan dan MPV cenderung memiliki sudut lampu yang runcing tajam dengan antena radio fisik panjang di atap. Sementara memasuki tahun 2018 ke atas, lampu DRL LED garis tipis, grille raksasa, dan mobil berdaya listrik/hybrid mulai mendominasi jalan-jalan kota dunia.',
            tip: 'Melihat banyak taksi Toyota Crown lawas atau sedan kotak retro di jalanan Tokyo atau London biasanya mengindikasikan arsip foto awal 2000-an.',
          },
          {
            heading: '3. Billboard Gadget & Iklan Seluler',
            body: 'Perhatikan papan reklame toko elektronik. Iklan ponsel berkamera dengan tombol fisik QWERTY (BlackBerry atau Nokia) merupakan penanda emas era 2007–2011. Sementara smartphone layar penuh tanpa tombol dengan "notch" di atas layar menandakan arsip pasca-2018.',
          },
          {
            heading: '4. Model Pelat Nomor Kendaraan',
            body: 'Beberapa negara mengganti format pelat nomor secara berkala. Misalnya, Prancis mengadopsi sistem pelat nomor baru (format AA-123-AA) pada tahun 2009. Jika Anda melihat mobil Prancis dengan pelat kuning di bagian belakang dan pelat putih di depan dengan format angka lama, foto itu pasti diambil sebelum 2009!',
          },
        ],
        conclusion: 'Menggabungkan analisis optik kamera dengan bentuk kendaraan akan mempersempit tebakan tahun Anda hingga rentang ±2 tahun saja. Buktikan ketajaman insting detektif Anda sekarang!',
      },
      en: {
        intro: 'When exploring past 360-degree panoramas, novice players often rely solely on visible dates on banners. Yet the most reliable chronological clues hide in plain sight: camera optical generations and automotive aesthetics cruising the pavement.',
        sections: [
          {
            heading: '1. Spotting Camera Generations (Gen 1 through Gen 4)',
            body: 'Google first unveiled Street View in May 2007. Panoramas captured between 2007 and 2009 (Gen 1 & early Gen 2) exhibit noticeably low resolution, heavy compression artifacts, and prominent purple fringing when angled towards bright daylight. Conversely, post-2017 imagery (Gen 4) boasts ultra-crisp HDR, vivid asphalt textures, and pristine color dynamics.',
            tip: 'If the sky exhibits a purplish halo and foliage appears heavily pixelated, you are almost certainly looking at pre-2010 archival imagery.',
          },
          {
            heading: '2. Silhouette & Vehicle Evolution',
            body: 'Automobiles are chronological anchors. In the 2005–2010 era, sedans and hatchbacks featured physical telescoping roof antennae and bulbous headlamps. Entering 2018 and beyond, sleek horizontal LED daytime running lights, massive front grilles, and electric vehicles dominate world boulevards.',
            tip: 'Spotting fleets of boxy older sedans in London or Tokyo generally denotes early-generation imagery from the late 2000s.',
          },
          {
            heading: '3. Mobile Tech & Consumer Billboards',
            body: 'Electronic storefront ads provide immediate epoch verification. Billboards flaunting QWERTY keypad phones (BlackBerry or Nokia) firmly lock the timeline to 2007–2011, while edge-to-edge smartphones confirm post-2018 captures.',
          },
          {
            heading: '4. License Plate System Conversions',
            body: 'Certain nations underwent systematic license plate transitions. France, for instance, transitioned to the AA-123-AA format in 2009. Spotting older French registrations featuring yellow rear plates confirms a pre-2009 capture!',
          },
        ],
        conclusion: 'Fusing optical artifact deductions with automotive trends will hone your year estimation down to an exact ±2 year margin. Test your newfound detective skills today!',
      },
    },
  },
  {
    id: 'nostalgia-jakarta-arsip-digital',
    slug: 'nostalgia-arsip-jakarta-2010',
    title: {
      id: 'Nostalgia Jakarta Era 2010 vs Sekarang: Menelusuri Arsip Digital Ibu Kota',
      en: 'Nostalgia of Jakarta Circa 2010 vs Today: Tracing the Capital’s Digital Archives',
    },
    excerpt: {
      id: 'Melihat kembali wajah Jakarta sebelum era MRT: metromini oranye, halte busway generasi pertama, dan transformasi dramatis koridor Sudirman-Thamrin.',
      en: 'Revisiting Jakarta before the MRT era: iconic orange Metrominis, first-generation Transjakarta shelters, and the metamorphosis of Sudirman-Thamrin.',
    },
    category: {
      id: 'Arsip Nusantara',
      en: 'Archival Heritage',
    },
    readTime: '5 min read',
    date: '28 April 2026',
    author: {
      name: 'Kartografer Batavia',
      role: {
        id: 'Kurator Sejarah Perkotaan',
        en: 'Urban History Curator',
      },
      avatar: '🏛️',
    },
    coverImage: '/city-images/L1_Jakarta.png',
    tags: ['Jakarta', 'Nusantara', 'Transformasi Kota', 'Arsip Digital'],
    relatedLevel: 10,
    content: {
      id: {
        intro: 'Ibu kota Jakarta adalah salah satu megapolitan dengan transformasi lanskap tercepat di Asia Tenggara. Melalui rekaman Street View yang membentang dari dekade lalu hingga kini, kita memiliki "mesin waktu" nyata untuk menyaksikan riwayat perubahan tata kota secara visual.',
        sections: [
          {
            heading: '1. Hilangnya Angkutan Ikonik Metromini & Kopaja',
            body: 'Di awal perekaman jalanan Jakarta sekitar tahun 2013–2014, hampir mustahil menyusuri Jalan Rasuna Said atau Gatot Subroto tanpa berpapasan dengan Metromini oranye-merah atau Kopaja putih-hijau dengan asap knalpot tebalnya. Kini, armada tersebut telah berevolusi menjadi armada bus ramah lingkungan.',
            tip: 'Kemunculan Metromini dengan kaca depan berkisi besi menjadi salah satu petunjuk terkuat era awal 2010-an di Jakarta.',
          },
          {
            heading: '2. Koridor Sudirman Sebelum Jalur MRT Melayang & Bawah Tanah',
            body: 'Sebelum pembangunan MRT Fase 1 rampung pada 2019, kawasan Bundaran HI dan sepanjang Sudirman dihiasi pagar seng proyek konstruksi raksasa bertuliskan logo MRT Jakarta. Di era sebelum 2014, jalur hijau rindang masih berdiri utuh di median jalan sebelum dikorbankan untuk pelebaran trotoar ramah pejalan kaki.',
          },
          {
            heading: '3. Revitalisasi Kota Tua dan Jembatan Merah',
            body: 'Kawasan Fatahillah Kota Tua dan aliran Kali Besar mengalami transformasi drastis. Revitalisasi kanal ala Amsterdam dengan jalur pejalan kaki terapung yang diresmikan tahun 2018 menjadi penanda waktu yang jelas saat membedakan foto lama dan baru.',
          },
        ],
        conclusion: 'Arsip digital jalanan bukan sekadar alat navigasi, melainkan warisan visual sejarah modern yang mengabadikan denyut nadi masyarakat dari masa ke masa.',
      },
      en: {
        intro: 'Jakarta stands as one of Southeast Asia’s most rapidly evolving megacities. Through archival Street View imagery spanning over a decade, we hold a tangible visual time machine tracing urban spatial evolution.',
        sections: [
          {
            heading: '1. The Vanishing Era of Metrominis & Kopajas',
            body: 'In early panoramic passes around 2013–2014, traversing major arteries without encountering roaring orange Metrominis or green Kopajas was virtually unthinkable. Today, these have been integrated into modern low-emission transit fleets.',
            tip: 'The sighting of steel-grilled orange mid-sized buses unequivocally pins Jakarta imagery to the early 2010s.',
          },
          {
            heading: '2. The Sudirman Corridor Prior to MRT Excavations',
            body: 'Before the inaugural MRT line commenced in 2019, the iconic Bundaran HI roundabout was surrounded by extensive green construction hoardings. Earlier pre-2014 footage reveals mature center-median trees prior to contemporary sidewalk expansions.',
          },
          {
            heading: '3. Old Town (Kota Tua) Canal Revitalization',
            body: 'The historical Kali Besar canal underwent an Amsterdam-style revitalization unveiled in 2018 featuring floating walkways, serving as an unambiguous benchmark between older and modern archival captures.',
          },
        ],
        conclusion: 'Digital street archives transcend everyday navigation: they serve as cultural repositories preserving the evolving pulse of urban society.',
      },
    },
  },
  {
    id: 'trik-arah-bayangan-belahan-bumi',
    slug: 'trik-arah-bayangan-belahan-bumi',
    title: {
      id: 'Mengenali Belahan Bumi & Arah Bayangan: Kiat Observasi Detektif Geografi',
      en: 'Spotting Hemispheres & Sun Shadows: Detective Field Observation Guide',
    },
    excerpt: {
      id: 'Kuasai kompas dan sudut jatuh sinar matahari. Bagaimana bayangan ke arah selatan membuktikan kamu berada di belahan bumi utara, dan sebaliknya.',
      en: 'Master compass readings and solar incidence angles. Learn how southward shadows confirm northern hemisphere locations and vice-versa.',
    },
    category: {
      id: 'Kiat Meta',
      en: 'Meta Clues',
    },
    readTime: '3 min read',
    date: '15 April 2026',
    author: {
      name: 'Atlas Rover',
      role: {
        id: 'Geometrikus & Navigator',
        en: 'Geometrician & Navigator',
      },
      avatar: '🧭',
    },
    coverImage: '/city-images/L3_San Francisco.png',
    tags: ['Matahari', 'Kompas', 'Geografi', 'Arah Angin'],
    relatedLevel: 5,
    content: {
      id: {
        intro: 'Saat dilempar ke lokasi antah-berantah di tengah jalan pedesaan tanpa papan nama jalan, petunjuk paling kosmis yang bisa Anda percayai adalah Matahari dan kompas di layar Anda.',
        sections: [
          {
            heading: '1. Hukum Emas Posisi Matahari Tengah Hari',
            body: 'Sebagian besar rekaman panorama jalan diambil saat siang hari ketika matahari berada di puncaknya. Di Belahan Bumi Utara (Eropa, Amerika Utara, Asia Timur), matahari berada di sisi SELATAN cakrawala. Akibatnya, bayangan objek (mobil, pohon, tiang listrik) akan selalu jatuh mengarah ke UTARA.',
            tip: 'Jika Anda menghadap ke arah matahari dan kompas menunjukkan huruf "S" (South), Anda hampir pasti berada di Belahan Bumi Utara!',
          },
          {
            heading: '2. Belahan Bumi Selatan: Australia, Afrika Selatan & Amerika Latin',
            body: 'Sebaliknya, di Belahan Bumi Selatan, matahari bergerak melintasi langit bagian UTARA. Artinya, jika bayangan jatuh ke arah SELATAN, Anda sedang berdiri di benua Australia, Selandia Baru, Afrika Selatan, atau Chili/Argentina.',
          },
          {
            heading: '3. Kawasan Khatulistiwa (Ekuator)',
            body: 'Di negara-negara ekuatorial seperti Indonesia, Kolombia, dan Kenya, bayangan di siang hari cenderung sangat pendek tepat di bawah kaki atau kendaraan ("matahari tepat di atas kepala").',
          },
        ],
        conclusion: 'Hanya butuh 3 detik untuk mengecek kompas dan arah jatuhnya bayangan untuk mengeliminasi separuh dunia dari pilihan Anda!',
      },
      en: {
        intro: 'When dropped into an unmarked rural panorama without street signs, the most cosmic reliable benchmark at your disposal is the Sun matched against your compass.',
        sections: [
          {
            heading: '1. The Golden Rule of Midday Solar Trajectory',
            body: 'Street imagery is overwhelmingly recorded during daytime peaks. In the Northern Hemisphere (Europe, North America, East Asia), the sun traces the SOUTHERN sky. Consequently, shadows cast by lampposts and vehicles extend towards the NORTH.',
            tip: 'If looking directly towards the sun aligns your compass heading toward "S" (South), you are decisively in the Northern Hemisphere!',
          },
          {
            heading: '2. The Southern Hemisphere: Australia, Southern Africa & Latin America',
            body: 'Conversely, south of the equator, solar zenith sweeps across the NORTHERN sky. Seeing shadows projecting southward firmly locks your geographic search to Australia, New Zealand, southern Africa, or South America.',
          },
          {
            heading: '3. Equatorial Zenith Regions',
            body: 'In equatorial territories such as Indonesia, Colombia, and Kenya, midday shadows condense tightly beneath vehicle undercarriages due to overhead zenith angles.',
          },
        ],
        conclusion: 'It takes merely three seconds to verify solar azimuth against compass orientation to eliminate an entire hemisphere from consideration!',
      },
    },
  },
  {
    id: 'sejarah-restorasi-candi-borobudur',
    slug: 'sejarah-restorasi-candi-borobudur',
    title: {
      id: 'Misteri Restorasi Candi Borobudur & Arsip Foto Abad ke-19',
      en: 'The Mystery of Borobudur Restoration & 19th-Century Archival Photography',
    },
    excerpt: {
      id: 'Dari tumpukan reruntuhan semak belukar tahun 1814 hingga restorasi akbar UNESCO. Kisah dokumentasi fotografi tertua peninggalan wangsa Syailendra.',
      en: 'From overgrown jungle ruins in 1814 to monumental UNESCO restoration. The story behind the earliest photographic archives of the Shailendra dynasty.',
    },
    category: {
      id: 'Warisan Sejarah',
      en: 'Historical Mystery',
    },
    readTime: '4 min read',
    date: '02 April 2026',
    author: {
      name: 'Dr. Raden Haryo',
      role: {
        id: 'Arkeolog Monumen Kuno',
        en: 'Ancient Monuments Archaeologist',
      },
      avatar: '📜',
    },
    coverImage: '/city-images/L2_Magelang.png',
    tags: ['Borobudur', 'Magelang', 'UNESCO', 'Arkeologi'],
    relatedLevel: 2,
    content: {
      id: {
        intro: 'Candi Borobudur di Magelang, Jawa Tengah, adalah salah satu keajaiban arsitektur buddhis terbesar di muka bumi. Namun, selama berabad-abad monumen megah ini sempat terkubur debu vulkanik Gunung Merapi dan rimba belantara sebelum terungkap kembali melalui lensa fotografi awal.',
        sections: [
          {
            heading: '1. Penemuan Kembali oleh Raffles (1814)',
            body: 'Pada tahun 1814, Gubernur Jenderal Britania Thomas Stamford Raffles mendengar desas-desus tentang reruntuhan raksasa di dekat desa Bumisegoro. Ia mengutus insinyur Belanda H.C. Cornelius untuk membersihkan hutan belantara selama hampir dua bulan demi menyingkap susunan batu stupa pertama.',
          },
          {
            heading: '2. Foto Tertua Borobudur oleh Isidore van Kinsbergen (1873)',
            body: 'Fotografer perintis Isidore van Kinsbergen ditugaskan oleh pemerintah kolonial untuk mendokumentasikan setiap panel relief. Foto-foto hitam-putih albumin cetakannya menjadi rujukan tak ternilai sebelum stupa-stupa puncak mengalami keretakan akibat erosi air tanah.',
            tip: 'Banyak panel relief Karmawibhangga di bagian kaki candi yang tertutup selasar batu tambahan hanya dapat dilihat melalui arsip foto karya Kassian Cephas tahun 1890.',
          },
          {
            heading: '3. Proyek Restorasi Akbar Abad ke-20',
            body: 'Pemugaran pertama dipimpin Theodoor van Erp (1907–1911), disusul proyek pemugaran besar-besaran bersama UNESCO pada 1973–1983 yang membongkar lebih dari satu juta balok batu andesit satu per satu untuk memasang drainase modern berstruktur beton.',
          },
        ],
        conclusion: 'Ketika Anda mengamati panorama candi ini di Time Trace, renungkan bahwa setiap balok batu menyimpan saksi bisu perjuangan restorasi lintas generasi.',
      },
      en: {
        intro: 'Borobudur in Magelang, Central Java, ranks among the grandest Buddhist monuments ever erected. Yet for centuries, this architectural marvel lay entombed under Merapi volcanic ash and dense jungle prior to its rediscovery and preservation through early photography.',
        sections: [
          {
            heading: '1. Rediscovery by Raffles in 1814',
            body: 'In 1814, British Lieutenant Governor Thomas Stamford Raffles was alerted to gigantic ruins concealed within Bumisegoro jungle. He dispatched Dutch engineer H.C. Cornelius to clear hectares of dense vegetation, unearthing the first stupa terraces.',
          },
          {
            heading: '2. The Earliest Photographic Surveys (1873 & 1890)',
            body: 'Pioneering photographer Isidore van Kinsbergen documented the intricate bas-reliefs in 1873. Later in 1890, Javanese photographer Kassian Cephas captured the hidden Karmawibhangga reliefs beneath the encasement foot before they were permanently sealed.',
            tip: 'Archival albumen prints from 1890 remain our sole visual portal into the complete hidden Karmawibhangga bas-reliefs.',
          },
          {
            heading: '3. The Monumental UNESCO Restoration Era',
            body: 'Initial conservation was led by Theodoor van Erp (1907–1911), culminating in the historic UNESCO-backed project (1973–1983) that systematically dismantled and cataloged over one million andesite stone blocks to install cutting-edge drainage.',
          },
        ],
        conclusion: 'When examining this sanctuary within Time Trace, reflect upon the generations of archival preservation that make every stone terrace come alive.',
      },
    },
  },
];
