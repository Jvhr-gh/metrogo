// pages/pay.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Pay() {
  const router = useRouter();
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(true);

  // خواندن توکن از localStorage (همان کلید قبلی)
  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("metrogo-token");
  };

  // گرفتن موجودی از سرور
  useEffect(() => {
    const fetchBalance = async () => {
      setLoadingBalance(true);
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/wallet/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // اگر پاسخ JSON نداشت، خطا می‌افتد
        const data = await res.json();

        if (!res.ok) {
          // اگر 401 یا هر ارور دیگه بود به لاگین می‌فرستیم یا پیام می‌دهیم
          console.error("Balance error:", data);
          if (res.status === 401) router.push("/login");
          else alert(data.message || "خطا در دریافت موجودی");
          return;
        }

        setBalance(Number(data.balance || 0));
      } catch (err) {
        console.error("Fetch balance failed:", err);
        alert("خطا در ارتباط با سرور. دوباره تلاش کنید.");
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // انجام پرداخت
  const handlePay = async () => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const amt = Number(amount);
    if (!amt || amt <= 0) {
      return alert("مبلغ معتبر وارد کنید.");
    }

    if (balance !== null && amt > balance) {
      return alert("موجودی کافی نیست.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/wallet/subtract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: amt }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Payment error:", data);
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data.message || "پرداخت ناموفق");
      }

      // به‌روز کردن موجودی از پاسخ
      setBalance(Number(data.balance || 0));
      alert("✅ پرداخت با موفقیت انجام شد!");
      // برگشت به صفحه کارت/کیف پول
      router.push("/card");
    } catch (err) {
      console.error("HANDLE PAY ERROR:", err);
      alert(err.message || "خطا در پرداخت، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingBalance) return <p className="p-6">در حال بارگذاری موجودی...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center border-t-8 border-blue-500">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">💳 پرداخت بلیط مترو</h1>

        <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-inner">
          <p className="text-gray-700 text-lg font-medium mb-1">موجودی کیف پول شما:</p>
          <span className="text-2xl font-bold text-green-600">
            {balance !== null ? balance.toLocaleString() : "0"} تومان
          </span>
        </div>

        <div className="flex flex-col gap-3 mb-6 text-right">
          <label className="font-semibold text-gray-800 text-lg">مبلغ بلیط (تومان):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-blue-400 px-4 py-3 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
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
          onClick={() => router.push("/card")}
          className="w-full bg-gray-600 text-white py-2 rounded-lg text-base hover:bg-gray-700 transition"
        >
          ⬅️ بازگشت به کارت
        </button>
      </div>
    </div>
  );
}
