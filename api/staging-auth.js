export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body || {};
    const expected = process.env.STAGING_KEY;

    if (!expected) {
      return res.status(500).json({ error: 'STAGING_KEY is not configured' });
    }

    if (typeof password !== 'string' || password.length === 0) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const ok = password === expected;
    if (!ok) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


