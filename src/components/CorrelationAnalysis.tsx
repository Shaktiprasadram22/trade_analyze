import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Download, RefreshCw, Filter } from 'lucide-react';
import { CorrelationData, CorrelationMatrix } from '../types';

export const CorrelationAnalysis: React.FC = () => {
  const [correlationMatrix, setCorrelationMatrix] = useState<CorrelationMatrix | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1d' | '7d' | '30d' | '90d'>('30d');
  const [correlationAlerts, setCorrelationAlerts] = useState<CorrelationData[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>(['BTC', 'ETH', 'AAPL', 'TSLA', 'SPY']);

  useEffect(() => {
    generateCorrelationMatrix();
    generateCorrelationAlerts();
  }, [selectedTimeframe, selectedAssets]);

  const generateCorrelationMatrix = () => {
    const assets = selectedAssets;
    const matrix: number[][] = [];
    
    for (let i = 0; i < assets.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < assets.length; j++) {
        if (i === j) {
          matrix[i][j] = 1;
        } else {
          matrix[i][j] = Math.random() * 2 - 1; // -1 to 1
        }
      }
    }

    setCorrelationMatrix({
      assets,
      matrix,
      lastUpdated: new Date().toISOString(),
    });
  };

  const generateCorrelationAlerts = () => {
    const alerts: CorrelationData[] = [
      {
        asset1: 'BTC',
        asset2: 'TSLA',
        correlation: 0.85,
        timeframe: selectedTimeframe,
        historicalCorrelations: generateHistoricalCorrelations(),
        significantChange: true,
      },
      {
        asset1: 'ETH',
        asset2: 'AAPL',
        correlation: -0.72,
        timeframe: selectedTimeframe,
        historicalCorrelations: generateHistoricalCorrelations(),
        significantChange: true,
      },
    ];
    setCorrelationAlerts(alerts);
  };

  const generateHistoricalCorrelations = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.random() * 2 - 1,
    })).reverse();
  };

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation);
    if (abs >= 0.8) return correlation > 0 ? 'bg-emerald-600' : 'bg-red-600';
    if (abs >= 0.6) return correlation > 0 ? 'bg-emerald-500' : 'bg-red-500';
    if (abs >= 0.4) return correlation > 0 ? 'bg-emerald-400' : 'bg-red-400';
    if (abs >= 0.2) return correlation > 0 ? 'bg-emerald-300' : 'bg-red-300';
    return 'bg-gray-500';
  };

  const getCorrelationTextColor = (correlation: number) => {
    const abs = Math.abs(correlation);
    return abs >= 0.4 ? 'text-white' : 'text-gray-900';
  };

  const availableAssets = ['BTC', 'ETH', 'AAPL', 'TSLA', 'SPY', 'QQQ', 'GOOGL', 'MSFT', 'AMZN', 'NVDA'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Correlation Analysis</h3>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="1d">1 Day</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
          </select>
          
          <button
            onClick={generateCorrelationMatrix}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm">Refresh</span>
          </button>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Asset Selection */}
      <div className="bg-gray-900/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-500" />
          <span>Select Assets for Analysis</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableAssets.map(asset => (
            <button
              key={asset}
              onClick={() => {
                if (selectedAssets.includes(asset)) {
                  setSelectedAssets(prev => prev.filter(a => a !== asset));
                } else if (selectedAssets.length < 10) {
                  setSelectedAssets(prev => [...prev, asset]);
                }
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedAssets.includes(asset)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Select up to 10 assets for correlation analysis
        </p>
      </div>

      {/* Correlation Matrix */}
      {correlationMatrix && (
        <div className="bg-gray-900/50 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-4">Correlation Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 p-2"></th>
                  {correlationMatrix.assets.map(asset => (
                    <th key={asset} className="text-center text-gray-400 p-2 text-sm">
                      {asset}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.assets.map((asset1, i) => (
                  <tr key={asset1}>
                    <td className="text-white font-medium p-2">{asset1}</td>
                    {correlationMatrix.assets.map((asset2, j) => (
                      <td key={asset2} className="p-1">
                        <div
                          className={`w-12 h-8 rounded flex items-center justify-center text-xs font-medium ${
                            getCorrelationColor(correlationMatrix.matrix[i][j])
                          } ${getCorrelationTextColor(correlationMatrix.matrix[i][j])}`}
                        >
                          {correlationMatrix.matrix[i][j].toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-emerald-600 rounded"></div>
                <span className="text-gray-400">Strong Positive</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span className="text-gray-400">Neutral</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-gray-400">Strong Negative</span>
              </div>
            </div>
            <span className="text-xs text-gray-400">
              Last updated: {new Date(correlationMatrix.lastUpdated).toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}

      {/* Correlation Alerts */}
      <div className="bg-gray-900/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <span>Significant Correlation Changes</span>
        </h4>
        
        <div className="space-y-3">
          {correlationAlerts.map((alert, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold">{alert.asset1}</span>
                    <span className="text-gray-400">↔</span>
                    <span className="text-white font-semibold">{alert.asset2}</span>
                  </div>
                  {alert.significantChange && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-medium">
                      Significant Change
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {alert.correlation > 0 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-lg font-bold ${
                    alert.correlation > 0.6 ? 'text-emerald-500' :
                    alert.correlation < -0.6 ? 'text-red-500' : 'text-yellow-500'
                  }`}>
                    {alert.correlation.toFixed(3)}
                  </span>
                </div>
              </div>
              
              <div className="h-16 flex items-end space-x-1">
                {alert.historicalCorrelations.slice(-15).map((point, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gray-700 rounded-t"
                    style={{ 
                      height: `${Math.abs(point.value) * 50}px`,
                      backgroundColor: point.value > 0 ? '#10b981' : '#ef4444'
                    }}
                    title={`${point.date}: ${point.value.toFixed(3)}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correlation Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <h5 className="text-gray-400 text-sm mb-2">Highest Correlation</h5>
          <p className="text-2xl font-bold text-emerald-500">0.89</p>
          <p className="text-sm text-gray-300">BTC ↔ ETH</p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <h5 className="text-gray-400 text-sm mb-2">Lowest Correlation</h5>
          <p className="text-2xl font-bold text-red-500">-0.76</p>
          <p className="text-sm text-gray-300">TSLA ↔ SPY</p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <h5 className="text-gray-400 text-sm mb-2">Avg Correlation</h5>
          <p className="text-2xl font-bold text-yellow-500">0.34</p>
          <p className="text-sm text-gray-300">Portfolio Diversification</p>
        </div>
      </div>
    </div>
  );
};