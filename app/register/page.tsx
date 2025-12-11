import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: "Daftar - Aplikasi",
  description: "Halaman pendaftaran aplikasi",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Daftar Akun</h1>
            <p className="text-gray-600 mt-2">
              Buat akun baru untuk mengakses aplikasi
            </p>
          </div>

          {/* Form */}
          <RegisterForm />

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Dengan mendaftar, Anda menyetujui{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Kebijakan Privasi
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
