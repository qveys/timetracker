import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { UserRole } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { Input, Select } from '@/components/ui';

export function SignUpForm({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('frontend_dev');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const signUp = useAuthStore((state) => state.signUp);

  const roleOptions = [
    { value: 'frontend_dev', label: 'Frontend Developer' },
    { value: 'backend_dev', label: 'Backend Developer' },
    { value: 'fullstack_dev', label: 'Full Stack Developer' },
    { value: 'ux_designer', label: 'UX Designer' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signUp(email, password, fullName, role);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/50 border border-red-800 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
      
      <Input
        id="fullName"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="John Doe"
        required
        label="Full Name"
      />

      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        label="Email"
      />

      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        minLength={6}
        label="Password"
      />

      <Select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        required
        label="Role"
        options={roleOptions}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onToggle}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}