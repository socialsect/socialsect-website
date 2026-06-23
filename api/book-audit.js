import { handleBookAudit } from '../lib/handlers/book-audit.js';

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Book Audit API called - Method: ${req.method}`);
  
  if (req.method !== 'POST') {
    console.log(`[${timestamp}] Invalid method: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, practice } = req.body;
    console.log(`[${timestamp}] Processing audit booking - Name: ${name}, Email: ${email}, Practice: ${practice}`);
    
    const result = await handleBookAudit(req, res);
    console.log(`[${timestamp}] Handler completed successfully`);
    return result;
  } catch (error) {
    console.error(`[${timestamp}] FATAL API ERROR:`, error);
    console.error(`[${timestamp}] Error type: ${error.constructor.name}`);
    console.error(`[${timestamp}] Error message: ${error.message}`);
    
    return res.status(500).json({ 
      error: 'Server error',
      message: error.message || 'Unknown error',
      timestamp
    });
  }
}
