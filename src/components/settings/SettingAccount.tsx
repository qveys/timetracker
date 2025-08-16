import React, { useMemo } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAccount } from '@/hooks/useAccount';
import { PasswordForm } from '@/forms/PasswordForm';
import { EmailForm } from '@/forms/EmailForm';
import { User } from '@/types';

export function SettingAccount({ email }: Pick<User, 'email'>) {
  const accountState = useAccount(email);

  const settingsSections = useMemo(() => [
    {
      key: 'email',
      icon: <Mail className="w-5 h-5 text-gray-500" />,
      title: 'Email Settings',
      component: (
        <EmailForm
          email={accountState.email}
          isLoading={accountState.isLoading}
          onSubmit={accountState.updateEmail}
          onEmailChange={accountState.setEmail}
        />
      )
    },
    {
      key: 'password',
      icon: <Lock className="w-5 h-5 text-gray-500" />,
      title: 'Password',
      component: (
        <PasswordForm
          currentPassword={accountState.currentPassword}
          newPassword={accountState.newPassword}
          confirmPassword={accountState.confirmPassword}
          isLoading={accountState.isLoading}
          onSubmit={accountState.updatePassword}
          onCurrentPasswordChange={accountState.setCurrentPassword}
          onNewPasswordChange={accountState.setNewPassword}
          onConfirmPasswordChange={accountState.setConfirmPassword}
        />
      )
    }
  ], [accountState]);

  return (
    <div className="space-y-6">
      {settingsSections.map(({ key, icon, title, component }) => (
        <div key={key} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            {icon}
            <h2 className="text-lg font-medium">{title}</h2>
          </div>
          {component}
        </div>
      ))}
    </div>
  );
}