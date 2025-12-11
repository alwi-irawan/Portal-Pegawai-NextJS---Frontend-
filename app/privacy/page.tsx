import Link from "next/link";

export const metadata = {
  title: "Kebijakan Privasi - Aplikasi",
  description: "Halaman kebijakan privasi",
};

export default function PrivacyPage() {
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
            Kebijakan Privasi
          </h1>

          <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Informasi yang Kami Kumpulkan
              </h2>
              <p>
                Kami mengumpulkan informasi yang Anda berikan secara sukarela
                ketika mendaftar atau menggunakan layanan kami, termasuk nama,
                email, dan informasi profil lainnya.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Penggunaan Informasi
              </h2>
              <p>Informasi yang kami kumpulkan digunakan untuk:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Menyediakan dan meningkatkan layanan</li>
                <li>Mengirim komunikasi dan pembaruan</li>
                <li>Menganalisis penggunaan layanan</li>
                <li>Memastikan keamanan akun Anda</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Keamanan Data
              </h2>
              <p>
                Kami berkomitmen untuk melindungi data Anda dengan menggunakan
                enkripsi dan langkah-langkah keamanan lainnya.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Berbagi Informasi
              </h2>
              <p>
                Kami tidak membagikan informasi pribadi Anda kepada pihak ketiga
                tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Cookie
              </h2>
              <p>
                Kami menggunakan cookie untuk meningkatkan pengalaman pengguna.
                Anda dapat mengatur browser untuk menolak cookie jika
                diinginkan.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Hubungi Kami
              </h2>
              <p>
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini,
                silakan hubungi kami melalui halaman kontak.
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
