"use client";

import { useState } from "react";
import Link from "next/link";

interface LoginFormErrors {
  username?: string;
  password?: string;
}

export default function EmployeeLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const validateForm = (): LoginFormErrors => {
    const newErrors: LoginFormErrors = {};

    if (!username) {
      newErrors.username = "Username harus diisi";
    } else if (username.length < 4) {
      newErrors.username = "Username harus minimal 4 karakter";
    }

    if (!password) {
      newErrors.password = "Password harus diisi";
    } else if (password.length < 6) {
      newErrors.password = "Password harus minimal 6 karakter";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8880/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      setMessage({
        type: "success",
        text: `Login berhasil! Selamat datang, ${username}...`,
      });

      // Simpan token jika ada
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Simpan data user
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        window.location.href = "/employee/dashboard";
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat login. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      {/* Username Input */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors({ ...errors, username: undefined });
          }}
          placeholder="Contoh: john.doe"
          disabled={isLoading}
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
        />
        {errors.username && (
          <div className="invalid-feedback d-block">{errors.username}</div>
        )}
      </div>

      {/* Password Input */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="password" className="form-label mb-0">
            Password
          </label>
          <Link
            href="/employee/forgot-password"
            className="text-decoration-none text-primary small"
          >
            Lupa password?
          </Link>
        </div>
        <div className="input-group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: undefined });
            }}
            placeholder="Masukkan password Anda"
            disabled={isLoading}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="btn btn-outline-secondary"
          >
            {showPassword ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </button>
        </div>
        {errors.password && (
          <div className="invalid-feedback d-block">{errors.password}</div>
        )}
      </div>

      {/* Remember Me */}
      <div className="form-check mb-3">
        <input
          id="remember"
          type="checkbox"
          defaultChecked
          disabled={isLoading}
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor="remember">
          Ingat saya
        </label>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`alert alert-${
            message.type === "success" ? "success" : "danger"
          } alert-dismissible fade show`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-100 mb-3"
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Sedang login...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
