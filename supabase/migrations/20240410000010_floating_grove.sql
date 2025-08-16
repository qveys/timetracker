/*
  # Add is_archived column to time_entries table

  1. Changes
    - Add is_archived column to time_entries table with default value false
    - Add constraint to ensure is_archived is not null

  2. Security
    - No changes to RLS policies needed
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'time_entries' AND column_name = 'is_archived'
  ) THEN
    ALTER TABLE time_entries ADD COLUMN is_archived boolean NOT NULL DEFAULT false;
  END IF;
END $$;