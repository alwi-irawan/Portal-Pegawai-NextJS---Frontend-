export const metadata = {
  title: "IT Support - Portal Pegawai",
  description: "Halaman dukungan IT",
};

export default function SupportPage() {
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-12">
          <a href="/employee/login" className="btn btn-sm btn-outline-primary">
            ← Kembali ke Login
          </a>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-headset me-2"></i>IT Support
              </h4>
            </div>

            <div className="card-body">
              <h5 className="mb-3">Hubungi Tim Support Kami</h5>

              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">
                        <i className="bi bi-telephone me-2 text-primary"></i>
                        Telepon
                      </h6>
                      <p className="card-text mb-0">(021) 1234-5678</p>
                      <small className="text-muted">
                        Senin - Jumat, 09:00 - 17:00
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <h6 className="card-title">
                        <i className="bi bi-envelope me-2 text-primary"></i>
                        Email
                      </h6>
                      <p className="card-text mb-0">support@company.com</p>
                      <small className="text-muted">Respons dalam 24 jam</small>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="mb-3">Topik Bantuan Umum</h5>
              <div className="accordion" id="supportAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                    >
                      Lupa Password
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#supportAccordion"
                  >
                    <div className="accordion-body">
                      Klik &quot;Lupa Password&quot; di halaman login dan ikuti
                      instruksi yang diberikan. Link reset akan dikirim ke email
                      Anda.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                    >
                      Akun Terkunci
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#supportAccordion"
                  >
                    <div className="accordion-body">
                      Jika akun Anda terkunci setelah beberapa percobaan login
                      gagal, hubungi IT Support untuk membukanya kembali.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                    >
                      Masalah Akses
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#supportAccordion"
                  >
                    <div className="accordion-body">
                      Jika Anda mengalami masalah akses, silakan refresh halaman
                      atau coba login kembali. Jika masalah berlanjut, hubungi
                      IT Support.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
