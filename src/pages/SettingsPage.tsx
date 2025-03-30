import React, { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MainTabs } from "@/components/settings/MainTabs";
import { SubTabs } from "@/components/settings/SubTabs";
import { SettingsTab, UserPreferencesSubTab } from "@/types";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('user-preferences');
  const [activeSubTab, setActiveSubTab] = useState<UserPreferencesSubTab>('profile');

  return (
    <DashboardLayout>
      <MainTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
      <SubTabs activeSubTab={activeSubTab} activeTab={activeTab} setActiveSubTab={setActiveSubTab}/>
    </DashboardLayout>
  );
}