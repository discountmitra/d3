import { createClient } from '@supabase/supabase-js';
import { config } from './config';

// Create Supabase client
export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

// Database types
export interface User {
  id: string;
  phone_number: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface OTPVerification {
  id: string;
  phone_number: string;
  otp_code: string;
  expires_at: string;
  is_used: boolean;
  created_at: string;
}

// Database functions
export const db = {
  // Check if user exists by phone number
  async checkUserExists(phoneNumber: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('phone_number', phoneNumber)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking user:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error checking user exists:', error);
      return false;
    }
  },

  // Create new user
  async createUser(userData: {
    phone_number: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  }): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating user:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  },

  // Save OTP to database
  async saveOTP(phoneNumber: string, otpCode: string): Promise<boolean> {
    try {
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP expires in 10 minutes
      
      const { error } = await supabase
        .from('otp_verifications')
        .insert([{
          phone_number: phoneNumber,
          otp_code: otpCode,
          expires_at: expiresAt.toISOString(),
          is_used: false
        }]);
      
      if (error) {
        console.error('Error saving OTP:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error saving OTP:', error);
      return false;
    }
  },

  // Verify OTP
  async verifyOTP(phoneNumber: string, otpCode: string): Promise<boolean> {
    try {
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
        return false;
      }
      
      // Mark OTP as used
      await supabase
        .from('otp_verifications')
        .update({ is_used: true })
        .eq('id', data.id);
      
      return true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  },

  // Update user verification status
  async updateUserVerification(phoneNumber: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ is_verified: true })
        .eq('phone_number', phoneNumber);
      
      if (error) {
        console.error('Error updating user verification:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error updating user verification:', error);
      return false;
    }
  }
};




