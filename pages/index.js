// pages/index.js
// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* بک‌گراند (محور ثابت، تیره + بلور) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/metro-bg-optimized.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(40%) blur(2px)",
          zIndex: 0,
        }}
      />

      {/* محتوا */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* هِرو: حدود 60vh روی دسکتاپ، کمتر روی موبایل */}
        <section
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "820px",
              backgroundColor: "rgba(0,12,40,0.85)", // تیره‌تر برای خوانایی
              padding: "36px",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              textAlign: "center",
              color: "#E3F2FD",
            }}
          >
            <h1
              style={{
                fontSize: "2.6rem",
                margin: "0 0 8px",
                color: "#81D4FA",
              }}
            >
              MetroGo
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                margin: "0 0 22px",
                color: "#DFF3FF",
              }}
            >
              پرداخت سریع، آسان و بدون کارت — فقط با گوشی از گیت مترو عبور کن.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/signup">
                <button
                  style={{
                    backgroundColor: "#0288D1",
                    color: "white",
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  ثبت‌نام
                </button>
              </Link>

              <Link href="/login">
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#81D4FA",
                    border: "2px solid #81D4FA",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  ورود
                </button>
              </Link>
              <a
                href="https://forms.gle/9PyYeJUL9KQnL9oW6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: "#0288D1",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontsize:"1rem",
                    fontWeight:600,
                  }}
                >
                  نظرسنجی کاربران 📝
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* بخش مزایا (درست زیر هِرو، کارت سفید با فاصله مناسب) */}
        <section
          style={{
            backgroundColor: "#fff",
            color: "#0D47A1",
            borderRadius: "16px",
            padding: "36px 20px",
            margin: "20px auto",
            maxWidth: "1100px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              marginBottom: "20px",
            }}
          >
            MetroGoمزایای استفاده از
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <div
              style={{
                padding: "18px",
                borderRadius: "10px",
                border: "1px solid #E3F2FD",
              }}
            >
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>⚡</div>
              <h3 style={{ margin: "0 0 8px" }}>سرعت بالا</h3>
              <p style={{ margin: 0, color: "#555" }}>
                .ورود سریع به مترو بدون ایستادن در صف شارژ کارت
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "10px",
                border: "1px solid #E3F2FD",
              }}
            >
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>🔒</div>
              <h3 style={{ margin: "0 0 8px" }}>امنیت بالا</h3>
              <p style={{ margin: 0, color: "#555" }}>
                .پرداخت امن با کیف پول دیجیتال و رمزگذاری‌شده
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "10px",
                border: "1px solid #E3F2FD",
              }}
            >
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>💰</div>
              <h3 style={{ margin: "0 0 8px" }}>صرفه‌جویی</h3>
              <p style={{ margin: 0, color: "#555" }}>
                .شارژ آسان و کاهش هزینه‌های کارت فیزیکی
              </p>
            </div>
          </div>

          {/* تماس با ما */}
          <div
            style={{ textAlign: "center", marginTop: "26px", color: "#0D47A1" }}
          >
            <h3 style={{ marginBottom: "6px" }}>تماس با ما</h3>
            <p style={{ margin: 0, color: "#555" }}>
              info@metrogo.ir | 021-12345678
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
