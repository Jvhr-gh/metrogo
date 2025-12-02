import connectDB from "../../utils/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ msg: "Only POST allowed" });

  await connectDB();

  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed,
  });

  res.status(201).json({ msg: "Signup successful" });
}
