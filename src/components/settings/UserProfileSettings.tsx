import React, { useState } from 'react';
import { User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { UserProfileSettingsProps } from "@/types";
import { ProfileForm } from '@/forms/ProfileForm';

export function UserProfileSettings({ 
  userId, 
  initialProfile, 
  onSuccess, 
  onError,
  onProfileUpdate 
}: UserProfileSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: profile.fullName,
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      await onProfileUpdate();
      onSuccess();
    } catch (err) {
      onError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">User Profile</h2>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Update your personal information and profile settings.
      </p>

      <ProfileForm
        profile={profile}
        loading={loading}
        onSubmit={handleProfileUpdate}
        onProfileChange={setProfile}
      />
    </div>
  );
}