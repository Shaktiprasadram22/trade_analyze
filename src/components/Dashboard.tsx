import React from 'react';
import { TwitterAnalytics } from './TwitterAnalytics';
import { Portfolio } from './Portfolio';
import { MarketSentiment } from './MarketSentiment';
import { NiftyTrending } from './NiftyTrending';
import { SentimentDashboard } from './SentimentDashboard';
import { useRealTimeData } from '../hooks/useRealTimeData';

export const Dashboard: React.FC = () => {
  const {
    trendingTopics,
    portfolioAssets,
    marketSentiment,
    niftyStocks,
    addAsset,
    removeAsset,
  } = useRealTimeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Comprehensive Sentiment Dashboard - Featured at top */}
        <SentimentDashboard />
        
        {/* Nifty Trending Stocks */}
        <NiftyTrending stocks={niftyStocks} />
        
        {/* Twitter Analytics */}
        <TwitterAnalytics trendingTopics={trendingTopics} />
        
        {/* Portfolio and Market Sentiment */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Portfolio 
            assets={portfolioAssets}
            onAddAsset={addAsset}
            onRemoveAsset={removeAsset}
          />
          <MarketSentiment sentiment={marketSentiment} />
        </div>
      </div>
    </div>
  );
};