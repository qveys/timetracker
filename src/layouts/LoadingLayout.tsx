import React from "react";
import { Clock } from "lucide-react";

export const LoadingLayout = () => (
    <div className="loading-screen">
      <Clock className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
    </div>
);