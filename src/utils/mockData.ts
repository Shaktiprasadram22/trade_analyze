import { TrendingTopic, PortfolioAsset, MarketSentiment, ChartDataPoint, NiftyStock, NewsArticle, SentimentHeatmapData, MarketInsight, InfluencerSentiment, FOMOIndex } from '../types';

// Generate realistic mock data
export const generateTrendingTopics = (): TrendingTopic[] => {
  const topics = [
    { topic: 'Bitcoin', category: 'crypto' as const },
    { topic: 'Ethereum', category: 'crypto' as const },
    { topic: 'Tesla', category: 'stocks' as const },
    { topic: 'Apple', category: 'stocks' as const },
    { topic: 'Fed Meeting', category: 'general' as const },
    { topic: 'Inflation Data', category: 'general' as const },
    { topic: 'Solana', category: 'crypto' as const },
    { topic: 'NVIDIA', category: 'stocks' as const },
  ];

  return topics.map((item, index) => ({
    id: `trend-${index}`,
    ...item,
    mentions: Math.floor(Math.random() * 50000) + 1000,
    sentiment: Math.floor(Math.random() * 100),
    velocity: Math.floor(Math.random() * 200) - 100,
    change24h: (Math.random() - 0.5) * 20,
    historicalData: generateHistoricalData(),
  }));
};

export const generateNiftyStocks = (): NiftyStock[] => {
  const stocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      basePrice: 2450,
      sector: 'Oil & Gas',
      newsReason: 'Q3 earnings beat estimates with 15% YoY growth in petrochemicals division',
      newsType: 'earnings' as const,
      sentiment: 'positive' as const,
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      basePrice: 3680,
      sector: 'IT Services',
      newsReason: 'Signed $2.5B multi-year deal with major European bank for digital transformation',
      newsType: 'partnership' as const,
      sentiment: 'positive' as const,
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Ltd',
      basePrice: 1620,
      sector: 'Banking',
      newsReason: 'RBI approves merger completion, creating India\'s largest private bank',
      newsType: 'merger' as const,
      sentiment: 'positive' as const,
    },
    {
      symbol: 'INFY',
      name: 'Infosys Ltd',
      basePrice: 1485,
      sector: 'IT Services',
      newsReason: 'Guidance cut due to client budget constraints in BFSI sector',
      newsType: 'financial' as const,
      sentiment: 'negative' as const,
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Ltd',
      basePrice: 985,
      sector: 'Banking',
      newsReason: 'Strong Q3 results with NII growth of 18% and reduced NPAs',
      newsType: 'earnings' as const,
      sentiment: 'positive' as const,
    },
    {
      symbol: 'BHARTIARTL',
      name: 'Bharti Airtel Ltd',
      basePrice: 1125,
      sector: 'Telecom',
      newsReason: 'Launches 5G services in 50 new cities, subscriber base grows 12%',
      newsType: 'product' as const,
      sentiment: 'positive' as const,
    },
    {
      symbol: 'ITC',
      name: 'ITC Ltd',
      basePrice: 415,
      sector: 'FMCG',
      newsReason: 'Cigarette sales decline 8% due to new health regulations',
      newsType: 'regulatory' as const,
      sentiment: 'negative' as const,
    },
    {
      symbol: 'LT',
      name: 'Larsen & Toubro Ltd',
      basePrice: 2890,
      sector: 'Construction',
      newsReason: 'Wins ₹15,000 cr infrastructure project from Indian Railways',
      newsType: 'partnership' as const,
      sentiment: 'positive' as const,
    },
    {
      symbol: 'SBIN',
      name: 'State Bank of India',
      basePrice: 575,
      sector: 'Banking',
      newsReason: 'Provisions for bad loans increase by 25% in Q3',
      newsType: 'financial' as const,
      sentiment: 'negative' as const,
    },
    {
      symbol: 'ASIANPAINT',
      name: 'Asian Paints Ltd',
      basePrice: 3250,
      sector: 'Paints',
      newsReason: 'Raw material costs surge 20%, margin pressure expected',
      newsType: 'financial' as const,
      sentiment: 'negative' as const,
    },
    {
      symbol: 'MARUTI',
      name: 'Maruti Suzuki India Ltd',
      basePrice: 10500,
      sector: 'Automobile',
      newsReason: 'December sales up 28% YoY, highest monthly sales in company history',
      newsType: 'financial' as const,
      sentiment: 'positive' as const,
    },
    {
      symbol: 'WIPRO',
      name: 'Wipro Ltd',
      basePrice: 425,
      sector: 'IT Services',
      newsReason: 'CEO resignation creates uncertainty, stock under pressure',
      newsType: 'legal' as const,
      sentiment: 'negative' as const,
    },
  ];

  return stocks.map((stock, index) => {
    const changePercent = stock.sentiment === 'positive' 
      ? Math.random() * 8 + 2  // 2% to 10% gain
      : stock.sentiment === 'negative'
      ? -(Math.random() * 6 + 1)  // -1% to -7% loss
      : (Math.random() - 0.5) * 4;  // -2% to 2% neutral

    const currentPrice = stock.basePrice * (1 + changePercent / 100);
    const change = currentPrice - stock.basePrice;

    return {
      id: `nifty-${index}`,
      symbol: stock.symbol,
      name: stock.name,
      currentPrice: Math.round(currentPrice * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      marketCap: Math.floor(Math.random() * 500000) + 50000,
      newsReason: stock.newsReason,
      newsType: stock.newsType,
      sentiment: stock.sentiment,
      trendingScore: Math.floor(Math.random() * 100) + 50,
      lastUpdated: new Date().toISOString(),
      sector: stock.sector,
    };
  });
};

export const generateNewsArticles = (): NewsArticle[] => {
  const articles = [
    {
      headline: "Fed Signals Potential Rate Cuts as Inflation Shows Signs of Cooling",
      summary: "Federal Reserve officials hint at possible interest rate reductions in upcoming meetings as core inflation metrics decline for third consecutive month.",
      source: 'Bloomberg' as const,
      impact: 'high' as const,
      sentiment: 75,
      category: 'policy' as const,
      relatedAssets: ['SPY', 'QQQ', 'BTC', 'GOLD'],
    },
    {
      headline: "Tesla Reports Record Q4 Deliveries, Beats Wall Street Estimates",
      summary: "Electric vehicle giant delivers 484,507 vehicles in Q4, surpassing analyst expectations and setting new quarterly record.",
      source: 'CNBC' as const,
      impact: 'high' as const,
      sentiment: 85,
      category: 'earnings' as const,
      relatedAssets: ['TSLA', 'NIO', 'RIVN'],
    },
    {
      headline: "Bitcoin ETF Sees $2.1B Inflows as Institutional Adoption Accelerates",
      summary: "Major cryptocurrency exchange-traded funds experience significant capital inflows as institutional investors increase digital asset allocations.",
      source: 'Reuters' as const,
      impact: 'medium' as const,
      sentiment: 80,
      category: 'crypto' as const,
      relatedAssets: ['BTC', 'ETH', 'COIN'],
    },
    {
      headline: "RBI Maintains Repo Rate at 6.5%, Focuses on Growth-Inflation Balance",
      summary: "Reserve Bank of India keeps key interest rate unchanged while emphasizing sustainable economic growth amid global uncertainties.",
      source: 'Economic Times' as const,
      impact: 'high' as const,
      sentiment: 65,
      category: 'policy' as const,
      relatedAssets: ['NIFTY', 'SENSEX', 'BANKNIFTY'],
    },
    {
      headline: "AI Chip Demand Surge Drives NVIDIA to New All-Time Highs",
      summary: "Graphics processing unit manufacturer benefits from artificial intelligence boom, with data center revenue up 206% year-over-year.",
      source: 'Bloomberg' as const,
      impact: 'medium' as const,
      sentiment: 90,
      category: 'sector' as const,
      relatedAssets: ['NVDA', 'AMD', 'INTC'],
    },
    {
      headline: "Oil Prices Rally on OPEC+ Production Cut Extension",
      summary: "Crude oil futures climb 3.2% after major oil producers agree to extend production cuts through Q2 2024.",
      source: 'Reuters' as const,
      impact: 'medium' as const,
      sentiment: 70,
      category: 'global' as const,
      relatedAssets: ['OIL', 'XOM', 'CVX', 'RELIANCE'],
    },
  ];

  return articles.map((article, index) => ({
    id: `news-${index}`,
    ...article,
    timestamp: new Date(Date.now() - Math.random() * 3600000 * 24).toISOString(),
    url: `https://example.com/news/${index}`,
  }));
};

export const generateSentimentHeatmap = (): SentimentHeatmapData[] => {
  const assets = [
    { asset: 'Bitcoin', symbol: 'BTC', sector: 'Crypto' },
    { asset: 'Ethereum', symbol: 'ETH', sector: 'Crypto' },
    { asset: 'Apple', symbol: 'AAPL', sector: 'Technology' },
    { asset: 'Tesla', symbol: 'TSLA', sector: 'Automotive' },
    { asset: 'Microsoft', symbol: 'MSFT', sector: 'Technology' },
    { asset: 'Amazon', symbol: 'AMZN', sector: 'E-commerce' },
    { asset: 'Google', symbol: 'GOOGL', sector: 'Technology' },
    { asset: 'NVIDIA', symbol: 'NVDA', sector: 'Semiconductors' },
    { asset: 'Reliance', symbol: 'RELIANCE', sector: 'Oil & Gas' },
    { asset: 'TCS', symbol: 'TCS', sector: 'IT Services' },
    { asset: 'HDFC Bank', symbol: 'HDFCBANK', sector: 'Banking' },
    { asset: 'Infosys', symbol: 'INFY', sector: 'IT Services' },
  ];

  return assets.map(asset => ({
    ...asset,
    sentiment: Math.floor(Math.random() * 100),
    change24h: (Math.random() - 0.5) * 10,
    volume: Math.floor(Math.random() * 1000000000),
    marketCap: Math.floor(Math.random() * 1000000000000),
    newsCount: Math.floor(Math.random() * 20) + 1,
  }));
};

export const generateMarketInsights = (): MarketInsight[] => {
  const insights = [
    {
      type: 'trending' as const,
      asset: 'NVIDIA',
      score: 95,
      reason: 'AI chip demand surge with 206% YoY revenue growth',
      signal: 'buy' as const,
      confidence: 88,
      timeframe: '3-6 months',
    },
    {
      type: 'hidden_gem' as const,
      asset: 'AMD',
      score: 78,
      reason: 'Undervalued relative to AI sector peers, strong data center growth',
      signal: 'buy' as const,
      confidence: 72,
      timeframe: '6-12 months',
    },
    {
      type: 'fomo' as const,
      asset: 'Tesla',
      score: 85,
      reason: 'Extreme retail interest following delivery beat, potential overextension',
      signal: 'hold' as const,
      confidence: 65,
      timeframe: '1-3 months',
    },
    {
      type: 'influencer' as const,
      asset: 'Bitcoin',
      score: 82,
      reason: 'Major crypto influencers bullish on ETF approval impact',
      signal: 'buy' as const,
      confidence: 75,
      timeframe: '2-4 months',
    },
  ];

  return insights.map((insight, index) => ({
    id: `insight-${index}`,
    ...insight,
  }));
};

export const generateInfluencerSentiment = (): InfluencerSentiment[] => {
  const influencers = [
    {
      name: 'Elon Musk',
      platform: 'twitter' as const,
      followers: 150000000,
      asset_focus: ['TSLA', 'BTC', 'DOGE'],
    },
    {
      name: 'Cathie Wood',
      platform: 'twitter' as const,
      followers: 1200000,
      asset_focus: ['TSLA', 'COIN', 'ROKU'],
    },
    {
      name: 'Michael Saylor',
      platform: 'twitter' as const,
      followers: 3200000,
      asset_focus: ['BTC', 'MSTR'],
    },
    {
      name: 'Raoul Pal',
      platform: 'twitter' as const,
      followers: 1800000,
      asset_focus: ['BTC', 'ETH', 'SOL'],
    },
  ];

  return influencers.map((influencer, index) => ({
    id: `influencer-${index}`,
    ...influencer,
    sentiment: Math.floor(Math.random() * 100),
    influence_score: Math.floor(Math.random() * 100) + 50,
    recent_mentions: [
      'Bullish on long-term prospects',
      'Major catalyst ahead',
      'Accumulating on dips',
    ],
  }));
};

export const generateFOMOIndex = (): FOMOIndex => {
  const score = Math.floor(Math.random() * 100);
  let level: FOMOIndex['level'];
  
  if (score <= 20) level = 'extreme_fear';
  else if (score <= 40) level = 'fear';
  else if (score <= 60) level = 'neutral';
  else if (score <= 80) level = 'greed';
  else level = 'extreme_greed';

  return {
    score,
    level,
    signals: {
      buy: level === 'extreme_fear' || level === 'fear' ? 
        ['DCA into quality assets', 'Contrarian opportunities', 'Value accumulation'] : [],
      sell: level === 'extreme_greed' ? 
        ['Take profits', 'Reduce risk exposure', 'Trim overvalued positions'] : [],
      hold: level === 'neutral' ? 
        ['Maintain positions', 'Wait for clearer signals', 'Monitor developments'] : [],
    },
    historical: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      score: Math.floor(Math.random() * 100),
    })).reverse(),
  };
};

export const generatePortfolioAssets = (): PortfolioAsset[] => {
  const assets = [
    { symbol: 'BTC', name: 'Bitcoin', purchasePrice: 45000 },
    { symbol: 'ETH', name: 'Ethereum', purchasePrice: 2800 },
    { symbol: 'AAPL', name: 'Apple Inc.', purchasePrice: 180 },
    { symbol: 'TSLA', name: 'Tesla Inc.', purchasePrice: 250 },
    { symbol: 'SOL', name: 'Solana', purchasePrice: 95 },
  ];

  return assets.map((asset, index) => ({
    id: `asset-${index}`,
    ...asset,
    quantity: Math.random() * 10 + 0.1,
    currentPrice: asset.purchasePrice * (1 + (Math.random() - 0.5) * 0.3),
    change24h: (Math.random() - 0.5) * 10,
    marketCap: Math.floor(Math.random() * 1000000000000),
  }));
};

export const generateMarketSentiment = (): MarketSentiment => {
  const index = Math.floor(Math.random() * 100);
  const trends = ['bullish', 'bearish', 'neutral'] as const;
  
  return {
    index,
    trend: trends[Math.floor(Math.random() * trends.length)],
    volume: Math.floor(Math.random() * 1000000000),
    correlations: {
      'Crypto-Stocks': Math.random(),
      'BTC-ETH': Math.random(),
      'Tech-Market': Math.random(),
      'Sentiment-Price': Math.random(),
      'Nifty-Global': Math.random(),
    },
    weeklyTrend: Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      value: Math.floor(Math.random() * 100),
    })),
  };
};

const generateHistoricalData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toISOString(),
      value: Math.floor(Math.random() * 1000) + 100,
      volume: Math.floor(Math.random() * 10000),
    });
  }
  
  return data;
};

// Simulate real-time updates
export const simulateRealTimeUpdate = <T extends { id: string }>(
  data: T[],
  updateFn: (item: T) => T
): T[] => {
  return data.map(item => 
    Math.random() < 0.3 ? updateFn(item) : item
  );
};