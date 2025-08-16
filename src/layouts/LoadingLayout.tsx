import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export const LoadingLayout = () => {
  return (
    <div className="loading-screen">
      <Clock className="w-40 h-40 text-blue-600 dark:text-blue-400 animate-spin" />
    </div>
  );
};
