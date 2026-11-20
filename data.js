// Data contoh (dummy) prototype BAPELKES. Semua tanggal relatif terhadap hari ini
// supaya demo selalu segar. Tarif dari Pergub Kalteng 63/2024 kecuali yang ditandai asumsi.

const DAY = 864e5;
const HOUR = 36e5;
const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
const iso = (d) => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`; };
const D = (n) => iso(TODAY.getTime() + n * DAY);
const at = (isoDate, hh = 10) => new Date(`${isoDate}T${String(hh).padStart(2, '0')}:00:00`).getTime();

// Satu status = satu warna di badge, kalender, dan grafik.
const STATUS = {
  'Menunggu Verifikasi':       { fg: '#5B4B8A', bg: '#ECE8F6', bar: '#B7A9DE' },
  'Menunggu Pembayaran':       { fg: '#8A5A12', bg: '#FBEFD6', bar: '#EBC37A' },
  'Menunggu Verifikasi Bayar': { fg: '#1F6A6A', bg: '#DDF0EE', bar: '#86C9C3' },
  'Terkonfirmasi':             { fg: '#2F6B45', bg: '#E1F0E5', bar: '#8FC6A2' },
  'Berlangsung':               { fg: '#33508F', bg: '#E3E9F7', bar: '#9DB1E3' },
  'Selesai':                   { fg: '#4A5160', bg: '#ECEEF1', bar: '#B9BFC9' },
  'Perlu Revisi':              { fg: '#9A4A1C', bg: '#FBE5D6', bar: '#EFA77C' },
  'Ditolak':                   { fg: '#9B2C2C', bg: '#F8E1E1', bar: '#E59A9A' },
  'Kedaluwarsa':               { fg: '#6B5E52', bg: '#EFEAE4', bar: '#C8BBAE' },
  'Dibatalkan':                { fg: '#8E3557', bg: '#F6E2EA', bar: '#DE9CB6' },
  'Agenda Internal':           { fg: '#3E3A45', bg: '#E7E5EA', bar: '#9C97A6' },
};
const ROOM_STATUS = {
  siap:      { label: 'Siap',      fg: '#2F6B45', bg: '#E1F0E5', bar: '#8FC6A2' },
  terisi:    { label: 'Terisi',    fg: '#33508F', bg: '#E3E9F7', bar: '#9DB1E3' },
  kotor:     { label: 'Kotor',     fg: '#8A5A12', bg: '#FBEFD6', bar: '#EBC37A' },
  perbaikan: { label: 'Perbaikan', fg: '#9B2C2C', bg: '#F8E1E1', bar: '#E59A9A' },
};
// Status yang menahan jadwal (ikut dihitung di ketersediaan).
const HOLDING = ['Menunggu Verifikasi', 'Menunggu Pembayaran', 'Menunggu Verifikasi Bayar', 'Terkonfirmasi', 'Berlangsung', 'Perlu Revisi'];

const PALETTES = {
  emas:     { nama: 'Emas Lembut',     bg: '250 247 240', s2: '243 238 227', line: '230 223 208', ink: '43 42 38', ink2: '94 90 80', primary: '138 106 47', psoft: '241 230 204', pink: '92 69 25', accent: '63 107 79', asoft: '227 238 229' },
  sage:     { nama: 'Hijau Sage',      bg: '246 248 245', s2: '236 241 234', line: '220 228 217', ink: '31 42 36', ink2: '85 98 90', primary: '78 122 95', psoft: '221 234 223', pink: '47 83 64', accent: '168 132 62', asoft: '243 234 213' },
  terakota: { nama: 'Terakota Lembut', bg: '251 246 243', s2: '244 234 228', line: '234 219 210', ink: '46 37 34', ink2: '102 87 79', primary: '166 90 69', psoft: '245 225 217', pink: '122 59 43', accent: '95 122 90', asoft: '229 237 227' },
};

// Hak akses per halaman: rw = kelola, r = lihat saja.
const ACCESS = {
  a1: { admin: 'rw', bendahara: 'rw', kepala: 'rw' },
  a2: { admin: 'rw', bendahara: 'r', kepala: 'r' },
  a3: { admin: 'rw', bendahara: 'r', kepala: 'r' },
  a4: { admin: 'rw', bendahara: 'r', kepala: 'r' },
  a5: { admin: 'rw', bendahara: 'r', kepala: 'r' },
  a6: { admin: 'rw' },
  a7: { admin: 'r', bendahara: 'rw', kepala: 'r' },
  a8: { admin: 'r', bendahara: 'rw', kepala: 'r' },
  a9: { admin: 'r', bendahara: 'rw', kepala: 'r' },
  a10: { admin: 'rw' }, a11: { admin: 'rw' }, a12: { admin: 'rw' }, a13: { admin: 'rw' },
  a14: { admin: 'rw', kepala: 'r' },
  a15: { admin: 'rw' },
  a16: { admin: 'rw', bendahara: 'r' },
  a17: { admin: 'rw' },
  a18: { admin: 'rw', bendahara: 'rw', kepala: 'rw' },
  a19: { admin: 'rw' },
  set: { admin: 'rw' },
};

const MENU = [
  { route: 'a1', label: 'Dashboard', icon: 'home' },
  { route: 'a2', label: 'Kalender Jadwal', icon: 'calendar' },
  { group: 'Booking', icon: 'clipboard', items: [
    { route: 'a3', label: 'Semua Booking' }, { route: 'a5', label: 'Verifikasi Gedung', badge: 'verif' }, { route: 'a6', label: 'Booking Offline' } ] },
  { group: 'Pembayaran', icon: 'wallet', items: [
    { route: 'a7', label: 'Verifikasi Bukti Bayar', badge: 'bukti' }, { route: 'a8', label: 'Tagihan & Piutang' }, { route: 'a9', label: 'Refund', badge: 'refund' } ] },
  { group: 'Front Office', icon: 'key', items: [
    { route: 'a10', label: 'Check-in' }, { route: 'a11', label: 'Tamu Menginap' }, { route: 'a12', label: 'Check-out' }, { route: 'a13', label: 'Perpanjangan', badge: 'ext' } ] },
  { route: 'a14', label: 'Status Kamar', icon: 'bed' },
  { group: 'Master Data', icon: 'database', items: [
    { route: 'a15', label: 'Fasilitas & Unit' }, { route: 'a16', label: 'Tarif' }, { route: 'a17', label: 'Layanan Tambahan' } ] },
  { route: 'a18', label: 'Laporan', icon: 'chart' },
  { route: 'a19', label: 'Manajemen Akun', icon: 'users' },
  { route: 'set', label: 'Pengaturan Sistem', icon: 'settings' },
];

const TITLES = {
  p1: 'Beranda', p2: 'Fasilitas', p3: 'Detail Fasilitas', p4: 'Form Pemesanan', p5: 'Pesanan Terkirim', p6: 'Lacak Booking', p7: 'Detail Booking', p8: 'Info',
  a1: 'Dashboard', a2: 'Kalender Jadwal', a3: 'Semua Booking', a4: 'Detail Booking', a5: 'Verifikasi Gedung', a6: 'Booking Offline',
  a7: 'Verifikasi Bukti Bayar', a8: 'Tagihan & Piutang', a9: 'Refund', a10: 'Check-in', a11: 'Tamu Menginap', a12: 'Check-out', a13: 'Perpanjangan',
  a14: 'Status Kamar', a15: 'Fasilitas & Unit', a16: 'Master Tarif', a17: 'Layanan Tambahan', a18: 'Laporan Keuangan', a19: 'Manajemen Akun', set: 'Pengaturan Sistem', masuk: 'Masuk Petugas',
};

const SCENARIOS = [
  { no: 1, judul: 'Pesan kamar otomatis', mulai: { role: 'pengunjung', path: '/p1' }, langkah: [
    'Beranda → Lihat fasilitas → Kamar Double Bed', 'Isi 2 kamar, 2 malam → Tambah ke pesanan', 'Isi data → Kirim: tagihan + hitung mundur hold 2 jam',
    'Detail booking → Unggah bukti (Lunas)', 'Peran Bendahara → Verifikasi Bukti Bayar → Terima', 'Peran Admin → Check-in → bagi 2 nomor kamar',
    'Peran Pengunjung → Lacak → Perpanjang 1 malam', 'Peran Admin → Check-out → selesai'] },
  { no: 2, judul: 'Sewa aula dengan verifikasi', mulai: { role: 'pengunjung', path: '/p3/aula' }, langkah: [
    'Aula Barigas: pilih tanggal, 08.00–16.00 → Tambah ke pesanan', 'Langkah 1: tambah 10 kamar Twin · Langkah 2: LCD proyektor', 'Isi data, pilih DP → Kirim: "Menunggu verifikasi admin"',
    'Peran Admin → Verifikasi Gedung → Setujui', 'Peran Pengunjung → Lacak → Unggah bukti DP', 'Bendahara terima DP → penyewa unggah pelunasan (H-1) → Bendahara terima',
    'Admin → Check-in → Check-out'] },
  { no: 3, judul: 'Bentrok & kedaluwarsa', mulai: { role: 'pengunjung', path: '/p3/dbl' }, langkah: [
    'Kalender kamar Double: tanggal H+5 dan H+6 penuh', 'Buka Aula Barigas: H+7 terisi 08.00–16.00; coba tambah 10.00–12.00 → ditolak bentrok',
    'Peran Admin → Semua Booking → filter Kedaluwarsa', 'Atau: panel demo → "Majukan waktu +1 jam" untuk melihat hold habis langsung'] },
  { no: 4, judul: 'Operasional internal', mulai: { role: 'admin', path: '/a2' }, langkah: [
    'Kalender: klik sel kosong → Blokir agenda internal', 'Booking Offline: isi pesanan dari telepon, bayar tunai', 'Status Kamar: klik kamar → tandai Perbaikan'] },
  { no: 5, judul: 'Pimpinan', mulai: { role: 'kepala', path: '/a1' }, langkah: ['Dashboard Kepala: grafik pendapatan & okupansi', 'Laporan → Laporan Keuangan, ganti periode, ekspor (dummy)'] },
];

function seed() {
  const now = Date.now();
  const facilities = [
    { id: 'dbl', jenis: 'kamar', nama: 'Kamar Asrama AC Double Bed', singkat: 'Double Bed', kapasitas: 2, tarif: 200000, satuan: 'malam', verifikasi: false, lokasi: 'Wisma A, lantai 1–2',
      deskripsi: 'Kamar tenang dengan satu kasur double, cocok untuk peserta pelatihan atau tamu perorangan.',
      fasilitas: ['AC', 'Kasur double', 'Kamar mandi dalam', 'Air panas', 'TV', 'Wi-Fi', 'Lemari & meja kerja'] },
    { id: 'twn', jenis: 'kamar', nama: 'Kamar Asrama AC Twin Bed', singkat: 'Twin Bed', kapasitas: 2, tarif: 150000, satuan: 'malam', verifikasi: false, lokasi: 'Wisma B, lantai 1–2',
      deskripsi: 'Dua kasur single untuk berbagi kamar, pilihan hemat untuk rombongan pelatihan.',
      fasilitas: ['AC', '2 kasur single', 'Kamar mandi dalam', 'Air panas', 'Wi-Fi', 'Lemari'] },
    { id: 'aula', jenis: 'gedung', nama: 'Aula Auditorium Barigas', singkat: 'Aula Barigas', kapasitas: 300, tarif: 2500000, satuan: 'hari', tarifJam: 350000, verifikasi: true, lokasi: 'Gedung utama',
      deskripsi: 'Auditorium untuk seminar, pelatihan besar, dan acara resmi hingga 300 peserta.',
      fasilitas: ['AC sentral', 'Panggung & podium', '300 kursi', 'Ruang transit', 'Toilet', 'Parkir luas'] },
    { id: 'k60', jenis: 'gedung', nama: 'Ruang Kelas 60 Orang', singkat: 'Kelas 60', kapasitas: 60, tarif: 300000, satuan: 'hari', verifikasi: true, lokasi: 'Gedung diklat, lantai 1',
      deskripsi: 'Ruang kelas besar dengan susunan meja fleksibel.', fasilitas: ['AC', 'Papan tulis', 'Meja & kursi 60', 'Layar proyektor'] },
    { id: 'k40', jenis: 'gedung', nama: 'Ruang Kelas 40 Orang', singkat: 'Kelas 40', kapasitas: 40, tarif: 250000, satuan: 'hari', verifikasi: true, lokasi: 'Gedung diklat, lantai 1',
      deskripsi: 'Ruang kelas menengah untuk pelatihan teknis.', fasilitas: ['AC', 'Papan tulis', 'Meja & kursi 40', 'Layar proyektor'] },
    { id: 'k30', jenis: 'gedung', nama: 'Ruang Kelas 30 Orang', singkat: 'Kelas 30', kapasitas: 30, tarif: 200000, satuan: 'hari', verifikasi: true, lokasi: 'Gedung diklat, lantai 2',
      deskripsi: 'Ruang kelas untuk kelompok kecil–menengah.', fasilitas: ['AC', 'Papan tulis', 'Meja & kursi 30'] },
    { id: 'k20', jenis: 'gedung', nama: 'Ruang Kelas 20 Orang', singkat: 'Kelas 20', kapasitas: 20, tarif: 150000, satuan: 'hari', verifikasi: true, lokasi: 'Gedung diklat, lantai 2',
      deskripsi: 'Ruang kelas kecil untuk lokakarya.', fasilitas: ['AC', 'Papan tulis', 'Meja & kursi 20'] },
    { id: 'disk', jenis: 'gedung', nama: 'Ruang Diskusi', singkat: 'R. Diskusi', kapasitas: 15, tarif: 100000, satuan: 'hari', verifikasi: true, lokasi: 'Gedung utama, lantai 2',
      deskripsi: 'Ruang rapat kecil untuk diskusi kelompok.', fasilitas: ['AC', 'Meja rapat', 'TV 42"'] },
  ];

  const rooms = [];
  for (const [prefix, fac, lt] of [['A1', 'dbl', 1], ['A2', 'dbl', 2], ['B1', 'twn', 1], ['B2', 'twn', 2]]) {
    const n = fac === 'dbl' ? 15 : 10;
    for (let i = 1; i <= n; i++) rooms.push({ no: `${prefix}${String(i).padStart(2, '0')}`, fac, lantai: lt, status: 'siap', catatan: '' });
  }
  const room = (no) => rooms.find((r) => r.no === no);
  ['A105', 'A212', 'B205'].forEach((n) => (room(n).status = 'kotor'));
  Object.assign(room('A110'), { status: 'perbaikan', catatan: 'AC tidak dingin, menunggu teknisi' });
  ['B101', 'B102', 'B103', 'A101', 'A102'].forEach((n) => (room(n).status = 'terisi'));

  const addons = [
    { id: 'lcdb', nama: 'LCD Proyektor Lumen Besar', tarif: 300000, satuan: 'hari', stok: 2, aktif: true },
    { id: 'lcdk', nama: 'LCD Proyektor Lumen Kecil', tarif: 200000, satuan: 'hari', stok: 4, aktif: true },
    { id: 'sound', nama: 'Sound System', tarif: 500000, satuan: 'hari', stok: 2, aktif: true },
    { id: 'xbed', nama: 'Extra Bed', tarif: 50000, satuan: 'malam', stok: 10, aktif: true, asumsi: true },
    { id: 'snack', nama: 'Konsumsi snack + makan siang', tarif: 60000, satuan: 'orang/hari', stok: null, aktif: true, asumsi: true },
    { id: 'tv', nama: 'TV 42"', tarif: 100000, satuan: 'hari', stok: 2, aktif: false, asumsi: true },
  ];

  const tarif = [
    ...facilities.map((f) => ({ fac: f.id, label: f.nama, nominal: f.tarif, satuan: f.satuan, berlaku: '2025-01-01', dasar: 'Pergub Kalteng 63/2024', status: 'Berlaku' })),
    { fac: 'aula', label: 'Aula Auditorium Barigas (per jam)', nominal: 350000, satuan: 'jam', berlaku: '2025-01-01', dasar: 'Contoh — menunggu konfirmasi', status: 'Berlaku' },
    { fac: 'dbl', label: 'Kamar Asrama AC Double Bed', nominal: 225000, satuan: 'malam', berlaku: `${TODAY.getFullYear() + 1}-01-01`, dasar: 'Contoh tarif baru — menunggu dasar hukum', status: 'Terjadwal' },
    { fac: 'twn', label: 'Kamar Asrama AC Twin Bed', nominal: 175000, satuan: 'malam', berlaku: `${TODAY.getFullYear() + 1}-01-01`, dasar: 'Contoh tarif baru — menunggu dasar hukum', status: 'Terjadwal' },
  ];

  const settings = {
    profil: { nama: 'UPTD Balai Pelatihan Kesehatan Provinsi Kalimantan Tengah', singkat: 'BAPELKES Palangka Raya', alamat: 'Alamat lengkap menyusul, Palangka Raya, Kalimantan Tengah',
      telp: '(0536) 000-0000', email: 'layanan@bapelkes-contoh.go.id', wa: '0811-0000-0000' },
    aturan: { holdKamarJam: 2, holdGedungJam: 12, minHari: 0, batasAkhir: `${TODAY.getFullYear() + 1}-12-31`, checkin: '14:00', checkout: '12:00',
      buka: '07:00', tutup: '22:00', jedaMenit: 30, sesi: [{ nama: 'Pagi', dari: '07:00', sampai: '12:00' }, { nama: 'Siang', dari: '13:00', sampai: '17:00' }, { nama: 'Malam', dari: '18:00', sampai: '22:00' }] },
    bayar: { bank: 'Bank Kalteng', noRek: '000-00-00000-0', atasNama: 'BLUD UPTD Bapelkes Prov. Kalteng', dpPersen: 30, pelunasanH: 1, jaminan: 200000, dendaJam: 50000, tunai: true },
    refund: { kamar: [{ h: 1, p: 100 }, { h: 0, p: 0 }], gedung: [{ h: 14, p: 100 }, { h: 7, p: 50 }, { h: 0, p: 0 }], reschedMaks: 1, reschedMinH: 3 },
    notif: [
      { ev: 'Booking dibuat', email: true, wa: true, tpl: 'Halo {nama}, pesanan {kode} sudah kami terima. Total {total}. Lacak di situs dengan kode booking.' },
      { ev: 'Disetujui admin', email: true, wa: true, tpl: 'Pengajuan {kode} disetujui. Silakan bayar sebelum {batas}.' },
      { ev: 'Ditolak / perlu revisi', email: true, wa: true, tpl: 'Pengajuan {kode}: {catatan}.' },
      { ev: 'Bukti bayar diterima', email: true, wa: true, tpl: 'Pembayaran {kode} sebesar {nominal} diterima. Kuitansi dapat diunduh.' },
      { ev: 'Pengingat pelunasan H-1', email: true, wa: true, tpl: 'Sisa tagihan {kode} {sisa}, mohon dilunasi paling lambat {batas}.' },
      { ev: 'Hold hampir habis', email: false, wa: true, tpl: 'Jadwal {kode} ditahan sampai {batas}. Unggah bukti bayar agar tidak kedaluwarsa.' },
      { ev: 'Booking kedaluwarsa', email: true, wa: false, tpl: 'Pesanan {kode} kedaluwarsa karena belum dibayar.' },
      { ev: 'Check-in / check-out', email: false, wa: true, tpl: 'Terima kasih {nama}. Status {kode}: {status}.' },
    ],
    dokumen: { kop1: 'PEMERINTAH PROVINSI KALIMANTAN TENGAH', kop2: 'DINAS KESEHATAN', kop3: 'UPTD BALAI PELATIHAN KESEHATAN', ttdNama: '(Nama Bendahara)', ttdJabatan: 'Bendahara Penerimaan BLUD',
      fmtInv: 'INV/{tahun}/{bulan}/{urut}', fmtKw: 'KW/{tahun}/{bulan}/{urut}' },
    konten: {
      sk: ['Penyewa wajib mengisi data penanggung jawab yang benar dan dapat dihubungi.', 'Jadwal ditahan sementara (hold) sesuai batas waktu; lewat batas tanpa pembayaran, pesanan kedaluwarsa otomatis.',
        'Pemesanan gedung dan ruangan diverifikasi admin sebelum tagihan terbit.', 'Uang jaminan dibayar saat check-in dan dikembalikan saat check-out setelah pemeriksaan kondisi.',
        'Keterlambatan check-out dikenai denda per jam sesuai pengaturan.', 'Dilarang membawa senjata, minuman keras, dan barang terlarang ke area Bapelkes.'],
      faq: [{ q: 'Apakah perorangan boleh menyewa?', a: 'Boleh. Perorangan dan instansi dapat memesan tanpa surat permohonan.' },
        { q: 'Bagaimana cara membayar?', a: 'Transfer ke rekening resmi BLUD, lalu unggah bukti di halaman Lacak Booking. Bendahara memverifikasi pada jam kerja.' },
        { q: 'Bisakah membayar DP dulu?', a: 'Bisa. Sisa tagihan dilunasi paling lambat H-1 sebelum tanggal pemakaian.' },
        { q: 'Kapan nomor kamar diberikan?', a: 'Nomor kamar dibagikan petugas saat check-in.' },
        { q: 'Bisakah menambah malam?', a: 'Bisa, selama kamar masih tersedia pada malam berikutnya. Ajukan lewat halaman detail booking.' }],
    },
  };

  const users = [
    { id: 1, nama: 'Siti Rahmah', email: 'admin@bapelkes-contoh.go.id', peran: 'admin', aktif: true, terakhir: now - 2 * HOUR },
    { id: 2, nama: 'Yusuf Hidayat', email: 'bendahara@bapelkes-contoh.go.id', peran: 'bendahara', aktif: true, terakhir: now - 5 * HOUR },
    { id: 3, nama: 'Kepala Bapelkes', email: 'kepala@bapelkes-contoh.go.id', peran: 'kepala', aktif: true, terakhir: now - 26 * HOUR },
    { id: 4, nama: 'Dewi Lestari', email: 'admin2@bapelkes-contoh.go.id', peran: 'admin', aktif: false, terakhir: now - 40 * DAY },
  ];

  let kw = 0;
  const pay = (jenis, nominal, tgl, status = 'diterima', extra = {}) => ({ id: Math.random().toString(36).slice(2, 8), jenis, nominal, tgl, status, file: 'bukti-transfer.jpg',
    kuitansi: status === 'diterima' ? `KW/${new Date(tgl).getFullYear()}/${String(new Date(tgl).getMonth() + 1).padStart(2, '0')}/${String(++kw).padStart(4, '0')}` : null, ...extra });
  const log = (t, teks) => ({ t, teks });
  const B = (o) => ({ email: '', instansi: '', addons: [], payments: [], log: [], holdUntil: null, sumber: 'online', kamarDibagi: {}, jaminan: null, denda: [], catatan: [], diperpanjang: false, reschedule: null, revisi: '', bayarPilihan: 'lunas', ...o });

  const bookings = [
    B({ kode: 'BPK-A01', nama: 'dr. Rina Kartika', hp: '081251234567', email: 'rina@contoh.id', instansi: 'Dinkes Kab. Katingan', kegiatan: 'Pelatihan Kader Posyandu Angkatan II',
      items: [{ fac: 'aula', date: D(7), from: '08:00', to: '16:00' }, { fac: 'k40', date: D(8), from: '08:00', to: '16:00' }, { fac: 'dbl', qty: 25, start: D(5), end: D(8) }, { fac: 'twn', qty: 10, start: D(5), end: D(8) }],
      addons: [{ id: 'sound', qty: 1, hari: 1 }, { id: 'lcdb', qty: 1, hari: 2 }], status: 'Terkonfirmasi', bayarPilihan: 'dp', dibuat: now - 9 * DAY,
      log: [log(now - 9 * DAY, 'Pengajuan dibuat'), log(now - 9 * DAY + 3 * HOUR, 'Disetujui admin'), log(now - 8 * DAY, 'Bukti DP diunggah'), log(now - 8 * DAY + 2 * HOUR, 'DP diterima bendahara')] }),
    B({ kode: 'BPK-A14', nama: 'Hendra Saputra', hp: '081349876543', instansi: 'RSUD Kuala Kurun', kegiatan: 'Studi banding manajemen RS', items: [{ fac: 'dbl', qty: 4, start: D(5), end: D(7) }],
      status: 'Terkonfirmasi', dibuat: now - 6 * DAY, log: [log(now - 6 * DAY, 'Pesanan dibuat'), log(now - 6 * DAY + HOUR, 'Pelunasan diterima bendahara')] }),
    B({ kode: 'BPK-A02', nama: 'Budi Santoso', hp: '085251112233', kegiatan: 'Menginap pribadi', items: [{ fac: 'twn', qty: 3, start: D(-1), end: D(0) }],
      status: 'Berlangsung', dibuat: now - 4 * DAY, kamarDibagi: { 0: ['B101', 'B102', 'B103'] }, jaminan: { nominal: 200000, status: 'ditahan' }, checkin: at(D(-1), 14),
      log: [log(now - 4 * DAY, 'Pesanan dibuat'), log(now - 4 * DAY + HOUR, 'Pelunasan diterima'), log(at(D(-1), 14), 'Check-in, kamar B101, B102, B103')] }),
    B({ kode: 'BPK-A11', nama: 'Andi Wijaya', hp: '081255557777', email: 'andi@contoh.id', kegiatan: 'Peserta Pelatihan Jabatan Fungsional', items: [{ fac: 'dbl', qty: 2, start: D(0), end: D(2) }],
      status: 'Terkonfirmasi', dibuat: now - 3 * DAY, log: [log(now - 3 * DAY, 'Pesanan dibuat'), log(now - 3 * DAY + HOUR, 'Pelunasan diterima')] }),
    B({ kode: 'BPK-A15', nama: 'Maria Ulfah', hp: '081377788899', instansi: 'Poltekkes Palangka Raya', kegiatan: 'Uji kompetensi', items: [{ fac: 'dbl', qty: 2, start: D(-2), end: D(1) }],
      status: 'Berlangsung', dibuat: now - 7 * DAY, kamarDibagi: { 0: ['A101', 'A102'] }, jaminan: { nominal: 200000, status: 'ditahan' }, checkin: at(D(-2), 15),
      log: [log(now - 7 * DAY, 'Pesanan dibuat'), log(now - 7 * DAY + HOUR, 'Pelunasan diterima'), log(at(D(-2), 15), 'Check-in, kamar A101, A102')] }),
    B({ kode: 'BPK-A12', nama: 'Sekretariat Dinkes Prov.', hp: '081211122233', instansi: 'Dinas Kesehatan Prov. Kalteng', kegiatan: 'Rapat koordinasi program gizi',
      items: [{ fac: 'disk', date: D(0), from: '09:00', to: '15:00' }], status: 'Berlangsung', dibuat: now - 10 * DAY, checkin: at(D(0), 8), log: [log(now - 10 * DAY, 'Pengajuan dibuat'), log(now - 10 * DAY + 2 * HOUR, 'Disetujui admin'), log(now - 9 * DAY, 'Pelunasan diterima')] }),
    B({ kode: 'BPK-A03', nama: 'Nurhasanah', hp: '082154443322', instansi: 'Puskesmas Pahandut', kegiatan: 'Lokakarya mini lintas sektor',
      items: [{ fac: 'k60', date: D(10), from: '08:00', to: '12:00' }], status: 'Menunggu Verifikasi', dibuat: now - 3 * HOUR, holdUntil: now + 9 * HOUR, log: [log(now - 3 * HOUR, 'Pengajuan dibuat')] }),
    B({ kode: 'BPK-A04', nama: 'dr. Fajar Ramadhan', hp: '081398765432', instansi: 'IDI Cabang Palangka Raya', kegiatan: 'Seminar kesehatan jantung',
      items: [{ fac: 'aula', date: D(14), from: '13:00', to: '17:00' }, { fac: 'dbl', qty: 6, start: D(13), end: D(15) }], addons: [{ id: 'sound', qty: 1, hari: 1 }],
      status: 'Menunggu Verifikasi', dibuat: now - 10 * HOUR, holdUntil: now + 2 * HOUR, log: [log(now - 10 * HOUR, 'Pengajuan dibuat')] }),
    B({ kode: 'BPK-A05', nama: 'Rahmat Hidayat', hp: '085388899900', kegiatan: 'Menginap keluarga', items: [{ fac: 'twn', qty: 1, start: D(1), end: D(3) }],
      status: 'Menunggu Pembayaran', dibuat: now - 2 * HOUR + 4 * 60e3, holdUntil: now + 4 * 60e3, log: [log(now - 2 * HOUR, 'Pesanan dibuat, menunggu pembayaran')] }),
    B({ kode: 'BPK-A06', nama: 'Lina Marlina', hp: '081266655544', kegiatan: 'Menginap pribadi', items: [{ fac: 'dbl', qty: 2, start: D(3), end: D(4) }],
      status: 'Kedaluwarsa', dibuat: now - 30 * HOUR, holdUntil: now - 28 * HOUR, log: [log(now - 30 * HOUR, 'Pesanan dibuat'), log(now - 28 * HOUR, 'Kedaluwarsa: hold 2 jam habis tanpa pembayaran')] }),
    B({ kode: 'BPK-A07', nama: 'Agus Salim', hp: '082255566677', email: 'agus@contoh.id', kegiatan: 'Peserta diklat', items: [{ fac: 'dbl', qty: 1, start: D(2), end: D(4) }],
      status: 'Menunggu Verifikasi Bayar', dibuat: now - 90 * 60e3, holdUntil: now + 30 * 60e3,
      payments: [pay('Lunas', 400000, now - 40 * 60e3, 'menunggu')], log: [log(now - 90 * 60e3, 'Pesanan dibuat'), log(now - 40 * 60e3, 'Bukti bayar Lunas diunggah')] }),
    B({ kode: 'BPK-A09', nama: 'Yayasan Sehat Borneo', hp: '081344433322', instansi: 'Yayasan Sehat Borneo', kegiatan: 'Pelatihan relawan (dibatalkan)', items: [{ fac: 'k30', date: D(20), from: '08:00', to: '16:00' }],
      status: 'Dibatalkan', dibuat: now - 12 * DAY, refund: { nominal: 200000, persen: 100, status: 'menunggu', diajukan: now - DAY },
      log: [log(now - 12 * DAY, 'Pengajuan dibuat'), log(now - 12 * DAY + HOUR, 'Disetujui admin'), log(now - 11 * DAY, 'Pelunasan diterima'), log(now - DAY, 'Dibatalkan penyewa (H-21), refund 100%')] }),
    B({ kode: 'BPK-A10', nama: 'CV Maju Jaya', hp: '081233344455', instansi: 'CV Maju Jaya', kegiatan: 'Pesta pernikahan', items: [{ fac: 'aula', date: D(9), from: '08:00', to: '22:00' }],
      status: 'Ditolak', alasanTolak: 'Aula tidak untuk acara pernikahan sesuai ketentuan pemakaian.', dibuat: now - 2 * DAY, log: [log(now - 2 * DAY, 'Pengajuan dibuat'), log(now - 2 * DAY + 4 * HOUR, 'Ditolak admin')] }),
    B({ kode: 'BPK-A13', nama: 'Ns. Sari Dewi', hp: '085212312312', instansi: 'PPNI Kalteng', kegiatan: 'Workshop keperawatan', items: [{ fac: 'k30', date: D(12), from: '08:00', to: '16:00' }],
      status: 'Perlu Revisi', revisi: 'Mohon lengkapi nama kegiatan resmi dan jumlah peserta.', dibuat: now - DAY, holdUntil: now + 20 * HOUR, log: [log(now - DAY, 'Pengajuan dibuat'), log(now - DAY + 2 * HOUR, 'Admin meminta revisi')] }),
    B({ kode: 'BPK-A16', nama: 'Dinkes Kab. Pulang Pisau', hp: '081299988877', instansi: 'Dinkes Kab. Pulang Pisau', kegiatan: 'Bimtek SIMPUS', items: [{ fac: 'k20', date: D(0), from: '08:00', to: '12:00' }],
      status: 'Berlangsung', dibuat: now - 5 * DAY, checkin: at(D(0), 8), log: [log(now - 5 * DAY, 'Pengajuan dibuat'), log(now - 5 * DAY + HOUR, 'Disetujui'), log(now - 4 * DAY, 'Pelunasan diterima')] }),
  ];

  const blocks = [
    { id: 'blk1', fac: 'k60', start: D(3), end: D(5), qty: null, label: 'Pelatihan internal: TOT Widyaiswara' },
    { id: 'blk2', fac: 'twn', start: D(16), end: D(18), qty: 8, label: 'Diklat internal: Kepemimpinan' },
  ];

  const extensions = [
    { id: 'ext1', kode: 'BPK-A12', item: 0, tambah: 2, satuan: 'jam', status: 'diajukan', oleh: 'Penyewa', t: now - 30 * 60e3 },
    { id: 'ext2', kode: 'BPK-A16', item: 0, tambah: 2, satuan: 'jam', status: 'diajukan', oleh: 'Admin', t: now - 50 * 60e3 },
  ];

  // Riwayat 6 bulan terakhir (Selesai) untuk grafik dan laporan.
  let s = 11;
  const r = (a, b) => { s = (s * 9301 + 49297) % 233280; return a + Math.floor((s / 233280) * (b - a + 1)); };
  const instansi = ['Dinkes Kab. Kapuas', 'RSUD dr. Doris Sylvanus', 'Puskesmas Kereng Bangkirai', 'Dinkes Kota Palangka Raya', 'Poltekkes Kemenkes Palangka Raya', 'IBI Cabang Palangka Raya', 'PPNI Kalteng', 'Dinkes Kab. Barito Selatan', 'Dinkes Kab. Kotawaringin Timur', 'BPJS Kesehatan Cabang Palangka Raya'];
  const kegiatan = ['Pelatihan PPGD', 'Pelatihan Bidan Desa', 'Workshop SIK', 'Pelatihan Manajemen Puskesmas', 'Diklat Sanitarian', 'Rapat Kerja Kesehatan Daerah', 'Pelatihan Konselor ASI', 'Bimtek Akreditasi'];
  let seq = 1;
  for (let m = 6; m >= 0; m--) {
    const first = new Date(TODAY.getFullYear(), TODAY.getMonth() - m, 1);
    const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const count = m === 0 ? 3 : r(6, 9);
    for (let i = 0; i < count; i++) {
      const startDay = m === 0 ? r(1, Math.max(1, TODAY.getDate() - 4)) : r(1, days - 4);
      const st = iso(new Date(first.getFullYear(), first.getMonth(), startDay));
      if (m === 0 && st >= D(-3)) continue;
      const nights = r(2, 4);
      const items = [{ fac: 'dbl', qty: r(6, 22), start: st, end: iso(at(st) + nights * DAY) }];
      if (r(0, 1)) items.push({ fac: 'twn', qty: r(4, 14), start: st, end: iso(at(st) + nights * DAY) });
      if (r(0, 2) > 0) items.push({ fac: ['aula', 'k60', 'k40', 'k30', 'disk'][r(0, 4)], date: st, from: '08:00', to: '16:00' });
      const b = B({ kode: `BPK-H${String(seq++).padStart(2, '0')}`, nama: `Panitia ${kegiatan[r(0, kegiatan.length - 1)]}`, hp: `0812${r(10000000, 99999999)}`, instansi: instansi[r(0, instansi.length - 1)],
        kegiatan: kegiatan[r(0, kegiatan.length - 1)], items, addons: r(0, 1) ? [{ id: 'lcdb', qty: 1, hari: 1 }] : [], status: 'Selesai', dibuat: at(st) - 12 * DAY,
        checkin: at(st, 14), checkout: at(iso(at(st) + nights * DAY), 11), log: [log(at(st) - 12 * DAY, 'Pesanan dibuat'), log(at(iso(at(st) + nights * DAY), 11), 'Check-out, selesai')] });
      b._riwayat = true;
      bookings.push(b);
    }
  }

  return { facilities, rooms, addons, tarif, settings, users, bookings, blocks, extensions, seq: 17, kw, _pay: null };
}
