import UserManagement from "@/components/UserManagement";
import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  title: "Manajemen User",
  description: "Halaman manajemen data user sistem",
};

export default function UserManagementPage() {
  return (
    <AuthGuard>
      <UserManagement />
    </AuthGuard>
  );
}
