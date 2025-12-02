import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  try {
    const secret = "MY_SUPER_SECRET_KEY";
    const decoded = jwt.verify(token, secret);

    const filePath = path.join(process.cwd(), "database.json");
    const db = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const user = db.users.find((u) => u.username === decoded.username);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ balance: user.balance });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
