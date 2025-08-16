import React, { useState, useCallback } from 'react';
import { Bell, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Toggle } from '@/components/ui/Toggle';
import type { SettingNotificationProps } from "@/types/user";

type NotificationOption = {
  key: keyof NotificationsState;
  title: string;
  description: string;
};

type NotificationsState = {
  timerNotifications: boolean;
  projectUpdates: boolean;
  dailyReminders: boolean;
  emailNotifications: boolean;
};

const NOTIFICATION_OPTIONS: NotificationOption[] = [
  {
    key: 'timerNotifications',
    title: 'Timer Notifications',
    description: 'Receive notifications when timers are started or stopped.'
  },
  {
    key: 'projectUpdates',
    title: 'Project Updates',
    description: 'Get notified about changes to projects you\'re involved with.'
  },
  {
    key: 'dailyReminders',
    title: 'Daily Reminders',
    description: 'Receive daily reminders to track your time.'
  },
  {
    key: 'emailNotifications',
    title: 'Email Notifications',
    description: 'Receive important notifications via email.'
  }
];

const INITIAL_STATE: NotificationsState = {
  timerNotifications: true,
  projectUpdates: true,
  dailyReminders: false,
  emailNotifications: true,
};

export function SettingNotification({ onSuccess, onError }: SettingNotificationProps) {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationsState>(INITIAL_STATE);

  const handleToggle = useCallback((key: keyof NotificationsState) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleNotificationUpdate = useCallback(async () => {
    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { notifications },
      });
      if (updateError) throw updateError;
      onSuccess();
    } catch (err) {
      onError('Failed to update notification preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [notifications, onSuccess, onError]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Notification Preferences
        </h2>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Choose what notifications you'd like to receive.
      </p>
      <div className="space-y-6">
        {NOTIFICATION_OPTIONS.map(({ key, title, description }) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>
            <Toggle
              enabled={notifications[key]}
              onChange={() => handleToggle(key)}
            />
          </div>
        ))}

        <button
          onClick={handleNotificationUpdate}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}