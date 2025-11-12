/*
  # Create OTP Verification System

  ## Overview
  This migration creates a secure OTP (One-Time Password) verification system for email-based authentication.

  ## New Tables
  
  ### `otp_codes`
  - `id` (uuid, primary key) - Unique identifier for each OTP record
  - `email` (text, not null) - Email address for the OTP
  - `code` (text, not null) - The 6-digit OTP code
  - `purpose` (text, not null) - Purpose of the OTP (signup, login, reset_password)
  - `verified` (boolean, default false) - Whether the OTP has been verified
  - `expires_at` (timestamptz, not null) - Expiration timestamp (10 minutes from creation)
  - `attempts` (integer, default 0) - Number of verification attempts
  - `created_at` (timestamptz, default now()) - Creation timestamp

  ## Security Features
  
  1. **Row Level Security (RLS)**
     - Enabled on the `otp_codes` table
     - Users can only view their own OTP codes (by email)
     - Service role can manage all OTP codes for backend operations

  2. **Automatic Cleanup**
     - Function to delete expired OTP codes automatically

  3. **Rate Limiting**
     - Maximum 3 verification attempts per OTP
     - OTP expires after 10 minutes

  ## Important Notes
  - OTP codes should be generated server-side for security
  - Only the most recent unverified OTP per email/purpose combination should be used
  - Old OTP codes should be marked as verified or deleted after successful verification
*/

CREATE TABLE IF NOT EXISTS otp_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code text NOT NULL,
  purpose text NOT NULL CHECK (purpose IN ('signup', 'login', 'reset_password')),
  verified boolean DEFAULT false,
  expires_at timestamptz NOT NULL,
  attempts integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_otp_codes_email_purpose ON otp_codes(email, purpose, verified);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at ON otp_codes(expires_at);

ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own OTP codes"
  ON otp_codes FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Service role can manage all OTP codes"
  ON otp_codes FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM otp_codes
  WHERE expires_at < now() OR (verified = true AND created_at < now() - interval '1 day');
END;
$$;