import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 اضافه شد

export default function Signup() {
  const router = useRouter(); // 👈 تعریف router
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    balance: 50000, // 👈 اضافه برای کیف پول
    transactions: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("metrogo-user", JSON.stringify(formData));
    alert("ثبت‌نام با موفقیت انجام شد!");
    router.push("/wallet"); // 👈 بعد از ثبت‌نام، برو به کیف پول
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#0D47A1", marginBottom: "20px" }}>ثبت‌نام MetroGo</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="نام و نام خانوادگی"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="ایمیل"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="رمز عبور"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            ثبت‌نام
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#1565C0" }}>
          قبلاً ثبت‌نام کرده‌ای؟{" "}
          <Link href="/login" style={{ color: "#0D47A1", fontWeight: "bold" }}>
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  border: "1px solid #90CAF9",
  borderRadius: "8px",
  fontSize: "1rem",
  outline: "none",
  textAlign: "right",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  backgroundColor: "#1976D2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
};
