import { useState, useEffect, useCallback } from 'react';
import { TrendingTopic, PortfolioAsset, MarketSentiment, NiftyStock, NewsArticle, SentimentHeatmapData } from '../types';
import { 
  generateTrendingTopics, 
  generatePortfolioAssets, 
  generateMarketSentiment,
  generateNiftyStocks,
  generateNewsArticles,
  generateSentimentHeatmap,
  simulateRealTimeUpdate 
} from '../utils/mockData';

export const useRealTimeData = () => {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([]);
  const [marketSentiment, setMarketSentiment] = useState<MarketSentiment | null>(null);
  const [niftyStocks, setNiftyStocks] = useState<NiftyStock[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [sentimentHeatmap, setSentimentHeatmap] = useState<SentimentHeatmapData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize data
  useEffect(() => {
    setTrendingTopics(generateTrendingTopics());
    setPortfolioAssets(generatePortfolioAssets());
    setMarketSentiment(generateMarketSentiment());
    setNiftyStocks(generateNiftyStocks());
    setNewsArticles(generateNewsArticles());
    setSentimentHeatmap(generateSentimentHeatmap());
    setIsConnected(true);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      // Update trending topics
      setTrendingTopics(prev => 
        simulateRealTimeUpdate(prev, (topic) => ({
          ...topic,
          mentions: Math.max(0, topic.mentions + Math.floor((Math.random() - 0.5) * 1000)),
          sentiment: Math.max(0, Math.min(100, topic.sentiment + (Math.random() - 0.5) * 10)),
          velocity: topic.velocity + Math.floor((Math.random() - 0.5) * 50),
        }))
      );

      // Update portfolio prices
      setPortfolioAssets(prev =>
        simulateRealTimeUpdate(prev, (asset) => ({
          ...asset,
          currentPrice: Math.max(0.01, asset.currentPrice * (1 + (Math.random() - 0.5) * 0.02)),
          change24h: asset.change24h + (Math.random() - 0.5) * 2,
        }))
      );

      // Update Nifty stocks
      setNiftyStocks(prev =>
        simulateRealTimeUpdate(prev, (stock) => {
          const priceChange = (Math.random() - 0.5) * 0.01; // ±1% change
          const newPrice = Math.max(0.01, stock.currentPrice * (1 + priceChange));
          const change = newPrice - (stock.currentPrice - stock.change);
          const changePercent = (change / (stock.currentPrice - stock.change)) * 100;
          
          return {
            ...stock,
            currentPrice: Math.round(newPrice * 100) / 100,
            change: Math.round(change * 100) / 100,
            changePercent: Math.round(changePercent * 100) / 100,
            volume: Math.max(100000, stock.volume + Math.floor((Math.random() - 0.5) * 500000)),
            trendingScore: Math.max(10, Math.min(100, stock.trendingScore + Math.floor((Math.random() - 0.5) * 10))),
            lastUpdated: new Date().toISOString(),
          };
        })
      );

      // Update sentiment heatmap
      setSentimentHeatmap(prev =>
        simulateRealTimeUpdate(prev, (asset) => ({
          ...asset,
          sentiment: Math.max(0, Math.min(100, asset.sentiment + (Math.random() - 0.5) * 5)),
          change24h: asset.change24h + (Math.random() - 0.5) * 1,
        }))
      );

      // Update market sentiment
      if (Math.random() < 0.2) {
        setMarketSentiment(generateMarketSentiment());
      }

      // Update news articles occasionally
      if (Math.random() < 0.1) {
        setNewsArticles(generateNewsArticles());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const addAsset = useCallback((asset: Omit<PortfolioAsset, 'id'>) => {
    const newAsset = {
      ...asset,
      id: `asset-${Date.now()}`,
    };
    setPortfolioAssets(prev => [...prev, newAsset]);
  }, []);

  const removeAsset = useCallback((id: string) => {
    setPortfolioAssets(prev => prev.filter(asset => asset.id !== id));
  }, []);

  return {
    trendingTopics,
    portfolioAssets,
    marketSentiment,
    niftyStocks,
    newsArticles,
    sentimentHeatmap,
    isConnected,
    addAsset,
    removeAsset,
  };
};