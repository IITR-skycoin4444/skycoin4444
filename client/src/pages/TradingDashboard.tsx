import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface TradeData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: number;
  marketCap: number;
}

interface ChartData {
  time: string;
  price: number;
  volume: number;
}

export default function TradingDashboard() {
  const [trades, setTrades] = useState<TradeData[]>([
    { symbol: 'BTC', price: 62899, change: 1250, changePercent: 2.03, high24h: 63500, low24h: 61200, volume: 28500000000, marketCap: 1240000000000 },
    { symbol: 'ETH', price: 1758.2, change: 45.3, changePercent: 2.65, high24h: 1800, low24h: 1700, volume: 15200000000, marketCap: 210000000000 },
    { symbol: 'SOL', price: 79.08, change: 2.1, changePercent: 2.73, high24h: 82, low24h: 76, volume: 2100000000, marketCap: 32000000000 },
    { symbol: 'DOGE', price: 0.072966, change: 0.002, changePercent: 2.82, high24h: 0.075, low24h: 0.070, volume: 890000000, marketCap: 10500000000 },
  ]);

  const [chartData, setChartData] = useState<ChartData[]>([
    { time: '00:00', price: 61500, volume: 1200 },
    { time: '04:00', price: 62100, volume: 1400 },
    { time: '08:00', price: 61800, volume: 1100 },
    { time: '12:00', price: 62500, volume: 1600 },
    { time: '16:00', price: 62200, volume: 1300 },
    { time: '20:00', price: 62899, volume: 1800 },
  ]);

  const [portfolio, setPortfolio] = useState({
    totalValue: 125430.50,
    totalInvested: 98500,
    totalGain: 26930.50,
    gainPercent: 27.35,
  });

  const [selectedCrypto, setSelectedCrypto] = useState('BTC');

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setTrades(prev => prev.map(trade => ({
        ...trade,
        price: trade.price * (1 + (Math.random() - 0.5) * 0.001),
        change: trade.change + (Math.random() - 0.5) * 10,
        changePercent: trade.changePercent + (Math.random() - 0.5) * 0.1,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Trading Dashboard</h1>
          <p className="text-muted-foreground">Real-time cryptocurrency trading and portfolio management</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${portfolio.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-muted-foreground mt-1">USD equivalent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${portfolio.totalInvested.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-muted-foreground mt-1">Initial investment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${portfolio.totalGain.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-green-500 mt-1">+{portfolio.gainPercent.toFixed(2)}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">24h Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <div className="text-2xl font-bold text-foreground">847</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Trades executed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>BTC/USD Price Chart (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                <Area type="monotone" dataKey="price" stroke="#ec4899" fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trading Pairs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Trading Pairs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trades.map((trade) => (
                    <div
                      key={trade.symbol}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary cursor-pointer transition-colors"
                      onClick={() => setSelectedCrypto(trade.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {trade.symbol[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{trade.symbol}/USD</div>
                            <div className="text-sm text-muted-foreground">Market Cap: ${(trade.marketCap / 1000000000).toFixed(0)}B</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">${trade.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                        <div className={`text-sm font-semibold flex items-center justify-end gap-1 ${trade.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {trade.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {trade.changePercent >= 0 ? '+' : ''}{trade.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">Buy {selectedCrypto}</Button>
                <Button className="w-full bg-red-600 hover:bg-red-700">Sell {selectedCrypto}</Button>
                <Button variant="outline" className="w-full">Convert to Stablecoin</Button>
                <Button variant="outline" className="w-full">View Analytics</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h High:</span>
                  <span className="font-semibold text-foreground">${trades[0].high24h.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Low:</span>
                  <span className="font-semibold text-foreground">${trades[0].low24h.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Volume:</span>
                  <span className="font-semibold text-foreground">${(trades[0].volume / 1000000000).toFixed(1)}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <span className="font-semibold text-foreground">${(trades[0].marketCap / 1000000000).toFixed(0)}B</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
