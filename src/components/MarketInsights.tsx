import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp, TrendingDown, Star, Users, Zap, Target } from 'lucide-react';
import { MarketInsight, InfluencerSentiment, FOMOIndex } from '../types';
import { generateMarketInsights, generateInfluencerSentiment, generateFOMOIndex } from '../utils/mockData';

export const MarketInsights: React.FC = () => {
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [influencers, setInfluencers] = useState<InfluencerSentiment[]>([]);
  const [fomoIndex, setFomoIndex] = useState<FOMOIndex | null>(null);

  useEffect(() => {
    setInsights(generateMarketInsights());
    setInfluencers(generateInfluencerSentiment());
    setFomoIndex(generateFOMOIndex());
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trending': return <TrendingUp className="h-5 w-5" />;
      case 'hidden_gem': return <Star className="h-5 w-5" />;
      case 'influencer': return <Users className="h-5 w-5" />;
      case 'fomo': return <Zap className="h-5 w-5" />;
      default: return <Eye className="h-5 w-5" />;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'buy': return 'text-emerald-500 bg-emerald-500/20';
      case 'sell': return 'text-red-500 bg-red-500/20';
      case 'hold': return 'text-yellow-500 bg-yellow-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getFOMOColor = (level: string) => {
    switch (level) {
      case 'extreme_fear': return 'text-red-600 bg-red-600/20';
      case 'fear': return 'text-red-500 bg-red-500/20';
      case 'neutral': return 'text-yellow-500 bg-yellow-500/20';
      case 'greed': return 'text-green-500 bg-green-500/20';
      case 'extreme_greed': return 'text-green-600 bg-green-600/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Market Insights & Analysis</h3>

      {/* FOMO Index */}
      {fomoIndex && (
        <div className="bg-gray-900/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>FOMO Index</span>
            </h4>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getFOMOColor(fomoIndex.level)}`}>
              {fomoIndex.level.replace('_', ' ').toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{fomoIndex.score}</div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      fomoIndex.score <= 20 ? 'bg-red-600' :
                      fomoIndex.score <= 40 ? 'bg-red-500' :
                      fomoIndex.score <= 60 ? 'bg-yellow-500' :
                      fomoIndex.score <= 80 ? 'bg-green-500' : 'bg-green-600'
                    }`}
                    style={{ width: `${fomoIndex.score}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {fomoIndex.signals.buy.length > 0 && (
                  <div>
                    <h5 className="text-emerald-500 font-medium mb-1">Buy Signals:</h5>
                    {fomoIndex.signals.buy.map((signal, index) => (
                      <p key={index} className="text-sm text-gray-300">• {signal}</p>
                    ))}
                  </div>
                )}
                {fomoIndex.signals.sell.length > 0 && (
                  <div>
                    <h5 className="text-red-500 font-medium mb-1">Sell Signals:</h5>
                    {fomoIndex.signals.sell.map((signal, index) => (
                      <p key={index} className="text-sm text-gray-300">• {signal}</p>
                    ))}
                  </div>
                )}
                {fomoIndex.signals.hold.length > 0 && (
                  <div>
                    <h5 className="text-yellow-500 font-medium mb-1">Hold Signals:</h5>
                    {fomoIndex.signals.hold.map((signal, index) => (
                      <p key={index} className="text-sm text-gray-300">• {signal}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-white font-medium">30-Day History</h5>
              <div className="h-32 flex items-end space-x-1">
                {fomoIndex.historical.slice(-15).map((day, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gray-700 rounded-t"
                    style={{ height: `${(day.score / 100) * 100}%` }}
                    title={`${day.date}: ${day.score}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getInsightIcon(insight.type)}
                <span className="text-white font-semibold">{insight.asset}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSignalColor(insight.signal)}`}>
                {insight.signal.toUpperCase()}
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-3">{insight.reason}</p>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-gray-400">Score</p>
                <p className="text-lg font-bold text-white">{insight.score}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Confidence</p>
                <p className="text-lg font-bold text-purple-500">{insight.confidence}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Timeframe</p>
                <p className="text-sm font-medium text-gray-300">{insight.timeframe}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Influencer Sentiment */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Users className="h-5 w-5 text-blue-500" />
          <span>Influencer Sentiment Tracker</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="text-white font-semibold">{influencer.name}</h5>
                  <p className="text-xs text-gray-400 capitalize">
                    {influencer.platform} • {(influencer.followers / 1000000).toFixed(1)}M followers
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-500">{influencer.sentiment}</p>
                  <p className="text-xs text-gray-400">Sentiment</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Influence Score</span>
                  <span className="text-sm text-white">{influencer.influence_score}/100</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Focus Assets:</p>
                  <div className="flex flex-wrap gap-1">
                    {influencer.asset_focus.map((asset, index) => (
                      <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Recent Mentions:</p>
                  {influencer.recent_mentions.slice(0, 2).map((mention, index) => (
                    <p key={index} className="text-xs text-gray-300">• {mention}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden Gems Detector */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span>Hidden Gems Detector</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { asset: 'MATIC', score: 78, reason: 'Undervalued Layer 2 solution with growing adoption' },
            { asset: 'AVAX', score: 72, reason: 'Strong DeFi ecosystem development, low market attention' },
            { asset: 'DOT', score: 69, reason: 'Parachain auctions driving utility, sentiment lagging' },
          ].map((gem, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">{gem.asset}</span>
                <span className="text-yellow-500 font-bold">{gem.score}</span>
              </div>
              <p className="text-sm text-gray-300">{gem.reason}</p>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg text-sm transition-colors duration-200">
                  Add to Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};