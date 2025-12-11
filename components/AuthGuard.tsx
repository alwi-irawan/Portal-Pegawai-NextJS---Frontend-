"use client";

import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // redirect to employee login
      window.location.href = "/employee/login";
      return;
    }
    setChecked(true);
  }, []);

  if (!checked) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
