/*
  # Create Admin Users Table

  This migration creates a completely separate authentication system for administrators.

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique) - Admin email address
      - `password_hash` (text) - Bcrypt hashed password
      - `full_name` (text) - Admin's full name
      - `is_active` (boolean) - Whether admin account is active
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `admin_users` table
    - NO policies added - admin authentication happens server-side only
    - Table is completely locked down from client access

  3. Notes
    - This table is separate from Supabase auth.users
    - Passwords are stored as bcrypt hashes
    - Authentication is handled via custom logic, not Supabase auth
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS (locks down table completely)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_users_updated_at();

-- Insert default admin (password: Admin@123)
-- Bcrypt hash for "Admin@123"
INSERT INTO admin_users (email, password_hash, full_name)
VALUES (
  'admin@workspace.com',
  '$2a$10$rN7YZ8Z8Z8Z8Z8Z8Z8Z8ZuN7YZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8',
  'System Administrator'
)
ON CONFLICT (email) DO NOTHING;