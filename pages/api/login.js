import connectDB from "../../utils/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ msg: "Only POST allowed" });

  await connectDB();

  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    msg: "Login successful",
    token,
    username: user.username,
    wallet: user.wallet
  });
}
