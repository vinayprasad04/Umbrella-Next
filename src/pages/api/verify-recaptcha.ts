import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'reCAPTCHA token is required' });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not defined in environment variables');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // Verify the token with Google reCAPTCHA API
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const verifyResponse = await fetch(verifyUrl, {
      method: 'POST',
    });

    const verifyData = await verifyResponse.json();

    // reCAPTCHA v3 returns a score from 0.0 to 1.0
    // 0.0 is very likely a bot, 1.0 is very likely a human
    // We'll use 0.5 as the threshold
    if (verifyData.success && verifyData.score >= 0.5) {
      return res.status(200).json({
        success: true,
        score: verifyData.score,
        message: 'reCAPTCHA verification successful'
      });
    } else {
      return res.status(400).json({
        success: false,
        score: verifyData.score,
        message: 'reCAPTCHA verification failed. Please try again.'
      });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify reCAPTCHA'
    });
  }
}
