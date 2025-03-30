import React, { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MainTabs } from "@/components/settings/MainTabs";
import { SubTabs } from "@/components/settings/SubTabs";
import { DEFAULT_WORK_SCHEDULE, SettingsTab, UserPreferencesSubTab } from "@/types";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { useThemeStore } from "@/store/themeStore.ts";
import { useSupabase } from '@/hooks/useSupabase';
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { StatusMessages } from "@/components/settings/StatusMessages";
import { useAuthStore } from "@/store/authStore.ts";
import { UserProfileSettings } from "@/components/settings/UserProfileSettings";
import { WorkScheduleSettings } from "@/components/settings/WorkScheduleSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('user-preferences');
  const [activeSubTab, setActiveSubTab] = useState<UserPreferencesSubTab>('profile');
  const { theme, setTheme } = useThemeStore();
  const { initialize, user } = useAuthStore();

  const { success, error, handleSuccess, handleError, updateData } = useSupabase({
    onSuccess: () => initialize()
  });

  const handleWorkScheduleUpdate = async (schedule: any) => {
    if (!user?.id) return;
    await updateData('users', { work_schedule: schedule }, user.id);
  };

  if (!user) return null;

  return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
          <MainTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
          <SubTabs activeSubTab={activeSubTab} activeTab={activeTab} setActiveSubTab={setActiveSubTab}/>

          {activeTab === 'account' && (
              <AccountSettings userEmail={user.email}/>
          )}

          {activeTab === 'appearance' && (
              <AppearanceSettings theme={theme} setTheme={setTheme}/>
          )}

          {activeTab === 'notifications' && (
              <NotificationSettings onSuccess={handleSuccess} onError={handleError}/>
          )}

          {activeTab === 'user-preferences' && activeSubTab === 'profile' && (
              <UserProfileSettings
                  userId={user.id}
                  initialProfile={{
                    fullName: user.full_name,
                    jobTitle: 'Software Developer',
                    bio: '',
                  }}
                  onSuccess={handleSuccess}
                  onError={handleError}
                  onProfileUpdate={initialize}
              />
          )}

          {activeTab === 'user-preferences' && activeSubTab === 'schedule' && (
              <WorkScheduleSettings
                  schedule={user.work_schedule || DEFAULT_WORK_SCHEDULE}
                  onChange={handleWorkScheduleUpdate}
              />
          )}

          <StatusMessages success={success} error={error}/>
        </div>
      </DashboardLayout>
  );
}