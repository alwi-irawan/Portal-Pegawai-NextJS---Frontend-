import Link from "next/link";

export const metadata = {
  title: "Syarat & Ketentuan - Aplikasi",
  description: "Halaman syarat dan ketentuan",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Kembali ke Beranda
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Syarat & Ketentuan
          </h1>

          <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Ketentuan Umum
              </h2>
              <p>
                Dengan menggunakan aplikasi ini, Anda menyetujui semua syarat
                dan ketentuan yang berlaku. Jika Anda tidak menyetujui, silakan
                jangan menggunakan aplikasi ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Penggunaan Layanan
              </h2>
              <p>
                Anda setuju untuk menggunakan aplikasi ini hanya untuk tujuan
                yang sah dan tidak melanggar hukum atau hak-hak pihak ketiga.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Tanggung Jawab Pengguna
              </h2>
              <p>
                Pengguna bertanggung jawab atas semua aktivitas yang terjadi di
                bawah akunnya dan menjaga kerahasiaan password-nya.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Batasan Tanggung Jawab
              </h2>
              <p>
                Aplikasi ini disediakan &quot;apa adanya&quot; tanpa jaminan
                apapun. Kami tidak bertanggung jawab atas kerugian yang timbul
                dari penggunaan aplikasi ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Perubahan Ketentuan
              </h2>
              <p>
                Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja.
                Perubahan akan berlaku segera setelah diposting di aplikasi.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Terakhir diperbarui: 9 Desember 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
