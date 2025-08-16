/*
  # Add RLS policies for projects table

  1. Security
    - Enable RLS on projects table
    - Add policies for:
      - Authenticated users can read all projects
      - Authenticated users can insert new projects
      - Authenticated users can update project status
*/

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all projects
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert new projects
CREATE POLICY "Authenticated users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);