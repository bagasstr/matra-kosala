import type { Article, Portofolio, ServiceProps } from '@/types/type'

export const portofolio: Portofolio[] = [
  {
    id: 1,
    title: 'New Office & Store PT TRAD Indonesia',
    image: '/trad-k.png',
    tahun: '2019',
    slug: 'new-office-store-pt-trad-indonesia',
    listColors: ['#22579D'],
    detail_images: [
      '/trad-k.png',
      '/trad-k.png',
      '/trad-k.png',
      '/trad-k.png',
      '/trad-k.png',
    ],
    description:
      'Proyek pembangunan kantor dan toko untuk PT TRAD Indonesia. Bangunan ini didesain dengan konsep modern minimalis untuk mendukung kebutuhan operasional perusahaan.',
    provinsi: [{ name: 'DKI Jakarta' }],
    kota: [{ name: 'Jakarta Barat' }],
    kategori: 'gedung hunian',
  },
  {
    id: 2,
    title: 'Masjid Baiturrohman Pondok Pinang',
    image: '/Masjid.png',
    tahun: '2019',
    slug: 'masjid-baiturrohman-pondok-pinang',
    listColors: ['#22579D'],
    detail_images: ['/masjid1.png', '/masjid2.png', '/masjid3.png'],
    description:
      'Renovasi masjid Baiturrohman di Pondok Pinang dengan memperhatikan aspek keindahan dan kenyamanan untuk mendukung aktivitas ibadah masyarakat setempat.',
    provinsi: [{ name: 'DKI Jakarta' }],
    kota: [{ name: 'Jakarta Selatan' }],
    kategori: 'gedung pendidikan',
  },
  {
    id: 3,
    title: 'RSUD Kota Depok',
    image: '/MTSN.png',
    tahun: '2019',
    slug: 'rsud-kota-depok',
    listColors: ['#22579D'],
    detail_images: ['/rsud1.png', '/rsud2.png', '/rsud3.png'],
    description:
      'Pengembangan fasilitas RSUD Kota Depok untuk meningkatkan layanan kesehatan bagi masyarakat setempat, dengan desain yang mengutamakan aksesibilitas dan kenyamanan.',
    provinsi: [{ name: 'Jawa Barat' }],
    kota: [{ name: 'Depok' }],
    kategori: 'gedung kesehatan',
  },
  {
    id: 4,
    title: 'Kantor Cabang BRI Adisucipto Yogyakarta',
    image: '/kantor-bri.png',
    tahun: '2019',
    slug: 'kantor-cabang-bri-adisucipto-yogyakarta',
    listColors: ['#22579D'],
    detail_images: ['/kantor-bri.png', '/kantor-bri.png', '/kantor-bri.png'],
    description:
      'Pembangunan kantor cabang BRI di Adisucipto Yogyakarta, mengintegrasikan elemen tradisional dan modern untuk menciptakan lingkungan kerja yang produktif.',
    provinsi: [{ name: 'DI Yogyakarta' }],
    kota: [{ name: 'Yogyakarta' }],
    kategori: 'perkantoran dan gudang',
  },
  {
    id: 5,
    title: 'Rumah Khusus Relokasi Bencana Alam Kuningan',
    image: '/rusus-kuningan.png',
    tahun: '2019',
    slug: 'rumah-khusus-relokasi-bencana-alam-kuningan',
    listColors: ['#22579D'],
    detail_images: ['/rusus1.png', '/rusus2.png', '/rusus3.png'],
    description:
      'Proyek pembangunan rumah khusus untuk korban bencana alam di Kuningan, dirancang agar tahan terhadap cuaca ekstrem dan mendukung kebutuhan penghuninya.',
    provinsi: [{ name: 'Jawa Barat' }],
    kota: [{ name: 'Kuningan' }],
    kategori: 'gedung hunian',
  },
  {
    id: 6,
    title: 'Rumah Dinas BRI Unit 1',
    image: '/rumah-dinas-bri.png',
    tahun: '2019',
    slug: 'rumah-dinas-bri-unit-1',
    listColors: ['#22579D'],
    detail_images: ['/rumah1.png', '/rumah2.png', '/rumah3.png'],
    description:
      'Pembangunan rumah dinas untuk pegawai BRI Unit 1 dengan fokus pada kenyamanan dan efisiensi ruang.',
    provinsi: [{ name: 'Jawa Barat' }],
    kota: [{ name: 'Kuningan' }],
    kategori: 'gedung hunian',
  },
  {
    id: 7,
    title: 'Interior Ruangan DPR RI',
    image: '/interior-dpr.png',
    tahun: '2019',
    slug: 'interior-ruangan-dpr-ri',
    listColors: ['#22579D'],
    detail_images: ['/dpr1.png', '/dpr2.png', '/dpr3.png'],
    description:
      'Desain interior untuk ruangan DPR RI dengan konsep elegan dan modern, mendukung fungsi rapat dan pertemuan resmi.',
    provinsi: [{ name: 'DKI Jakarta' }],
    kota: [{ name: 'Jakarta Selatan' }],
    kategori: 'gedung kesehatan',
  },
  {
    id: 8,
    title: 'Rumah Dinas BRI Unit 2',
    image: '/rumah-dinas-bri2.png',
    tahun: '2019',
    slug: 'rumah-dinas-bri-unit-2',
    listColors: ['#22579D'],
    detail_images: ['/rumah2-1.png', '/rumah2-2.png', '/rumah2-3.png'],
    description:
      'Pembangunan rumah dinas untuk pegawai BRI Unit 2, didesain dengan konsep ramah lingkungan dan efisien.',
    provinsi: [{ name: 'Jawa Barat' }],
    kota: [{ name: 'Cimahi' }],
    kategori: 'gedung kesehatan',
  },
  {
    id: 9,
    title: 'Rusun Pemkot Surakarta',
    image: '/pemkot-solo.png',
    tahun: '2019',
    slug: 'rusun-pemkot-surakarta',
    listColors: ['#22579D'],
    detail_images: ['/rusun1.png', '/rusun2.png', '/rusun3.png'],
    description:
      'Pembangunan rumah susun untuk Pemerintah Kota Surakarta guna menyediakan hunian terjangkau bagi masyarakat.',
    provinsi: [{ name: 'Jawa Tengah' }],
    kota: [{ name: 'Surakarta' }],
    kategori: 'perkantoran dan gudang',
  },
]

export const articles: Article[] = [
  {
    id: '1',
    judul: 'Exploring Potential and Challenges in Global Agriculture',
    konten:
      'Uncovering the Vast Potential and Complex Challenges in the World of Global Agriculture.',
    date: '10 November 2023',
    url_gambar: '/trad-k.png',
    slug: 'exploring-potential-challenges-global-agriculture',
  },
  {
    id: '2',
    judul: 'Bringing Change in the Livestock Industry',
    konten:
      'Revealing Innovations, Challenges and Transformations Reshaping the Livestock Sector.',
    date: '10 November 2023',
    url_gambar: '/MTSN.png',
    slug: 'bringing-change-livestock-industry',
  },
  {
    id: '3',
    judul: 'Potential and Constraints Faced in Production Quality',
    konten:
      'Discusses Challenges and Opportunities in Achieving High Production Standards.',
    date: '10 November 2023',
    url_gambar: '/MTSN.png',
    slug: 'potential-constraints-production-quality',
  },
  {
    id: '4',
    judul: 'Achieving High Productivity from Your Own Home Garden',
    konten:
      'A Practical Guide to Achieving Satisfactory Results from Plants Grown in Your Home.',
    date: '10 November 2023',
    url_gambar: '/Masjid.png',
    slug: 'achieving-high-productivity-home-garden',
  },
  {
    id: '5',
    judul: 'The Best Guide to Planting Seeds with Optimal Results',
    konten:
      'Effective Strategies and Techniques to Achieve Healthy and Productive Plant Growth.',
    date: '10 November 2023',
    url_gambar: '/Masjid.png',
    slug: 'best-guide-planting-seeds-optimal-results',
  },
  {
    id: '6',
    judul:
      'Strategies for Caring for Your Garden More Efficiently and Productively',
    konten:
      'An approach that improves plant performance and makes garden management easier.',
    date: '10 November 2023',
    url_gambar: '/Masjid.png',
    slug: 'strategies-caring-garden-efficiently-productively',
  },
]

export const texts = [
  {
    title: 'VISI & MISI Kami',
    content:
      'Kami berkomitmen untuk menjadi mitra pembangunan yang terpercaya, memberikan solusi terbaik bagi klien kami. Visi kami adalah menjadi kontraktor terkemuka dengan karya berkualitas dan berkelanjutan.',
  },
  {
    title: 'Value Untuk Anda',
    content:
      'Nilai-nilai yang kami junjung tinggi adalah tanggung jawab, transparansi, dan saling menguntungkan. Kami percaya bahwa dengan menjunjung tinggi nilai-nilai ini, kami dapat membangun hubungan yang kuat dengan klien dan mitra kerja.',
  },
  {
    title: 'Harapan Untuk Masa Depan',
    content:
      'Kami ingin terus berkembang dan memperluas jangkauan layanan kami. Kami berkomitmen untuk memberikan pelayanan yang semakin baik dan memuaskan bagi seluruh pelanggan. Bersama-sama, kita akan membangun masa depan yang lebih baik.',
  },
]
export const textshubungi = [
  {
    title: 'KONSULTASIKAN KEBUTUHAN ANDA',
  },
  {
    title: 'KOLABORASI UNTUK KESEPAKATAN TERBAIK',
  },
  {
    title: 'PENGERJAAN PROYEK ANDA',
  },
]

export const images = [
  { src: '/slide-1.png', alt: 'Slide 1' },
  { src: '/slide-2.png', alt: 'Slide 2' },
  { src: '/slide-3.png', alt: 'Slide 3' },
]
export const imageshubungi = [
  { src: '/hubungi-3.png', alt: 'hubungi 1' },
  { src: '/hubungi-2.png', alt: 'hubungi 2' },
  { src: '/hubungi-1.png', alt: 'hubungi 3' },
]

export const services: ServiceProps[] = [
  {
    title: 'DESAIN &<br/>PERENCANAAN',
    imageSrc: '/ImageLayanan1.png',
    altText: 'Desain & Perencanaan',
    description: 'Kami menyediakan layanan desain yang detail dan berkualitas.',
    listColors: '#D3E9EB', // Original color for service 1
    textColor: '#22959d',
    accordionContent: [
      '- Desain Interior',
      '- Desain Bangunan',
      '- Desain Landscape',
      '- Site Plan',
      '- Rencana Anggaran & Biaya ( RAB )',
    ], // Konten accordion
  },
  {
    title: 'KONTRAKTOR<br/>PEMBANGUNAN',
    imageSrc: '/ImageLayanan2.png',
    altText: 'Kontraktor Pembangunan',
    description:
      'Solusi konstruksi dari awal hingga akhir dengan efisiensi tinggi.',
    listColors: '#D3DDEB', // Updated with new RGBA color for service 2
    textColor: '#22579D',
    accordionContent: [
      '- Struktur Bangunan',
      '- Arsitektur Bangunan',
      '- MEP - Mechanical Electrical, & Plumbing',
      '- Interior Gedung dan Mebeleur',
      '- Landscape',
    ], // Konten accordion
  },
  {
    title: 'MANAJEMEN<br/>KONSTRUKSI',
    imageSrc: '/ImageLayanan3.png',
    altText: 'Manajemen Konstruksi',
    description:
      'Kami menyediakan layanan manajemen konstruksi yang profesional.',
    listColors: '#D5D3EB', // Original color for service 3

    textColor: '#2B229D',
    accordionContent: ['- Pengawasan', '- Manajemen Proyek'], // Konten accordion
  },
]

export const imageProfile = {
  carousel1: ['/carousel-1.png', '/carousel-2.png', '/carousel-3.png'],
  carousel2: ['/carousel-4.png', '/carousel-5.png', '/carousel-6.png'],
}
