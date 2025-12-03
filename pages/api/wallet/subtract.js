import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "روش درخواست نامعتبر است" });
  }

  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "توکن وجود ندارد" });
  }

  const token = auth.split(" ")[1];

  // گرفتن یوزر از توکن
  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData?.user) {
    return res.status(401).json({ message: "کاربر معتبر نیست" });
  }

  const userId = userData.user.id;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "مبلغ معتبر نیست" });
  }

  // موجودی فعلی
  const { data: wallet, error: walletError } = await supabase
    .from("wallets")
    .select("balance")
    .eq("user_id", userId)
    .single();

  if (walletError) {
    return res.status(500).json({ message: "خطا در گرفتن موجودی" });
  }

  if (wallet.balance < amount) {
    return res.status(400).json({ message: "موجودی کافی نیست" });
  }

  const newBalance = wallet.balance - amount;

  const { error: updateError } = await supabase
    .from("wallets")
    .update({ balance: newBalance })
    .eq("user_id", userId);

  if (updateError) {
    return res.status(500).json({ message: "خطا در کم کردن موجودی" });
  }

  return res.status(200).json({ balance: newBalance });
}
