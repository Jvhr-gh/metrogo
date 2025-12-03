export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "لطفاً همه فیلدها را وارد کنید" });
  }

  // اینجا میتونی دیتابیس بزاری. فعلاً:
  return res.status(200).json({ message: "ثبت‌نام موفق" });
}