import React, { useState } from 'react';
import { Plus, Zap, Target, TrendingUp, Bell, Settings } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Plus,
      label: 'Add Asset',
      color: 'bg-green-600 hover:bg-green-700',
      action: () => console.log('Add asset'),
    },
    {
      icon: Bell,
      label: 'Create Alert',
      color: 'bg-yellow-600 hover:bg-yellow-700',
      action: () => console.log('Create alert'),
    },
    {
      icon: Target,
      label: 'Set Target',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Set target'),
    },
    {
      icon: TrendingUp,
      label: 'Analyze',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => console.log('Analyze'),
    },
    {
      icon: Settings,
      label: 'Settings',
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => console.log('Settings'),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex flex-col-reverse space-y-reverse space-y-3 mb-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 flex items-center space-x-2 group`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden group-hover:block text-sm font-medium whitespace-nowrap">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Zap className="h-6 w-6" />
      </button>
    </div>
  );
};