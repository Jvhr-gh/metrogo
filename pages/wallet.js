import { useState, useEffect } from "react";
import Link from "next/link";

export default function Wallet() {
  const [user, setUser] = useState(null);
  const [topUp, setTopUp] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("metrogo-user"));
    if (savedUser) {
      if (!savedUser.balance) savedUser.balance = 0;
      if (!savedUser.transactions) savedUser.transactions = [];
      setUser(savedUser);
    }
  }, []);

  const handleTopUp = () => {
    const amount = parseInt(topUp);
    if (!isNaN(amount) && user) {
      const updatedUser = {
        ...user,
        balance: user.balance + amount,
        transactions: [
          ...user.transactions,
          `شارژ کیف پول: ${amount.toLocaleString()} تومان`,
        ],
      };
      localStorage.setItem("metrogo-user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setTopUp("");
      alert("💰 کیف پول با موفقیت شارژ شد!");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center border-t-8 border-blue-500">
        <h1 className="text-3xl font-bold text-blue-700 mb-4"> MetroGoکیف پول </h1>
        <h2 className="text-xl text-gray-800 mb-6">
          موجودی فعلی:{" "}
          <span className="text-green-600 font-bold">
            {user.balance.toLocaleString()} تومان
          </span>
        </h2>

        <div className="flex mb-6 gap-2 justify-center">
          <input
            type="number"
            value={topUp}
            onChange={(e) => setTopUp(e.target.value)}
            className="border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="مقدار شارژ (تومان)"
          />
          <button
            onClick={handleTopUp}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            شارژ
          </button>
        </div>

        <Link href="/pay">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full">
            🚇 پرداخت بلیط مترو
          </button>
        </Link>
      </div>
    </div>
  );
}
