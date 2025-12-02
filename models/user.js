import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: { type: Number, default: 0 },
  transactions: [
    {
      amount: Number,
      type: String, // deposit - withdraw
      date: { type: Date, default: Date.now },
    }
  ]
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
