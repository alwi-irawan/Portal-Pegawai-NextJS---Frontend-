import EmployeeManagement from "@/components/EmployeeManagement";
import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  title: "Manajemen Pegawai",
  description: "Halaman manajemen data pegawai dengan fitur upload foto",
};

export default function EmployeeManagementPage() {
  return (
    <AuthGuard>
      <EmployeeManagement />
    </AuthGuard>
  );
}
