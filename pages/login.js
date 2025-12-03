import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabase";
export const config = {
  unstable_runtimeJS: true,
};


export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const session = data.session;

    if (!session) {
      alert("سشن ساخته نشد!");
      setLoading(false);
      return;
    }

    // ذخیره کل سشن
    localStorage.setItem("metrogo-token", session.access_token);
    localStorage.setItem("metrogo-refresh", session.refresh_token);

    alert("ورود موفق!");

    router.push("/card");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-500">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          MetroGo
        </h1>
        <h2 className="text-center text-gray-700 mb-4">ورود به حساب کاربری</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="ایمیل"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="رمز عبور"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          حساب ندارید؟{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
