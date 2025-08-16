/*
  # Update time entries table constraints

  1. Changes
    - Make end_time column nullable to allow creating entries when starting time tracking
    - Make duration column nullable since it can't be calculated until tracking ends
    
  2. Security
    - No changes to RLS policies
*/

ALTER TABLE time_entries 
  ALTER COLUMN end_time DROP NOT NULL,
  ALTER COLUMN duration DROP NOT NULL;