import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, Users, BarChart3, Send, Shield, Eye, EyeOff } from 'lucide-react';
import { CommunityPost, Poll } from '../types';

export const CommunityFeatures: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [newPost, setNewPost] = useState('');
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  useEffect(() => {
    generateCommunityPosts();
    generatePolls();
  }, [selectedAsset]);

  const generateCommunityPosts = () => {
    const communityPosts: CommunityPost[] = [
      {
        id: 'post-1',
        author: 'CryptoTrader_Pro',
        content: 'Bitcoin showing strong support at $44k level. Volume is increasing and RSI looks healthy. Could be setting up for another leg up! 🚀',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        likes: 24,
        replies: 8,
        asset: 'BTC',
        sentiment: 'bullish',
        verified: true,
      },
      {
        id: 'post-2',
        author: 'TechAnalyst_Sarah',
        content: 'Tesla earnings call was impressive but the stock seems overextended here. Might see some profit-taking in the short term.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 15,
        replies: 12,
        asset: 'TSLA',
        sentiment: 'bearish',
        verified: false,
      },
      {
        id: 'post-3',
        author: 'DeFi_Researcher',
        content: 'Ethereum gas fees are coming down significantly with the latest upgrades. This could drive more DeFi adoption in Q2.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        likes: 31,
        replies: 6,
        asset: 'ETH',
        sentiment: 'bullish',
        verified: true,
      },
      {
        id: 'post-4',
        author: 'MarketWatcher_AI',
        content: 'Fed meeting minutes suggest they\'re more dovish than expected. This could be positive for risk assets across the board.',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        likes: 42,
        replies: 18,
        asset: 'SPY',
        sentiment: 'bullish',
        verified: false,
      },
    ];

    setPosts(communityPosts.filter(post => post.asset === selectedAsset));
  };

  const generatePolls = () => {
    const activePolls: Poll[] = [
      {
        id: 'poll-1',
        question: 'What\'s your Bitcoin price target for end of Q1?',
        options: [
          { text: '$50,000 - $55,000', votes: 156 },
          { text: '$55,000 - $60,000', votes: 203 },
          { text: '$60,000+', votes: 89 },
          { text: 'Below $50,000', votes: 45 },
        ],
        totalVotes: 493,
        endTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        asset: 'BTC',
      },
      {
        id: 'poll-2',
        question: 'Will Tesla hit $300 before earnings?',
        options: [
          { text: 'Yes, bullish momentum', votes: 78 },
          { text: 'No, resistance too strong', votes: 124 },
          { text: 'Sideways until earnings', votes: 67 },
        ],
        totalVotes: 269,
        endTime: new Date(Date.now() + 86400000 * 5).toISOString(),
        asset: 'TSLA',
      },
    ];

    setPolls(activePolls.filter(poll => poll.asset === selectedAsset));
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-emerald-500';
      case 'bearish': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return '🚀';
      case 'bearish': return '🔻';
      default: return '⚠️';
    }
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleVote = (pollId: string, optionIndex: number) => {
    setPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        const newOptions = [...poll.options];
        newOptions[optionIndex].votes += 1;
        return {
          ...poll,
          options: newOptions,
          totalVotes: poll.totalVotes + 1,
        };
      }
      return poll;
    }));
  };

  const assets = ['BTC', 'ETH', 'AAPL', 'TSLA', 'SPY', 'NVDA'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Community Features</h3>
        <button
          onClick={() => setShowPrivacySettings(!showPrivacySettings)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          {showPrivacySettings ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="text-sm">Privacy</span>
        </button>
      </div>

      {/* Privacy Settings */}
      {showPrivacySettings && (
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Privacy Settings</span>
          </h4>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-gray-600 bg-gray-700 text-purple-600" />
              <span className="text-gray-300">Show my profile to other users</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-purple-600" />
              <span className="text-gray-300">Share my portfolio performance</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-gray-600 bg-gray-700 text-purple-600" />
              <span className="text-gray-300">Allow direct messages</span>
            </label>
          </div>
        </div>
      )}

      {/* Asset Selection */}
      <div className="bg-gray-900/50 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Users className="h-5 w-5 text-blue-500" />
          <span className="text-white font-semibold">Asset Communities</span>
        </div>
        
        <div className="flex space-x-2">
          {assets.map(asset => (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedAsset === asset
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </div>

      {/* Active Polls */}
      {polls.length > 0 && (
        <div className="bg-gray-900/50 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-yellow-500" />
            <span>Community Polls</span>
          </h4>
          
          <div className="space-y-4">
            {polls.map((poll) => (
              <div key={poll.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h5 className="text-white font-semibold mb-3">{poll.question}</h5>
                
                <div className="space-y-2 mb-4">
                  {poll.options.map((option, index) => {
                    const percentage = (option.votes / poll.totalVotes) * 100;
                    return (
                      <button
                        key={index}
                        onClick={() => handleVote(poll.id, index)}
                        className="w-full text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white">{option.text}</span>
                          <span className="text-gray-400 text-sm">{option.votes} votes</span>
                        </div>
                        <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{percentage.toFixed(1)}%</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{poll.totalVotes} total votes</span>
                  <span>Ends {new Date(poll.endTime).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discussion Forum */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-green-500" />
          <span>{selectedAsset} Discussion</span>
        </h4>
        
        {/* New Post Form */}
        <div className="mb-6">
          <div className="flex space-x-3">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={`Share your thoughts on ${selectedAsset}...`}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
              rows={3}
            />
            <button
              onClick={() => {
                if (newPost.trim()) {
                  // Add new post logic here
                  setNewPost('');
                }
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Send className="h-4 w-4" />
              <span>Post</span>
            </button>
          </div>
        </div>
        
        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{post.author}</span>
                      {post.verified && (
                        <Shield className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(post.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${getSentimentColor(post.sentiment)}`}>
                    {getSentimentIcon(post.sentiment)}
                  </span>
                  <span className={`text-xs font-medium ${getSentimentColor(post.sentiment)}`}>
                    {post.sentiment.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors duration-200"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.replies}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};