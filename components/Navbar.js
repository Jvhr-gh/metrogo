// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-lg py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">MetroGo</h1>
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-200">صفحه اصلی</Link>
        <Link href="/signup" className="hover:text-gray-200">ثبت‌نام</Link>
        <Link href="/login" className="hover:text-gray-200">ورود</Link>
        <Link href="/dashboard" className="hover:text-gray-200">کیف پول</Link>
      </div>
    </nav>
  );
}
