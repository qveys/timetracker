import React, { useState, useCallback } from 'react';
import { User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { SettingUserProfileProps } from "@/types/user";
import { ProfileForm } from '@/forms/ProfileForm';

export function SettingUserProfile({
  userId,
  initialProfile,
  onSuccess,
  onError,
  onProfileUpdate
}: SettingUserProfileProps) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const handleProfileUpdate = useCallback(async (e: React.FormEvent) => {
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
  }, [userId, profile.fullName, onProfileUpdate, onSuccess, onError]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <ProfileForm
        profile={profile}
        loading={loading}
        onSubmit={handleProfileUpdate}
        onProfileChange={setProfile}
      />
    </div>
  );
}