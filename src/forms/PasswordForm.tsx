import React from 'react';
import { Save } from 'lucide-react';
import { PasswordFormProps } from '@/types';
import { Input } from '@/components/ui';

export function PasswordForm({
  currentPassword,
  newPassword,
  confirmPassword,
  isLoading,
  onSubmit,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange
}: PasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        type="password"
        id="currentPassword"
        value={currentPassword}
        onChange={(e) => onCurrentPasswordChange(e.target.value)}
        label="Current Password"
      />
      <Input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => onNewPasswordChange(e.target.value)}
        label="New Password"
      />
      <Input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        label="Confirm New Password"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-offset-gray-800 shadow-sm transition-colors duration-200"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </button>
    </form>
  );
}