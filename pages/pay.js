// pages/pay.js
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Pay() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(10000);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("metrogo-user"));
    if (savedUser) {
      if (!savedUser.balance) savedUser.balance = 0;
      if (!savedUser.transactions) savedUser.transactions = [];
      setUser(savedUser);
    }
  }, []);

  const handlePay = () => {
    if (!user) return;

    if (user.balance >= amount) {
      const updatedUser = {
        ...user,
        balance: user.balance - amount,
        transactions: [
          ...user.transactions,
          `پرداخت بلیط مترو: ${amount.toLocaleString()} تومان`,
        ],
      };
      localStorage.setItem("metrogo-user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("✅ پرداخت با موفقیت انجام شد!");
    } else {
      alert("⚠️ موجودی کافی نیست. لطفاً کیف پول را شارژ کنید.");
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <p className="text-xl text-gray-700">
          لطفاً ابتدا وارد شوید.{" "}
          <Link href="/login" className="text-blue-600 underline font-semibold">
            ورود
          </Link>
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center border-t-8 border-blue-500">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          💳 پرداخت بلیط مترو
        </h1>

        <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-inner">
          <p className="text-gray-700 text-lg font-medium mb-1">
            موجودی کیف پول شما:
          </p>
          <span className="text-2xl font-bold text-green-600">
            {user.balance.toLocaleString()} تومان
          </span>
        </div>

        <div className="flex flex-col gap-3 mb-6 text-right">
          <label className="font-semibold text-gray-800 text-lg">
            مبلغ بلیط (تومان):
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="border border-blue-400 px-4 py-3 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handlePay}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition mb-4"
        >
          🚇 پرداخت
        </button>

        <Link href="/wallet">
          <button className="w-full bg-gray-600 text-white py-2 rounded-lg text-base hover:bg-gray-700 transition">
            ⬅️ بازگشت به کیف پول
          </button>
        </Link>
      </div>
    </div>
  );
}
