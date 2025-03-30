import React from 'react';
import { Camera, Save } from 'lucide-react';
import { ProfileFormProps } from '@/types';

export function ProfileForm({
  profile,
  loading,
  onSubmit,
  onProfileChange
}: ProfileFormProps) {
  return (
    <>
      <div className="flex items-center mb-8">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">
            {profile.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <button
            className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
            title="Upload photo"
          >
            <Camera className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <button className="ml-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          Upload Photo
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="full-name"
            value={profile.fullName}
            onChange={(e) => onProfileChange({ ...profile, fullName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Job Title
          </label>
          <input
            type="text"
            id="job-title"
            value={profile.jobTitle}
            onChange={(e) => onProfileChange({ ...profile, jobTitle: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            value={profile.bio}
            onChange={(e) => onProfileChange({ ...profile, bio: e.target.value })}
            placeholder="Tell us a little about yourself"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </button>
      </form>
    </>
  );
} 