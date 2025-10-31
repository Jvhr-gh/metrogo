// pages/login.js
// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("metrogo_user"));
    if (
      savedUser &&
      savedUser.username === username &&
      savedUser.password === password
    ) {
      alert("ورود موفق!");
      router.push("/dashboard");
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-400">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
            ورود
          </h1>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border  border-gray-300 px-4 py-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mb-4 shadow-md"
          >
            ورود
          </button>
          <p className="text-center text-gray-600">
            حساب نداری؟{" "}
            <Link
              href="/signup"
              className="text-purple-600 font-semibold underline"
            >
              ثبت‌نام
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
