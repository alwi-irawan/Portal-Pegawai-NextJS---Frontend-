"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ClientDate from "./ClientDate";

interface Employee {
  id: number;
  full_name: string;
  position: string;
  phone: string;
  email: string;
  photo?: string;
  created_at?: string;
  updated_at?: string;
}

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees, searchQuery]);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8880/api/employees", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data pegawai");
      }

      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : data.data || []);
      setError("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterEmployees = () => {
    let filtered = employees;

    // Filter by search query (name, position, email, or phone)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.full_name.toLowerCase().includes(query) ||
          emp.position.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.phone.includes(query)
      );
    }

    setFilteredEmployees(filtered);
  };

  const handleDeleteEmployee = async (employeeId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pegawai ini?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8880/api/employees/${employeeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus pegawai");
      }

      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
      setSuccessMessage("Pegawai berhasil dihapus");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    }
  };

  const handleViewDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const handleRefresh = () => {
    fetchEmployees();
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="main-content" style={{ marginLeft: "250px", flex: 1 }}>
        <div className="min-vh-100 bg-light py-4">
          <div className="container-fluid">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0" style={{ color: "#000" }}>
                <i className="bi bi-people me-2"></i>Manajemen Pegawai
              </h2>
              <button
                className="btn btn-primary"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                {isLoading ? "Loading..." : "Refresh"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show mb-4"
                role="alert"
              >
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError("")}
                ></button>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                className="alert alert-success alert-dismissible fade show mb-4"
                role="alert"
              >
                <i className="bi bi-check-circle me-2"></i>
                {successMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage("")}
                ></button>
              </div>
            )}

            {/* Search Filter */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label">Cari Pegawai</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cari berdasarkan nama, posisi, email, atau telepon..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Employees Table */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  Daftar Pegawai ({filteredEmployees.length})
                </h5>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border text-primary mb-3"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Memuat data pegawai...</p>
                  </div>
                ) : filteredEmployees.length === 0 ? (
                  <div className="text-center py-5">
                    <i
                      className="bi bi-inbox text-muted"
                      style={{ fontSize: "3rem" }}
                    ></i>
                    <p className="text-muted mt-3">
                      {employees.length === 0
                        ? "Tidak ada pegawai"
                        : "Tidak ada pegawai yang sesuai dengan pencarian"}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Foto</th>
                          <th>Nama Lengkap</th>
                          <th>Posisi</th>
                          <th>Email</th>
                          <th>Telepon</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmployees.map((employee) => (
                          <tr key={employee.id}>
                            <td>
                              {employee.photo ? (
                                <>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={employee.photo}
                                    alt={employee.full_name}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      border: "2px solid #ddd",
                                    }}
                                  />
                                </>
                              ) : (
                                <div
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    backgroundColor: "#e9ecef",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <i className="bi bi-person text-muted"></i>
                                </div>
                              )}
                            </td>
                            <td>
                              <strong>{employee.full_name}</strong>
                            </td>
                            <td>
                              <small>{employee.position}</small>
                            </td>
                            <td>
                              <small>{employee.email}</small>
                            </td>
                            <td>
                              <small>{employee.phone}</small>
                            </td>
                            <td>
                              <div
                                className="btn-group btn-group-sm"
                                role="group"
                              >
                                <button
                                  className="btn btn-info"
                                  onClick={() => handleViewDetail(employee)}
                                  title="Detail"
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    handleDeleteEmployee(employee.id)
                                  }
                                  title="Hapus"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <div className="card shadow-sm border-0 text-center">
                  <div className="card-body">
                    <i
                      className="bi bi-people text-primary"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <h5 className="card-title mt-3 mb-1">Total Pegawai</h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {employees.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="card shadow-sm border-0 text-center">
                  <div className="card-body">
                    <i
                      className="bi bi-search text-info"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <h5 className="card-title mt-3 mb-1">Hasil Pencarian</h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {filteredEmployees.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedEmployee && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Detail Pegawai</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDetailModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center mb-4">
                  {selectedEmployee.photo ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedEmployee.photo}
                        alt={selectedEmployee.full_name}
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "3px solid #ddd",
                        }}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "#e9ecef",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        fontSize: "3rem",
                      }}
                    >
                      <i className="bi bi-person text-muted"></i>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Nama Lengkap</label>
                  <p className="text-muted">{selectedEmployee.full_name}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Posisi</label>
                  <p className="text-muted">{selectedEmployee.position}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <p className="text-muted">{selectedEmployee.email}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Telepon</label>
                  <p className="text-muted">{selectedEmployee.phone}</p>
                </div>

                {selectedEmployee.created_at && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">Dibuat Pada</label>
                    <p className="text-muted">
                      <ClientDate
                        iso={selectedEmployee.created_at}
                        locale="id-ID"
                        fallback="-"
                      />
                    </p>
                  </div>
                )}

                {selectedEmployee.updated_at && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Diperbarui Pada
                    </label>
                    <p className="text-muted">
                      <ClientDate
                        iso={selectedEmployee.updated_at}
                        locale="id-ID"
                        fallback="-"
                      />
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDetailModal(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
