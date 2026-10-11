  <div align="center">

# 💌 SecretWall

**Web pesan rahasia anonim pribadi, tempat siapa pun bisa mengirim masukan, pertanyaan, dan cerita tanpa perlu menyebutkan nama kepada saya.**

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Templating-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

[Fitur](#-fitur) · [Teknologi](#-teknologi) · [Instalasi](#-instalasi) · [Struktur Proyek](#-struktur-proyek) · [Keamanan](#-keamanan) · [Roadmap](#-roadmap)

</div>

---

## 📖 Tentang Proyek

**SecretWall** adalah aplikasi web berbasis Node.js dan Supabase untuk mengirim pesan anonim. Pengunjung bisa menulis pesan (dengan atau tanpa nama), melampirkan gambar, video, atau audio, memberi like, dan berkomentar. Pemilik web mendapat halaman **Analytics** dengan statistik dan grafik, serta panel **Admin** untuk moderasi.

Proyek ini dibuat oleh **Sa'id Abdul Aziz**, mahasiswa Informatika Telkom University.

## ✨ Fitur

### Untuk pengunjung
| Fitur | Keterangan |
|---|---|
| 📩 **Kirim pesan anonim** | Nama opsional, pesan sampai 1000 karakter |
| 📎 **Lampiran media** | Gambar, video, dan audio (maks. 10 MB) |
| 💬 **Komentar** | Balas pesan dengan teks atau lampiran |
| 👍 **Like** | Satu like per perangkat, bisa dibatalkan |
| 🔍 **Pencarian** | Filter berdasarkan nama, isi pesan, dan tanggal |
| 🚩 **Laporkan konten** | Laporkan pesan yang melanggar ketentuan |
| 🗑️ **Hapus pesan sendiri** | Pengirim bisa menarik pesannya dari perangkat yang sama |
| ♾️ **Muat lebih banyak** | Paginasi supaya halaman tetap ringan |
| ⚡ **Realtime** | Pesan baru muncul tanpa refresh |
| 🌙 **Mode gelap** | Tersimpan di browser, mengikuti preferensi sistem |

### Untuk pemilik web
| Fitur | Keterangan |
|---|---|
| 📊 **Halaman Analytics** | Total pesan, hari ini, minggu ini, bulan ini, rata-rata per hari, total komentar, dan lainnya |
| 📈 **Grafik interaktif** | Tren harian, aktivitas per hari dalam seminggu, per jam, anonim vs bernama, dan jenis lampiran |
| 🔁 **Perbandingan periode** | Persentase naik atau turun dibanding kemarin, minggu lalu, dan bulan lalu |
| 📅 **Filter rentang tanggal** | Pilih periode bebas atau cepat (7, 30, 90 hari) |
| 🔤 **Kata paling sering muncul** | Dihitung dari pesan pada rentang terpilih |
| ⬇️ **Export CSV** | Unduh pesan pada rentang tanggal terpilih |
| 🛡️ **Panel Admin** | Login lewat Supabase Auth, hapus dan pin pesan, tinjau laporan |

## 🧰 Teknologi

- **Backend:** Node.js, Express 5, EJS
- **Database, Auth, Storage, dan Realtime:** Supabase (PostgreSQL)
- **Frontend:** HTML, CSS, JavaScript (ES Modules), Chart.js
- **Keamanan data:** Row Level Security (RLS), fungsi RPC `security definer`

## 🚀 Instalasi

### Prasyarat
- [Node.js](https://nodejs.org/) versi 20 atau lebih baru
- Akun [Supabase](https://supabase.com/) (paket gratis cukup)

### 1. Clone repositori
```bash
git clone https://github.com/Said-labs/message-secret.git
cd message-secret
```

### 2. Pasang dependensi
```bash
npm install
```

### 3. Siapkan Supabase
1. Buat proyek baru di Supabase.
2. Buka **SQL Editor**, lalu jalankan skema database secara berurutan: tabel dan RLS, fungsi pesan dan komentar, fungsi like, report, dan hapus, lalu fungsi `get_analytics`. Simpan SQL tersebut di `supabase/schema.sql` agar mudah dirujuk.
3. Buat akun admin di **Authentication → Users → Add user**, lalu daftarkan sebagai admin:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'EMAIL_ADMIN_KAMU'
   on conflict do nothing;
   ```
4. Pastikan bucket storage **`uploads`** bersifat publik (dibuat otomatis oleh skema).
5. Aktifkan **Realtime** untuk tabel `messages` dan `comments`.

### 4. Isi kredensial Supabase
Salin **Project URL** dan **anon public key** dari *Project Settings → API*, lalu ganti nilainya di `views/home.ejs`, `views/analytics.ejs`, dan `views/admin.ejs`:

```js
const supabaseUrl = "https://<project-id>.supabase.co"
const supabaseKey = "<anon-public-key>"
```

> ℹ️ Anon key memang dirancang untuk dipakai di sisi klien. Keamanan datanya dijaga oleh RLS dan fungsi di database, **bukan** oleh kerahasiaan key tersebut. Jangan pernah memasukkan `service_role` key ke kode frontend.

### 5. Jalankan aplikasi
```bash
npm start
```
Buka **http://localhost:3000**.

### Variabel lingkungan (opsional)
| Variabel | Fungsi | Default |
|---|---|---|
| `PORT` | Port server | `3000` |
| `BASE_URL` | Domain publik untuk meta tag share (Open Graph) | otomatis dari request |

```bash
BASE_URL=https://domainmu.com PORT=8080 npm start
```

## 🗺️ Halaman & Route

| Route | Deskripsi |
|---|---|
| `/` | Beranda: kirim pesan, cari, timeline |
| `/analytics` | Statistik dan grafik |
| `/about` | Tentang aplikasi |
| `/terms` | Syarat dan ketentuan |
| `/admin` | Panel moderasi (butuh login admin) |

## 📁 Struktur Proyek

```text
message-secret/
├── server.js              # Server Express & routing
├── package.json
├── public/
│   ├── style.css          # Gaya global + mode gelap
│   ├── theme.js           # Pengalih tema terang/gelap
│   └── uploads/           # Aset statis (foto profil, logo)
├── views/
│   ├── home.ejs           # Beranda & timeline pesan
│   ├── analytics.ejs      # Dashboard analytics
│   ├── admin.ejs          # Panel admin
│   ├── about.ejs
│   ├── terms.ejs
│   └── 404.ejs
└── supabase/
    └── schema.sql         # Skema database & fungsi (disarankan disimpan di sini)
```

## 🗄️ Skema Database

| Tabel | Isi |
|---|---|
| `messages` | Pesan: pengirim, isi, lampiran, jumlah like, status pin, hash pemilik |
| `comments` | Komentar pada pesan, termasuk lampiran dan suara |
| `likes` | Like per perangkat (mencegah like ganda) |
| `reports` | Laporan konten dari pengunjung |
| `admins` | Daftar pengguna yang berhak melakukan moderasi |

Fungsi RPC utama: `send_message`, `send_comment`, `toggle_like`, `my_likes`, `report_message`, `delete_own_message`, `is_admin`, dan `get_analytics`.

## 🔒 Keamanan

- **Pencegahan XSS:** semua teks pengguna di-escape sebelum ditampilkan, dan URL lampiran hanya diterima jika `https`.
- **Row Level Security:** penulisan data umum hanya lewat fungsi RPC yang memvalidasi input. Hapus dan pin hanya untuk admin.
- **Anti-spam:** jeda 30 detik per pesan dan 10 detik per komentar, serta batas laju global.
- **Validasi:** batas panjang pesan, komentar, dan nama, serta batas ukuran dan jenis file di storage.
- **Privasi pemilik pesan:** ID perangkat disimpan sebagai hash SHA-256, bukan nilai aslinya.

> ⚠️ Pembatasan berbasis perangkat bisa dilewati dengan menghapus data browser. Untuk lingkungan produksi dengan trafik tinggi, pertimbangkan menambah CAPTCHA (misalnya Cloudflare Turnstile).

## 🧭 Roadmap

- [ ] Integrasi CAPTCHA anti-bot
- [ ] Notifikasi email saat ada pesan baru
- [ ] Balasan dari admin yang diberi tanda khusus
- [ ] Kategori atau tag pesan
- [ ] Rate limiting di sisi server
- [ ] Pengujian otomatis (unit dan integrasi)

## 🤝 Berkontribusi

Kontribusi sangat diterima.

1. Fork repositori ini
2. Buat branch fitur: `git checkout -b fitur/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambah nama fitur"`
4. Push ke branch: `git push origin fitur/nama-fitur`
5. Buka Pull Request

## 📄 Lisensi

Didistribusikan di bawah lisensi **ISC**.

## 👨‍💻 Pembuat

**Sa'id Abdul Aziz**
Informatics Student, Telkom University (2026–2030)

[![GitHub](https://img.shields.io/badge/GitHub-Said--labs-181717?style=flat-square&logo=github)](https://github.com/Said-labs)
[![Instagram](https://img.shields.io/badge/Instagram-saidazizzy-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/saidazizzy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sa'id-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/said-abdul-aziz)
[![Email](https://img.shields.io/badge/Email-saidaziz.expert%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:saidaziz.expert@gmail.com)

<div align="center">

Dibuat dengan  di Bandung · Kalau proyek ini bermanfaat, jangan lupa kasih ⭐

</div>
