import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAccount } from '@/hooks/useAccount';
import { PasswordForm } from '@/forms/PasswordForm';
import { EmailForm } from '@/forms/EmailForm';
import { AccountSettingsProps } from '@/types';

export function AccountSettings({ userEmail }: AccountSettingsProps) {
  const {
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
  } = useAccount(userEmail);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Email Settings</h2>
        </div>
        <EmailForm
          email={email}
          isLoading={isLoading}
          onSubmit={updateEmail}
          onEmailChange={setEmail}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Password</h2>
        </div>
        <PasswordForm
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          isLoading={isLoading}
          onSubmit={updatePassword}
          onCurrentPasswordChange={setCurrentPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
        />
      </div>
    </div>
  );
}