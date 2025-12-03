import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CardPage() {
  const router = useRouter();

  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [token, setToken] = useState(null);

  const [balance, setBalance] = useState(0); // 👈 موجودی صفر
  const [transactions, setTransactions] = useState([]);
  const [topUp, setTopUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("metrogo-token");
      setToken(t);
      setTokenLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!tokenLoaded) return;

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const resBalance = await fetch("/api/wallet/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const dataBalance = await resBalance.json();
        if (resBalance.ok) setBalance(dataBalance.balance || 0);

        const resHistory = await fetch("/api/wallet/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const dataHistory = await resHistory.json();
        setTransactions((dataHistory?.transactions || []).reverse());

        setLoadingPage(false);
      } catch (err) {
        router.push("/login");
      }
    };

    fetchData();
  }, [tokenLoaded, token]);

  const handleTopUp = async () => {
    const amount = parseInt(topUp);
    if (!amount || amount <= 1000)
      return alert("لطفاً یک مبلغ معتبر بالاتر از ۱۰۰۰ تومان وارد کنید.");

    setLoading(true);

    try {
      const res = await fetch("/api/wallet/deposit", {
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

      const resHistory = await fetch("/api/wallet/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dataHistory = await resHistory.json();
      setTransactions(dataHistory.transactions.reverse());

      setTopUp("");
      alert("شارژ کیف پول با موفقیت انجام شد.");
    } catch (err) {
      alert("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage)
    return (
      <p style={{ padding: 20, textAlign: "center", fontSize: "18px" }}>
        در حال بارگذاری...
      </p>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#d7e8ff,#bcd7ff,#a8c9ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "60px",
        fontFamily: "IRANSans, sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#ffffff",
          borderRadius: "22px",
          padding: "30px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "22px",
            color: "#0c3c88",
            fontWeight: "bold",
          }}
        >
          💳 کیف پول مترو
        </h2>

        {/* کارت موجودی */}
        <div
          style={{
            background: "rgba(245,250,255,0.95)",
            borderRadius: "14px",
            padding: "18px",
            marginBottom: "25px",
            border: "1px solid rgba(180,200,230,0.3)",
            textAlign: "center",
          }}
        >
          <div style={{ opacity: 0.65, fontSize: "14px" }}>
            موجودی فعلی کیف پول:
          </div>

          <div
            style={{
              color: balance > 0 ? "#15803d" : "#b91c1c",
              fontWeight: "bold",
              marginTop: "6px",
              fontSize: "26px",
            }}
          >
            {balance.toLocaleString()} تومان
          </div>
        </div>

        {/* دکمه خرید بلیط */}
        <button
          onClick={() => router.push("/pay")}
          style={{
            width: "100%",
            padding: "14px",
            background: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "25px",
          }}
        >
          🎫 خرید بلیط مترو
        </button>

        {/* بخش شارژ */}
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "15px",
            color: "#0c3c88",
          }}
        >
          مبلغ شارژ (تومان)
        </label>

        <input
          type="number"
          placeholder="مثلاً 20000"
          value={topUp}
          onChange={(e) => setTopUp(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #a5c7ff",
            borderRadius: "10px",
            marginBottom: "15px",
            fontSize: "15px",
            background: "#f8faff",
          }}
        />

        <button
          onClick={handleTopUp}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#9ca3af" : "#0c3c88",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "30px",
          }}
        >
          {loading ? "در حال پردازش..." : "افزایش موجودی"}
        </button>

        {/* تاریخچه */}
        <h3
          style={{
            marginBottom: "10px",
            color: "#0c3c88",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          تاریخچه تراکنش‌ها
        </h3>

        {transactions.length === 0 && (
          <p style={{ opacity: 0.6 }}>هنوز هیچ تراکنشی ثبت نشده است.</p>
        )}

        {transactions.map((t, i) => (
          <div
            key={i}
            style={{
              background: "#f0f6ff",
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "10px",
              border: "1px solid #d9e6ff",
            }}
          >
            <div style={{ fontWeight: "bold", color: "#0d47a1" }}>
              {t.type === "deposit" ? "➕ شارژ" : "➖ خرید بلیط"}
            </div>
            <div style={{ fontSize: "14px", marginTop: "4px" }}>
              مبلغ: {t.amount.toLocaleString()} تومان
            </div>
            <div style={{ fontSize: "12px", opacity: 0.6 }}>{t.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
