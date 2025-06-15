import React, { useState } from 'react';
import { Settings, User, Bell, Eye, Target, Plus, Trash2 } from 'lucide-react';
import { WatchlistItem, PriceAlert } from '../types';

export const PersonalizationPanel: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      id: 'watch-1',
      symbol: 'BTC',
      name: 'Bitcoin',
      alerts: [],
      sentiment_tracking: true,
      price_alerts: [
        { id: 'price-1', symbol: 'BTC', targetPrice: 50000, type: 'above', isActive: true }
      ],
      notes: 'Long-term hold, DCA strategy'
    },
    {
      id: 'watch-2',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      alerts: [],
      sentiment_tracking: true,
      price_alerts: [],
      notes: 'Watching for earnings impact'
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [preferences, setPreferences] = useState({
    riskTolerance: 'moderate',
    investmentHorizon: 'long-term',
    preferredSectors: ['technology', 'crypto'],
    notificationFrequency: 'important',
  });

  const addToWatchlist = (symbol: string, name: string) => {
    const newItem: WatchlistItem = {
      id: `watch-${Date.now()}`,
      symbol,
      name,
      alerts: [],
      sentiment_tracking: true,
      price_alerts: [],
    };
    setWatchlist(prev => [...prev, newItem]);
    setShowAddForm(false);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  const toggleSentimentTracking = (id: string) => {
    setWatchlist(prev => prev.map(item =>
      item.id === id ? { ...item, sentiment_tracking: !item.sentiment_tracking } : item
    ));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Personalization & Settings</h3>

      {/* User Preferences */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <User className="h-5 w-5 text-blue-500" />
          <span>Investment Profile</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Risk Tolerance
              </label>
              <select
                value={preferences.riskTolerance}
                onChange={(e) => setPreferences(prev => ({ ...prev, riskTolerance: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Investment Horizon
              </label>
              <select
                value={preferences.investmentHorizon}
                onChange={(e) => setPreferences(prev => ({ ...prev, investmentHorizon: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="short-term">Short-term (&lt; 1 year)</option>
                <option value="medium-term">Medium-term (1-5 years)</option>
                <option value="long-term">Long-term (&gt; 5 years)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Sectors
              </label>
              <div className="space-y-2">
                {['Technology', 'Crypto', 'Healthcare', 'Finance', 'Energy'].map(sector => (
                  <label key={sector} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.preferredSectors.includes(sector.toLowerCase())}
                      onChange={(e) => {
                        const sectorLower = sector.toLowerCase();
                        setPreferences(prev => ({
                          ...prev,
                          preferredSectors: e.target.checked
                            ? [...prev.preferredSectors, sectorLower]
                            : prev.preferredSectors.filter(s => s !== sectorLower)
                        }));
                      }}
                      className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-300">{sector}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notification Frequency
              </label>
              <select
                value={preferences.notificationFrequency}
                onChange={(e) => setPreferences(prev => ({ ...prev, notificationFrequency: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All notifications</option>
                <option value="important">Important only</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist Management */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-semibold flex items-center space-x-2">
            <Eye className="h-5 w-5 text-green-500" />
            <span>Personal Watchlist</span>
          </h4>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>Add Asset</span>
          </button>
        </div>

        <div className="space-y-3">
          {watchlist.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="text-white font-semibold">{item.symbol}</h5>
                  <p className="text-sm text-gray-400">{item.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSentimentTracking(item.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                      item.sentiment_tracking
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    Sentiment Tracking
                  </button>
                  <button
                    onClick={() => removeFromWatchlist(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {item.notes && (
                <p className="text-sm text-gray-300 mb-2">{item.notes}</p>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {item.price_alerts.length} price alerts • {item.alerts.length} smart alerts
                </span>
                <button className="text-purple-500 hover:text-purple-400 transition-colors duration-200">
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Sentiment Tracking */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <Target className="h-5 w-5 text-purple-500" />
          <span>Portfolio Sentiment Analysis</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-400 mb-1">Overall Sentiment</p>
            <p className="text-2xl font-bold text-emerald-500">72</p>
            <p className="text-xs text-gray-400">Bullish</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-400 mb-1">Risk Score</p>
            <p className="text-2xl font-bold text-yellow-500">45</p>
            <p className="text-xs text-gray-400">Moderate</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-400 mb-1">Diversification</p>
            <p className="text-2xl font-bold text-blue-500">68%</p>
            <p className="text-xs text-gray-400">Good</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-800/50 rounded-xl">
          <h5 className="text-white font-medium mb-2">Recommendations</h5>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Consider reducing exposure to high-sentiment assets</li>
            <li>• Add defensive positions to balance portfolio risk</li>
            <li>• Monitor crypto correlation with tech stocks</li>
          </ul>
        </div>
      </div>

      {/* Add Asset Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Add to Watchlist</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                addToWatchlist(
                  formData.get('symbol') as string,
                  formData.get('name') as string
                );
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Symbol
                </label>
                <input
                  name="symbol"
                  type="text"
                  placeholder="e.g., BTC, AAPL"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g., Bitcoin, Apple Inc."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-200"
                >
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};