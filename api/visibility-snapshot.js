import { handleVisibilitySnapshot } from '../lib/handlers/visibility-snapshot.js';

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Visibility API called - Method: ${req.method}`);
  
  if (req.method !== 'POST') {
    console.log(`[${timestamp}] Invalid method: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { website, email } = req.body;
    console.log(`[${timestamp}] Processing snapshot request - Website: ${website}, Email: ${email}`);
    
    const result = await handleVisibilitySnapshot(req, res);
    console.log(`[${timestamp}] Handler completed successfully`);
    return result;
  } catch (error) {
    console.error(`[${timestamp}] FATAL API ERROR:`, error);
    console.error(`[${timestamp}] Error type: ${error.constructor.name}`);
    console.error(`[${timestamp}] Error message: ${error.message}`);
    console.error(`[${timestamp}] Stack:`, error.stack);
    
    return res.status(500).json({ 
      error: 'Server error',
      message: error.message || 'Unknown error',
      timestamp
    });
  }
}
