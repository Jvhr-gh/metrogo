import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "تمام فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    // اینجا باید دیتابیس وصل کنی
    // فعلاً فقط تست:
    console.log("User registered:", body);

    return NextResponse.json(
      { message: "ثبت‌نام با موفقیت انجام شد!" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "خطا در سرور", error: error.message },
      { status: 500 }
    );
  }
}