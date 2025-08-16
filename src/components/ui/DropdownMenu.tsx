import React from 'react';

interface MenuOption {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  className?: string;
}

interface DropdownMenuProps {
  isOpen: boolean;
  options: MenuOption[];
}

export function DropdownMenu({ isOpen, options }: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={option.action}
          className={`flex items-center w-full px-4 py-2 text-sm ${option.className || 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          {option.icon}
          <span className="ml-2">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
