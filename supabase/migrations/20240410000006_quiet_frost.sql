/*
  # Add work schedule to users table

  1. Changes
    - Add work_schedule JSONB column to users table to store working hours
    - Column is nullable to maintain backward compatibility
    - Default value is null

  2. Schema
    - work_schedule: JSONB column storing:
      {
        "monday": [{"start": "09:00", "end": "17:00"}],
        "tuesday": [{"start": "09:00", "end": "17:00"}],
        "wednesday": [{"start": "09:00", "end": "17:00"}],
        "thursday": [{"start": "09:00", "end": "17:00"}],
        "friday": [{"start": "09:00", "end": "17:00"}],
        "saturday": [],
        "sunday": []
      }
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'work_schedule'
  ) THEN
    ALTER TABLE users ADD COLUMN work_schedule JSONB;
  END IF;
END $$;