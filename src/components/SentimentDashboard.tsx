import React, { useState } from 'react';
import { SentimentHeatmap } from './SentimentHeatmap';
import { NewsFeed } from './NewsFeed';
import { TrendVisualization } from './TrendVisualization';
import { SmartAlerts } from './SmartAlerts';
import { MarketInsights } from './MarketInsights';
import { PersonalizationPanel } from './PersonalizationPanel';
import { BarChart3, TrendingUp, Bell, Eye, Settings, Download } from 'lucide-react';

interface SentimentDashboardProps {
  // Props will be passed from parent component
}

export const SentimentDashboard: React.FC<SentimentDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<'heatmap' | 'trends' | 'alerts' | 'insights' | 'personalization'>('heatmap');

  const tabs = [
    { id: 'heatmap', label: 'Sentiment Heatmap', icon: BarChart3 },
    { id: 'trends', label: 'Trend Analysis', icon: TrendingUp },
    { id: 'alerts', label: 'Smart Alerts', icon: Bell },
    { id: 'insights', label: 'Market Insights', icon: Eye },
    { id: 'personalization', label: 'Personalization', icon: Settings },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Market Sentiment Dashboard</h2>
            <p className="text-sm text-gray-400">Comprehensive sentiment analysis and insights</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span className="text-sm">Export</span>
          </button>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-emerald-500 font-medium">LIVE</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-900/50 rounded-xl p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <SentimentHeatmap />
            <NewsFeed />
          </div>
        )}
        
        {activeTab === 'trends' && <TrendVisualization />}
        
        {activeTab === 'alerts' && <SmartAlerts />}
        
        {activeTab === 'insights' && <MarketInsights />}
        
        {activeTab === 'personalization' && <PersonalizationPanel />}
      </div>
    </div>
  );
};