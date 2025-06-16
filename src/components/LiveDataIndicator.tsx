import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Activity } from 'lucide-react';

export const LiveDataIndicator: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [dataPoints, setDataPoints] = useState(0);
  const [latency, setLatency] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate connection status
      setIsConnected(Math.random() > 0.1);
      
      // Simulate data points
      setDataPoints(prev => prev + Math.floor(Math.random() * 10) + 1);
      
      // Simulate latency
      setLatency(Math.floor(Math.random() * 50) + 20);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center space-x-2">
        {isConnected ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        <span className={isConnected ? 'text-green-500' : 'text-red-500'}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Activity className="h-4 w-4 text-blue-500" />
        <span className="text-gray-300">{dataPoints.toLocaleString()} pts</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-gray-300">{latency}ms</span>
      </div>
    </div>
  );
};