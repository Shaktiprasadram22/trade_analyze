import React, { useState } from 'react';
import { Bell, Plus, Trash2, Mail, Smartphone, Monitor, ToggleLeft as Toggle } from 'lucide-react';
import { SmartAlert } from '../types';

export const SmartAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<SmartAlert[]>([
    {
      id: 'alert-1',
      type: 'sentiment_threshold',
      asset: 'BTC',
      condition: { threshold: 80 },
      isActive: true,
      deliveryMethod: 'push',
      description: 'Alert when Bitcoin sentiment exceeds 80',
    },
    {
      id: 'alert-2',
      type: 'sentiment_shift',
      asset: 'TSLA',
      condition: { percentage: 15, timeframe: '1h' },
      isActive: true,
      deliveryMethod: 'email',
      description: 'Alert when Tesla sentiment shifts by 15% in 1 hour',
    },
    {
      id: 'alert-3',
      type: 'volume_spike',
      asset: 'ETH',
      condition: { percentage: 200, timeframe: '30m' },
      isActive: false,
      deliveryMethod: 'sms',
      description: 'Alert when Ethereum volume spikes by 200% in 30 minutes',
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'sentiment_threshold': return '📊';
      case 'sentiment_shift': return '📈';
      case 'news_impact': return '📰';
      case 'volume_spike': return '📊';
      default: return '🔔';
    }
  };

  const getDeliveryIcon = (method: string) => {
    switch (method) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <Smartphone className="h-4 w-4" />;
      case 'push': return <Monitor className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Smart Alerts</h3>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Create Alert</span>
        </button>
      </div>

      {/* Alert Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { type: 'sentiment_threshold', label: 'Sentiment Threshold', count: alerts.filter(a => a.type === 'sentiment_threshold').length },
          { type: 'sentiment_shift', label: 'Sentiment Shifts', count: alerts.filter(a => a.type === 'sentiment_shift').length },
          { type: 'news_impact', label: 'News Impact', count: alerts.filter(a => a.type === 'news_impact').length },
          { type: 'volume_spike', label: 'Volume Spikes', count: alerts.filter(a => a.type === 'volume_spike').length },
        ].map((category) => (
          <div key={category.type} className="bg-gray-900/50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{getAlertTypeIcon(category.type)}</div>
            <h4 className="text-white font-semibold mb-1">{category.label}</h4>
            <p className="text-2xl font-bold text-purple-500">{category.count}</p>
            <p className="text-xs text-gray-400">Active alerts</p>
          </div>
        ))}
      </div>

      {/* Active Alerts List */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold">Your Alerts</h4>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-xl">{getAlertTypeIcon(alert.type)}</div>
                <div>
                  <h5 className="text-white font-medium">{alert.asset}</h5>
                  <p className="text-sm text-gray-400">{alert.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-400">
                  {getDeliveryIcon(alert.deliveryMethod)}
                  <span className="text-xs capitalize">{alert.deliveryMethod}</span>
                </div>
                
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    alert.isActive 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  <Toggle className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {alert.lastTriggered && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  Last triggered: {new Date(alert.lastTriggered).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Create Smart Alert</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Alert Type
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                  <option value="sentiment_threshold">Sentiment Threshold</option>
                  <option value="sentiment_shift">Sentiment Shift</option>
                  <option value="news_impact">News Impact</option>
                  <option value="volume_spike">Volume Spike</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Asset
                </label>
                <input
                  type="text"
                  placeholder="e.g., BTC, AAPL, TSLA"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Threshold Value
                </label>
                <input
                  type="number"
                  placeholder="e.g., 80"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Delivery Method
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                  <option value="push">Push Notification</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors duration-200"
                >
                  Create Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};