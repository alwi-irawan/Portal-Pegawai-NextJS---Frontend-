import EmployeeManagementPage from "@/components/EmployeeManagementList";
import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  title: "Manajemen Pegawai - List",
  description: "Halaman daftar manajemen pegawai sistem",
};

export default function EmployeeManagementListPage() {
  return (
    <AuthGuard>
      <EmployeeManagementPage />
    </AuthGuard>
  );
}
