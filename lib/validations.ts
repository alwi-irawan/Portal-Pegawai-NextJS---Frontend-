// Validation functions for form inputs

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "Password harus minimal 6 karakter";
  }
  return null;
};

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export const validateLoginForm = (
  email: string,
  password: string
): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!email) {
    errors.email = "Email harus diisi";
  } else if (!validateEmail(email)) {
    errors.email = "Format email tidak valid";
  }

  if (!password) {
    errors.password = "Password harus diisi";
  } else {
    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }
  }

  return errors;
};
