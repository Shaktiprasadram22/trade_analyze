import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Star, 
  Users, 
  BarChart3, 
  Clock,
  Filter,
  RefreshCw,
  Settings,
  Eye,
  Shield,
  Zap,
  Brain,
  Activity
} from 'lucide-react';
import { 
  StockRecommendation, 
  UserProfile, 
  RecommendationRequest, 
  RecommendationResponse,
  ConfidenceCalculation 
} from '../types';

export const StockRecommendationSystem: React.FC = () => {
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [filters, setFilters] = useState<RecommendationRequest>({
    investmentTimeframe: 'medium',
    maxRecommendations: 5,
    riskTolerance: 'moderate',
  });

  useEffect(() => {
    generateUserProfile();
    generateRecommendations();
  }, []);

  const generateUserProfile = () => {
    const profile: UserProfile = {
      id: 'user-1',
      isLoggedIn: true,
      investmentPreferences: {
        riskTolerance: 'moderate',
        investmentHorizon: 'medium',
        preferredSectors: ['Technology', 'Healthcare', 'Finance'],
        maxInvestmentAmount: 50000,
        diversificationPreference: 'balanced',
      },
      tradingExperience: 'intermediate',
      accessLevel: 'premium',
    };
    setUserProfile(profile);
  };

  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockRecommendations: StockRecommendation[] = [
        {
          id: 'rec-1',
          ticker: 'NVDA',
          companyName: 'NVIDIA Corporation',
          confidenceScore: 87,
          category: 'strong_buy',
          keyMetrics: {
            sentimentTrend24h: 15.2,
            volumeChangePercent: 45.8,
            mediaMentionFrequency: 234,
            communityConsensusScore: 82,
          },
          technicalIndicators: {
            trend5Day: 'bullish',
            volumePattern: 'increasing',
            volatilityLevel: 'medium',
            momentumScore: 78,
          },
          socialSentiment: {
            twitterMentions: 15420,
            newsCoverage: 89,
            influencerSentiment: 85,
            communityEngagement: 92,
          },
          sectorPerformance: {
            sectorName: 'Semiconductors',
            sectorTrend: 'outperforming',
            relativePeerRanking: 2,
          },
          aiPrediction: {
            momentumScore: 88,
            priceTarget: 520,
            timeHorizon: '3-6 months',
            catalysts: ['AI chip demand surge', 'Data center expansion', 'Gaming GPU recovery'],
          },
          reasoning: [
            'Strong AI chip demand driving revenue growth',
            'Positive earnings guidance and beat expectations',
            'High social media sentiment and institutional interest',
            'Technical breakout above key resistance levels',
          ],
          risks: [
            'High valuation multiples',
            'Regulatory concerns in China market',
            'Competition from AMD and Intel',
          ],
          limitations: [
            'Limited historical data for AI segment',
            'Volatile crypto mining demand',
          ],
          lastUpdated: new Date().toISOString(),
          dataQuality: 'high',
        },
        {
          id: 'rec-2',
          ticker: 'MSFT',
          companyName: 'Microsoft Corporation',
          confidenceScore: 76,
          category: 'watch',
          keyMetrics: {
            sentimentTrend24h: 8.4,
            volumeChangePercent: 12.3,
            mediaMentionFrequency: 156,
            communityConsensusScore: 74,
          },
          technicalIndicators: {
            trend5Day: 'bullish',
            volumePattern: 'stable',
            volatilityLevel: 'low',
            momentumScore: 65,
          },
          socialSentiment: {
            twitterMentions: 8920,
            newsCoverage: 67,
            influencerSentiment: 72,
            communityEngagement: 68,
          },
          sectorPerformance: {
            sectorName: 'Software',
            sectorTrend: 'neutral',
            relativePeerRanking: 3,
          },
          aiPrediction: {
            momentumScore: 71,
            priceTarget: 385,
            timeHorizon: '6-12 months',
            catalysts: ['Azure cloud growth', 'AI integration', 'Office 365 expansion'],
          },
          reasoning: [
            'Steady cloud revenue growth',
            'Strong balance sheet and dividend',
            'AI integration across product suite',
            'Defensive characteristics in uncertain market',
          ],
          risks: [
            'Slowing PC market affecting Windows',
            'Increased cloud competition',
            'Regulatory scrutiny on acquisitions',
          ],
          limitations: [
            'Large market cap limits growth potential',
            'Mature business model',
          ],
          lastUpdated: new Date().toISOString(),
          dataQuality: 'high',
        },
        {
          id: 'rec-3',
          ticker: 'PLTR',
          companyName: 'Palantir Technologies Inc.',
          confidenceScore: 45,
          category: 'risky',
          keyMetrics: {
            sentimentTrend24h: -5.2,
            volumeChangePercent: 78.9,
            mediaMentionFrequency: 89,
            communityConsensusScore: 58,
          },
          technicalIndicators: {
            trend5Day: 'neutral',
            volumePattern: 'increasing',
            volatilityLevel: 'high',
            momentumScore: 42,
          },
          socialSentiment: {
            twitterMentions: 12450,
            newsCoverage: 34,
            influencerSentiment: 48,
            communityEngagement: 76,
          },
          sectorPerformance: {
            sectorName: 'Data Analytics',
            sectorTrend: 'underperforming',
            relativePeerRanking: 8,
          },
          aiPrediction: {
            momentumScore: 38,
            priceTarget: 18,
            timeHorizon: '1-3 months',
            catalysts: ['Government contract wins', 'Commercial expansion', 'AI platform adoption'],
          },
          reasoning: [
            'High retail investor interest',
            'Potential government contract upside',
            'Unique data analytics platform',
            'Strong community following',
          ],
          risks: [
            'High volatility and speculative nature',
            'Dependence on government contracts',
            'Profitability concerns',
            'Dilution from stock-based compensation',
          ],
          limitations: [
            'Limited financial transparency',
            'Unproven commercial market penetration',
            'High execution risk',
          ],
          lastUpdated: new Date().toISOString(),
          dataQuality: 'medium',
        },
        {
          id: 'rec-4',
          ticker: 'TSLA',
          companyName: 'Tesla, Inc.',
          confidenceScore: 68,
          category: 'watch',
          keyMetrics: {
            sentimentTrend24h: 12.7,
            volumeChangePercent: 34.5,
            mediaMentionFrequency: 298,
            communityConsensusScore: 79,
          },
          technicalIndicators: {
            trend5Day: 'bullish',
            volumePattern: 'increasing',
            volatilityLevel: 'high',
            momentumScore: 72,
          },
          socialSentiment: {
            twitterMentions: 28450,
            newsCoverage: 156,
            influencerSentiment: 81,
            communityEngagement: 94,
          },
          sectorPerformance: {
            sectorName: 'Electric Vehicles',
            sectorTrend: 'outperforming',
            relativePeerRanking: 1,
          },
          aiPrediction: {
            momentumScore: 75,
            priceTarget: 280,
            timeHorizon: '3-6 months',
            catalysts: ['FSD progress', 'Cybertruck delivery', 'Energy storage growth'],
          },
          reasoning: [
            'Strong Q4 delivery numbers',
            'FSD technology advancement',
            'Energy business expansion',
            'High social media engagement',
          ],
          risks: [
            'High valuation relative to traditional automakers',
            'Increased EV competition',
            'Regulatory challenges for FSD',
            'CEO-related volatility',
          ],
          limitations: [
            'Sentiment-driven price movements',
            'Production scaling challenges',
          ],
          lastUpdated: new Date().toISOString(),
          dataQuality: 'high',
        },
        {
          id: 'rec-5',
          ticker: 'AMD',
          companyName: 'Advanced Micro Devices, Inc.',
          confidenceScore: 72,
          category: 'watch',
          keyMetrics: {
            sentimentTrend24h: 6.8,
            volumeChangePercent: 28.1,
            mediaMentionFrequency: 134,
            communityConsensusScore: 71,
          },
          technicalIndicators: {
            trend5Day: 'bullish',
            volumePattern: 'stable',
            volatilityLevel: 'medium',
            momentumScore: 69,
          },
          socialSentiment: {
            twitterMentions: 9870,
            newsCoverage: 78,
            influencerSentiment: 73,
            communityEngagement: 82,
          },
          sectorPerformance: {
            sectorName: 'Semiconductors',
            sectorTrend: 'outperforming',
            relativePeerRanking: 4,
          },
          aiPrediction: {
            momentumScore: 74,
            priceTarget: 165,
            timeHorizon: '6-12 months',
            catalysts: ['Data center CPU growth', 'AI chip development', 'Gaming GPU market share'],
          },
          reasoning: [
            'Strong data center CPU performance',
            'AI chip development progress',
            'Market share gains against Intel',
            'Attractive valuation vs NVIDIA',
          ],
          risks: [
            'Intense competition from NVIDIA in AI',
            'Cyclical semiconductor market',
            'Intel competitive response',
          ],
          limitations: [
            'Lower AI market presence than NVIDIA',
            'Dependent on TSMC manufacturing',
          ],
          lastUpdated: new Date().toISOString(),
          dataQuality: 'high',
        },
      ];

      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strong_buy': return 'text-emerald-500 bg-emerald-500/20';
      case 'watch': return 'text-yellow-500 bg-yellow-500/20';
      case 'risky': return 'text-red-500 bg-red-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strong_buy': return <TrendingUp className="h-4 w-4" />;
      case 'watch': return <Eye className="h-4 w-4" />;
      case 'risky': return <AlertTriangle className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-3 w-3 text-emerald-500" />;
      case 'bearish': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <Activity className="h-3 w-3 text-yellow-500" />;
    }
  };

  const calculateConfidenceScore = (recommendation: StockRecommendation): ConfidenceCalculation => {
    const weights = {
      technical: 0.25,
      sentiment: 0.20,
      fundamental: 0.20,
      volume: 0.15,
      news: 0.10,
      community: 0.10,
    };

    const scores = {
      technical: recommendation.technicalIndicators.momentumScore,
      sentiment: recommendation.socialSentiment.influencerSentiment,
      fundamental: recommendation.sectorPerformance.relativePeerRanking <= 3 ? 80 : 60,
      volume: recommendation.keyMetrics.volumeChangePercent > 20 ? 75 : 50,
      news: recommendation.keyMetrics.mediaMentionFrequency > 100 ? 80 : 60,
      community: recommendation.keyMetrics.communityConsensusScore,
    };

    const finalScore = Object.entries(weights).reduce((sum, [key, weight]) => {
      return sum + (scores[key as keyof typeof scores] * weight);
    }, 0);

    return {
      technicalWeight: weights.technical,
      sentimentWeight: weights.sentiment,
      fundamentalWeight: weights.fundamental,
      volumeWeight: weights.volume,
      newsWeight: weights.news,
      communityWeight: weights.community,
      finalScore: Math.round(finalScore),
      methodology: 'Weighted average of technical indicators, sentiment analysis, fundamental metrics, volume patterns, news coverage, and community engagement.',
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-2 rounded-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Stock Recommendation System</h3>
            <p className="text-sm text-gray-400">Intelligent recommendations powered by multi-source analysis</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Brain className="h-4 w-4" />
            <span className="text-sm">Methodology</span>
          </button>
          
          <button
            onClick={generateRecommendations}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* User Profile & Filters */}
      {userProfile && (
        <div className="bg-gray-900/50 rounded-xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>User Profile</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Access Level:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    userProfile.accessLevel === 'premium' ? 'bg-purple-500/20 text-purple-500' :
                    userProfile.accessLevel === 'institutional' ? 'bg-gold-500/20 text-gold-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {userProfile.accessLevel.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Risk Tolerance:</span>
                  <span className="text-white capitalize">{userProfile.investmentPreferences.riskTolerance}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Investment Horizon:</span>
                  <span className="text-white capitalize">{userProfile.investmentPreferences.investmentHorizon}-term</span>
                </div>
                
                <div>
                  <span className="text-gray-400 block mb-2">Preferred Sectors:</span>
                  <div className="flex flex-wrap gap-1">
                    {userProfile.investmentPreferences.preferredSectors.map((sector, index) => (
                      <span key={index} className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Filter className="h-5 w-5 text-green-500" />
                <span>Recommendation Filters</span>
              </h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Investment Timeframe</label>
                  <select
                    value={filters.investmentTimeframe}
                    onChange={(e) => setFilters(prev => ({ ...prev, investmentTimeframe: e.target.value as any }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="short">Short-term (1-3 months)</option>
                    <option value="medium">Medium-term (3-12 months)</option>
                    <option value="long">Long-term (1+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Max Recommendations</label>
                  <select
                    value={filters.maxRecommendations}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxRecommendations: parseInt(e.target.value) }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value={3}>3 recommendations</option>
                    <option value={5}>5 recommendations</option>
                    <option value={10}>10 recommendations</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Risk Tolerance</label>
                  <select
                    value={filters.riskTolerance}
                    onChange={(e) => setFilters(prev => ({ ...prev, riskTolerance: e.target.value as any }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confidence Methodology */}
      {showMethodology && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
          <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <span>Confidence Score Methodology</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="text-white font-medium">Scoring Components</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Technical Indicators</span>
                  <span className="text-emerald-500 font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sentiment Analysis</span>
                  <span className="text-blue-500 font-medium">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Fundamental Metrics</span>
                  <span className="text-purple-500 font-medium">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Volume Patterns</span>
                  <span className="text-yellow-500 font-medium">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">News Coverage</span>
                  <span className="text-orange-500 font-medium">10%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Community Engagement</span>
                  <span className="text-pink-500 font-medium">10%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-white font-medium">Data Sources</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Real-time market data from major exchanges</p>
                <p>• Social media sentiment from Twitter, Reddit, Discord</p>
                <p>• News analysis from 50+ financial publications</p>
                <p>• Technical indicators: RSI, MACD, Volume, Momentum</p>
                <p>• Community polls and discussion sentiment</p>
                <p>• Institutional trading patterns and flows</p>
                <p>• Sector performance and peer comparisons</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-yellow-500">Disclaimer:</strong> Recommendations are for informational purposes only. 
              Past performance does not guarantee future results. Always conduct your own research and consider your risk tolerance.
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-gray-900/50 rounded-xl p-8 text-center">
            <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Analyzing market data and generating recommendations...</p>
          </div>
        ) : (
          recommendations.map((rec) => {
            const confidence = calculateConfidenceScore(rec);
            
            return (
              <div
                key={rec.id}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                      <span className="text-white font-bold text-lg">{rec.ticker}</span>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-white">{rec.companyName}</h4>
                      <p className="text-gray-400">{rec.sectorPerformance.sectorName}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(rec.category)}`}>
                        {getCategoryIcon(rec.category)}
                        <span className="ml-1 capitalize">{rec.category.replace('_', ' ')}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Confidence:</span>
                      <span className={`text-2xl font-bold ${getConfidenceColor(rec.confidenceScore)}`}>
                        {rec.confidenceScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      <span className="text-gray-400 text-sm">24h Sentiment</span>
                    </div>
                    <p className={`text-lg font-bold ${rec.keyMetrics.sentimentTrend24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {rec.keyMetrics.sentimentTrend24h >= 0 ? '+' : ''}{rec.keyMetrics.sentimentTrend24h.toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <BarChart3 className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-400 text-sm">Volume Change</span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      +{rec.keyMetrics.volumeChangePercent.toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-400 text-sm">Media Mentions</span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {rec.keyMetrics.mediaMentionFrequency}
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="h-4 w-4 text-pink-500" />
                      <span className="text-gray-400 text-sm">Community Score</span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {rec.keyMetrics.communityConsensusScore}/100
                    </p>
                  </div>
                </div>

                {/* Technical Indicators */}
                <div className="mb-6">
                  <h5 className="text-white font-semibold mb-3">Technical Analysis</h5>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">5-Day Trend:</span>
                      {getTrendIcon(rec.technicalIndicators.trend5Day)}
                      <span className="text-white capitalize">{rec.technicalIndicators.trend5Day}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Volume:</span>
                      <span className="text-white capitalize">{rec.technicalIndicators.volumePattern}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Volatility:</span>
                      <span className={`capitalize ${
                        rec.technicalIndicators.volatilityLevel === 'low' ? 'text-emerald-500' :
                        rec.technicalIndicators.volatilityLevel === 'medium' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {rec.technicalIndicators.volatilityLevel}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Momentum:</span>
                      <span className="text-white">{rec.technicalIndicators.momentumScore}/100</span>
                    </div>
                  </div>
                </div>

                {/* AI Prediction */}
                <div className="mb-6">
                  <h5 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>AI Prediction</span>
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Price Target:</span>
                      <p className="text-lg font-bold text-emerald-500">${rec.aiPrediction.priceTarget}</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-400 text-sm">Time Horizon:</span>
                      <p className="text-white">{rec.aiPrediction.timeHorizon}</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-400 text-sm">Momentum Score:</span>
                      <p className="text-white">{rec.aiPrediction.momentumScore}/100</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <span className="text-gray-400 text-sm block mb-2">Key Catalysts:</span>
                    <div className="flex flex-wrap gap-2">
                      {rec.aiPrediction.catalysts.map((catalyst, index) => (
                        <span key={index} className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">
                          {catalyst}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reasoning & Risks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <Star className="h-4 w-4 text-emerald-500" />
                      <span>Why We Recommend</span>
                    </h5>
                    <ul className="space-y-1">
                      {rec.reasoning.map((reason, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>Risks & Limitations</span>
                    </h5>
                    <ul className="space-y-1">
                      {[...rec.risks, ...rec.limitations].map((risk, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Updated {new Date(rec.lastUpdated).toLocaleTimeString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>Data Quality: {rec.dataQuality}</span>
                    </div>
                  </div>
                  
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Total Analyzed</p>
          <p className="text-2xl font-bold text-white">1,247</p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Strong Buy</p>
          <p className="text-2xl font-bold text-emerald-500">
            {recommendations.filter(r => r.category === 'strong_buy').length}
          </p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Watch List</p>
          <p className="text-2xl font-bold text-yellow-500">
            {recommendations.filter(r => r.category === 'watch').length}
          </p>
        </div>
        
        <div className="bg-gray-900/50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Avg Confidence</p>
          <p className="text-2xl font-bold text-white">
            {recommendations.length > 0 ? 
              Math.round(recommendations.reduce((sum, r) => sum + r.confidenceScore, 0) / recommendations.length) : 0
            }%
          </p>
        </div>
      </div>
    </div>
  );
};