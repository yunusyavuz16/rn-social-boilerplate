import {useContext} from 'react';
import {ThemeContext} from '@contexts/ThemeContext';

/**
 * Custom hook to access theme context
 * @throws Error if used outside ThemeProvider
 * @returns Theme context value with theme, mode, and setTheme function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

