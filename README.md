# Prototype Sewa Kamar & Gedung — BAPELKES Palangka Raya

Tampilan yang bisa diklik, tanpa backend. Semua data contoh, disimpan sementara di browser (localStorage).

## Cara membuka

Paling mudah: klik dua kali `index.html` (butuh internet untuk Tailwind, Alpine, dan font dari CDN).

Atau lewat server lokal (disarankan agar logo di `assets/` terbaca konsisten):

```bash
python -m http.server 5178
```

lalu buka http://localhost:5178.

**Logo resmi:** simpan sebagai `assets/logo-bapelkes.png` dan `assets/logo-dinkes.png`. Selama file belum ada, tampil lingkaran "B" sebagai placeholder.

## Tombol **Demo** (pojok kanan bawah)

- **Lihat sebagai:** Pengunjung / Admin / Bendahara / Kepala Bapelkes.
- **Skenario demo:** langkah singkat + tombol *Mulai skenario* untuk tiap skenario.
- **Palet warna:** Emas Lembut (bawaan), Hijau Sage, Terakota Lembut — untuk memilih arah warna bersama client.
- **Waktu simulasi:** +1 jam / +1 hari untuk memperlihatkan hold yang kedaluwarsa otomatis.
- **Reset data demo:** kembali ke data awal.

## Urutan klik tiap skenario

**1. Pesan kamar otomatis**
1. Pengunjung: Beranda → *Lihat semua* / Fasilitas → **Kamar Asrama AC Double Bed**.
2. Jumlah kamar 2, tanggal masuk hari ini, keluar +2 hari → **Tambah ke pesanan**.
3. Form pemesanan: Lanjut → Lanjut → *Isi contoh* → Lanjut → pilih **Bayar lunas**, centang S&K → **Pesan sekarang**.
4. Halaman *Pesanan terkirim*: kode booking + hitung mundur hold 2 jam → **Unggah bukti bayar** → *Pakai file contoh* → **Kirim bukti**.
5. Demo → Bendahara → Verifikasi Bukti Bayar → pilih kode tadi → **Terima & terbitkan kuitansi**.
6. Demo → Admin → Front Office → Check-in → **Proses** pada kode tadi → *Pilih otomatis* (atau klik 2 nomor kamar) → **Selesaikan check-in**.
7. Demo → Pengunjung → Lacak Booking (ketuk kode di daftar contoh) → **Perpanjang** 1 malam → **Perpanjang sekarang**.
8. Demo → Admin → Check-out → **Proses check-out** → **Selesaikan check-out** (kamar berubah *kotor*).

**2. Sewa aula dengan verifikasi**
1. Pengunjung: Fasilitas → Gedung & Ruangan → **Aula Auditorium Barigas** → pilih tanggal, tombol *08.00–16.00* → **Tambah ke pesanan**.
2. Langkah 1: tambah **Kamar Twin Bed** 10 kamar → *Tambahkan*. Langkah 2: LCD Proyektor 1. Langkah 3: *Isi contoh*. Langkah 4: **DP 30%** → **Kirim pengajuan** (status *Menunggu verifikasi admin*).
3. Admin → Booking → Verifikasi Gedung → **Setujui**.
4. Pengunjung → Lacak → **Unggah bukti bayar** (jenis DP) → Bendahara terima.
5. Pengunjung → **Unggah bukti pelunasan** (batas H-1 terlihat di tagihan) → Bendahara terima.
6. Admin → Check-in (bagi 10 nomor kamar) → Check-out.

**3. Bentrok & kedaluwarsa**
1. Pengunjung → Kamar Double Bed: kalender menunjukkan **penuh** pada H+5 dan H+6; memilih tanggal itu memunculkan pesan.
2. Aula Barigas → tanggal H+7 sudah terisi 08.00–16.00 → pilih 10.00–12.00 → pesan **bentrok** dan tidak bisa ditambahkan (sama di form pemesanan).
3. Admin → Semua Booking → filter status **Kedaluwarsa** (BPK-A06).
4. Untuk melihat langsung: Demo → **+1 jam**; booking yang hold-nya habis (mis. BPK-A05) berubah *Kedaluwarsa* dan jadwal dilepas.

**4. Operasional internal**
1. Admin → Kalender Jadwal → klik sel kosong (mis. Kelas 20) → **Blokir agenda internal** → *Blokir jadwal*. Mencoba memblokir slot yang sudah dibooking akan ditolak.
2. Klik sel kosong lain → **Booking offline** (atau menu Booking Offline) → isi → langkah 4 pilih **Tunai di tempat** → *Simpan booking offline* (langsung terkonfirmasi + kuitansi).
3. Status Kamar → klik satu kamar → **Perbaikan** + catatan → *Simpan* (ketersediaan publik ikut berkurang).

**5. Pimpinan**
1. Demo → Kepala Bapelkes → Dashboard: grafik pendapatan & okupansi, fasilitas terlaris, ringkasan status.
2. Laporan → ganti **Periode** → lihat per jenis layanan → tombol Excel/PDF (dummy).

## Peta halaman

| Kode | Rute | Kode | Rute |
|---|---|---|---|
| P1 Beranda | `#/p1` | A7 Verifikasi Bukti Bayar | `#/a7` |
| P2 Fasilitas | `#/p2` | A8 Tagihan & Piutang | `#/a8` |
| P3 Detail Fasilitas | `#/p3/dbl`, `#/p3/aula` | A9 Refund | `#/a9` |
| P4 Form Pemesanan | `#/p4` | A10 Check-in | `#/a10` |
| P5 Pesanan Terkirim | `#/p5/<kode>` | A11 Tamu Menginap | `#/a11` |
| P6 Lacak Booking | `#/p6` | A12 Check-out | `#/a12` |
| P7 Detail Booking | `#/p7/<kode>` | A13 Perpanjangan | `#/a13` |
| P8 Info | `#/p8` | A14 Status Kamar | `#/a14` |
| A1 Dashboard (per peran) | `#/a1` | A15 Fasilitas & Unit | `#/a15` |
| A2 Kalender Jadwal | `#/a2` | A16 Master Tarif | `#/a16` |
| A3 Semua Booking | `#/a3` | A17 Layanan Tambahan | `#/a17` |
| A4 Detail Booking | `#/a4/<kode>` | A18 Laporan Keuangan | `#/a18` |
| A5 Verifikasi Gedung | `#/a5` | A19 Manajemen Akun | `#/a19` |
| A6 Booking Offline | `#/a6` | Pengaturan Sistem | `#/set/<tab>` |

## Masih placeholder

- Foto fasilitas dan peta lokasi (bidang berlabel "menyusul").
- Logo resmi (letakkan file di `assets/`).
- Laporan Okupansi, Rekap Penyewa, Piutang DP (tab "segera" di Laporan).
- Unduh PDF/Excel, unggah foto/logo, kirim email/WA: hanya notifikasi simulasi.
- Alamat, kontak, rekening, tarif tahun depan, extra bed, konsumsi: angka contoh, menunggu data client.

## Berkas

- `index.html` — semua halaman (Tailwind 3.4.16 + Alpine 3.14.8 via CDN).
- `app.js` — logika (ketersediaan, bentrok, hold, pembayaran, check-in/out, laporan).
- `data.js` — data contoh, warna status, hak akses per peran, skenario.
- `PRODUCT.md`, `DESIGN.md` — konteks produk dan keputusan desain.
