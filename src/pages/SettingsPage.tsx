import React, { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MainTabs } from "@/components/settings/MainTabs";
import { SubTabs } from "@/components/settings/SubTabs";
import { SettingsTab, UserPreferencesSubTab } from "@/types";
import { AccountSettings } from "@/components/settings/AccountSettings.tsx";
import { useSupabase } from '@/hooks/useSupabase';
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { StatusMessages } from "@/components/settings/StatusMessages.tsx";
import { useAuthStore } from "@/store/authStore.ts";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('user-preferences');
  const [activeSubTab, setActiveSubTab] = useState<UserPreferencesSubTab>('profile');
  const { initialize, user } = useAuthStore();

  const { success, error, handleSuccess, handleError } = useSupabase();


  if (!user) return null;

  return (
    <DashboardLayout>
      <MainTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
      <SubTabs activeSubTab={activeSubTab} activeTab={activeTab} setActiveSubTab={setActiveSubTab}/>
          {activeTab === 'account' && (
              <AccountSettings userEmail={user.email}/>
          )}

          {activeTab === 'notifications' && (
              <NotificationSettings onSuccess={handleSuccess} onError={handleError}/>
          )}

          <StatusMessages success={success} error={error}/>
      </DashboardLayout>
  );
}