import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, Download, TrendingUp } from 'lucide-react';

interface TrendData {
  time: string;
  sentiment: number;
  volume: number;
  price: number;
}

export const TrendVisualization: React.FC = () => {
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [selectedAsset, setSelectedAsset] = useState('BTC');

  useEffect(() => {
    // Generate mock trend data
    const generateTrendData = () => {
      const data: TrendData[] = [];
      const now = new Date();
      const intervals = selectedTimeframe === '1h' ? 60 : 
                      selectedTimeframe === '24h' ? 24 : 
                      selectedTimeframe === '7d' ? 7 : 30;
      
      for (let i = intervals; i >= 0; i--) {
        const time = new Date(now.getTime() - i * (selectedTimeframe === '1h' ? 60000 : 
                                                   selectedTimeframe === '24h' ? 3600000 : 
                                                   selectedTimeframe === '7d' ? 86400000 : 
                                                   86400000 * 30));
        data.push({
          time: selectedTimeframe === '1h' ? time.toLocaleTimeString() :
                selectedTimeframe === '24h' ? time.getHours() + ':00' :
                time.toLocaleDateString(),
          sentiment: Math.floor(Math.random() * 100),
          volume: Math.floor(Math.random() * 1000000),
          price: 45000 + Math.random() * 10000,
        });
      }
      return data;
    };

    setTrendData(generateTrendData());
  }, [selectedTimeframe, selectedAsset]);

  const assets = ['BTC', 'ETH', 'AAPL', 'TSLA', 'GOOGL'];
  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Sentiment Trend Analysis</h3>
        <div className="flex items-center space-x-3">
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            {assets.map(asset => (
              <option key={asset} value={asset}>{asset}</option>
            ))}
          </select>
          
          <div className="flex bg-gray-700 rounded-lg p-1">
            {timeframes.map(tf => (
              <button
                key={tf.value}
                onClick={() => setSelectedTimeframe(tf.value as any)}
                className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
                  selectedTimeframe === tf.value
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Sentiment Timeline Chart */}
      <div className="bg-gray-900/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-4">Sentiment Score Over Time</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Area
                type="monotone"
                dataKey="sentiment"
                stroke="#8B5CF6"
                fill="url(#sentimentGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volume Correlation Chart */}
      <div className="bg-gray-900/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-4">Volume vs Sentiment Correlation</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                yAxisId="sentiment"
                stroke="#9CA3AF"
                fontSize={12}
                domain={[0, 100]}
              />
              <YAxis 
                yAxisId="volume"
                orientation="right"
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Line
                yAxisId="sentiment"
                type="monotone"
                dataKey="sentiment"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                name="Sentiment"
              />
              <Line
                yAxisId="volume"
                type="monotone"
                dataKey="volume"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={false}
                name="Volume"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Events Timeline */}
      <div className="bg-gray-900/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-4">Key Events & Sentiment Shifts</h4>
        <div className="space-y-3">
          {[
            {
              time: '2 hours ago',
              event: 'Fed announces interest rate decision',
              impact: 'Positive sentiment surge (+15 points)',
              color: 'text-emerald-500'
            },
            {
              time: '6 hours ago',
              event: 'Major exchange hack reported',
              impact: 'Negative sentiment drop (-22 points)',
              color: 'text-red-500'
            },
            {
              time: '1 day ago',
              event: 'Tesla earnings beat expectations',
              impact: 'Moderate positive impact (+8 points)',
              color: 'text-green-500'
            },
          ].map((event, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                <TrendingUp className={`h-4 w-4 ${event.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{event.event}</span>
                  <span className="text-xs text-gray-400">{event.time}</span>
                </div>
                <p className={`text-sm ${event.color}`}>{event.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};