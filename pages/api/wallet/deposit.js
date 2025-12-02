import connectDB from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ msg: "POST only" });

  await connectDB();

  const userId = auth(req, res);
  if (!userId) return;

  const { amount } = req.body;

  const user = await User.findById(userId);
  user.wallet += amount;

  user.transactions.push({ amount, type: "deposit" });

  await user.save();

  res.json({ wallet: user.wallet });
}
