import React, { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MainTabs } from "@/components/settings/MainTabs";
import { SubTabs } from "@/components/settings/SubTabs";
import { DEFAULT_WORK_SCHEDULE } from "@/constants/schedule";
import { SettingsTab, UserPreferencesSubTab } from "@/types";
import { SettingAccount } from "@/components/settings/SettingAccount.tsx";
import { useThemeStore } from "@/store/themeStore.ts";
import { useSupabase } from '@/hooks/useSupabase';
import { SettingAppearance } from "@/components/settings/SettingAppearance.tsx";
import { SettingNotification } from "@/components/settings/SettingNotification.tsx";
import { StatusMessages } from "@/components/settings/StatusMessages";
import { useAuthStore } from "@/store/authStore.ts";
import { SettingUserProfile } from "@/components/settings/SettingUserProfile.tsx";
import { SettingWorkSchedule } from "@/components/settings/SettingWorkSchedule.tsx";

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
              <SettingAccount email={user.email}/>
          )}

          {activeTab === 'appearance' && (
              <SettingAppearance theme={theme} setTheme={setTheme}/>
          )}

          {activeTab === 'notifications' && (
              <SettingNotification onSuccess={handleSuccess} onError={handleError}/>
          )}

          {activeTab === 'user-preferences' && activeSubTab === 'profile' && (
              <SettingUserProfile
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
              <SettingWorkSchedule
                  schedule={user.work_schedule || DEFAULT_WORK_SCHEDULE}
                  onChange={handleWorkScheduleUpdate}
              />
          )}

          <StatusMessages success={success} error={error}/>
        </div>
      </DashboardLayout>
  );
}