// /pages/api/walletCard.js

export default function handler(req, res) {
  // اینجا می‌تونی بعداً چک واقعی کارت بزاری
  // فعلاً فرض می‌کنیم کارت وصل شده است
  const cardConnected = true;

  res.status(200).json({
    connected: cardConnected,
    message: cardConnected
      ? "کارت با موفقیت وصل است."
      : "کارت هنوز متصل نشده است."
  });
}
