import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Wallet() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [topUp, setTopUp] = useState("");
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("metrogo-token")
      : null;

  // گرفتن موجودی و تاریخچه
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // گرفتن موجودی
        const resBalance = await fetch("/pages/api/wallet/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataBalance = await resBalance.json();
        setBalance(dataBalance.balance);

        // تاریخچه تراکنش‌ها
        const resHistory = await fetch("/pages/api/wallet/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataHistory = await resHistory.json();
        setTransactions(dataHistory.transactions.reverse());
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchData();
  }, [router, token]);

  // شارژ کیف پول
  const handleTopUp = async () => {
    const amount = parseInt(topUp);
    if (!amount || amount <= 0) return alert("مقدار معتبر وارد کنید.");

    setLoading(true);

    try {
      const res = await fetch("/pages/api/wallet/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setBalance(data.balance);

      // آپدیت تاریخچه
      const resHistory = await fetch("/pages/api/wallet/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataHistory = await resHistory.json();
      setTransactions(dataHistory.transactions.reverse());

      setTopUp("");
      alert("💰 کیف پول با موفقیت شارژ شد!");
    } catch (err) {
      console.error(err);
      alert("خطای سرور، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center border-t-8 border-blue-500">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">MetroGo کیف پول</h1>

        <h2 className="text-xl text-gray-800 mb-6">
          موجودی فعلی:{" "}
          <span className="text-green-600 font-bold">
            {balance.toLocaleString()} تومان
          </span>
        </h2>

        <div className="flex mb-6 gap-2 justify-center">
          <input
            type="number"
            value={topUp}
            onChange={(e) => setTopUp(e.target.value)}
            className="border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            placeholder="مقدار شارژ (تومان)"
            disabled={loading}
          />
          <button
            onClick={handleTopUp}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "در حال شارژ..." : "شارژ"}
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-2">تراکنش‌ها</h3>

        <div className="max-h-64 overflow-y-auto bg-blue-50 p-3 rounded-lg mb-4">
          {transactions.length === 0 ? (
            <p className="text-gray-500">هیچ تراکنشی وجود ندارد</p>
          ) : (
            transactions.map((t, index) => (
              <p
                key={index}
                className="text-gray-700 border-b border-gray-200 py-1 text-right"
              >
                {t.type === "deposit"
                  ? `💰 شارژ: ${t.amount.toLocaleString()} تومان`
                  : `🚇 پرداخت: ${t.amount.toLocaleString()} تومان`}
              </p>
            ))
          )}
        </div>

        <button
          onClick={() => router.push("/pay")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
        >
          🚇 پرداخت بلیط مترو
        </button>
      </div>
    </div>
  );
}
