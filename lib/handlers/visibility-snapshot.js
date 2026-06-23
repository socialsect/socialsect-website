import { logSubmission } from '../log-submission.js';
import { sendVisibilitySnapshotEmail, notifyVisibilitySnapshotRequest } from '../email.js';
import { createHttpError } from '../http-error.js';

export async function handleVisibilitySnapshot(req, res) {
  const { website, email, source, campaign, niche, timestamp } = req.body;

  // Validation
  if (!website || !email) {
    throw createHttpError(400, 'Website and email are required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createHttpError(400, 'Invalid email format');
  }

  // Validate URL format
  try {
    new URL(website.startsWith('http') ? website : `https://${website}`);
  } catch {
    throw createHttpError(400, 'Invalid website URL');
  }

  const submissionData = {
    type: 'visibility_snapshot',
    website,
    email,
    source: source || 'direct',
    campaign: campaign || 'organic',
    niche: niche || 'implant-dentistry',
    timestamp: timestamp || new Date().toISOString(),
  };

  try {
    // Log submission to database
    await logSubmission(submissionData);

    // Send confirmation email to practice
    await sendVisibilitySnapshotEmail(email, website);

    // Send notification to internal team
    try {
      await notifyVisibilitySnapshotRequest({
        email,
        website,
        source: source || 'direct',
        campaign: campaign || 'organic',
      });
    } catch (notifyError) {
      console.warn('Failed to send internal notification:', notifyError);
      // Don't fail the request if internal notification fails
    }

    // Simulate snapshot generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return res.status(200).json({
      success: true,
      message: 'Visibility snapshot requested successfully',
      data: {
        email,
        website,
        status: 'processing',
      },
    });
  } catch (error) {
    console.error('Error processing visibility snapshot:', error);
    throw createHttpError(500, 'Failed to process visibility snapshot');
  }
}
