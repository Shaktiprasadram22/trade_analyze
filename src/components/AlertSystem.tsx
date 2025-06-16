import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, TrendingUp } from 'lucide-react';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  asset?: string;
  action?: () => void;
}

export const AlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const alertTypes = ['success', 'warning', 'info'] as const;
        const assets = ['BTC', 'ETH', 'AAPL', 'TSLA', 'NVDA'];
        const messages = [
          'Price target reached',
          'Unusual volume detected',
          'Sentiment shift detected',
          'New recommendation available',
          'Portfolio rebalancing suggested'
        ];

        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          title: `${assets[Math.floor(Math.random() * assets.length)]} Alert`,
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date(),
          asset: assets[Math.floor(Math.random() * assets.length)],
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-500 bg-green-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'error': return 'border-red-500 bg-red-500/10';
      default: return 'border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200"
      >
        <Bell className="h-5 w-5" />
        {alerts.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {alerts.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Notifications</h3>
          </div>
          
          <div className="p-2">
            {alerts.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No new alerts</p>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border mb-2 ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{alert.title}</h4>
                        <p className="text-gray-300 text-xs mt-1">{alert.message}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {alert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAlert(alert.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};