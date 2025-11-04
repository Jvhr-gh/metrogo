// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* 📸 بک‌گراند با تیرگی و محو شدن */}
      <div
        style={{
          backgroundImage: "url('/metro-bg-optimized.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%) blur(2px)",
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      ></div>

      {/* 🟦 محتوای صفحه */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 30, 60, 0.7)",
            padding: "40px",
            borderRadius: "20px",
            maxWidth: "700px",
            boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "10px",
              color: "#4FC3F7",
              fontWeight: "bold",
            }}
          >
            MetroGo
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "25px", color: "#E3F2FD" }}>
            پرداخت سریع، آسان و بدون کارت — فقط با گوشی‌ات از مترو عبور کن!
          </p>

          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <Link href="/signup">
              <button
                style={{
                  backgroundColor: "#4FC3F7",
                  color: "white",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                ثبت‌نام
              </button>
            </Link>
            <Link href="/login">
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#4FC3F7",
                  border: "2px solid #4FC3F7",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                ورود
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ⚪ بخش مزایا پایین صفحه */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.97)",
          color: "#0D47A1",
          borderRadius: "20px 20px 0 0",
          padding: "40px 20px",
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <h2>مزایای استفاده از MetroGo</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          <li>🚆 پرداخت سریع و بدون تماس</li>
          <li>📱 مدیریت کیف پول دیجیتال</li>
          <li>💳 مشاهده تراکنش‌ها و موجودی</li>
          <li>🌍 حذف کارت‌های فیزیکی و کمک به محیط زیست</li>
        </ul>

        <h3 style={{ marginTop: "25px", color: "#0D47A1" }}>تماس با ما</h3>
        <p style={{ fontSize: "0.9rem" }}>info@metrogo.ir | 021-12345678</p>
      </div>
    </div>
  );
}
