import React from 'react';
import { Save } from 'lucide-react';
import { PasswordFormProps } from '@/types';

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
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => onCurrentPasswordChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => onNewPasswordChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <Save className="w-4 h-4 mr-2" />
        Update Password
      </button>
    </form>
  );
} 