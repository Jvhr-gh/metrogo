import connectDB from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ msg: "GET only" });

  await connectDB();

  const userId = auth(req, res);
  if (!userId) return;

  const user = await User.findById(userId);

  res.json(user.transactions);
}
