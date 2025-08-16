/*
  # Add archived status to time entries

  1. Changes
    - Add `is_archived` boolean column to time_entries table with default false
    - Add check constraint to ensure value is not null
    - Update RLS policies to maintain security

  2. Security
    - Maintain existing RLS policies
    - Users can only archive their own time entries
*/

-- Add is_archived column with default value
ALTER TABLE time_entries 
ADD COLUMN is_archived boolean DEFAULT false NOT NULL;

-- Add check constraint to ensure is_archived is not null
ALTER TABLE time_entries
ADD CONSTRAINT time_entries_is_archived_check CHECK (is_archived IS NOT NULL);

-- Update RLS policies to include archived status
CREATE POLICY "Users can update archived status of their own entries"
  ON time_entries
  AS permissive
  FOR update
  TO authenticated
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));