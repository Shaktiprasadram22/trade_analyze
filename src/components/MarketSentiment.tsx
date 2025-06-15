import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { MarketSentiment as MarketSentimentType } from '../types';

interface MarketSentimentProps {
  sentiment: MarketSentimentType | null;
}

export const MarketSentiment: React.FC<MarketSentimentProps> = ({ sentiment }) => {
  if (!sentiment) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const getSentimentColor = () => {
    switch (sentiment.trend) {
      case 'bullish': return 'text-emerald-500';
      case 'bearish': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getSentimentIcon = () => {
    switch (sentiment.trend) {
      case 'bullish': return <TrendingUp className="h-5 w-5" />;
      case 'bearish': return <TrendingDown className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-white">Market Sentiment</h2>
        </div>
        <div className={`flex items-center space-x-2 ${getSentimentColor()}`}>
          {getSentimentIcon()}
          <span className="font-semibold capitalize">{sentiment.trend}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Index */}
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Composite Index</h3>
            <div className="relative">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Bearish</span>
                <span>Neutral</span>
                <span>Bullish</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: '100%' }}
                />
                <div 
                  className="absolute top-0 h-3 w-1 bg-white rounded-full shadow-lg transition-all duration-1000"
                  style={{ left: `${sentiment.index}%` }}
                />
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-white">{sentiment.index}</span>
                <span className="text-sm text-gray-400 ml-1">/ 100</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Weekly Trend</h3>
            <div className="flex justify-between items-end h-24">
              {sentiment.weeklyTrend.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center space-y-2">
                  <div
                    className="w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500"
                    style={{ height: `${(day.value / 100) * 60}px` }}
                  />
                  <span className="text-xs text-gray-400">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Correlations & Volume */}
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Market Volume</h3>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">
                ${(sentiment.volume / 1000000000).toFixed(2)}B
              </p>
              <p className="text-sm text-gray-400">24h Trading Volume</p>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Correlation Matrix</h3>
            <div className="space-y-3">
              {Object.entries(sentiment.correlations).map(([pair, correlation]) => (
                <div key={pair} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{pair}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          correlation > 0.7 ? 'bg-emerald-500' :
                          correlation > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.abs(correlation) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${
                      correlation > 0.7 ? 'text-emerald-500' :
                      correlation > 0.3 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {correlation.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};