import React, { useState } from 'react';
import { CorrelationAnalysis } from './CorrelationAnalysis';
import { NewsAggregation } from './NewsAggregation';
import { AdvancedPortfolio } from './AdvancedPortfolio';
import { SentimentHeatmap } from './SentimentHeatmap';
import { CommunityFeatures } from './CommunityFeatures';
import { TechnicalFeatures } from './TechnicalFeatures';
import { DashboardCustomization } from './DashboardCustomization';
import { StockRecommendationSystem } from './StockRecommendationSystem';
import { 
  BarChart3, 
  Newspaper, 
  Wallet, 
  TrendingUp, 
  Users, 
  Code, 
  Settings,
  Grid,
  Download,
  RefreshCw,
  Target
} from 'lucide-react';

export const ComprehensiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'correlation' | 'news' | 'portfolio' | 'sentiment' | 'community' | 'technical' | 'customize'>('recommendations');

  const tabs = [
    { id: 'recommendations', label: 'AI Recommendations', icon: Target, color: 'text-emerald-500' },
    { id: 'correlation', label: 'Correlation Analysis', icon: BarChart3, color: 'text-blue-500' },
    { id: 'news', label: 'News & Analysis', icon: Newspaper, color: 'text-green-500' },
    { id: 'portfolio', label: 'Portfolio Management', icon: Wallet, color: 'text-emerald-500' },
    { id: 'sentiment', label: 'Sentiment Tracking', icon: TrendingUp, color: 'text-purple-500' },
    { id: 'community', label: 'Community', icon: Users, color: 'text-pink-500' },
    { id: 'technical', label: 'Technical Features', icon: Code, color: 'text-orange-500' },
    { id: 'customize', label: 'Customize', icon: Settings, color: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <Grid className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">TrendPulse Pro</h1>
              <p className="text-gray-400">Comprehensive Market Intelligence Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-emerald-500 font-medium">LIVE DATA</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-2 mb-8 border border-gray-700">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
          {activeTab === 'recommendations' && <StockRecommendationSystem />}
          {activeTab === 'correlation' && <CorrelationAnalysis />}
          {activeTab === 'news' && <NewsAggregation />}
          {activeTab === 'portfolio' && <AdvancedPortfolio />}
          {activeTab === 'sentiment' && <SentimentHeatmap />}
          {activeTab === 'community' && <CommunityFeatures />}
          {activeTab === 'technical' && <TechnicalFeatures />}
          {activeTab === 'customize' && <DashboardCustomization />}
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Target className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">AI Recommendations</p>
                <p className="text-xl font-bold text-white">5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Correlations</p>
                <p className="text-xl font-bold text-white">247</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Newspaper className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">News Articles</p>
                <p className="text-xl font-bold text-white">1,284</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Sentiment Score</p>
                <p className="text-xl font-bold text-white">72.5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};