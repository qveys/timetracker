/*
  # Add auto-stop flag to time entries

  1. Changes
    - Add `auto_stop` boolean column to `time_entries` table with default value of false
    - This column indicates whether the time entry should automatically stop at the next work period end

  2. Notes
    - Default value ensures backward compatibility with existing entries
    - No data migration needed as new entries will default to false
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'time_entries' AND column_name = 'auto_stop'
  ) THEN
    ALTER TABLE time_entries ADD COLUMN auto_stop boolean DEFAULT false;
  END IF;
END $$;