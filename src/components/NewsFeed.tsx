import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, TrendingUp, AlertTriangle, Filter } from 'lucide-react';
import { NewsArticle } from '../types';
import { generateNewsArticles } from '../utils/mockData';

export const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filterImpact, setFilterImpact] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [filterSource, setFilterSource] = useState<string>('all');

  useEffect(() => {
    setNews(generateNewsArticles());
    
    // Simulate new articles every 30 seconds
    const interval = setInterval(() => {
      const newArticle = generateNewsArticles()[0];
      newArticle.id = `news-${Date.now()}`;
      newArticle.timestamp = new Date().toISOString();
      setNews(prev => [newArticle, ...prev.slice(0, 19)]); // Keep latest 20 articles
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500 bg-red-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return 'text-emerald-500';
    if (sentiment >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const sources = ['all', ...Array.from(new Set(news.map(article => article.source)))];
  
  const filteredNews = news.filter(article => {
    const impactMatch = filterImpact === 'all' || article.impact === filterImpact;
    const sourceMatch = filterSource === 'all' || article.source === filterSource;
    return impactMatch && sourceMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Live News Feed</h3>
        <div className="flex items-center space-x-3">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterImpact}
            onChange={(e) => setFilterImpact(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Impact</option>
            <option value="high">High Impact</option>
            <option value="medium">Medium Impact</option>
            <option value="low">Low Impact</option>
          </select>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            {sources.map(source => (
              <option key={source} value={source}>
                {source === 'all' ? 'All Sources' : source}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(article.impact)}`}>
                    {article.impact.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">{article.source}</span>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(article.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
                <h4 className="text-white font-semibold mb-2 leading-tight">{article.headline}</h4>
                <p className="text-sm text-gray-300 mb-3">{article.summary}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Sentiment:</span>
                  <span className={`text-xs font-medium ${getSentimentColor(article.sentiment)}`}>
                    {article.sentiment}/100
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-400">Assets:</span>
                  <div className="flex space-x-1">
                    {article.relatedAssets.slice(0, 3).map((asset, index) => (
                      <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {asset}
                      </span>
                    ))}
                    {article.relatedAssets.length > 3 && (
                      <span className="text-xs text-gray-400">+{article.relatedAssets.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <button className="text-purple-500 hover:text-purple-400 transition-colors duration-200">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};