export const ARCHIVED_ENTRY_CLASS = 'line-through decoration-amber-600/70 dark:decoration-amber-500/100 decoration-[1.5px]';
export const TEXT_PRIMARY_CLASS = 'text-sm font-medium text-gray-900 dark:text-white';
export const TEXT_SECONDARY_CLASS = 'text-sm text-gray-500 dark:text-gray-400';
export const BUTTON_BASE_CLASS = 'flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';

export const TIME_ENTRY_STYLES = {
  ARCHIVED_CONTAINER: 'bg-amber-100 dark:bg-amber-500/10 hover:bg-amber-200 dark:hover:bg-amber-500/20',
  DEFAULT_CONTAINER: 'hover:bg-gray-50 dark:hover:bg-gray-700/50',
  CHECKBOX: 'rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-800'
} as const;

export const UI_STYLES = {
  BUTTON: {
    BASE: 'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors duration-200',
    PRIMARY: 'text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800',
    DISABLED: 'disabled:opacity-50 disabled:cursor-not-allowed',
    ICON: 'w-4 h-4 mr-2'
  },
  INPUT: {
    BASE: 'block w-full px-4 py-3 rounded-lg text-sm transition-colors duration-200',
    DEFAULT: 'bg-gray-100 dark:bg-gray-700/50 border-0',
    FOCUS: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
    TEXT: 'text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
  },
  SELECT: {
    BASE: 'block w-full px-4 py-3 rounded-lg text-sm transition-colors duration-200 appearance-none bg-no-repeat bg-[right_1rem_center]',
    DEFAULT: 'bg-gray-100 dark:bg-gray-700/50 border-0',
    FOCUS: 'focus:outline-none focus:ring-2 focus:ring-blue-500'
  }
} as const; 