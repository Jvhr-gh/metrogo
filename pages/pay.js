// pages/pay.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Pay() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(10000);
  const [loading, setLoading] = useState(false);

  // چک JWT و گرفتن موجودی واقعی
  useEffect(() => {
    const token = localStorage.getItem("metrogo-token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchBalance = async () => {
      try {
        const res = await fetch("/pages/api/wallet/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "خطا در دریافت موجودی");
        setBalance(data.balance);
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchBalance();
  }, [router]);

  const handlePay = async () => {
    if (amount <= 0) return alert("مبلغ باید بیشتر از صفر باشد.");
    setLoading(true);
    const token = localStorage.getItem("metrogo-token");

    try {
      const res = await fetch("/pages/api/wallet/subtract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "پرداخت موفقیت‌آمیز نبود");
      } else {
        setBalance(data.balance);
        alert("✅ پرداخت با موفقیت انجام شد!");
      }
    } catch (err) {
      console.error(err);
      alert("خطای سرور، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center border-t-8 border-blue-500">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          💳 پرداخت بلیط مترو
        </h1>

        <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-inner">
          <p className="text-gray-700 text-lg font-medium mb-1">
            :موجودی کیف پول شما
          </p>
          <span className="text-2xl font-bold text-green-600">
            {balance.toLocaleString()} تومان
          </span>
        </div>

        <div className="flex flex-col gap-3 mb-6 text-right">
          <label className="font-semibold text-gray-800 text-lg">
            :مبلغ بلیط (تومان)
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
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition mb-4 disabled:opacity-50"
        >
          {loading ? "در حال پرداخت..." : "🚇 پرداخت"}
        </button>

        <button
          onClick={() => router.push("/wallet")}
          className="w-full bg-gray-600 text-white py-2 rounded-lg text-base hover:bg-gray-700 transition"
        >
          ⬅️ بازگشت به کیف پول
        </button>
      </div>
    </div>
  );
}
