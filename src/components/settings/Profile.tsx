import React, { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { PhotoUpload } from './PhotoUpload'
import { useToast } from '@/hooks/useToast'

export function Profile() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('users')
          .select('photo_url')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setPhotoUrl(data?.photo_url)
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

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
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="relative w-32 h-32">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">
            {loading ? '...' : 'q'}
          </div>
        )}
        <div className="absolute bottom-0 right-0">
          <PhotoUpload />
        </div>
      </div>
      <h2 className="text-2xl font-semibold">User Profile</h2>
      <p className="text-gray-600">Update your personal information and profile settings.</p>
    </div>
  )
} 