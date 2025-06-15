import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2 } from 'lucide-react';
import { PortfolioAsset } from '../types';

interface PortfolioProps {
  assets: PortfolioAsset[];
  onAddAsset: (asset: Omit<PortfolioAsset, 'id'>) => void;
  onRemoveAsset: (id: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ assets, onAddAsset, onRemoveAsset }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const totalValue = assets.reduce((sum, asset) => sum + (asset.currentPrice * asset.quantity), 0);
  const totalPnL = assets.reduce((sum, asset) => 
    sum + ((asset.currentPrice - asset.purchasePrice) * asset.quantity), 0
  );
  const totalPnLPercent = assets.length > 0 ? 
    (totalPnL / assets.reduce((sum, asset) => sum + (asset.purchasePrice * asset.quantity), 0)) * 100 : 0;

  const handleAddAsset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAsset = {
      symbol: formData.get('symbol') as string,
      name: formData.get('name') as string,
      quantity: parseFloat(formData.get('quantity') as string),
      purchasePrice: parseFloat(formData.get('purchasePrice') as string),
      currentPrice: parseFloat(formData.get('purchasePrice') as string),
      change24h: 0,
    };
    onAddAsset(newAsset);
    setShowAddForm(false);
    e.currentTarget.reset();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Wallet className="h-6 w-6 text-emerald-500" />
          <h2 className="text-xl font-semibold text-white">Virtual Portfolio</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-white">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total P&L</p>
          <div className="flex items-center space-x-2">
            <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            {totalPnL >= 0 ? (
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total Return</p>
          <p className={`text-2xl font-bold ${totalPnLPercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Add Asset Form */}
      {showAddForm && (
        <form onSubmit={handleAddAsset} className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              name="symbol"
              placeholder="Symbol (e.g., BTC)"
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              required
            />
            <input
              name="name"
              placeholder="Asset Name"
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              required
            />
            <input
              name="quantity"
              type="number"
              step="0.000001"
              placeholder="Quantity"
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              required
            />
            <input
              name="purchasePrice"
              type="number"
              step="0.01"
              placeholder="Purchase Price"
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Add Asset
            </button>
          </div>
        </form>
      )}

      {/* Assets List */}
      <div className="space-y-3">
        {assets.map((asset) => {
          const pnl = (asset.currentPrice - asset.purchasePrice) * asset.quantity;
          const pnlPercent = ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;
          
          return (
            <div
              key={asset.id}
              className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold text-white">{asset.symbol}</h3>
                    <p className="text-sm text-gray-400">{asset.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Quantity</p>
                    <p className="font-medium text-white">{asset.quantity.toFixed(6)}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Current Price</p>
                    <p className="font-medium text-white">${asset.currentPrice.toFixed(2)}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-400">P&L</p>
                    <div className="flex items-center space-x-1">
                      <p className={`font-medium ${pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                      </p>
                      <span className={`text-xs ${pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        ({pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onRemoveAsset(asset.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {assets.length === 0 && (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No assets in portfolio</p>
            <p className="text-sm text-gray-500">Add your first asset to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};