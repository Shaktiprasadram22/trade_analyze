import React, { useState, useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';

export const KeyboardShortcuts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Ctrl + K', description: 'Open search' },
    { key: 'Ctrl + D', description: 'Toggle dark mode' },
    { key: 'Ctrl + E', description: 'Export data' },
    { key: 'Ctrl + R', description: 'Refresh data' },
    { key: 'Ctrl + N', description: 'New alert' },
    { key: 'Ctrl + S', description: 'Save layout' },
    { key: 'Ctrl + 1-8', description: 'Switch tabs' },
    { key: 'Esc', description: 'Close modals' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            // Focus search
            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
            searchInput?.focus();
            break;
          case 'd':
            e.preventDefault();
            // Toggle theme
            break;
          case 'e':
            e.preventDefault();
            // Export
            break;
          case 'r':
            e.preventDefault();
            // Refresh
            window.location.reload();
            break;
          case 'n':
            e.preventDefault();
            // New alert
            break;
          case 's':
            e.preventDefault();
            // Save
            break;
          case '?':
            e.preventDefault();
            setIsOpen(true);
            break;
        }
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200"
        title="Keyboard shortcuts (Ctrl + ?)"
      >
        <Keyboard className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Keyboard Shortcuts</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-300">{shortcut.description}</span>
              <kbd className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm font-mono">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Press <kbd className="bg-gray-700 text-gray-300 px-1 rounded">Ctrl + ?</kbd> to toggle this dialog
          </p>
        </div>
      </div>
    </div>
  );
};