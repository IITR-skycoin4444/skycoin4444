import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { trpc } from '@/lib/trpc';

interface TradeSignal {
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
}

interface MiningOpportunity {
  bestPool: string;
  expectedReward: number;
  profitability: number;
}

interface DeFiOpportunity {
  protocol: string;
  riskLevel: 'low' | 'medium' | 'high';
  expectedYield: number;
}

export function CryptoAIDashboard() {
  const [tradeSignals, setTradeSignals] = useState<TradeSignal[]>([]);
  const [miningOps, setMiningOps] = useState<MiningOpportunity[]>([]);
  const [defiOps, setDefiOps] = useState<DeFiOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const mockSignals: TradeSignal[] = [
          { symbol: 'BTC', action: 'buy', confidence: 85 },
          { symbol: 'ETH', action: 'hold', confidence: 72 },
          { symbol: 'SOL', action: 'sell', confidence: 68 }
        ];
        setTradeSignals(mockSignals);

        const mockMining: MiningOpportunity[] = [
          { bestPool: 'Stratum Pool', expectedReward: 0.0245, profitability: 0.82 },
          { bestPool: 'Mining Pool Pro', expectedReward: 0.0198, profitability: 0.78 }
        ];
        setMiningOps(mockMining);

        const mockDefi: DeFiOpportunity[] = [
          { protocol: 'Aave', riskLevel: 'low', expectedYield: 0.08 },
          { protocol: 'Compound', riskLevel: 'medium', expectedYield: 0.12 },
          { protocol: 'Curve', riskLevel: 'low', expectedYield: 0.15 }
        ];
        setDefiOps(mockDefi);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'buy':
        return 'bg-green-500/20 text-green-400';
      case 'sell':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-500/20 text-green-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-red-500/20 text-red-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-8">
          Crypto AI Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Trading Signals */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Trading Signals</h2>
            <div className="space-y-3">
              {tradeSignals.map((signal) => (
                <div key={signal.symbol} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">{signal.symbol}</p>
                    <p className="text-sm text-slate-400">Confidence: {signal.confidence}%</p>
                  </div>
                  <Badge className={getActionColor(signal.action)}>
                    {signal.action.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Mining Opportunities */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Mining Opportunities</h2>
            <div className="space-y-3">
              {miningOps.map((op, idx) => (
                <div key={idx} className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="font-semibold text-white">{op.bestPool}</p>
                  <p className="text-sm text-slate-400">Reward: {op.expectedReward.toFixed(4)} BTC</p>
                  <p className="text-sm text-green-400">Profitability: {(op.profitability * 100).toFixed(0)}%</p>
                </div>
              ))}
            </div>
          </Card>

          {/* DeFi Opportunities */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4">DeFi Opportunities</h2>
            <div className="space-y-3">
              {defiOps.map((op, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">{op.protocol}</p>
                    <p className="text-sm text-slate-400">APY: {(op.expectedYield * 100).toFixed(1)}%</p>
                  </div>
                  <Badge className={getRiskColor(op.riskLevel)}>
                    {op.riskLevel.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Real-time Stats */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Real-Time Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400">Active Signals</p>
              <p className="text-2xl font-bold text-pink-500">{tradeSignals.length}</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400">Mining Pools</p>
              <p className="text-2xl font-bold text-purple-500">{miningOps.length}</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400">DeFi Protocols</p>
              <p className="text-2xl font-bold text-cyan-500">{defiOps.length}</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-sm text-slate-400">Last Update</p>
              <p className="text-2xl font-bold text-green-500">Live</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CryptoAIDashboard;
