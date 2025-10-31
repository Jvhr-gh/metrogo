import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    if (username && password) {
      localStorage.setItem(
        "metrogo_user",
        JSON.stringify({ username, balance: 50000, transactions: [] })
      );
      alert("ثبت‌نام موفق!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-500 to-pink-400">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          ثبت‌نام
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
          className="border  border-gray-300 px-4 py-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition mb-4 shadow-md"
        >
          ثبت‌نام
        </button>
        <p className="text-center text-gray-600">
          حساب داری؟{" "}
          <Link
            href="/login"
            className="text-purple-600 font-semibold underline"
          >
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}
