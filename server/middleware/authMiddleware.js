import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  console.log(req.headers);
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded User:", decoded);
    next();
  } catch (error) {
    return res.status(401).json({
      success:false,
      message: "Invalid or expired token"
    });
  }
};