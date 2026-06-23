import { handleBookAudit } from '../lib/handlers/book-audit.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    return await handleBookAudit(req, res);
  } catch (error) {
    console.error('Book audit API error:', error);
    return res.status(500).json({ 
      error: 'Failed to process audit booking',
      message: error.message
    });
  }
}
