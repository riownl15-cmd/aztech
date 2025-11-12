/*
  # Fix Profiles RLS Infinite Recursion

  1. Changes
    - Drop the recursive admin policy on profiles table
    - Create a new non-recursive policy using a security definer function
    - This function checks role without causing recursion

  2. Security
    - Maintains proper access control
    - Users can view their own profile
    - Admins can view all profiles via helper function
    - No recursion issues
*/

-- Drop the problematic recursive policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create a security definer function to check if user is admin
-- This function runs with the privileges of its creator, avoiding RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'manager')
  );
$$;

-- Create new policy using the security definer function
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    (auth.uid() = id) OR is_admin()
  );

-- Update the existing "Users can view own profile" policy to be more permissive
-- Actually, we can drop it since the new admin policy covers both cases
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
