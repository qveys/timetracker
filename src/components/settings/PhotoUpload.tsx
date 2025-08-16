import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from '@/hooks/useToast'

export function PhotoUpload() {
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
    <div className="flex items-center gap-4">
      <label 
        htmlFor="photo-upload"
        className="cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-colors"
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
  )
} 