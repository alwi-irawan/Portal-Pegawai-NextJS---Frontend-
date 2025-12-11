"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";

interface Employee {
  id?: number;
  full_name: string;
  email: string;
  position: string;
  phone: string;
  photo?: string;
  photoFile?: File;
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState<Employee>({
    full_name: "",
    email: "",
    position: "",
    phone: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
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
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Nama lengkap harus diisi";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Posisi harus diisi";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeKB = 300;
      const maxSizeBytes = maxSizeKB * 1024;

      // Validasi format
      if (!["image/jpeg", "image/jpg"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          photo: "Format file harus JPG atau JPEG",
        }));
        setPhotoPreview("");
        return;
      }

      // Validasi ukuran
      if (file.size > maxSizeBytes) {
        setErrors((prev) => ({
          ...prev,
          photo: `Ukuran file maksimal ${maxSizeKB}KB (${(
            file.size / 1024
          ).toFixed(2)}KB)`,
        }));
        setPhotoPreview("");
        return;
      }

      // Baca file sebagai data URL untuk preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          photoFile: file,
          photo: reader.result as string,
        }));
        setErrors((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { photo, ...rest } = prev;
          return rest;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("full_name", formData.full_name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("phone", formData.phone);

      // Append photo file if exists
      if (formData.photoFile) {
        formDataToSend.append("photo", formData.photoFile);
      }

      let response: Response;
      let result: Record<string, unknown> | null = null;

      if (isEditing && formData.id) {
        // Update existing employee
        response = await fetch(
          `http://localhost:8880/api/employees/${formData.id}`,
          {
            method: "PUT",
            body: formDataToSend,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Create new employee
        response = await fetch("http://localhost:8880/api/employees", {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan pegawai");
      }

      result = await response.json();

      if (isEditing && formData.id) {
        // Update the employee in the list
        const updatedEmployee: Employee = {
          id: formData.id,
          full_name: formData.full_name,
          email: formData.email,
          position: formData.position,
          phone: formData.phone,
          photo: formData.photo,
        };

        setEmployees((prev) =>
          prev.map((emp) => (emp.id === formData.id ? updatedEmployee : emp))
        );
        setSuccessMessage("Pegawai berhasil diperbarui");
      } else {
        // Add employee to list
        const newId = result
          ? ((result as Record<string, unknown>)["id"] as number | undefined)
          : undefined;
        const newEmployee: Employee = {
          id: newId,
          full_name: formData.full_name,
          email: formData.email,
          position: formData.position,
          phone: formData.phone,
          photo: formData.photo,
        };

        setEmployees((prev) => [...prev, newEmployee]);
        setSuccessMessage("Pegawai berhasil ditambahkan");
      }

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        position: "",
        phone: "",
      });
      setPhotoPreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Hapus pesan sukses setelah 3 detik
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (employee: Employee) => {
    setFormData(employee);
    setPhotoPreview(employee.photo || "");
    setIsEditing(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;

    if (!confirm("Apakah Anda yakin ingin menghapus pegawai ini?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8880/api/employees/${id}`,
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

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      setSuccessMessage("Pegawai berhasil dihapus");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: "",
      email: "",
      position: "",
      phone: "",
    });
    setPhotoPreview("");
    setIsEditing(false);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="main-content" style={{ marginLeft: "250px", flex: 1 }}>
        <div className="min-vh-100 bg-light py-4">
          <div className="container">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0" style={{ color: "#000" }}>
                <i className="bi bi-people me-2"></i>Manajemen Pegawai
              </h2>
              <a href="/employee/dashboard" className="btn btn-secondary">
                <i className="bi bi-arrow-left me-2"></i>Kembali ke Dashboard
              </a>
            </div>

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

            <div className="row">
              {/* Form Section */}
              <div className="col-lg-5 mb-4">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-plus-circle me-2"></i>
                      {isEditing ? "Edit Pegawai" : "Tambah Pegawai Baru"}
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      {/* Error Message */}
                      {errors.submit && (
                        <div className="alert alert-danger mb-3" role="alert">
                          {errors.submit}
                        </div>
                      )}

                      {/* Full Name */}
                      <div className="mb-3">
                        <label htmlFor="full_name" className="form-label">
                          Nama Lengkap <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.full_name ? "is-invalid" : ""
                          }`}
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap"
                        />
                        {errors.full_name && (
                          <div className="invalid-feedback d-block">
                            {errors.full_name}
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Masukkan email"
                        />
                        {errors.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      {/* Position */}
                      <div className="mb-3">
                        <label htmlFor="position" className="form-label">
                          Posisi <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${
                            errors.position ? "is-invalid" : ""
                          }`}
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Pilih Posisi --</option>
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                        </select>
                        {errors.position && (
                          <div className="invalid-feedback d-block">
                            {errors.position}
                          </div>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Nomor Telepon <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Masukkan nomor telepon"
                        />
                        {errors.phone && (
                          <div className="invalid-feedback d-block">
                            {errors.phone}
                          </div>
                        )}
                      </div>

                      {/* Photo Upload */}
                      <div className="mb-3">
                        <label htmlFor="photo" className="form-label">
                          Foto Profil (JPG/JPEG, Maksimal 300KB)
                        </label>
                        <input
                          type="file"
                          className={`form-control ${
                            errors.photo ? "is-invalid" : ""
                          }`}
                          id="photo"
                          ref={fileInputRef}
                          accept=".jpg,.jpeg"
                          onChange={handlePhotoChange}
                        />
                        {errors.photo && (
                          <div className="invalid-feedback d-block">
                            {errors.photo}
                          </div>
                        )}
                        <small className="text-muted d-block mt-2">
                          Format: JPG/JPEG | Ukuran maksimal: 300KB
                        </small>
                      </div>

                      {/* Photo Preview */}
                      {photoPreview && (
                        <div className="mb-3">
                          <label className="form-label">Preview Foto</label>
                          <div className="text-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={photoPreview}
                              alt="Preview"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "250px",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                padding: "5px",
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Buttons */}
                      <div className="d-flex gap-2">
                        <button
                          type="submit"
                          className="btn btn-primary flex-grow-1"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Loading...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-lg me-2"></i>
                              {isEditing ? "Update" : "Simpan"}
                            </>
                          )}
                        </button>
                        {isEditing && (
                          <button
                            type="button"
                            className="btn btn-secondary flex-grow-1"
                            onClick={handleCancel}
                          >
                            <i className="bi bi-x-lg me-2"></i>Batal
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Employee List Section */}
              <div className="col-lg-7">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-info text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-list-ul me-2"></i>Daftar Pegawai (
                      {employees.length})
                    </h5>
                  </div>
                  <div className="card-body">
                    {employees.length === 0 ? (
                      <div className="text-center py-5">
                        <i
                          className="bi bi-inbox text-muted"
                          style={{ fontSize: "3rem" }}
                        ></i>
                        <p className="text-muted mt-3">
                          Belum ada pegawai yang ditambahkan
                        </p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Foto</th>
                              <th>Nama Lengkap</th>
                              <th>Email</th>
                              <th>Posisi</th>
                              <th>Telepon</th>
                              <th>Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employees.map((employee) => (
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
                                  <small>{employee.email}</small>
                                </td>
                                <td>
                                  <small>{employee.position}</small>
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
                                      className="btn btn-warning"
                                      onClick={() => handleEdit(employee)}
                                      title="Edit"
                                    >
                                      <i className="bi bi-pencil"></i>
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => handleDelete(employee.id)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
