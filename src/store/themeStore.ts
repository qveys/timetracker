import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Helper to get the effective theme based on system preference
export const getEffectiveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
};

// Helper to update the theme class on the document
export const updateThemeClass = (theme: Theme) => {
  const effectiveTheme = getEffectiveTheme(theme);
  
  // Remove both classes first
  document.documentElement.classList.remove('light', 'dark');
  
  // Add the appropriate class
  document.documentElement.classList.add(effectiveTheme);

  // Update color scheme
  document.documentElement.style.colorScheme = effectiveTheme;

  // Update theme color meta tag for mobile browsers
  const themeColor = effectiveTheme === 'dark' ? '#111827' : '#ffffff';
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.setAttribute('name', 'theme-color');
    document.head.appendChild(metaThemeColor);
  }
  metaThemeColor.setAttribute('content', themeColor);
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme });
        updateThemeClass(theme);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // When the store is rehydrated, apply the theme
        if (state) {
          updateThemeClass(state.theme);
        }
      },
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const storedTheme = localStorage.getItem('theme-storage');
  if (storedTheme) {
    try {
      const { state } = JSON.parse(storedTheme);
      updateThemeClass(state.theme);
    } catch (e) {
      console.error('Failed to parse stored theme:', e);
      // Fallback to system theme
      updateThemeClass('system');
    }
  } else {
    // No stored theme, default to system
    updateThemeClass('system');
  }
}

// Listen for system theme changes
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    const theme = useThemeStore.getState().theme;
    if (theme === 'system') {
      updateThemeClass('system');
    }
  });
}