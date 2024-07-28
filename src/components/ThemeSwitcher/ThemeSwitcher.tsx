import React from 'react';
import { useTheme } from '../../ThemeContext';
import './ThemeSwitcher.css';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as 'light' | 'dark');
  };

  return (
    <div className="theme-switcher">
      <select value={theme} onChange={handleThemeChange}>
        <option value="light">Light Theme</option>
        <option value="dark">Dark Theme</option>
      </select>
    </div>
  );
};
