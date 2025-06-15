import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, TrendingUp, TrendingDown, Filter, Search, Star } from 'lucide-react';
import { NewsArticle } from '../types';

export const NewsAggregation: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [filterSentiment, setFilterSentiment] = useState<string>('all');
  const [filterImpact, setFilterImpact] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'time' | 'impact'>('relevance');

  useEffect(() => {
    generateNewsArticles();
  }, []);

  useEffect(() => {
    filterAndSortNews();
  }, [news, filterSentiment, filterImpact, filterSource, searchTerm, sortBy]);

  const generateNewsArticles = () => {
    const articles: NewsArticle[] = [
      {
        id: 'news-1',
        headline: 'Bitcoin ETF Approval Drives Institutional Adoption to Record Highs',
        summary: 'Major financial institutions increase Bitcoin allocations following ETF approval, with over $5B in inflows recorded this week.',
        aiSummary: 'ETF approval catalyzes institutional Bitcoin adoption. Record $5B weekly inflows signal mainstream acceptance.',
        source: 'Bloomberg',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        impact: 'high',
        sentiment: 85,
        sentimentLabel: '🚀 Bullish',
        relatedAssets: ['BTC', 'COIN', 'MSTR'],
        category: 'crypto',
        relevanceScore: 95,
      },
      {
        id: 'news-2',
        headline: 'Tesla Q4 Earnings Beat Expectations Despite Production Challenges',
        summary: 'Tesla reports strong Q4 results with 20% YoY revenue growth, though production targets remain challenging amid supply chain issues.',
        aiSummary: 'Tesla beats Q4 earnings with 20% revenue growth. Production challenges persist due to supply chain constraints.',
        source: 'CNBC',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        impact: 'high',
        sentiment: 75,
        sentimentLabel: '🚀 Bullish',
        relatedAssets: ['TSLA', 'NIO', 'RIVN'],
        category: 'earnings',
        relevanceScore: 88,
      },
      {
        id: 'news-3',
        headline: 'Federal Reserve Signals Potential Rate Cuts Amid Cooling Inflation',
        summary: 'Fed officials hint at possible rate reductions as inflation metrics show sustained decline for third consecutive month.',
        aiSummary: 'Fed considers rate cuts as inflation cools for third month. Policy shift could benefit risk assets.',
        source: 'Reuters',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        impact: 'high',
        sentiment: 70,
        sentimentLabel: '🚀 Bullish',
        relatedAssets: ['SPY', 'QQQ', 'BTC', 'GOLD'],
        category: 'policy',
        relevanceScore: 92,
      },
      {
        id: 'news-4',
        headline: 'Major Crypto Exchange Faces Regulatory Scrutiny Over Compliance Issues',
        summary: 'Regulatory authorities investigate leading cryptocurrency exchange for potential violations of anti-money laundering protocols.',
        aiSummary: 'Crypto exchange under regulatory investigation for AML compliance. Market sentiment turns cautious.',
        source: 'CoinDesk',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        impact: 'medium',
        sentiment: 25,
        sentimentLabel: '🔻 Bearish',
        relatedAssets: ['BTC', 'ETH', 'BNB'],
        category: 'crypto',
        relevanceScore: 78,
      },
      {
        id: 'news-5',
        headline: 'AI Chip Demand Surge Propels NVIDIA to New Record Highs',
        summary: 'NVIDIA stock reaches all-time high as artificial intelligence chip demand continues to exceed supply capacity.',
        aiSummary: 'NVIDIA hits record high on AI chip demand surge. Supply constraints limit growth potential.',
        source: 'Bloomberg',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        impact: 'medium',
        sentiment: 90,
        sentimentLabel: '🚀 Bullish',
        relatedAssets: ['NVDA', 'AMD', 'INTC'],
        category: 'sector',
        relevanceScore: 85,
      },
      {
        id: 'news-6',
        headline: 'Indian Markets Show Resilience Amid Global Economic Uncertainty',
        summary: 'Nifty 50 outperforms global indices as domestic consumption remains strong despite international headwinds.',
        aiSummary: 'Indian markets outperform globally. Strong domestic consumption offsets international concerns.',
        source: 'Economic Times',
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        impact: 'medium',
        sentiment: 65,
        sentimentLabel: '⚠️ Neutral',
        relatedAssets: ['NIFTY', 'SENSEX', 'INFY'],
        category: 'market',
        relevanceScore: 72,
      },
    ];

    setNews(articles);
  };

  const filterAndSortNews = () => {
    let filtered = news.filter(article => {
      const sentimentMatch = filterSentiment === 'all' || 
        (filterSentiment === 'bullish' && article.sentiment >= 70) ||
        (filterSentiment === 'neutral' && article.sentiment >= 30 && article.sentiment < 70) ||
        (filterSentiment === 'bearish' && article.sentiment < 30);
      
      const impactMatch = filterImpact === 'all' || article.impact === filterImpact;
      const sourceMatch = filterSource === 'all' || article.source === filterSource;
      const searchMatch = searchTerm === '' || 
        article.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.relatedAssets.some(asset => asset.toLowerCase().includes(searchTerm.toLowerCase()));

      return sentimentMatch && impactMatch && sourceMatch && searchMatch;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevanceScore - a.relevanceScore;
        case 'time':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'impact':
          const impactOrder = { high: 3, medium: 2, low: 1 };
          return impactOrder[b.impact] - impactOrder[a.impact];
        default:
          return 0;
      }
    });

    setFilteredNews(filtered);
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment >= 70) return '🚀';
    if (sentiment >= 30) return '⚠️';
    return '🔻';
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return 'text-emerald-500';
    if (sentiment >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500 bg-red-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const sources = ['all', ...Array.from(new Set(news.map(article => article.source)))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">News Aggregation & Analysis</h3>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-emerald-500 font-medium">LIVE</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900/50 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <select
            value={filterSentiment}
            onChange={(e) => setFilterSentiment(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Sentiment</option>
            <option value="bullish">🚀 Bullish</option>
            <option value="neutral">⚠️ Neutral</option>
            <option value="bearish">🔻 Bearish</option>
          </select>

          <select
            value={filterImpact}
            onChange={(e) => setFilterImpact(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Impact</option>
            <option value="high">High Impact</option>
            <option value="medium">Medium Impact</option>
            <option value="low">Low Impact</option>
          </select>

          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            {sources.map(source => (
              <option key={source} value={source}>
                {source === 'all' ? 'All Sources' : source}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="time">Sort by Time</option>
            <option value="impact">Sort by Impact</option>
          </select>
        </div>
      </div>

      {/* News Articles */}
      <div className="space-y-4">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(article.impact)}`}>
                    {article.impact.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">{article.source}</span>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(article.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-yellow-500">{article.relevanceScore}</span>
                  </div>
                </div>
                
                <h4 className="text-white font-semibold text-lg mb-3 leading-tight">
                  {article.headline}
                </h4>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="bg-gray-800/50 rounded-lg p-3 border-l-4 border-purple-500">
                    <p className="text-sm text-purple-300 font-medium">
                      AI Summary: {article.aiSummary}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="ml-4 text-right">
                <div className={`text-2xl font-bold ${getSentimentColor(article.sentiment)} mb-1`}>
                  {getSentimentIcon(article.sentiment)} {article.sentiment}
                </div>
                <p className="text-xs text-gray-400">Sentiment Score</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-400">Related Assets:</span>
                  <div className="flex space-x-1">
                    {article.relatedAssets.slice(0, 4).map((asset, index) => (
                      <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {asset}
                      </span>
                    ))}
                    {article.relatedAssets.length > 4 && (
                      <span className="text-xs text-gray-400">+{article.relatedAssets.length - 4}</span>
                    )}
                  </div>
                </div>
                
                <span className="text-xs bg-purple-500/20 text-purple-500 px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              
              <button className="text-purple-500 hover:text-purple-400 transition-colors duration-200">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* News Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Total Articles</p>
          <p className="text-2xl font-bold text-white">{filteredNews.length}</p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Bullish News</p>
          <p className="text-2xl font-bold text-emerald-500">
            {filteredNews.filter(n => n.sentiment >= 70).length}
          </p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">High Impact</p>
          <p className="text-2xl font-bold text-red-500">
            {filteredNews.filter(n => n.impact === 'high').length}
          </p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Avg Relevance</p>
          <p className="text-2xl font-bold text-yellow-500">
            {filteredNews.length > 0 ? 
              Math.round(filteredNews.reduce((sum, n) => sum + n.relevanceScore, 0) / filteredNews.length) : 0
            }
          </p>
        </div>
      </div>
    </div>
  );
};