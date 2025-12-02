import jwt from "jsonwebtoken";

export default function auth(req, res) {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return res.status(403).json({ msg: "Invalid token" });
  }
}
