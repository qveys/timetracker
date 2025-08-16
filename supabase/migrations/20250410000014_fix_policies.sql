-- Define uid() alias for compatibility with Supabase Cloud diffs
CREATE OR REPLACE FUNCTION public.uid()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT auth.uid();
$$;

-- Fix duplicated policies by dropping and recreating them with standardized syntax

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can CRUD their own time entries" ON time_entries;
DROP POLICY IF EXISTS "Users can update archived status of their own entries" ON time_entries;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON users;

-- Recreate policies with proper syntax using uid()

-- time_entries - CRUD
CREATE POLICY "Users can CRUD their own time entries"
  ON time_entries
  AS permissive
  FOR ALL
  TO authenticated
  USING ((uid() = user_id))
  WITH CHECK ((uid() = user_id));

-- time_entries - update archived
CREATE POLICY "Users can update archived status of their own entries"
  ON time_entries
  AS permissive
  FOR UPDATE
  TO authenticated
  USING ((uid() = user_id))
  WITH CHECK ((uid() = user_id));

-- users - insert
CREATE POLICY "Enable insert for authenticated users"
  ON users
  AS permissive
  FOR INSERT
  TO authenticated
  WITH CHECK ((uid() = id));

-- users - update
CREATE POLICY "Enable update for users based on id"
  ON users
  AS permissive
  FOR UPDATE
  TO authenticated
  USING ((uid() = id))
  WITH CHECK ((uid() = id));
