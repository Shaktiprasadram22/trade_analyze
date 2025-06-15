export interface TrendingTopic {
  id: string;
  topic: string;
  mentions: number;
  sentiment: number;
  velocity: number;
  change24h: number;
  category: 'crypto' | 'stocks' | 'general';
  historicalData: { time: string; value: number }[];
}

export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
  change24h: number;
  marketCap?: number;
  sharpeRatio?: number;
  volatility?: number;
  beta?: number;
}

export interface MarketSentiment {
  index: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  volume: number;
  correlations: { [key: string]: number };
  weeklyTrend: { day: string; value: number }[];
}

export interface NiftyStock {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  newsReason: string;
  newsType: 'earnings' | 'merger' | 'regulatory' | 'product' | 'financial' | 'partnership' | 'legal';
  sentiment: 'positive' | 'negative' | 'neutral';
  trendingScore: number;
  lastUpdated: string;
  sector: string;
}

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  aiSummary: string;
  source: 'Bloomberg' | 'Reuters' | 'CNBC' | 'Economic Times' | 'Mint' | 'MoneyControl' | 'CoinDesk' | 'CryptoNews';
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
  sentiment: number;
  sentimentLabel: '🚀 Bullish' | '⚠️ Neutral' | '🔻 Bearish';
  relatedAssets: string[];
  category: 'earnings' | 'policy' | 'market' | 'crypto' | 'global' | 'sector';
  url?: string;
  relevanceScore: number;
}

export interface CorrelationData {
  asset1: string;
  asset2: string;
  correlation: number;
  timeframe: '1d' | '7d' | '30d' | '90d';
  historicalCorrelations: { date: string; value: number }[];
  significantChange: boolean;
}

export interface CorrelationMatrix {
  assets: string[];
  matrix: number[][];
  lastUpdated: string;
}

export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  parameters: { [key: string]: any };
  backtestResults: {
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
  };
  isActive: boolean;
}

export interface RiskMetrics {
  sharpeRatio: number;
  volatility: number;
  beta: number;
  var95: number; // Value at Risk
  maxDrawdown: number;
  diversificationRatio: number;
}

export interface GeographicSentiment {
  region: string;
  sentiment: number;
  volume: number;
  topAssets: string[];
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  asset: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  verified: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
  endTime: string;
  asset: string;
}

export interface TradingJournalEntry {
  id: string;
  date: string;
  asset: string;
  action: 'buy' | 'sell';
  quantity: number;
  price: number;
  reason: string;
  outcome?: 'profit' | 'loss' | 'pending';
  pnl?: number;
}

export interface DashboardWidget {
  id: string;
  type: 'correlation' | 'news' | 'portfolio' | 'sentiment' | 'community' | 'technical';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: any;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  layout: 'grid' | 'list';
  notifications: {
    email: boolean;
    push: boolean;
    correlationAlerts: boolean;
    sentimentAlerts: boolean;
  };
  privacy: {
    showProfile: boolean;
    sharePortfolio: boolean;
    allowMessages: boolean;
  };
}

export interface SentimentHeatmapData {
  asset: string;
  symbol: string;
  sentiment: number;
  change24h: number;
  volume: number;
  sector: string;
  marketCap: number;
  newsCount: number;
}

export interface SmartAlert {
  id: string;
  type: 'sentiment_threshold' | 'sentiment_shift' | 'news_impact' | 'volume_spike' | 'correlation_change';
  asset: string;
  condition: {
    threshold?: number;
    percentage?: number;
    timeframe?: string;
  };
  isActive: boolean;
  deliveryMethod: 'email' | 'sms' | 'push';
  lastTriggered?: string;
  description: string;
}

export interface MarketInsight {
  id: string;
  type: 'trending' | 'hidden_gem' | 'influencer' | 'fomo';
  asset: string;
  score: number;
  reason: string;
  signal: 'buy' | 'sell' | 'hold';
  confidence: number;
  timeframe: string;
}

export interface InfluencerSentiment {
  id: string;
  name: string;
  platform: 'twitter' | 'linkedin' | 'youtube' | 'telegram';
  followers: number;
  sentiment: number;
  influence_score: number;
  recent_mentions: string[];
  asset_focus: string[];
}

export interface FOMOIndex {
  score: number;
  level: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
  signals: {
    buy: string[];
    sell: string[];
    hold: string[];
  };
  historical: { date: string; score: number }[];
}

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  alerts: SmartAlert[];
  sentiment_tracking: boolean;
  price_alerts: PriceAlert[];
  notes?: string;
}

export interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  type: 'above' | 'below';
  isActive: boolean;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  volume?: number;
}

// Stock Recommendation System Types
export interface UserProfile {
  id: string;
  isLoggedIn: boolean;
  investmentPreferences: {
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    investmentHorizon: 'short' | 'medium' | 'long';
    preferredSectors: string[];
    maxInvestmentAmount: number;
    diversificationPreference: 'focused' | 'balanced' | 'diversified';
  };
  tradingExperience: 'beginner' | 'intermediate' | 'advanced';
  accessLevel: 'anonymous' | 'basic' | 'premium' | 'institutional';
}

export interface StockRecommendation {
  id: string;
  ticker: string;
  companyName: string;
  confidenceScore: number; // 0-100%
  category: 'strong_buy' | 'watch' | 'risky';
  keyMetrics: {
    sentimentTrend24h: number;
    volumeChangePercent: number;
    mediaMentionFrequency: number;
    communityConsensusScore: number;
  };
  technicalIndicators: {
    trend5Day: 'bullish' | 'bearish' | 'neutral';
    volumePattern: 'increasing' | 'decreasing' | 'stable';
    volatilityLevel: 'low' | 'medium' | 'high';
    momentumScore: number;
  };
  socialSentiment: {
    twitterMentions: number;
    newsCoverage: number;
    influencerSentiment: number;
    communityEngagement: number;
  };
  sectorPerformance: {
    sectorName: string;
    sectorTrend: 'outperforming' | 'underperforming' | 'neutral';
    relativePeerRanking: number;
  };
  aiPrediction: {
    momentumScore: number;
    priceTarget: number;
    timeHorizon: string;
    catalysts: string[];
  };
  reasoning: string[];
  risks: string[];
  limitations: string[];
  lastUpdated: string;
  dataQuality: 'high' | 'medium' | 'low';
}

export interface RecommendationRequest {
  userProfile?: UserProfile;
  preferredSectors?: string[];
  investmentTimeframe: 'short' | 'medium' | 'long';
  maxRecommendations: number;
  riskTolerance?: 'conservative' | 'moderate' | 'aggressive';
  excludeAssets?: string[];
  includeOnlyAssets?: string[];
}

export interface RecommendationResponse {
  recommendations: StockRecommendation[];
  metadata: {
    totalAnalyzed: number;
    filteredOut: number;
    confidenceMethodology: string;
    dataFreshness: string;
    marketConditions: string;
  };
  disclaimer: string;
}

export interface ConfidenceCalculation {
  technicalWeight: number;
  sentimentWeight: number;
  fundamentalWeight: number;
  volumeWeight: number;
  newsWeight: number;
  communityWeight: number;
  finalScore: number;
  methodology: string;
}