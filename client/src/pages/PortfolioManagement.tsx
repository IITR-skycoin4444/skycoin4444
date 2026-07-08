import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, Edit2, Download } from 'lucide-react';

interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  price: number;
  value: number;
  change24h: number;
  allocation: number;
}

interface PortfolioStats {
  totalValue: number;
  totalInvested: number;
  totalGain: number;
  gainPercent: number;
  bestPerformer: string;
  worstPerformer: string;
}

export default function PortfolioManagement() {
  const [assets, setAssets] = useState<PortfolioAsset[]>([
    { id: '1', symbol: 'BTC', name: 'Bitcoin', amount: 0.5, price: 62899, value: 31449.5, change24h: 2.03, allocation: 25 },
    { id: '2', symbol: 'ETH', name: 'Ethereum', amount: 5, price: 1758.2, value: 8791, change24h: 2.65, allocation: 7 },
    { id: '3', symbol: 'SOL', name: 'Solana', amount: 100, price: 79.08, value: 7908, change24h: 2.73, allocation: 6.3 },
    { id: '4', symbol: 'USDC', name: 'USD Coin', amount: 50000, price: 1, value: 50000, change24h: 0, allocation: 39.8 },
    { id: '5', symbol: 'DOGE', name: 'Dogecoin', amount: 5000, price: 0.072966, value: 364.83, change24h: 2.82, allocation: 0.3 },
    { id: '6', symbol: 'SKY', name: 'Skycoin', amount: 10000, price: 2.5, value: 25000, change24h: 5.2, allocation: 19.9 },
  ]);

  const [stats] = useState<PortfolioStats>({
    totalValue: 125513.13,
    totalInvested: 98500,
    totalGain: 27013.13,
    gainPercent: 27.42,
    bestPerformer: 'SKY',
    worstPerformer: 'USDC',
  });

  const [showAddModal, setShowAddModal] = useState(false);

  const pieData = assets.map(asset => ({
    name: asset.symbol,
    value: asset.allocation,
  }));

  const COLORS = ['#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const performanceData = assets.map(asset => ({
    symbol: asset.symbol,
    value: asset.value,
    change: asset.change24h,
  }));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Portfolio Management</h1>
            <p className="text-muted-foreground">Manage and track your cryptocurrency investments</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${stats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-muted-foreground mt-1">All assets combined</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${stats.totalInvested.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-muted-foreground mt-1">Initial investment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">${stats.totalGain.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-green-500 mt-1">+{stats.gainPercent.toFixed(2)}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.bestPerformer}</div>
              <p className="text-xs text-green-500 mt-1">+5.20% (24h)</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Allocation Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="symbol" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                  <Bar dataKey="value" fill="#ec4899" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Assets Table */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Your Assets</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Asset</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Amount</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Value</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">24h Change</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Allocation</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id} className="border-b border-border hover:bg-card/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            {asset.symbol[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{asset.symbol}</div>
                            <div className="text-xs text-muted-foreground">{asset.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-foreground">{asset.amount.toLocaleString('en-US', { maximumFractionDigits: 8 })}</td>
                      <td className="text-right py-3 px-4 text-foreground">${asset.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                      <td className="text-right py-3 px-4 font-semibold text-foreground">${asset.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                      <td className={`text-right py-3 px-4 font-semibold ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                      </td>
                      <td className="text-right py-3 px-4 text-foreground">{asset.allocation.toFixed(1)}%</td>
                      <td className="text-center py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
