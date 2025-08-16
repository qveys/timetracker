import React, { useCallback, useState } from 'react';
import { Save, Camera } from 'lucide-react';
import type { ProfileFormProps } from '@/types';
import { Input, Textarea } from '@/components/ui';
import { PhotoUpload } from '@/components/settings/PhotoUpload';
import { useToast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabaseClient';

export function ProfileForm({
  profile,
  loading,
  onSubmit,
  onProfileChange
}: ProfileFormProps) {


  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const uploadPhoto = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('user-photos')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('user-photos')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('users')
        .update({ photo_url: publicUrl })
        .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      // Reload the page to show the new photo
      window.location.reload()

      toast({
        title: 'Success',
        description: 'Photo uploaded successfully',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error uploading photo',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }, [toast])


  return (
    <>
      <div className="flex items-center mb-8">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">
            {profile.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600 cursor-pointer"
            title="Upload photo"
          >
            <Camera className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </label>
        </div>
        <label 
          htmlFor="photo-upload" 
          className="ml-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={uploadPhoto}
          disabled={uploading}
          className="hidden"
        />
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          type="text"
          id="full-name"
          value={profile.fullName}
          onChange={(e) => onProfileChange({ ...profile, fullName: e.target.value })}
          label="Full Name"
        />

        <Input
          type="text"
          id="job-title"
          value={profile.jobTitle}
          onChange={(e) => onProfileChange({ ...profile, jobTitle: e.target.value })}
          label="Job Title"
        />

        <Textarea
          id="bio"
          rows={4}
          value={profile.bio}
          onChange={(e) => onProfileChange({ ...profile, bio: e.target.value })}
          placeholder="Tell us a little about yourself"
          label="Bio"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </button>
      </form>
    </>
  );
}