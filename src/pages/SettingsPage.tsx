import React, { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MainTabs } from "@/components/settings/MainTabs";
import { SubTabs } from "@/components/settings/SubTabs";
import { SettingsTab, UserPreferencesSubTab } from "@/types";
import { AccountSettings } from "@/components/settings/AccountSettings.tsx";
import { useThemeStore } from "@/store/themeStore.ts";
import { useSupabase } from '@/hooks/useSupabase';
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { StatusMessages } from "@/components/settings/StatusMessages.tsx";
import { useAuthStore } from "@/store/authStore.ts";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('user-preferences');
  const [activeSubTab, setActiveSubTab] = useState<UserPreferencesSubTab>('profile');
  const { theme, setTheme } = useThemeStore();
  const { initialize, user } = useAuthStore();

  const { success, error, handleSuccess, handleError } = useSupabase();


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

          <StatusMessages success={success} error={error}/>
        </div>
      </DashboardLayout>
  );
}