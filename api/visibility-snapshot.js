import { handleVisibilitySnapshot } from '../lib/handlers/visibility-snapshot.js';

export default async function handler(req, res) {
  console.log('API called with method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Request body:', JSON.stringify(req.body).substring(0, 100));
    const result = await handleVisibilitySnapshot(req, res);
    console.log('Handler completed');
    return result;
  } catch (error) {
    console.error('API handler caught error:', error);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      error: 'Server error',
      message: error.message || 'Unknown error',
      type: error.constructor.name
    });
  }
}
