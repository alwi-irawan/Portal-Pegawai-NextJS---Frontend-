"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/employee/dashboard",
      icon: "bi-house-door",
    },
    {
      label: "Daftar Pegawai",
      href: "/employee/pegawai",
      icon: "bi-clipboard-check",
    },
    {
      label: "Tambah Pegawai",
      href: "/employee/management",
      icon: "bi-person-plus",
    },
    {
      label: "Manajemen User",
      href: "/employee/users",
      icon: "bi-person-circle",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`d-flex flex-column bg-dark text-white position-fixed start-0 top-0 h-100 sidebar-custom ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        }`}
        style={{
          width: isOpen ? "250px" : "80px",
          transition: "width 0.3s ease",
          zIndex: 999,
          paddingTop: "0",
          overflowY: "auto",
        }}
      >
        {/* Logo/Header */}
        <div
          className="p-3 border-bottom border-secondary d-flex align-items-center justify-content-between"
          style={{ height: "70px" }}
        >
          <div className="d-flex align-items-center">
            <i
              className="bi bi-speedometer2"
              style={{ fontSize: "1.5rem" }}
            ></i>
            {isOpen && <span className="ms-3 fw-bold">Portal Admin</span>}
          </div>
        </div>

        {/* Menu Items */}
        <ul className="nav flex-column flex-grow-1 p-2">
          {menuItems.map((item) => (
            <li className="nav-item mb-2" key={item.href}>
              <Link
                href={item.href}
                className={`nav-link text-white rounded d-flex align-items-center ${isActive(
                  item.href
                )}`}
                style={{
                  backgroundColor: isActive(item.href)
                    ? "#0d6efd"
                    : "transparent",
                  padding: "10px 15px",
                  transition: "background-color 0.2s ease",
                }}
                title={!isOpen ? item.label : ""}
              >
                <i
                  className={`bi ${item.icon}`}
                  style={{ fontSize: "1.25rem" }}
                ></i>
                {isOpen && <span className="ms-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div className="p-2 border-top border-secondary mt-auto">
          <LogoutAndToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* Main Content Wrapper */}
      <style>{`
        .sidebar-custom {
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }

        .sidebar-open ~ .main-content {
          margin-left: 250px;
        }

        .sidebar-closed ~ .main-content {
          margin-left: 80px;
        }

        @media (max-width: 768px) {
          .sidebar-custom {
            width: 250px !important;
            transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"};
          }

          .sidebar-custom ~ .main-content {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
}

function LogoutAndToggle({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {
      // ignore
    }
    router.push("/employee/login");
  };

  return (
    <>
      <button
        className="btn btn-outline-light btn-sm w-100 mb-2 d-flex align-items-center justify-content-center"
        onClick={handleLogout}
        title="Logout"
      >
        <i className="bi bi-box-arrow-right"></i>
        {isOpen && <span className="ms-2">Logout</span>}
      </button>

      <button
        className="btn btn-outline-light btn-sm w-100 d-flex align-items-center justify-content-center"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Tutup Sidebar" : "Buka Sidebar"}
      >
        <i
          className={`bi ${isOpen ? "bi-chevron-left" : "bi-chevron-right"}`}
        ></i>
        {isOpen && <span className="ms-2">Tutup</span>}
      </button>
    </>
  );
}
