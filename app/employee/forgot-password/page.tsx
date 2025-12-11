export const metadata = {
  title: "Lupa Password - Portal Pegawai",
  description: "Halaman pemulihan password pegawai",
};

export default function ForgotPasswordPage() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white text-center py-4 border-0">
            <h3 className="card-title mb-2">Lupa Password?</h3>
            <p className="text-white-50 mb-0 small">
              Reset password Anda dengan mudah
            </p>
          </div>

          <div className="card-body p-4">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Masukkan username Anda"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Terdaftar
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Masukkan email Anda"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Kirim Kode Reset
              </button>
            </form>

            <div className="text-center">
              <small className="text-muted">
                Ingat password Anda?{" "}
                <a href="/employee/login" className="text-decoration-none">
                  Kembali ke login
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
