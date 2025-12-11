"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ClientDate from "./ClientDate";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // TODO: Implement detail modal, edit modal, and edit functionality
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const [showDetailModal, setShowDetailModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [editFormData, setEditFormData] = useState({ username: '', email: '', role: '' });
  // const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = filterUsers();
    setFilteredUsers(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, searchQuery, roleFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8880/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data user");
      }

      const data = await response.json();
      setUsers(Array.isArray(data) ? data : data.data || []);
      setError("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Filter by search query (username or email)
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by role
    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    return filtered;
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8880/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus user");
      }

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setSuccessMessage("User berhasil dihapus");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    }
  };

  const handleRefresh = () => {
    fetchUsers();
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
                <i className="bi bi-person-circle me-2"></i>Manajemen User
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

            {/* Filters */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <div className="row g-3">
                  {/* Search */}
                  <div className="col-md-6">
                    <label className="form-label">Cari User</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cari berdasarkan username atau email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Role Filter */}
                  <div className="col-md-6">
                    <label className="form-label">Filter Role</label>
                    <select
                      className="form-select"
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                    >
                      <option value="">-- Semua Role --</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  Daftar User ({filteredUsers.length})
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
                    <p className="text-muted">Memuat data user...</p>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="text-center py-5">
                    <i
                      className="bi bi-inbox text-muted"
                      style={{ fontSize: "3rem" }}
                    ></i>
                    <p className="text-muted mt-3">
                      {users.length === 0
                        ? "Tidak ada user"
                        : "Tidak ada user yang sesuai dengan filter"}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Dibuat</th>
                          <th>Diperbarui</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <small className="text-muted">#{user.id}</small>
                            </td>
                            <td>
                              <strong>{user.username}</strong>
                            </td>
                            <td>
                              <small>{user.email}</small>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  user.role === "admin"
                                    ? "bg-danger"
                                    : "bg-primary"
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td>
                              <small className="text-muted">
                                <ClientDate
                                  iso={user.created_at}
                                  locale="id-ID"
                                  fallback="-"
                                />
                              </small>
                            </td>
                            <td>
                              <small className="text-muted">
                                {user.updated_at ? (
                                  <ClientDate
                                    iso={user.updated_at}
                                    locale="id-ID"
                                    fallback="-"
                                  />
                                ) : (
                                  "-"
                                )}
                              </small>
                            </td>
                            <td>
                              <div
                                className="btn-group btn-group-sm"
                                role="group"
                              >
                                <button
                                  className="btn btn-info"
                                  title="Detail"
                                  disabled
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteUser(user.id)}
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
              <div className="col-md-3 mb-3">
                <div className="card shadow-sm border-0 text-center">
                  <div className="card-body">
                    <i
                      className="bi bi-people text-primary"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <h5 className="card-title mt-3 mb-1">Total User</h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {users.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card shadow-sm border-0 text-center">
                  <div className="card-body">
                    <i
                      className="bi bi-shield-check text-danger"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <h5 className="card-title mt-3 mb-1">Admin</h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {users.filter((u) => u.role === "admin").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card shadow-sm border-0 text-center">
                  <div className="card-body">
                    <i
                      className="bi bi-pencil-square text-primary"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <h5 className="card-title mt-3 mb-1">Editor</h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {users.filter((u) => u.role === "editor").length}
                    </p>
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
