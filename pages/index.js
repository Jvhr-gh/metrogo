// pages/index.js
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white">
      <Navbar />
      <header className="text-center mt-12">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">MetroGo</h1>
        <p className="text-xl drop-shadow-md">
          ! MetroGo دیگر نیازی به کارت مترو نیست. پرداخت بلیط با گوشی، سریع و
          راحت با
        </p>
      </header>

      <main className="text-center p-8 bg-white rounded-xl shadow-xl text-gray-800 max-w-md mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          {" "}
          MetroGo مزایای{" "}
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-left">
          <li>پرداخت سریع و امن با گوشی</li>
          <li>حذف کارت‌های فیزیکی مترو</li>
          <li>کیف پول شخصی و شارژ آسان</li>
          <li>لیست تراکنش‌ها و مدیریت هزینه‌ها</li>
        </ul>
        <div className="flex justify-center gap-4">
          <Link href="/signup">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
              ثبت‌نام
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
              ورود
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
