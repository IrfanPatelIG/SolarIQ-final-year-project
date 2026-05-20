const hasValue = (value) =>
  value !== undefined &&
  value !== null &&
  String(value).trim() !== "";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Register
export const validateRegisterRequest = ({
  name,
  email,
  password,
}) => {
  if (
    !hasValue(name) ||
    !hasValue(email) ||
    !hasValue(password)
  ) {
    return "All fields are required";
  }

  if (!isValidEmail(email)) {
    return "Invalid email format";
  }

  return null;
};

// Login
export const validateLoginRequest = ({
  email,
  password,
}) => {
  if (
    !hasValue(email) ||
    !hasValue(password)
  ) {
    return "Email and password required";
  }

  if (!isValidEmail(email)) {
    return "Invalid email format";
  }

  return null;
};

// Refresh Token / Logout
export const validateRefreshTokenRequest = ({
  refreshToken,
}) => {
  if (!hasValue(refreshToken)) {
    return "Refresh token required";
  }

  return null;
};

// Current User
export const validateCurrentUserRequest = ({
  userId,
}) => {
  if (!userId) {
    return "User not authenticated";
  }

  return null;
};