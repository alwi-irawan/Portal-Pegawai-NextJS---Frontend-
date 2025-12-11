"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";
import ClientDate from "@/components/ClientDate";

interface User {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export default function EmployeeDashboard() {
  const [user] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
    return null;
  });
  const [isLoading] = useState(false);

  useEffect(() => {
    // Check token
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      window.location.href = "/employee/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/employee/login";
  };

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div className="main-content" style={{ marginLeft: "250px", flex: 1 }}>
          <div className="min-vh-100 bg-light">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
              <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">
                  <i className="bi bi-house-door me-2"></i>Portal Pegawai
                </span>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="#profile">
                        <i className="bi bi-person me-2"></i>Profil
                      </a>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-link text-decoration-none"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="container py-4">
              {/* Welcome Section */}
              <div
                className="alert alert-info alert-dismissible fade show mb-4"
                role="alert"
              >
                <i className="bi bi-info-circle me-2"></i>
                <strong>Selamat datang!</strong> Anda telah berhasil login ke
                sistem.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>

              {/* User Info Card */}
              <div className="row mb-4">
                <div className="col-md-8 mx-auto">
                  <div className="card shadow-sm border-0">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">
                        <i className="bi bi-person-circle me-2"></i>Data Pegawai
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <p className="mb-1">
                            <strong>Username:</strong>
                          </p>
                          <p className="text-muted">
                            {user?.username || "Tidak tersedia"}
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p className="mb-1">
                            <strong>Email:</strong>
                          </p>
                          <p className="text-muted">
                            {user?.email || "Tidak tersedia"}
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p className="mb-1">
                            <strong>Role:</strong>
                          </p>
                          <p className="text-muted">
                            <span
                              className={`badge ${
                                user?.role === "admin"
                                  ? "bg-danger"
                                  : "bg-primary"
                              }`}
                            >
                              {user?.role || "Tidak tersedia"}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <p className="mb-1">
                            <strong>Dibuat Pada:</strong>
                          </p>
                          <p className="text-muted">
                            {user?.created_at ? (
                              // render formatted date on client only to avoid SSR/CSR mismatch
                              // ClientDate will render fallback on server and the formatted string on client
                              <ClientDate
                                iso={user.created_at}
                                locale="id-ID"
                                fallback="-"
                              />
                            ) : (
                              "-"
                            )}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-1">
                            <strong>Diperbarui Pada:</strong>
                          </p>
                          <p className="text-muted">
                            {user?.updated_at ? (
                              <ClientDate
                                iso={user.updated_at}
                                locale="id-ID"
                                fallback="-"
                              />
                            ) : (
                              "-"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="row mt-4">
                <div className="col-md-8 mx-auto">
                  <div className="card shadow-sm border-0">
                    <div className="card-header bg-light border-bottom">
                      <h5 className="mb-0">
                        <i className="bi bi-lightning me-2 text-warning"></i>
                        Aksi Cepat
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-pencil me-2"></i>Edit Profil
                        </button>
                        <button className="btn btn-outline-info btn-sm">
                          <i className="bi bi-key me-2"></i>Ubah Password
                        </button>
                        <button className="btn btn-outline-success btn-sm">
                          <i className="bi bi-download me-2"></i>Download CV
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
