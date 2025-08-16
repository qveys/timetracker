-- Add photo field to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Enable Storage for photos if not already enabled
-- Note: Make sure you have storage enabled in your Supabase project settings

-- Create storage bucket for user photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-photos', 'user-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policy to allow authenticated users to upload their own photos
CREATE POLICY "Users can upload their own photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'user-photos' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to read any photo
CREATE POLICY "Anyone can view photos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'user-photos');

-- Allow users to update their own photos
CREATE POLICY "Users can update their own photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'user-photos' AND (storage.foldername(name))[1] = auth.uid()::text); 