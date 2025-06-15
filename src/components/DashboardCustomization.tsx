import React, { useState, useEffect } from 'react';
import { Layout, Grid, Save, RotateCcw, Sun, Moon, Settings, Download } from 'lucide-react';
import { DashboardWidget, UserSettings } from '../types';

export const DashboardCustomization: React.FC = () => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    theme: 'dark',
    layout: 'grid',
    notifications: {
      email: true,
      push: true,
      correlationAlerts: true,
      sentimentAlerts: true,
    },
    privacy: {
      showProfile: true,
      sharePortfolio: false,
      allowMessages: true,
    },
  });
  const [savedLayouts, setSavedLayouts] = useState<any[]>([]);

  useEffect(() => {
    generateDefaultWidgets();
    generateSavedLayouts();
  }, []);

  const generateDefaultWidgets = () => {
    const defaultWidgets: DashboardWidget[] = [
      {
        id: 'widget-1',
        type: 'correlation',
        title: 'Correlation Analysis',
        position: { x: 0, y: 0, w: 6, h: 4 },
        config: { timeframe: '30d', assets: ['BTC', 'ETH', 'AAPL'] },
      },
      {
        id: 'widget-2',
        type: 'news',
        title: 'News Feed',
        position: { x: 6, y: 0, w: 6, h: 4 },
        config: { sources: ['all'], sentiment: 'all' },
      },
      {
        id: 'widget-3',
        type: 'portfolio',
        title: 'Portfolio Overview',
        position: { x: 0, y: 4, w: 8, h: 3 },
        config: { showRiskMetrics: true },
      },
      {
        id: 'widget-4',
        type: 'sentiment',
        title: 'Market Sentiment',
        position: { x: 8, y: 4, w: 4, h: 3 },
        config: { heatmapView: true },
      },
      {
        id: 'widget-5',
        type: 'community',
        title: 'Community Feed',
        position: { x: 0, y: 7, w: 6, h: 3 },
        config: { asset: 'BTC' },
      },
      {
        id: 'widget-6',
        type: 'technical',
        title: 'Trading Strategies',
        position: { x: 6, y: 7, w: 6, h: 3 },
        config: { showBacktest: true },
      },
    ];
    setWidgets(defaultWidgets);
  };

  const generateSavedLayouts = () => {
    const layouts = [
      {
        id: 'layout-1',
        name: 'Trading Focus',
        description: 'Optimized for active trading with technical analysis',
        thumbnail: '/layouts/trading-focus.png',
      },
      {
        id: 'layout-2',
        name: 'Portfolio Manager',
        description: 'Focus on portfolio management and risk analysis',
        thumbnail: '/layouts/portfolio-manager.png',
      },
      {
        id: 'layout-3',
        name: 'News & Sentiment',
        description: 'Stay updated with market news and sentiment',
        thumbnail: '/layouts/news-sentiment.png',
      },
    ];
    setSavedLayouts(layouts);
  };

  const availableWidgets = [
    { type: 'correlation', title: 'Correlation Analysis', icon: '📊' },
    { type: 'news', title: 'News Aggregation', icon: '📰' },
    { type: 'portfolio', title: 'Portfolio Management', icon: '💼' },
    { type: 'sentiment', title: 'Sentiment Tracking', icon: '📈' },
    { type: 'community', title: 'Community Features', icon: '👥' },
    { type: 'technical', title: 'Technical Features', icon: '⚙️' },
  ];

  const addWidget = (type: string, title: string) => {
    const newWidget: DashboardWidget = {
      id: `widget-${Date.now()}`,
      type: type as any,
      title,
      position: { x: 0, y: 0, w: 6, h: 3 },
      config: {},
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };

  const saveLayout = () => {
    const layoutName = prompt('Enter layout name:');
    if (layoutName) {
      const newLayout = {
        id: `layout-${Date.now()}`,
        name: layoutName,
        description: 'Custom layout',
        widgets: widgets,
      };
      setSavedLayouts(prev => [...prev, newLayout]);
    }
  };

  const resetLayout = () => {
    if (confirm('Reset to default layout?')) {
      generateDefaultWidgets();
    }
  };

  const toggleTheme = () => {
    setUserSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Dashboard Customization</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            {userSettings.theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="text-sm">{userSettings.theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          
          <button
            onClick={saveLayout}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Save className="h-4 w-4" />
            <span className="text-sm">Save</span>
          </button>
          
          <button
            onClick={resetLayout}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>
      </div>

      {/* Layout Templates */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Layout className="h-5 w-5 text-purple-500" />
          <span>Layout Templates</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedLayouts.map((layout) => (
            <div
              key={layout.id}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200"
            >
              <div className="aspect-video bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                <Grid className="h-8 w-8 text-gray-500" />
              </div>
              
              <h5 className="text-white font-semibold mb-1">{layout.name}</h5>
              <p className="text-sm text-gray-400 mb-3">{layout.description}</p>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm transition-colors duration-200">
                Apply Layout
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Widget Library */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Grid className="h-5 w-5 text-blue-500" />
          <span>Widget Library</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableWidgets.map((widget) => (
            <div
              key={widget.type}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{widget.icon}</span>
                <h5 className="text-white font-semibold">{widget.title}</h5>
              </div>
              
              <button
                onClick={() => addWidget(widget.type, widget.title)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Add Widget
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current Layout */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4">Current Layout</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 relative group"
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-white font-medium">{widget.title}</h5>
                <button
                  onClick={() => removeWidget(widget.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-all duration-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="text-sm text-gray-400 mb-2">
                Position: {widget.position.x}, {widget.position.y}
              </div>
              
              <div className="text-sm text-gray-400">
                Size: {widget.position.w} × {widget.position.h}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Settings className="h-5 w-5 text-green-500" />
          <span>Dashboard Settings</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="text-white font-medium">Appearance</h5>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Theme</span>
                <select
                  value={userSettings.theme}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, theme: e.target.value as any }))}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </label>
              
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Layout Style</span>
                <select
                  value={userSettings.layout}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, layout: e.target.value as any }))}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                </select>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h5 className="text-white font-medium">Notifications</h5>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={userSettings.notifications.email}
                  onChange={(e) => setUserSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: e.target.checked }
                  }))}
                  className="rounded border-gray-600 bg-gray-700 text-purple-600"
                />
                <span className="text-gray-300">Email notifications</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={userSettings.notifications.push}
                  onChange={(e) => setUserSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, push: e.target.checked }
                  }))}
                  className="rounded border-gray-600 bg-gray-700 text-purple-600"
                />
                <span className="text-gray-300">Push notifications</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={userSettings.notifications.correlationAlerts}
                  onChange={(e) => setUserSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, correlationAlerts: e.target.checked }
                  }))}
                  className="rounded border-gray-600 bg-gray-700 text-purple-600"
                />
                <span className="text-gray-300">Correlation alerts</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={userSettings.notifications.sentimentAlerts}
                  onChange={(e) => setUserSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, sentimentAlerts: e.target.checked }
                  }))}
                  className="rounded border-gray-600 bg-gray-700 text-purple-600"
                />
                <span className="text-gray-300">Sentiment alerts</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Export Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};