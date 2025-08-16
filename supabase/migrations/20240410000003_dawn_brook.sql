/*
  # Fix RLS policies for users table

  1. Security Changes
    - Enable RLS on users table (if not already enabled)
    - Add policies (if they don't exist) for:
      - Users can read their own profile
      - Users can update their own profile
      - Users can insert their own profile during signup
*/

-- Enable RLS (safe to run multiple times)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
    -- Read policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Users can read own profile'
    ) THEN
        CREATE POLICY "Users can read own profile"
            ON users
            FOR SELECT
            TO authenticated
            USING (uid() = id);
    END IF;

    -- Update policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile"
            ON users
            FOR UPDATE
            TO authenticated
            USING (uid() = id)
            WITH CHECK (uid() = id);
    END IF;

    -- Insert policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile"
            ON users
            FOR INSERT
            TO authenticated
            WITH CHECK (uid() = id);
    END IF;
END $$;