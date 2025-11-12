/*
  # Database Performance and Automation Enhancements
  
  ## Overview
  Adds database indexes for optimized query performance and triggers for automatic timestamp updates.
  
  ## Changes
  
  ### Indexes
  - `bookings_user_id_idx` - Optimize user booking queries
  - `bookings_space_id_idx` - Optimize space booking queries
  - `bookings_status_idx` - Optimize booking status filtering
  - `bookings_payment_status_idx` - Optimize payment status filtering
  - `bookings_start_time_idx` - Optimize date range queries
  - `bookings_created_at_idx` - Optimize recent bookings queries
  - `payments_booking_id_idx` - Optimize payment lookups by booking
  - `payments_status_idx` - Optimize payment status filtering
  - `spaces_location_id_idx` - Optimize space queries by location
  - `locations_city_idx` - Optimize location search by city
  - `profiles_email_idx` - Optimize user lookup by email
  - `profiles_role_idx` - Optimize admin/manager queries
  
  ### Functions
  - `update_updated_at_column()` - Automatically update updated_at timestamp on row modifications
  
  ### Triggers
  - Automatic `updated_at` timestamp updates for all tables (profiles, locations, spaces, bookings, payments)
  
  ## Notes
  - All operations are idempotent and safe to run multiple times
  - Indexes significantly improve query performance for frequently used filters
  - Triggers ensure data consistency for modification timestamps
*/

-- Create indexes for optimized queries (only if they don't exist)
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_space_id_idx ON bookings(space_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_payment_status_idx ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS bookings_start_time_idx ON bookings(start_time);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at DESC);

CREATE INDEX IF NOT EXISTS payments_booking_id_idx ON payments(booking_id);
CREATE INDEX IF NOT EXISTS payments_status_idx ON payments(status);
CREATE INDEX IF NOT EXISTS payments_created_at_idx ON payments(created_at DESC);

CREATE INDEX IF NOT EXISTS spaces_location_id_idx ON spaces(location_id);
CREATE INDEX IF NOT EXISTS spaces_is_active_idx ON spaces(is_active);

CREATE INDEX IF NOT EXISTS locations_city_idx ON locations(city);
CREATE INDEX IF NOT EXISTS locations_is_active_idx ON locations(is_active);

CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updated_at updates
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_locations_updated_at') THEN
    CREATE TRIGGER update_locations_updated_at
      BEFORE UPDATE ON locations
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_spaces_updated_at') THEN
    CREATE TRIGGER update_spaces_updated_at
      BEFORE UPDATE ON spaces
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_bookings_updated_at') THEN
    CREATE TRIGGER update_bookings_updated_at
      BEFORE UPDATE ON bookings
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_payments_updated_at') THEN
    CREATE TRIGGER update_payments_updated_at
      BEFORE UPDATE ON payments
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
