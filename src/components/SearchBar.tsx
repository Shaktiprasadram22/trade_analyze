import React, { useState, useRef, useEffect } from 'react';
import { Search, TrendingUp, Star, Clock } from 'lucide-react';

interface SearchResult {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'index';
  price: number;
  change: number;
  trending: boolean;
}

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const mockResults: SearchResult[] = [
    { id: '1', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', price: 185.25, change: 2.5, trending: true },
    { id: '2', symbol: 'BTC', name: 'Bitcoin', type: 'crypto', price: 45000, change: -1.2, trending: true },
    { id: '3', symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', price: 250.80, change: 5.8, trending: false },
    { id: '4', symbol: 'ETH', name: 'Ethereum', type: 'crypto', price: 2800, change: 3.2, trending: true },
    { id: '5', symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'stock', price: 520.15, change: 8.5, trending: true },
    { id: '6', symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', price: 142.50, change: -0.8, trending: false },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockResults.filter(
        result =>
          result.symbol.toLowerCase().includes(query.toLowerCase()) ||
          result.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setQuery(result.symbol);
    setIsOpen(false);
    
    // Add to recent searches
    setRecentSearches(prev => {
      const updated = [result.symbol, ...prev.filter(s => s !== result.symbol)];
      return updated.slice(0, 5);
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stock': return 'text-blue-500 bg-blue-500/20';
      case 'crypto': return 'text-orange-500 bg-orange-500/20';
      case 'index': return 'text-purple-500 bg-purple-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search stocks, crypto..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
        />
      </div>

      {isOpen && (
        <div className="absolute top-12 left-0 right-0 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 max-h-80 overflow-y-auto">
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-700">
              <h4 className="text-gray-400 text-sm font-medium mb-2 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Recent Searches</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors duration-200"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-semibold">{result.symbol}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                          {result.trending && (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{result.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${result.price.toLocaleString()}</p>
                      <p className={`text-sm ${result.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {result.change >= 0 ? '+' : ''}{result.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="p-4 text-center text-gray-400">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};