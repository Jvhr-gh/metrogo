import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "روش درخواست نامعتبر است" });

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "توکن یافت نشد" });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData?.user)
    return res.status(401).json({ message: "کاربر معتبر نیست" });

  const userId = userData.user.id;
  const { amount } = req.body;

  if (!amount || amount <= 0)
    return res.status(400).json({ message: "مبلغ معتبر نیست" });

  const { data: walletData, error: walletError } = await supabase
    .from("wallets")
    .select("balance")
    .eq("user_id", userId)
    .single();

  const newBalance = (walletData?.balance || 0) + amount;

  const { error: updateError } = await supabase
    .from("wallets")
    .update({ balance: newBalance })
    .eq("user_id", userId);

  if (updateError) return res.status(500).json({ message: "خطا در افزایش موجودی" });

  res.status(200).json({ balance: newBalance });
}