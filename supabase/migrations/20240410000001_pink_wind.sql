/*
  # Initial Schema Setup for KERN Timesheet Manager

  1. New Tables
    - users
      - Extends Supabase auth.users
      - Stores user profile and role information
    - projects
      - Stores project information
    - time_entries
      - Stores time tracking entries
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('backend_dev', 'frontend_dev', 'fullstack_dev', 'ux_designer');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text CHECK (status IN ('active', 'completed', 'archived')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create time_entries table
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  project_id uuid REFERENCES projects(id) NOT NULL,
  description text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  duration integer NOT NULL, -- stored in minutes
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_duration CHECK (end_time > start_time)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "All authenticated users can read projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Time entries policies
CREATE POLICY "Users can CRUD their own time entries"
  ON time_entries
  AS permissive
  FOR ALL
  TO authenticated
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

-- Create indexes for better performance
CREATE INDEX idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX idx_time_entries_project_id ON time_entries(project_id);
CREATE INDEX idx_time_entries_start_time ON time_entries(start_time);