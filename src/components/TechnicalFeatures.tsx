import React, { useState, useEffect } from 'react';
import { Code, Play, Download, Settings, Zap, Database, Globe } from 'lucide-react';
import { TradingStrategy } from '../types';

export const TechnicalFeatures: React.FC = () => {
  const [strategies, setStrategies] = useState<TradingStrategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<TradingStrategy | null>(null);
  const [apiKeys, setApiKeys] = useState<any>({});
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [showApiDocs, setShowApiDocs] = useState(false);

  useEffect(() => {
    generateTradingStrategies();
    generateWebhooks();
  }, []);

  const generateTradingStrategies = () => {
    const tradingStrategies: TradingStrategy[] = [
      {
        id: 'strategy-1',
        name: 'Mean Reversion RSI',
        description: 'Buy when RSI < 30, sell when RSI > 70 with stop-loss at 5%',
        parameters: {
          rsiPeriod: 14,
          oversoldLevel: 30,
          overboughtLevel: 70,
          stopLoss: 0.05,
        },
        backtestResults: {
          totalReturn: 24.5,
          sharpeRatio: 1.8,
          maxDrawdown: -8.2,
          winRate: 68.5,
        },
        isActive: true,
      },
      {
        id: 'strategy-2',
        name: 'Momentum Breakout',
        description: 'Buy on volume breakout above 20-day high with trailing stop',
        parameters: {
          lookbackPeriod: 20,
          volumeMultiplier: 2.0,
          trailingStop: 0.08,
        },
        backtestResults: {
          totalReturn: 31.2,
          sharpeRatio: 1.4,
          maxDrawdown: -12.5,
          winRate: 58.3,
        },
        isActive: false,
      },
      {
        id: 'strategy-3',
        name: 'Pairs Trading',
        description: 'Trade correlation divergence between BTC and ETH',
        parameters: {
          correlationPeriod: 30,
          entryThreshold: 2.0,
          exitThreshold: 0.5,
        },
        backtestResults: {
          totalReturn: 18.7,
          sharpeRatio: 2.1,
          maxDrawdown: -5.8,
          winRate: 72.1,
        },
        isActive: true,
      },
    ];

    setStrategies(tradingStrategies);
  };

  const generateWebhooks = () => {
    const webhookList = [
      {
        id: 'webhook-1',
        name: 'Price Alert Webhook',
        url: 'https://api.example.com/price-alerts',
        events: ['price_threshold', 'volume_spike'],
        isActive: true,
      },
      {
        id: 'webhook-2',
        name: 'Portfolio Updates',
        url: 'https://api.example.com/portfolio',
        events: ['trade_executed', 'rebalance_complete'],
        isActive: true,
      },
    ];

    setWebhooks(webhookList);
  };

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/market-data',
      description: 'Get real-time market data for specified assets',
      parameters: ['symbols', 'timeframe', 'limit'],
    },
    {
      method: 'POST',
      endpoint: '/api/v1/portfolio/rebalance',
      description: 'Execute portfolio rebalancing based on target allocations',
      parameters: ['target_weights', 'threshold', 'dry_run'],
    },
    {
      method: 'GET',
      endpoint: '/api/v1/sentiment/analysis',
      description: 'Get sentiment analysis for specified assets',
      parameters: ['assets', 'sources', 'timeframe'],
    },
    {
      method: 'POST',
      endpoint: '/api/v1/alerts/create',
      description: 'Create custom alerts with specified conditions',
      parameters: ['asset', 'condition', 'threshold', 'delivery_method'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Technical Features</h3>
        <button
          onClick={() => setShowApiDocs(!showApiDocs)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Code className="h-4 w-4" />
          <span className="text-sm">API Docs</span>
        </button>
      </div>

      {/* API Documentation */}
      {showApiDocs && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
          <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-500" />
            <span>API Documentation</span>
          </h4>
          
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    endpoint.method === 'GET' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-purple-400 font-mono">{endpoint.endpoint}</code>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{endpoint.description}</p>
                
                <div>
                  <p className="text-gray-400 text-xs mb-1">Parameters:</p>
                  <div className="flex flex-wrap gap-1">
                    {endpoint.parameters.map((param, idx) => (
                      <span key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {param}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl">
            <h5 className="text-white font-medium mb-2">Authentication</h5>
            <p className="text-sm text-gray-300 mb-2">
              Include your API key in the Authorization header:
            </p>
            <code className="block bg-gray-700 p-2 rounded text-sm text-green-400">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
        </div>
      )}

      {/* Trading Strategy Testing */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Play className="h-5 w-5 text-green-500" />
          <span>Strategy Testing Environment</span>
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="text-white font-medium">Available Strategies</h5>
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy)}
                className={`bg-gray-800/50 rounded-xl p-4 border cursor-pointer transition-all duration-200 ${
                  selectedStrategy?.id === strategy.id 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h6 className="text-white font-semibold">{strategy.name}</h6>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    strategy.isActive 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-gray-500/20 text-gray-500'
                  }`}>
                    {strategy.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{strategy.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Return:</span>
                    <span className="text-emerald-500 ml-1 font-medium">
                      +{strategy.backtestResults.totalReturn}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Sharpe:</span>
                    <span className="text-white ml-1 font-medium">
                      {strategy.backtestResults.sharpeRatio}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Max DD:</span>
                    <span className="text-red-500 ml-1 font-medium">
                      {strategy.backtestResults.maxDrawdown}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="text-white ml-1 font-medium">
                      {strategy.backtestResults.winRate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedStrategy && (
            <div className="space-y-4">
              <h5 className="text-white font-medium">Strategy Parameters</h5>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h6 className="text-white font-semibold mb-3">{selectedStrategy.name}</h6>
                
                <div className="space-y-3">
                  {Object.entries(selectedStrategy.parameters).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <label className="text-gray-300 text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="number"
                        defaultValue={value}
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm w-20 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors duration-200">
                    Backtest
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm transition-colors duration-200">
                    Deploy Live
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* API Integration */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-500" />
          <span>API Integration</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-white font-medium mb-3">Exchange API Keys</h5>
            <div className="space-y-3">
              {['Binance', 'Coinbase', 'Kraken'].map((exchange) => (
                <div key={exchange} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{exchange}</span>
                    <span className="text-xs text-green-500">Connected</span>
                  </div>
                  <input
                    type="password"
                    placeholder="API Key"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 mb-2"
                  />
                  <input
                    type="password"
                    placeholder="Secret Key"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-medium mb-3">Custom Webhooks</h5>
            <div className="space-y-3">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{webhook.name}</span>
                    <span className={`text-xs ${webhook.isActive ? 'text-green-500' : 'text-gray-500'}`}>
                      {webhook.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <input
                    type="url"
                    value={webhook.url}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 mb-2"
                    readOnly
                  />
                  <div className="flex flex-wrap gap-1">
                    {webhook.events.map((event, idx) => (
                      <span key={idx} className="text-xs bg-purple-500/20 text-purple-500 px-2 py-1 rounded">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm transition-colors duration-200">
                Add New Webhook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400 mb-1">API Response Time</p>
          <p className="text-2xl font-bold text-white">45ms</p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <Database className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400 mb-1">Data Points/Day</p>
          <p className="text-2xl font-bold text-white">2.4M</p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <Settings className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400 mb-1">Active Strategies</p>
          <p className="text-2xl font-bold text-white">{strategies.filter(s => s.isActive).length}</p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <Globe className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400 mb-1">API Calls Today</p>
          <p className="text-2xl font-bold text-white">15.2K</p>
        </div>
      </div>
    </div>
  );
};