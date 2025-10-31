// pages/dashboard.js
// pages/dashboard.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [topUp, setTopUp] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("metrogo_user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleTopUp = () => {
    const amount = parseInt(topUp);
    if (!isNaN(amount)) {
      const updatedUser = {
        ...user,
        balance: user.balance + amount,
        transactions: [...user.transactions, `شارژ کیف پول: ${amount} تومان`],
      };
      localStorage.setItem("metrogo_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setTopUp("");
      alert("کیف پول شارژ شد!");
    }
  };

  if (!user)
    return (
      <p className="p-8 text-center text-gray-700">
        لطفاً ابتدا وارد شوید.{" "}
        <Link href="/login" className="text-blue-600 underline">
          ورود
        </Link>
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-400 p-8 text-gray-800">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-6 mt-6">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">
          سلام، {user.username}
        </h1>

        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-inner">
          <p className="text-lg font-semibold mb-2">موجودی کیف پول:</p>
          <p className="text-2xl font-bold text-green-600">
            {user.balance.toLocaleString()} تومان
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          <input
            type="number"
            value={topUp}
            onChange={(e) => setTopUp(e.target.value)}
            placeholder="مقدار شارژ"
            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleTopUp}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition shadow-md"
          >
            شارژ کیف پول
          </button>
        </div>

        <h2 className="text-xl font-bold mb-2 text-purple-700">
          لیست تراکنش‌ها
        </h2>
        <ul className="list-disc list-inside max-h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
          {user.transactions.length === 0 && (
            <li className="text-gray-500">تراکنشی وجود ندارد</li>
          )}
          {user.transactions.map((t, i) => (
            <li key={i} className="mb-1">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between">
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-md">
              بازگشت به صفحه اصلی
            </button>
          </Link>
          <Link href="/pay">
            <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition shadow-md">
              پرداخت بلیط
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
