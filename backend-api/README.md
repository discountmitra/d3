# DiscountmithrA Backend API

This is the backend API for the DiscountmithrA mobile app that handles Twilio OTP integration and Supabase database operations.

## Features

- Send OTP via Twilio SMS
- Verify OTP codes
- Check if users exist in database
- Professional 4-digit OTP generation
- 10-minute OTP expiry

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend-api
npm install
```

### 2. Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and get your deployment URL

### 3. Update Mobile App Configuration

Update the `baseUrl` in `lib/config.ts` with your deployed API URL:

```typescript
api: {
  baseUrl: 'https://your-deployment-url.vercel.app'
}
```

### 4. Test the API

Visit `https://your-deployment-url.vercel.app/api/health` to verify it's working.

## API Endpoints

### POST /api/send-otp
Send OTP to phone number
```json
{
  "phoneNumber": "1234567890"
}
```

### POST /api/verify-otp
Verify OTP code
```json
{
  "phoneNumber": "1234567890",
  "otpCode": "1234"
}
```

### POST /api/check-user
Check if user exists
```json
{
  "phoneNumber": "1234567890"
}
```

### GET /api/health
Health check endpoint

## Environment Variables

The API uses the following configuration (already set in the code):
- Supabase URL and Anon Key
- Twilio Account SID, Auth Token, and Phone Number

## Security Notes

- OTP codes expire after 10 minutes
- Each OTP can only be used once
- Phone numbers are validated before processing
- All API calls include proper error handling




