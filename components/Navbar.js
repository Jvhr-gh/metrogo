// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-purple-600">MetroGo</h1>
      </Link>
      <div className="space-x-4">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            داشبورد
          </button>
        </Link>
        <Link href="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            ورود
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            ثبت‌نام
          </button>
        </Link>
      </div>
    </nav>
  );
}
