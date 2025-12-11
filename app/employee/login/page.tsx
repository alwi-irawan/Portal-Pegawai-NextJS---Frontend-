import EmployeeLoginForm from "@/components/EmployeeLoginForm";

export const metadata = {
  title: "Portal Pegawai - Login",
  description: "Portal login untuk pegawai - Sistem Manajemen Data Pegawai",
};

export default function EmployeeLoginPage() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <div className="card shadow-sm border-0">
          {/* Card Header */}
          <div className="card-header bg-primary text-white text-center py-4 border-0">
            <div className="mb-3">
              <i
                className="bi bi-shield-lock"
                style={{ fontSize: "2.5rem" }}
              ></i>
            </div>
            <h3 className="card-title mb-2">Portal Pegawai</h3>
            <p className="text-white-50 mb-0 small">
              Sistem Manajemen Data Pegawai
            </p>
          </div>

          {/* Card Body */}
          <div className="card-body p-4">
            <EmployeeLoginForm />
          </div>

          {/* Card Footer */}
        </div>

        {/* Additional Info */}
      </div>
    </div>
  );
}
