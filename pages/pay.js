// pages/pay.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Pay() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(10000); // مبلغ پیش‌فرض بلیط

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("metrogo_user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handlePay = () => {
    if (!user) return;

    if (user.balance >= amount) {
      const updatedUser = {
        ...user,
        balance: user.balance - amount,
        transactions: [...user.transactions, `پرداخت بلیط مترو: ${amount} تومان`],
      };
      localStorage.setItem("metrogo_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("پرداخت با موفقیت انجام شد!");
    } else {
      alert("موجودی کافی نیست. لطفاً کیف پول خود را شارژ کنید.");
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <p className="text-xl text-gray-700">
          لطفاً ابتدا وارد شوید.{" "}
          <Link href="/login" className="text-blue-600 underline">
            ورود
          </Link>
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-400 p-8 text-gray-800">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-6 mt-6">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">پرداخت بلیط مترو</h1>
        <p className="mb-4">موجودی کیف پول: {user.balance.toLocaleString()} تومان</p>

        <div className="mb-6 flex gap-2 items-center">
          <label className="font-semibold">مبلغ بلیط:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handlePay}
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition shadow-md w-full mb-4"
        >
          پرداخت
        </button>

        <Link href="/dashboard">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-md w-full">
            بازگشت به داشبورد
          </button>
        </Link>
      </div>
    </div>
  );
}
