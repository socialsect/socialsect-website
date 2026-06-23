import { handleVisibilitySnapshot } from '../lib/handlers/visibility-snapshot.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await handleVisibilitySnapshot(req, res);
    return result;
  } catch (error) {
    console.error('Visibility snapshot API error:', error);
    return res.status(500).json({ 
      error: 'Failed to process visibility snapshot',
      message: error.message 
    });
  }
}
