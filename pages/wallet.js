import { useState } from "react";
import Link from "next/link";

export default function Wallet() {
  const [balance, setBalance] = useState(50000); // موجودی شبیه‌سازی شده
  const [topUp, setTopUp] = useState("");

  const handleTopUp = () => {
    const amount = parseInt(topUp);
    if (!isNaN(amount)) {
      setBalance(balance + amount);
      setTopUp("");
      alert("کیف پول شارژ شد!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">کیف پول شما</h1>
      <p className="text-gray-700 mb-6">
        موجودی: {balance.toLocaleString()} تومان
      </p>
      <div className="flex mb-4">
        <input
          type="number"
          value={topUp}
          onChange={(e) => setTopUp(e.target.value)}
          className="border px-3 py-2 rounded-l"
          placeholder="مقدار شارژ"
        />
        <button
          onClick={handleTopUp}
          className="bg-green-600 text-white px-4 rounded-r hover:bg-green-700"
        >
          شارژ
        </button>
      </div>
      <Link href="/">
        <button className="mt-4 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
          بازگشت به صفحه اصلی
        </button>
      </Link>
    </div>
  );
}
