import React, { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MainTabs } from "@/components/settings/MainTabs";
import { SubTabs } from "@/components/settings/SubTabs";
import { SettingsTab, UserPreferencesSubTab } from "@/types";
import { useSupabase } from '@/hooks/useSupabase';
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { StatusMessages } from "@/components/settings/StatusMessages.tsx";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('user-preferences');
  const [activeSubTab, setActiveSubTab] = useState<UserPreferencesSubTab>('profile');

  const { success, error, handleSuccess, handleError } = useSupabase();

  return (
    <DashboardLayout>
      <MainTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
      <SubTabs activeSubTab={activeSubTab} activeTab={activeTab} setActiveSubTab={setActiveSubTab}/>
          {activeTab === 'notifications' && (
              <NotificationSettings onSuccess={handleSuccess} onError={handleError}/>
          )}

          <StatusMessages success={success} error={error}/>
      </DashboardLayout>
  );
}