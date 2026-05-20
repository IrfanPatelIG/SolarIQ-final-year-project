import jwt from "jsonwebtoken";

// 🔹 Access Token (short-lived)
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN, // e.g. 15m
    }
  );
};

// 🔹 Refresh Token (long-lived)
export const generateRefreshToken = (user) => {
  console.log("Refresh Expiry:", process.env.JWT_REFRESH_EXPIRES_IN);
  console.log("Access Expiry:", process.env.JWT_EXPIRES_IN);
  return jwt.sign(
    {
      user_id: user.user_id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN, // e.g. 7d
    }
  );
};