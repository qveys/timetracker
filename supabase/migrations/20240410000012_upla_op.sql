/*
  # Configure Realtime for Time Tracking Application

  1. Changes
    - Enable realtime functionality for time_entries and projects tables
    - Configure realtime policies to control data access
    - Add table comments to specify realtime behavior

  2. Security
    - Maintain existing RLS policies
    - Only broadcast changes to authenticated users
    - Users only receive updates for their own time entries
    - All users can receive project updates

  3. Tables Affected
    - time_entries: Enable realtime for all columns
    - projects: Enable realtime for all columns

  4. Implementation Details
    - Use publication to control which tables broadcast changes
    - Use table comments to specify which columns are included
    - Leverage existing RLS policies for security
*/

-- Enable realtime for specific tables by adding them to the supabase_realtime publication
alter publication supabase_realtime add table time_entries;
alter publication supabase_realtime add table projects;

-- Configure realtime behavior for time_entries table
-- "*": true enables realtime for all columns
comment on table time_entries is e'@realtime {"*": true}';

-- Configure realtime behavior for projects table
-- "*": true enables realtime for all columns
comment on table projects is e'@realtime {"*": true}';

-- Ensure tables are set up for realtime
DO $$ 
BEGIN
  -- Verify time_entries table is properly configured
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'time_entries'
  ) THEN
    RAISE EXCEPTION 'time_entries table not properly configured for realtime';
  END IF;

  -- Verify projects table is properly configured
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'projects'
  ) THEN
    RAISE EXCEPTION 'projects table not properly configured for realtime';
  END IF;
END $$;
