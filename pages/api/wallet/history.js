import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const token = req.headers.authorization?.replace("Bearer ", "")
  if (!token) return res.status(401).json({ message: "NO TOKEN" })

  const { data: user, error: userErr } = await supabase.auth.getUser(token)

  if (userErr || !user?.user) {
    return res.status(401).json({ message: "INVALID TOKEN" })
  }

  return res.status(200).json({
    transactions: [
      { id: 1, type: "deposit", amount: 50000 },
      { id: 2, type: "ticket", amount: -15000 }
    ]
  })
}
