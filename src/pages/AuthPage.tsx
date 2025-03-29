import React, { Suspense } from "react";
import { Clock } from "lucide-react";
import { LoginForm } from "../forms/LoginForm.tsx";
import { SignUpForm } from "../forms/SignUpForm.tsx";
import { LoadingLayout } from "../layouts/LoadingLayout.tsx";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
      <div className="page-transition flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Clock className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold ml-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
              KERN Timesheet
            </h1>
          </div>
          <Suspense fallback={<LoadingLayout/>}>
            {isLogin ? (
                <LoginForm onToggle={() => setIsLogin(false)} />
            ) : (
                <SignUpForm onToggle={() => setIsLogin(true)} />
            )}
          </Suspense>
        </div>
      </div>
  );
};