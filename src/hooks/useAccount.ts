import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSupabase } from './useSupabase';

export const useAccount = (userEmail: string) => {
  const [email, setEmail] = useState(userEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { isLoading, handleSuccess, handleError } = useSupabase();

  const updateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      handleSuccess();
    } catch {
      handleError('Failed to update email');
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      handleError('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      handleSuccess();
    } catch {
      handleError('Failed to update password');
    }
  };

  return {
    email,
    setEmail,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    updateEmail,
    updatePassword
  };
}; 