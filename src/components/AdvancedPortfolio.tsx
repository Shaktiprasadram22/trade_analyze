import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, BarChart3, AlertTriangle, Target } from 'lucide-react';
import { PortfolioAsset, RiskMetrics } from '../types';

export const AdvancedPortfolio: React.FC = () => {
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [rebalanceRecommendations, setRebalanceRecommendations] = useState<any[]>([]);

  useEffect(() => {
    generatePortfolioAssets();
    calculateRiskMetrics();
    generateRebalanceRecommendations();
  }, []);

  const generatePortfolioAssets = () => {
    const portfolioAssets: PortfolioAsset[] = [
      {
        id: 'asset-1',
        symbol: 'BTC',
        name: 'Bitcoin',
        quantity: 0.5,
        currentPrice: 45000,
        purchasePrice: 42000,
        change24h: 2.5,
        marketCap: 850000000000,
        sharpeRatio: 1.2,
        volatility: 0.65,
        beta: 1.8,
      },
      {
        id: 'asset-2',
        symbol: 'ETH',
        name: 'Ethereum',
        quantity: 5,
        currentPrice: 2800,
        purchasePrice: 2600,
        change24h: 1.8,
        marketCap: 340000000000,
        sharpeRatio: 1.1,
        volatility: 0.72,
        beta: 1.6,
      },
      {
        id: 'asset-3',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        quantity: 10,
        currentPrice: 185,
        purchasePrice: 180,
        change24h: 0.8,
        marketCap: 2900000000000,
        sharpeRatio: 0.9,
        volatility: 0.28,
        beta: 1.2,
      },
      {
        id: 'asset-4',
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        quantity: 3,
        currentPrice: 250,
        purchasePrice: 240,
        change24h: -1.2,
        marketCap: 800000000000,
        sharpeRatio: 0.7,
        volatility: 0.85,
        beta: 2.1,
      },
    ];
    setAssets(portfolioAssets);
  };

  const calculateRiskMetrics = () => {
    const metrics: RiskMetrics = {
      sharpeRatio: 1.05,
      volatility: 0.42,
      beta: 1.45,
      var95: -0.08, // 8% Value at Risk
      maxDrawdown: -0.15, // 15% max drawdown
      diversificationRatio: 0.72,
    };
    setRiskMetrics(metrics);
  };

  const generateRebalanceRecommendations = () => {
    const recommendations = [
      {
        action: 'Reduce',
        asset: 'TSLA',
        currentWeight: 15.2,
        targetWeight: 12.0,
        reason: 'High volatility exposure, reduce risk',
        priority: 'high',
      },
      {
        action: 'Increase',
        asset: 'AAPL',
        currentWeight: 28.5,
        targetWeight: 32.0,
        reason: 'Defensive allocation, stable returns',
        priority: 'medium',
      },
      {
        action: 'Add',
        asset: 'SPY',
        currentWeight: 0,
        targetWeight: 8.0,
        reason: 'Improve diversification with index exposure',
        priority: 'low',
      },
    ];
    setRebalanceRecommendations(recommendations);
  };

  const totalValue = assets.reduce((sum, asset) => sum + (asset.currentPrice * asset.quantity), 0);
  const totalPnL = assets.reduce((sum, asset) => 
    sum + ((asset.currentPrice - asset.purchasePrice) * asset.quantity), 0
  );
  const totalPnLPercent = assets.length > 0 ? 
    (totalPnL / assets.reduce((sum, asset) => sum + (asset.purchasePrice * asset.quantity), 0)) * 100 : 0;

  const getAssetWeight = (asset: PortfolioAsset) => {
    const assetValue = asset.currentPrice * asset.quantity;
    return (assetValue / totalValue) * 100;
  };

  const getRiskColor = (value: number, type: 'sharpe' | 'volatility' | 'beta') => {
    switch (type) {
      case 'sharpe':
        if (value >= 1.5) return 'text-emerald-500';
        if (value >= 1.0) return 'text-yellow-500';
        return 'text-red-500';
      case 'volatility':
        if (value <= 0.2) return 'text-emerald-500';
        if (value <= 0.4) return 'text-yellow-500';
        return 'text-red-500';
      case 'beta':
        if (value <= 1.2) return 'text-emerald-500';
        if (value <= 1.8) return 'text-yellow-500';
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Advanced Portfolio Management</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-white">
            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total P&L</p>
          <div className="flex items-center space-x-2">
            <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            {totalPnL >= 0 ? (
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total Return</p>
          <p className={`text-2xl font-bold ${totalPnLPercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
          </p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Assets</p>
          <p className="text-2xl font-bold text-white">{assets.length}</p>
        </div>
      </div>

      {/* Risk Metrics */}
      {riskMetrics && (
        <div className="bg-gray-900/50 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <span>Risk Assessment</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Sharpe Ratio</p>
              <p className={`text-xl font-bold ${getRiskColor(riskMetrics.sharpeRatio, 'sharpe')}`}>
                {riskMetrics.sharpeRatio.toFixed(2)}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Volatility</p>
              <p className={`text-xl font-bold ${getRiskColor(riskMetrics.volatility, 'volatility')}`}>
                {(riskMetrics.volatility * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Beta</p>
              <p className={`text-xl font-bold ${getRiskColor(riskMetrics.beta, 'beta')}`}>
                {riskMetrics.beta.toFixed(2)}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">VaR (95%)</p>
              <p className="text-xl font-bold text-red-500">
                {(riskMetrics.var95 * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Max Drawdown</p>
              <p className="text-xl font-bold text-red-500">
                {(riskMetrics.maxDrawdown * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Diversification</p>
              <p className="text-xl font-bold text-purple-500">
                {(riskMetrics.diversificationRatio * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Assets */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4">Portfolio Holdings</h4>
        
        <div className="space-y-4">
          {assets.map((asset) => {
            const pnl = (asset.currentPrice - asset.purchasePrice) * asset.quantity;
            const pnlPercent = ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;
            const weight = getAssetWeight(asset);
            
            return (
              <div
                key={asset.id}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h5 className="font-semibold text-white">{asset.symbol}</h5>
                      <p className="text-sm text-gray-400">{asset.name}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">
                      ${(asset.currentPrice * asset.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">{weight.toFixed(1)}% of portfolio</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Quantity</p>
                    <p className="text-white font-medium">{asset.quantity}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Current Price</p>
                    <p className="text-white font-medium">${asset.currentPrice.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">P&L</p>
                    <p className={`font-medium ${pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(1)}%)
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Sharpe Ratio</p>
                    <p className={`font-medium ${getRiskColor(asset.sharpeRatio || 0, 'sharpe')}`}>
                      {asset.sharpeRatio?.toFixed(2) || 'N/A'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Volatility</p>
                    <p className={`font-medium ${getRiskColor(asset.volatility || 0, 'volatility')}`}>
                      {asset.volatility ? (asset.volatility * 100).toFixed(1) + '%' : 'N/A'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Beta</p>
                    <p className={`font-medium ${getRiskColor(asset.beta || 0, 'beta')}`}>
                      {asset.beta?.toFixed(2) || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rebalancing Recommendations */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Target className="h-5 w-5 text-orange-500" />
          <span>Rebalancing Recommendations</span>
        </h4>
        
        <div className="space-y-3">
          {rebalanceRecommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.toUpperCase()}
                  </span>
                  <span className="text-white font-semibold">{rec.action} {rec.asset}</span>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {rec.currentWeight.toFixed(1)}% → {rec.targetWeight.toFixed(1)}%
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-300">{rec.reason}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors duration-200">
            Apply Recommended Rebalancing
          </button>
        </div>
      </div>
    </div>
  );
};