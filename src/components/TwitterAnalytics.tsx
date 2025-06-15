import React from 'react';
import { TrendingUp, TrendingDown, MessageCircle, BarChart3 } from 'lucide-react';
import { TrendingTopic } from '../types';

interface TwitterAnalyticsProps {
  trendingTopics: TrendingTopic[];
}

export const TwitterAnalytics: React.FC<TwitterAnalyticsProps> = ({ trendingTopics }) => {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return 'text-emerald-500';
    if (sentiment >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSentimentBg = (sentiment: number) => {
    if (sentiment >= 70) return 'bg-emerald-500/20';
    if (sentiment >= 30) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageCircle className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-white">Twitter/X Analytics</h2>
        </div>
        <div className="text-sm text-gray-400">
          Updated {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white truncate">{topic.topic}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                topic.category === 'crypto' ? 'bg-orange-500/20 text-orange-500' :
                topic.category === 'stocks' ? 'bg-blue-500/20 text-blue-500' :
                'bg-purple-500/20 text-purple-500'
              }`}>
                {topic.category}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Mentions</span>
                <span className="text-sm font-medium text-white">
                  {topic.mentions.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Sentiment</span>
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-8 rounded-full ${getSentimentBg(topic.sentiment)}`}>
                    <div 
                      className="h-full bg-current rounded-full transition-all duration-500"
                      style={{ width: `${topic.sentiment}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${getSentimentColor(topic.sentiment)}`}>
                    {topic.sentiment}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Velocity</span>
                <div className="flex items-center space-x-1">
                  {topic.velocity > 0 ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    topic.velocity > 0 ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {Math.abs(topic.velocity)}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">24h Change</span>
                  <span className={`text-xs font-medium ${
                    topic.change24h > 0 ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {topic.change24h > 0 ? '+' : ''}{topic.change24h.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};