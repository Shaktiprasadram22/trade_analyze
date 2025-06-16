import React, { useState } from 'react';
import { CorrelationAnalysis } from './CorrelationAnalysis';
import { NewsAggregation } from './NewsAggregation';
import { AdvancedPortfolio } from './AdvancedPortfolio';
import { SentimentHeatmap } from './SentimentHeatmap';
import { CommunityFeatures } from './CommunityFeatures';
import { TechnicalFeatures } from './TechnicalFeatures';
import { DashboardCustomization } from './DashboardCustomization';
import { StockRecommendationSystem } from './StockRecommendationSystem';
import { AlertSystem } from './AlertSystem';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { ExportModal } from './ExportModal';
import { QuickActions } from './QuickActions';
import { LiveDataIndicator } from './LiveDataIndicator';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { NiftyTrending } from './NiftyTrending';
import { TwitterAnalytics } from './TwitterAnalytics';
import { MarketSentiment } from './MarketSentiment';
import { SentimentDashboard } from './SentimentDashboard';
import { useRealTimeData } from '../hooks/useRealTimeData';
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
  Target,
  Maximize2,
  Minimize2,
  MessageCircle,
  Activity,
  Eye
} from 'lucide-react';

export const ComprehensiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'correlation' | 'news' | 'portfolio' | 'sentiment' | 'community' | 'technical' | 'customize'>('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState<any>(null);

  const {
    trendingTopics,
    portfolioAssets,
    marketSentiment,
    niftyStocks,
    newsArticles,
    sentimentHeatmap,
    isConnected,
    addAsset,
    removeAsset,
  } = useRealTimeData();

  const tabs = [
    { id: 'overview', label: 'Market Overview', icon: Activity, color: 'text-blue-500' },
    { id: 'recommendations', label: 'AI Recommendations', icon: Target, color: 'text-emerald-500' },
    { id: 'correlation', label: 'Correlation Analysis', icon: BarChart3, color: 'text-blue-500' },
    { id: 'news', label: 'News & Analysis', icon: Newspaper, color: 'text-green-500' },
    { id: 'portfolio', label: 'Portfolio Management', icon: Wallet, color: 'text-emerald-500' },
    { id: 'sentiment', label: 'Sentiment Tracking', icon: TrendingUp, color: 'text-purple-500' },
    { id: 'community', label: 'Community', icon: Users, color: 'text-pink-500' },
    { id: 'technical', label: 'Technical Features', icon: Code, color: 'text-orange-500' },
    { id: 'customize', label: 'Customize', icon: Settings, color: 'text-gray-500' },
  ];

  const handleRefresh = () => {
    // Simulate data refresh
    const refreshButton = document.querySelector('[data-refresh]') as HTMLButtonElement;
    if (refreshButton) {
      refreshButton.classList.add('animate-spin');
      setTimeout(() => {
        refreshButton.classList.remove('animate-spin');
      }, 1000);
    }
    
    // Trigger refresh for current tab
    window.dispatchEvent(new CustomEvent('dataRefresh', { detail: { tab: activeTab } }));
  };

  const handleExport = () => {
    // Generate export data based on current tab
    const data = {
      tab: activeTab,
      timestamp: new Date().toISOString(),
      trendingTopics: activeTab === 'overview' ? trendingTopics : undefined,
      niftyStocks: activeTab === 'overview' ? niftyStocks : undefined,
      portfolioAssets: activeTab === 'portfolio' ? portfolioAssets : undefined,
      marketSentiment: activeTab === 'sentiment' ? marketSentiment : undefined,
      newsArticles: activeTab === 'news' ? newsArticles : undefined,
      sentimentHeatmap: activeTab === 'sentiment' ? sentimentHeatmap : undefined,
    };
    setExportData(data);
    setShowExportModal(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

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
            <SearchBar />
            
            <button
              onClick={handleRefresh}
              data-refresh
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            
            <button
              onClick={handleExport}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <ThemeToggle />
            <AlertSystem />
            <KeyboardShortcuts />
            
            <LiveDataIndicator />
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
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Comprehensive Sentiment Dashboard */}
              <SentimentDashboard />
              
              {/* Nifty Trending Stocks */}
              <NiftyTrending stocks={niftyStocks} />
              
              {/* Twitter Analytics */}
              <TwitterAnalytics trendingTopics={trendingTopics} />
              
              {/* Market Sentiment and Portfolio Side by Side */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <Wallet className="h-6 w-6 text-emerald-500" />
                      <h2 className="text-xl font-semibold text-white">Portfolio Overview</h2>
                    </div>
                  </div>
                  
                  {/* Portfolio Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">Total Value</p>
                      <p className="text-2xl font-bold text-white">
                        ${portfolioAssets.reduce((sum, asset) => sum + (asset.currentPrice * asset.quantity), 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">Assets</p>
                      <p className="text-2xl font-bold text-white">{portfolioAssets.length}</p>
                    </div>
                  </div>
                  
                  {/* Top Assets */}
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold">Top Holdings</h3>
                    {portfolioAssets.slice(0, 3).map((asset) => {
                      const pnl = (asset.currentPrice - asset.purchasePrice) * asset.quantity;
                      const pnlPercent = ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;
                      
                      return (
                        <div key={asset.id} className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3">
                          <div>
                            <h4 className="font-semibold text-white">{asset.symbol}</h4>
                            <p className="text-sm text-gray-400">{asset.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-white">${(asset.currentPrice * asset.quantity).toLocaleString()}</p>
                            <p className={`text-sm ${pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                              {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(1)}%)
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <MarketSentiment sentiment={marketSentiment} />
              </div>
            </div>
          )}
          
          {activeTab === 'recommendations' && <StockRecommendationSystem />}
          {activeTab === 'correlation' && <CorrelationAnalysis />}
          {activeTab === 'news' && <NewsAggregation />}
          {activeTab === 'portfolio' && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Wallet className="h-6 w-6 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-white">Portfolio Management</h2>
                </div>
              </div>
              <AdvancedPortfolio />
            </div>
          )}
          {activeTab === 'sentiment' && <SentimentHeatmap />}
          {activeTab === 'community' && <CommunityFeatures />}
          {activeTab === 'technical' && <TechnicalFeatures />}
          {activeTab === 'customize' && <DashboardCustomization />}
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors duration-200">
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
          
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors duration-200">
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
          
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors duration-200">
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
          
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors duration-200">
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
          
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500/20 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Nifty Trending</p>
                <p className="text-xl font-bold text-white">{niftyStocks.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        data={exportData}
        title={`${activeTab} Data`}
      />
    </div>
  );
};