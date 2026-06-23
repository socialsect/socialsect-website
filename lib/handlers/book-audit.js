import { logSubmission } from '../log-submission.js';
import { sendAuditBookingEmail, notifyAuditBooking } from '../email.js';

export async function handleBookAudit(req, res) {
  const timestamp = new Date().toISOString();
  
  try {
    console.log(`[${timestamp}] ========== BOOK AUDIT HANDLER START ==========`);
    
    const { name, email, phone, practice, message } = req.body;
    
    console.log(`[${timestamp}] Audit booking: ${name} (${email}) - ${practice}`);

    // Validation
    if (!name || !email || !phone || !practice) {
      console.warn(`[${timestamp}] Missing required fields`);
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(`[${timestamp}] Invalid email: ${email}`);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    console.log(`[${timestamp}] ✓ Validation passed`);

    // Log submission
    try {
      const submissionData = {
        type: 'audit_booking',
        name,
        email,
        phone,
        practice,
        message: message || '',
        timestamp: new Date().toISOString(),
      };
      await logSubmission(submissionData);
      console.log(`[${timestamp}] ✓ Submission logged`);
    } catch (err) {
      console.warn(`[${timestamp}] ⚠️  Failed to log submission:`, err.message);
      // Don't throw - logging is non-critical
    }

    // Send confirmation email to visitor
    console.log(`[${timestamp}] Sending confirmation email to ${email}...`);
    try {
      await sendAuditBookingEmail(email, { name, practice });
      console.log(`[${timestamp}] ✓ Confirmation email sent`);
    } catch (err) {
      console.error(`[${timestamp}] ❌ Confirmation email failed:`, err.message);
      throw err;
    }

    // Send internal notification to team
    console.log(`[${timestamp}] Sending internal notification...`);
    try {
      await notifyAuditBooking({ name, email, phone, practice, message });
      console.log(`[${timestamp}] ✓ Internal notification sent`);
    } catch (err) {
      console.error(`[${timestamp}] ❌ Notification failed:`, err.message);
      throw err;
    }

    console.log(`[${timestamp}] ========== BOOK AUDIT HANDLER END (SUCCESS) ==========`);
    
    return res.status(200).json({
      success: true,
      message: 'Audit booking received successfully',
      data: {
        name,
        email,
        practice,
        status: 'booked',
      },
    });
  } catch (error) {
    console.error(`[${timestamp}] HANDLER ERROR:`, error);
    return res.status(500).json({ 
      error: 'Failed to book audit',
      message: error.message || 'Unknown error',
      timestamp
    });
  }
}
