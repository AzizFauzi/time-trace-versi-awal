import fs from 'fs';
import path from 'path';

const files = [
  'src/data/levelsChapter1.ts',
  'src/data/levelsChapter2.ts',
  'src/data/levelsChapter3.ts',
  'src/data/levelsChapter4.ts',
  'src/data/levelsChapter5.ts',
  'src/data/levelsIndonesia.ts',
];

const replacements = {
  // Chapter 1
  'lvl-3-jakarta-monas': {
    id: "Taksi sedan Blue Bird warna biru dan armada busway gandeng merah-oranye lawas.",
    en: "Blue Bird sedan taxis and vintage articulated rapid transit buses."
  },
  'lvl-9-dublin-temple-bar': {
    id: "Taksi sedan Skoda Octavia dan Ford Mondeo dengan lampu atap taksi kuning-hijau.",
    en: "Skoda Octavia and Ford Mondeo taxi cabs with standard illuminated roof bars."
  },
  'lvl-19-madrid-puerta-del-sol': {
    id: "SEAT Ibiza dan Toledo taxi putih dengan garis diagonal merah menyilang di pintu depan.",
    en: "White SEAT Ibiza & Toledo taxis featuring a distinctive diagonal red stripe on the front doors."
  },
  'lvl-20-kyoto-gion-yasaka': {
    id: "Taksi sedan Toyota Crown Comfort warna hitam dengan lampu atap simbol daun semanggi (clover).",
    en: "Black MK taxis and Crown Comfort cabs topped with clover roof lights."
  },

  // Chapter 2
  'lvl-21-milan-duomo': {
    id: "Trem oranye Peter Witt model klasik tahun 1928 melintas di jalur rel pusat mode.",
    en: "Historic orange Peter Witt vintage 1928 streetcars clattering along the central rails."
  },
  'lvl-22-zurich-bahnhofstrasse': {
    id: "Trem listrik biru-putih bertingkat modern model Tram 2000 melintas di jalur perbelanjaan elegan.",
    en: "Blue-and-white Tram 2000 transit electric streetcars cruising the pedestrian boulevard."
  },
  'lvl-31-vancouver-gastown': {
    id: "Bus listrik troli putih-biru model New Flyer terhubung ke kabel listrik udara.",
    en: "Blue-and-white electric trolley buses powered by overhead catenary wires."
  },
  'lvl-33-boston-quincy-market': {
    id: "Taksi sedan kuning beratap putih dan kendaraan amfibi wisata 'Duck Tour' bercat warna-warni.",
    en: "Yellow sedans with white taxi roofs and colorful amphibious historic 'Duck Tour' vehicles."
  },
  'lvl-36-bangkok-wat-arun': {
    id: "Tuk-tuk roda tiga bermesin kencang dan deretan perahu kayu longtail boat di tepian sungai.",
    en: "Motorized three-wheeled tuk-tuks and narrow wooden longtail riverboats docked on the river."
  },
  'lvl-37-kuala-lumpur-klcc': {
    id: "Sedan Proton Saga & Persona taxi bercat merah-putih bertuliskan 'Teksi'.",
    en: "Proton Saga and Persona two-tone red-and-white sedans badged as 'Teksi'."
  },
  'lvl-39-taipei-101': {
    id: "Taksi sedan Toyota Camry dan MPV Toyota Wish warna kuning cerah di lajur jalan bertingkat.",
    en: "Bright yellow Toyota Camry and Wish fleet taxis cruising beneath the elevated roadways."
  },

  // Chapter 3
  'lvl-41-barcelona-sagrada-familia': {
    id: "Taksi hitam dengan pintu warna kuning cerah dan bus kota bertingkat rendah merah.",
    en: "Black cabs with contrasting bright yellow doors and low-floor red municipal buses."
  },
  'lvl-44-london-tower-bridge': {
    id: "Bus tingkat merah bertingkat dua dan mobil taksi kabin hitam legendaris model TX2.",
    en: "Bright red double-decker commuter buses and traditional black TX2 cab hacks."
  },
  'lvl-53-seattle-pike-place': {
    id: "Mobil wagon Subaru Outback dan Volvo kotak yang sangat populer di pesisir Pasifik barat laut.",
    en: "Subaru Outbacks and boxy Volvo wagons typical of the Pacific Northwest."
  },
  'lvl-54-new-orleans-bourbon-st': {
    id: "Truk servis minuman dan mobil sedan patroli kepolisian kota tua bergaris biru-putih lawas.",
    en: "Beverage delivery vans and vintage municipal police cruisers patrol the French Quarter cobblestones."
  },
  'lvl-55-toronto-cn-tower': {
    id: "Taksi sedan Crown Victoria berpadu warna oranye-hijau terang di bodi samping.",
    en: "Orange-and-green two-tone Crown Victoria fleet cabs unique to this metropolis."
  },
  'lvl-56-rio-copacabana': {
    id: "Taksi sedan warna kuning cerah dengan garis horizontal biru tebal di sepanjang bodi samping.",
    en: "Bright yellow sedan cabs featuring a prominent horizontal blue stripe along their sides."
  },
  'lvl-57-buenos-aires-obelisco': {
    id: "Taksi sedan hitam dengan bagian kap atap dicat warna kuning cerah.",
    en: "Black sedan cabs topped with contrasting bright yellow roofs."
  },

  // Chapter 4
  'lvl-68-casablanca-hassan-ii': {
    id: "Taksi kecil 'Petit Taxi' Peugeot 205 warna merah tua mengantre di sepanjang jalan pesisir.",
    en: "Iconic scarlet-red Peugeot 205 and Dacia 'Petit Taxis' lined along the coastal corniche."
  },
  'lvl-74-dubai-burj-khalifa': {
    id: "Taksi sedan Toyota Camry dengan warna atap merah/biru/kuning serta deretan mobil supercar mewah.",
    en: "Color-roofed Toyota Camry public taxi fleets and multi-million-dollar exotic supercars."
  },
  'lvl-76-istanbul-hagia-sophia': {
    id: "Taksi sedan Fiat Albea & Linea warna kuning cerah bertuliskan 'Taksi'.",
    en: "Bright yellow Fiat Albea and Linea sedan cabs badged with yellow 'Taksi' signs."
  },

  // Chapter 5
  'lvl-82-beijing-forbidden-city': {
    id: "Taksi sedan Hyundai Elantra dengan kombinasi warna dua nada hijau dan kuning.",
    en: "Two-tone green-and-yellow Hyundai Elantra taxi sedans on the wide boulevards."
  },
  'lvl-83-london-kings-cross': {
    id: "Bus merah bertingkat dua dan taksi kabin hitam klasik berplat nomor tahun 2008.",
    en: "Red double-deckers and classic black hackney carriages with 2008 British registration plates."
  },

  // Indonesia
  'indo-3-bandung-gedung-sate': {
    id: "Angkot hijau bergaris kuning dengan trayek lokal melintas di depan kompleks berpohon rindang.",
    en: "Green-and-yellow local minibuses (Angkot) navigating tree-lined provincial avenues."
  },
  'indo-11-solo-pasar-gede': {
    id: "Becak kayuh tradisional beratap lengkung bulat khas wilayah Mataram Islam.",
    en: "Traditional round-canopy cycle rickshaws lined up outside the bustling market."
  },
  'indo-12-malang-kayutangan': {
    id: "Mikrolet angkot warna biru dengan kode trayek singkatan di kaca depan (AG/LDG).",
    en: "Iconic blue passenger minibuses (Mikrolet) with route code acronyms on windshields."
  },
  'indo-14-bali-ubud-monkey-forest': {
    id: "Mobil van pariwisata Isuzu Elf dan Suzuki APV warna perak dengan plat nomor DK.",
    en: "Silver Isuzu Elf tourist vans and Suzuki APV shuttles bearing DK registration plates."
  },
  'indo-16-lombok-senggigi': {
    id: "Mobil pick-up angkutan pedesaan dengan bangku kayu dan motor bebek berplat DR.",
    en: "Rural open-bed pick-up passenger trucks and scooters bearing DR registration plates."
  },
  'indo-19-medan-istana-maimun': {
    id: "Becak motor (Bentor) bermesin 2-tak dengan posisi sespan penumpang berada di samping kemudi.",
    en: "Motorized sidecar tricycles (Bentor) with passenger cabins mounted directly beside the driver."
  },
  'indo-22-balikpapan-melawai': {
    id: "Angkot berlabel nomor rute 5 dan 6 warna biru dan kuning di koridor jalan tepi teluk.",
    en: "Numbered route 5 and 6 minibuses in contrasting blue and yellow livery cruising the coastal avenue."
  },
  'indo-25-makassar-pantai-losari': {
    id: "Angkutan kota mikrolet 'Pete-pete' warna biru tua dengan pintu samping terbuka.",
    en: "Iconic dark blue 'Pete-pete' passenger minibuses navigating the seaside promenade."
  },
  'indo-26-manado-jembatan-soekarno': {
    id: "Angkot mikro warna biru muda ceper dengan modifikasi velg, kaca film gelap, dan speaker besar.",
    en: "Custom light-blue lowered minibuses boasting tuned sound systems and tinted windshields."
  },
  'indo-28-ambon-merah-putih': {
    id: "Angkot warna merah menyala dengan musik disko keras dan plat nomor berawalan huruf DE.",
    en: "Bright red passenger minibuses equipped with sound systems and DE registration plates."
  },
  'indo-32-bandung-alun-alun': {
    id: "Jalan raya bersejarah di depan alun-alun dipadati mobil Avanza, angkot hijau, dan motor matic.",
    en: "Historic downtown boulevard flanked by bustling car traffic, local green vans, and scooters."
  },
  'indo-33-surabaya-tugu-pahlawan': {
    id: "Armada angkot mikrolet Bemo warna kuning/lyn dan padatnya sepeda motor komuter plat L.",
    en: "Yellow lyn minibuses (Bemo) surrounded by fleets of commuter motorbikes with L plates."
  },
  'indo-37-aceh-baiturrahman': {
    id: "Becak motor (bentor) berplat BL dan minibus angkutan umum Kijang 'Labi-labi' warna biru.",
    en: "Motorized passenger trishaws with BL plates and blue 'labi-labi' public commuter vans."
  },
  'indo-41-banten-mercusuar-anyer': {
    id: "Angkot lokal berplat nomor A dan mobil pikap nelayan pengangkut hasil tangkapan laut.",
    en: "Local route minibuses with A license plates alongside open pickup trucks carrying fresh seafood."
  },
  'indo-42-semarang-lawang-sewu': {
    id: "Bus BRT bertubuh merah melintas di bundaran tugu bersama mikrolet angkot kuning.",
    en: "Red municipal BRT feeder buses and bright yellow public minivans circling the roundabout."
  },
  'indo-43-dieng-candi-arjuna': {
    id: "Sepeda motor modifikasi petani pengangkut pupuk dan minibus mikro travel antar-kota pegunungan.",
    en: "Highland farmers' utility motorbikes and compact intercity mountain tour vans."
  },
  'indo-47-kalbar-rumah-radakng': {
    id: "Pelataran parkir luas perkampungan budaya dengan deretan motor bebek berplat KB.",
    en: "Spacious cultural park grounds filled with visiting scooters bearing KB license plates."
  },
  'indo-48-makassar-fort-rotterdam': {
    id: "Petepete (angkot mikrolet biru muda) bertulisan kode trayek melintas di jalanan pesisir dekat benteng.",
    en: "Blue petepete passenger minibuses bustling along the coastal avenue near the fortress."
  },
  'indo-49-ternate-benteng-tolukko': {
    id: "Angkot mikrolet berstiker mencolok dan perahu motor kayu tradisional yang melayani rute antar-pulau vulkanik.",
    en: "Decorated minibuses and wooden inter-island motorboat taxis navigating the volcanic strait."
  }
};

let totalModified = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  let fileChanged = false;

  for (const [id, rep] of Object.entries(replacements)) {
    // Regex to find the block for this id:
    // e.g. id:\s*["']lvl-3-jakarta-monas["'] ... cars:\s*\{[^}]+\}
    const idRegex = new RegExp(`(id:\\s*["']${id}["'][\\s\\S]*?cars:\\s*\\{)([^}]+)(\\})`, 'm');
    const match = content.match(idRegex);
    if (match) {
      const newCarsContent = ` id: ${JSON.stringify(rep.id)}, en: ${JSON.stringify(rep.en)} `;
      content = content.replace(idRegex, `$1${newCarsContent}$3`);
      console.log(`Updated cars hint for [${id}] in ${filePath}`);
      fileChanged = true;
      totalModified++;
    }
  }

  if (fileChanged) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log(`\nSuccessfully updated ${totalModified} level cars hints!`);
