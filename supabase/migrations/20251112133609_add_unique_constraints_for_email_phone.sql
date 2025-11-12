/*
  # Add Unique Constraints for Email and Phone

  1. Changes
    - Add unique constraint on email in profiles table
    - Add unique constraint on phone in profiles table
    - This prevents duplicate registrations with same email or phone

  2. Security
    - Ensures data integrity
    - Prevents duplicate user accounts
*/

-- Add unique constraint on email (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_email_key'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
  END IF;
END $$;

-- Add unique constraint on phone (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_phone_key'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_phone_key UNIQUE (phone);
  END IF;
END $$;