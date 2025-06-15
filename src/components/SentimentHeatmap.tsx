import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, ExternalLink, Filter } from 'lucide-react';
import { SentimentHeatmapData } from '../types';
import { generateSentimentHeatmap } from '../utils/mockData';

export const SentimentHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<SentimentHeatmapData[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<SentimentHeatmapData | null>(null);
  const [filterSector, setFilterSector] = useState<string>('all');

  useEffect(() => {
    setHeatmapData(generateSentimentHeatmap());
    
    // Update data every 10 seconds
    const interval = setInterval(() => {
      setHeatmapData(prev => prev.map(asset => ({
        ...asset,
        sentiment: Math.max(0, Math.min(100, asset.sentiment + (Math.random() - 0.5) * 10)),
        change24h: asset.change24h + (Math.random() - 0.5) * 2,
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 80) return 'bg-emerald-500';
    if (sentiment >= 60) return 'bg-green-500';
    if (sentiment >= 40) return 'bg-yellow-500';
    if (sentiment >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getSentimentTextColor = (sentiment: number) => {
    if (sentiment >= 80) return 'text-emerald-500';
    if (sentiment >= 60) return 'text-green-500';
    if (sentiment >= 40) return 'text-yellow-500';
    if (sentiment >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  const sectors = ['all', ...Array.from(new Set(heatmapData.map(asset => asset.sector)))];
  const filteredData = filterSector === 'all' 
    ? heatmapData 
    : heatmapData.filter(asset => asset.sector === filterSector);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Real-Time Sentiment Heatmap</h3>
        <div className="flex items-center space-x-3">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            {sectors.map(sector => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'All Sectors' : sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {filteredData.map((asset) => (
          <div
            key={asset.symbol}
            onClick={() => setSelectedAsset(asset)}
            className="relative bg-gray-900/50 rounded-xl p-3 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
          >
            {/* Sentiment Background */}
            <div 
              className={`absolute inset-0 rounded-xl opacity-20 ${getSentimentColor(asset.sentiment)}`}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">{asset.symbol}</span>
                <div className="flex items-center space-x-1">
                  {asset.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Sentiment</span>
                  <span className={`text-xs font-medium ${getSentimentTextColor(asset.sentiment)}`}>
                    {asset.sentiment}
                  </span>
                </div>
                
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${getSentimentColor(asset.sentiment)}`}
                    style={{ width: `${asset.sentiment}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">24h</span>
                  <span className={`text-xs font-medium ${
                    asset.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedAsset.asset}</h3>
                <p className="text-sm text-gray-400">{selectedAsset.symbol} • {selectedAsset.sector}</p>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Sentiment Score</p>
                  <p className={`text-2xl font-bold ${getSentimentTextColor(selectedAsset.sentiment)}`}>
                    {selectedAsset.sentiment}
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">24h Change</p>
                  <p className={`text-2xl font-bold ${
                    selectedAsset.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {selectedAsset.change24h >= 0 ? '+' : ''}{selectedAsset.change24h.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-2">Market Data</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Volume (24h)</span>
                    <span className="text-sm text-white">
                      ${(selectedAsset.volume / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Market Cap</span>
                    <span className="text-sm text-white">
                      ${(selectedAsset.marketCap / 1000000000).toFixed(1)}B
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">News Articles</span>
                    <span className="text-sm text-white">{selectedAsset.newsCount}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200">
                <ExternalLink className="h-4 w-4" />
                <span>View Related News</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};