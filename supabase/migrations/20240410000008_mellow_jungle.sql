/*
  # Update auto-stop functionality

  1. Changes
    - Modify `auto_stop` column in `time_entries` table from boolean to timestamptz
    - This allows storing the exact time when the entry should automatically stop

  2. Migration Details
    - Remove default value and constraints first
    - Change column type to timestamptz
    - Add check constraint to ensure auto_stop is after start_time
*/

DO $$ BEGIN
  -- First remove the default value from the column
  ALTER TABLE time_entries 
    ALTER COLUMN auto_stop DROP DEFAULT;

  -- Then change the column type to timestamptz
  ALTER TABLE time_entries 
    ALTER COLUMN auto_stop TYPE timestamptz USING 
      CASE 
        WHEN auto_stop = true THEN start_time + interval '8 hours'
        ELSE NULL 
      END;

  -- Add check constraint to ensure auto_stop is after start_time
  ALTER TABLE time_entries
    ADD CONSTRAINT valid_auto_stop_time 
    CHECK (auto_stop IS NULL OR auto_stop > start_time);
END $$;