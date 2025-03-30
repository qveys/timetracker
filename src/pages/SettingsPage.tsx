import { DashboardLayout } from "../layouts/DashboardLayout.tsx";
import React, { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MainTabs } from "@/components/settings/MainTabs";
import { SettingsTab } from "@/types";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('user-preferences');

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-2xl">Coming soon...</p>
      </div>
      <MainTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    </DashboardLayout>
  );
}