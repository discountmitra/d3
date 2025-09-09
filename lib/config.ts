import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  API_BASE_URL
} from '@env';

// Configuration file for API keys and environment variables
export const config = {
  supabase: {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY
  },
  twilio: {
    accountSid: TWILIO_ACCOUNT_SID,
    authToken: TWILIO_AUTH_TOKEN,
    phoneNumber: TWILIO_PHONE_NUMBER
  },
  api: {
    // For development - use your computer's IP address
    // baseUrl: 'http://10.105.38.251:3000'
     baseUrl: API_BASE_URL
  }
};
