import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      case 'system': return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative group">
      <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200">
        {getIcon()}
      </button>
      
      <div className="absolute right-0 top-12 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2 space-y-1">
          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
              theme === 'light' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </button>
          
          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </button>
          
          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
              theme === 'system' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span>System</span>
          </button>
        </div>
      </div>
    </div>
  );
};