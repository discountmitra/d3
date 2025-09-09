// Backend API for Twilio integration
// Deploy this to Vercel, Netlify, or any Node.js hosting service

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// Validate required environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing required Supabase environment variables');
}

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
  throw new Error('Missing required Twilio environment variables');
}

// Initialize clients
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Generate 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  try {
    const { phoneNumber, isLogin = false } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // If this is a login attempt, check if user exists
    if (isLogin) {
      // console.log('Checking if user exists for phone:', phoneNumber);
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('phone_number')
        .eq('phone_number', phoneNumber)
        .single();

      // console.log('User query result:', { user, userError });

      if (userError || !user) {
        // console.log('User not found, returning 404');
        return res.status(404).json({ 
          message: 'Phone number not registered. Please register first.',
          userExists: false 
        });
      }
      // console.log('User found, proceeding with OTP');
    }

    // Generate OTP
    const otpCode = generateOTP();

    // Save OTP to database
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes expiry

    const { error: dbError } = await supabase
      .from('otp_verifications')
      .insert([{
        phone_number: phoneNumber,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString(),
        is_used: false
      }]);

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ message: 'Failed to save OTP' });
    }

    // Send SMS via Twilio
    try {
      // Format phone number properly for Indian numbers
      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      
      // console.log('Sending SMS to:', formattedPhoneNumber);
      // console.log('From:', TWILIO_PHONE_NUMBER);
      // console.log('OTP Code:', otpCode);
      
      await twilioClient.messages.create({
        body: `Your Discountmithra verification code is: ${otpCode}. This code expires in 10 minutes.`,
        from: TWILIO_PHONE_NUMBER,
        to: formattedPhoneNumber
      });

      res.json({ 
        success: true, 
        message: 'OTP sent successfully' 
      });
    } catch (twilioError) {
      console.error('Twilio error details:');
      console.error('Error Code:', twilioError.code);
      console.error('Error Message:', twilioError.message);
      console.error('More Info:', twilioError.moreInfo);
      console.error('Full Error:', twilioError);
      
      res.status(500).json({ 
        message: `Failed to send SMS: ${twilioError.message}` 
      });
    }

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otpCode } = req.body;

    if (!phoneNumber || !otpCode) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    // Check OTP in database
    const { data, error } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('phone_number', phoneNumber)
      .eq('otp_code', otpCode)
      .eq('is_used', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark OTP as used
    await supabase
      .from('otp_verifications')
      .update({ is_used: true })
      .eq('id', data.id);

    // Update user verification status
    await supabase
      .from('users')
      .update({ is_verified: true })
      .eq('phone_number', phoneNumber);

    res.json({ 
      success: true, 
      message: 'OTP verified successfully' 
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check user exists endpoint
app.post('/api/check-user', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('phone_number', phoneNumber)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ 
      exists: !!data,
      message: data ? 'User exists' : 'User not found'
    });

  } catch (error) {
    console.error('Check user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
