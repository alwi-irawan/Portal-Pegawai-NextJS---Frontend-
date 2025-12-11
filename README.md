# Aplikasi Login Next.js

Aplikasi web modern yang dibangun dengan Next.js 15, TypeScript, dan Tailwind CSS. Menampilkan sistem login dan registrasi yang lengkap dengan validasi form, autentikasi, dan UI yang responsif.

## Fitur Utama

- ✅ **Halaman Login** - Form login dengan validasi email dan password
- ✅ **Halaman Register** - Pendaftaran akun baru dengan validasi form
- ✅ **Password Toggle** - Toggle tampilkan/sembunyikan password
- ✅ **Form Validation** - Validasi form real-time
- ✅ **Responsive Design** - Desain mobile-first yang responsif
- ✅ **Tailwind CSS** - Styling modern dengan Tailwind CSS
- ✅ **TypeScript** - Type safety dengan TypeScript
- ✅ **TypeScript** - Type safety dengan TypeScript

## Struktur Proyek

```text
frontend/
├── app/
│   ├── login/              # Halaman login
│   ├── register/           # Halaman register
│   ├── forgot-password/    # Halaman lupa password
│   ├── terms/              # Halaman syarat & ketentuan
│   ├── privacy/            # Halaman kebijakan privasi
│   ├── layout.tsx          # Layout global
│   ├── page.tsx            # Halaman beranda
│   └── globals.css         # CSS global
├── components/
│   ├── LoginForm.tsx       # Komponen form login
│   └── RegisterForm.tsx    # Komponen form register
├── lib/
│   └── validations.ts      # Fungsi validasi
└── public/                 # File statis
```

## Teknologi yang Digunakan

- **Next.js 15** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library
- Boostrap
  
## Menjalankan Aplikasi

### Mode Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### Mode Production

```bash
npm run build
npm run start
```

## Halaman yang Tersedia

- **Beranda** (`/`) - Halaman utama dengan navigasi
- **Login** (`/login`) - Halaman login dengan form
- **Register** (`/register`) - Halaman register dengan form
- **Lupa Password** (`/forgot-password`) - Halaman pemulihan password
- **Syarat & Ketentuan** (`/terms`) - Halaman terms
- **Kebijakan Privasi** (`/privacy`) - Halaman privacy

## Fitur Form Login

- Email validation
- Password validation (minimal 6 karakter)
- Toggle show/hide password
- Loading state saat submit
- Error message display
- Remember me checkbox
- Forgot password link
- Sign up link

## Fitur Form Register

- Name validation (minimal 3 karakter)
- Email validation
- Password validation (minimal 6 karakter)
- Confirm password validation
- Password match checking
- Toggle show/hide password
- Terms agreement checkbox
- Loading state saat submit
- Error message display
- Sign in link

## Validasi Form

Validasi form dilakukan di file `lib/validations.ts`:

- validateEmail() - Validasi format email
- validatePassword() - Validasi panjang password
- validateLoginForm() - Validasi lengkap form login

## Styling

Aplikasi menggunakan Tailwind CSS dengan custom styles:

- Gradient background untuk halaman
- Card design dengan shadow
- Responsive layout
- Loading spinner animation

## Untuk Login
Username : Admin
Password : Al123456!

## Deploy

Aplikasi dapat di-deploy di Vercel, AWS, atau hosting lainnya yang mendukung Node.js.

```bash
npm run build
```
