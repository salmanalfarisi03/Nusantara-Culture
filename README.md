# 🏛️ Budaya Nusantara - Complete Design System & Documentation

Selamat datang di dokumentasi lengkap proyek **Budaya Nusantara**. Dokumentasi ini dirancang agar Anda dapat mendesain aset visual secara konsisten di Figma, Spline, atau tools desain lainnya agar selaras dengan implementasi kode saat ini.

---

## 🎨 Design Identity (Aesthetic)
Website ini mengusung tema **"Premium Cultural Archive"** dengan perpaduan *Modern Minimalism* dan *Traditional Earthy Tones*.

### 1. Typography (Tipografi)
Kami menggunakan perpaduan dua font Google yang memberikan kesan elegan sekaligus modern:

| Font Family | Usage | Karakter |
| :--- | :--- | :--- |
| **Playfair Display** | Headings, Titles, Hero Text | Serif, Mewah, Tradisional, Elegan. |
| **Inter** | Body Text, Navigation, Metadata | Sans-serif, Bersih, Modern, Keterbacaan tinggi. |

**Weight yang digunakan:**
- Playfair Display: `400` (Regular), `700` (Bold)
- Inter: `300` (Light), `400` (Regular), `500` (Medium), `700` (Bold)

### 2. Color Palette (Palet Warna)
Sistem warna dibagi menjadi dua skema utama: **Dark Mode (Primary)** dan **Light Accent**.

#### **Core Colors (Dark Mode)**
- **Deep Black**: `#050505` (Background Utama)
- **Pure Black**: `#000000` (Section Overlay)
- **Silver Cloud**: `#D1D0D0` (Text Utama, Contrast Background)
- **Warm Grey**: `#988686` (Subtext, Border, Secondary Text)
- **Deep Taupe**: `#5C4E4E` (Muted Elements, Map Color)
- **Forest Moss**: `#44541c` (Selection Color, Interactive Accents)

#### **Light Mode (Gallery Section)**
- **Background**: `#D1D0D0`
- **Text**: `#000000`
- **Accent Text**: `#5C4E4E`

---

## 🖼️ Asset Specifications (Panduan Gambar & Animasi)

### 1. Hero Scroll Sequence
Terletak di `/public/frames/`. Ini adalah nyawa dari homepage.
- **Resolusi**: `1920x1080px` (Wajib konsisten untuk semua frame).
- **Naming**: `ezgif-frame-XXX.jpg` (misal: `ezgif-frame-001.jpg`).
- **Total Frame**: Saat ini `240` frame. Jika Anda menambah/mengurangi, update `FRAME_COUNT` di `src/app/page.tsx`.

### 2. Culture Hero Video
Terletak di `/public/assets/videos/`.
- **Format**: `.mp4`.
- **Ratio**: `16:9` atau Full Screen.
- **Size**: Usahakan di bawah 5MB (Gunakan Handbrake atau Tool kompresi untuk performa).

### 3. Artifact & Gallery Images
Terletak di `/public/assets/images/`.
- **Ratio**: `4:5` (Potret) untuk artefak, `16:9` atau `3:2` untuk galeri.
- **Format**: `.jpg` atau `.webp` (Sangat direkomendasikan).

---

## 🧱 Component Structure (Struktur Komponen)

### 1. Interactive Map
Menggunakan `@react-map/indonesia`. 
- Warna default wilayah: `#5C4E4E` (Deep Taupe).
- Warna saat hover: `#D1D0D0` (Silver).
- Label teks pulau menggunakan font **Serif (Playfair Display)** dengan opacity 0.9.

### 2. Resizable Navbar
Floating navbar yang berubah transparansinya saat scroll.
- **Logo**: Menggunakan teks Playfair Display atau logo grafis.
- **Buttons**: Outline style dengan tracking lebar (`tracking-widest`).

---

## 🛠️ Update via Code (Cheat Sheet)

| Task | File Path | Code Variable |
| :--- | :--- | :--- |
| **Ganti Jumlah Frame** | `src/app/page.tsx` | `const FRAME_COUNT = 240;` |
| **Ganti Konten Budaya** | `src/app/budaya/[id]/page.tsx` | `const cultureDetails = { ... }` |
| **Update Nama Navigasi** | `src/app/page.tsx` | `const navItems = [ ... ]` |
| **Ganti Meta Title/Desc** | `src/app/layout.tsx` | `export const metadata = { ... }` |

---

## 💡 Tips Desain di Figma/Spline
1. **Spline**: Jika mendesain scene 3D, export sebagai **Image Sequence** daripada Video untuk kontrol scroll yang lebih presisi (menghemat memori browser).
2. **Figma**: Gunakan **Auto Layout** dengan spacing kelipatan 4 atau 8 (misal: gap 16px, 32px, 64px) untuk menjaga konsistensi dengan Tailwind CSS.
3. **Contrast**: Pastikan teks `#D1D0D0` tetap terbaca di atas background sequence. Gunakan gradient overlay hitam jika diperlukan (sudah ada di kode).

---
*Dibuat untuk mempermudah kolaborasi antara Desain dan Engineering.*
