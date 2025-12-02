// components/Navbar.js
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* لوگو */}
        <h1 className="text-3xl font-bold cursor-pointer">MetroGo</h1>

        {/* منو دسکتاپ */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link href="/" className="hover:text-gray-200">صفحه اصلی</Link>
          <Link href="/signup" className="hover:text-gray-200">ثبت‌نام</Link>
          <Link href="/login" className="hover:text-gray-200">ورود</Link>
          <Link href="/wallet" className="hover:text-gray-200">کیف پول</Link>
        </div>

        {/* دکمه منوی موبایل */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* منوی موبایل */}
      {open && (
        <div className="md:hidden bg-blue-600 px-6 py-4 flex flex-col space-y-4 text-lg">
          <Link href="/" className="hover:text-gray-200">صفحه اصلی</Link>
          <Link href="/signup" className="hover:text-gray-200">ثبت‌نام</Link>
          <Link href="/login" className="hover:text-gray-200">ورود</Link>
          <Link href="/wallet" className="hover:text-gray-200">کیف پول</Link>
        </div>
      )}
    </nav>
  );
}
