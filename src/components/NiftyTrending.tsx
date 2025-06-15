import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Clock, Building2, FileText } from 'lucide-react';
import { NiftyStock } from '../types';

interface NiftyTrendingProps {
  stocks: NiftyStock[];
}

export const NiftyTrending: React.FC<NiftyTrendingProps> = ({ stocks }) => {
  const getNewsTypeIcon = (type: string) => {
    switch (type) {
      case 'earnings': return <TrendingUp className="h-4 w-4" />;
      case 'merger': return <Building2 className="h-4 w-4" />;
      case 'regulatory': return <AlertCircle className="h-4 w-4" />;
      case 'product': return <FileText className="h-4 w-4" />;
      case 'financial': return <TrendingDown className="h-4 w-4" />;
      case 'partnership': return <Building2 className="h-4 w-4" />;
      case 'legal': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getNewsTypeColor = (type: string) => {
    switch (type) {
      case 'earnings': return 'text-emerald-500 bg-emerald-500/20';
      case 'merger': return 'text-blue-500 bg-blue-500/20';
      case 'regulatory': return 'text-orange-500 bg-orange-500/20';
      case 'product': return 'text-purple-500 bg-purple-500/20';
      case 'financial': return 'text-yellow-500 bg-yellow-500/20';
      case 'partnership': return 'text-cyan-500 bg-cyan-500/20';
      case 'legal': return 'text-red-500 bg-red-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-500';
      case 'negative': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getSectorColor = (sector: string) => {
    const colors = {
      'Banking': 'bg-blue-500/20 text-blue-500',
      'IT Services': 'bg-purple-500/20 text-purple-500',
      'Oil & Gas': 'bg-orange-500/20 text-orange-500',
      'Telecom': 'bg-cyan-500/20 text-cyan-500',
      'FMCG': 'bg-green-500/20 text-green-500',
      'Construction': 'bg-yellow-500/20 text-yellow-500',
      'Automobile': 'bg-red-500/20 text-red-500',
      'Paints': 'bg-pink-500/20 text-pink-500',
    };
    return colors[sector as keyof typeof colors] || 'bg-gray-500/20 text-gray-500';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Nifty Trending Stocks</h2>
            <p className="text-sm text-gray-400">Stocks in news with major events</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Updated {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-[1.02]"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-white text-lg">{stock.symbol}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSectorColor(stock.sector)}`}>
                    {stock.sector}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">{stock.name}</p>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-white">₹{stock.currentPrice.toLocaleString()}</p>
                <div className="flex items-center space-x-1">
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${stock.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* News Reason */}
            <div className="mb-4">
              <div className="flex items-start space-x-2 mb-2">
                <div className={`p-1 rounded ${getNewsTypeColor(stock.newsType)}`}>
                  {getNewsTypeIcon(stock.newsType)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getNewsTypeColor(stock.newsType)}`}>
                      {stock.newsType.toUpperCase()}
                    </span>
                    <span className={`text-xs font-medium ${getSentimentColor(stock.sentiment)}`}>
                      {stock.sentiment.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{stock.newsReason}</p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-700">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Volume</p>
                <p className="text-sm font-medium text-white">
                  {(stock.volume / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Market Cap</p>
                <p className="text-sm font-medium text-white">
                  ₹{(stock.marketCap).toLocaleString()}Cr
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Trending Score</p>
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-8 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${stock.trendingScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white">{stock.trendingScore}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Positive News</p>
          <p className="text-2xl font-bold text-emerald-500">
            {stocks.filter(s => s.sentiment === 'positive').length}
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Negative News</p>
          <p className="text-2xl font-bold text-red-500">
            {stocks.filter(s => s.sentiment === 'negative').length}
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Avg. Change</p>
          <p className={`text-2xl font-bold ${
            stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length >= 0 
              ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {((stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length) >= 0 ? '+' : '')}
            {(stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Total Volume</p>
          <p className="text-2xl font-bold text-white">
            {(stocks.reduce((sum, s) => sum + s.volume, 0) / 1000000000).toFixed(1)}B
          </p>
        </div>
      </div>
    </div>
  );
};