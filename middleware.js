import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
  const res = NextResponse.next();

  // ساخت کلاینت Supabase برای Middleware
  const supabase = createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        /**
         * کوکی‌های فعلی را می‌خواند
         */
        getAll() {
          return req.cookies.getAll();
        },

        /**
         * کوکی‌های جدید را برای پاسخ تنظیم می‌کند
         */
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  // مثال: بررسی کاربر لاگین شده (اختیاری)
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // اگر کاربر لاگین نبود و مسیر محافظت‌شده بود → ریدایرکت
  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = new URL("/login", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/payments/:path*"
  ]
};
