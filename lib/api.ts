import { config } from './config';

// API service for backend communication
export class APIService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.api.baseUrl;
  }

  // Send OTP via Twilio
  async sendOTP(phoneNumber: string, isLogin: boolean = false): Promise<{ success: boolean; message: string; userExists?: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          isLogin: isLogin
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to send OTP',
          userExists: data.userExists
        };
      }

      return {
        success: true,
        message: data.message || 'OTP sent successfully',
        userExists: data.userExists
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  // Verify OTP
  async verifyOTP(phoneNumber: string, otpCode: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          otpCode: otpCode
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Invalid OTP'
        };
      }

      return {
        success: true,
        message: data.message || 'OTP verified successfully'
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  // Check if user exists
  async checkUserExists(phoneNumber: string): Promise<{ exists: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/check-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          exists: false,
          message: data.message || 'Error checking user'
        };
      }

      return {
        exists: data.exists,
        message: data.message || 'User check completed'
      };
    } catch (error) {
      console.error('Error checking user:', error);
      return {
        exists: false,
        message: 'Network error. Please try again.'
      };
    }
  }
}

// Create singleton instance
export const apiService = new APIService();

