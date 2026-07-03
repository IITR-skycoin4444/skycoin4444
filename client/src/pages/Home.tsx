import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { useEffect, useRef, useState } from "react";
import {
  Users, TrendingUp, Shield, Activity, Coins, Bot, Store, Vote, Flame, Lock,
  Code2, Monitor, Server, FileCode, CheckCircle2, Zap, Diamond, Rocket,
  ExternalLink, GitBranch, Download, Globe, MessageSquare, GraduationCap,
  Gamepad2, MessageCircle, Building2, Sparkles, ArrowRight, Mic, Wallet,
  BarChart3, Trophy, Heart, Layers, Crown, Target, DollarSign, Star, Brain,
  RefreshCw, ShieldCheck, Map, Key, Radio, Cpu, Terminal, Wrench, Settings,
  Lightbulb, Grid3x3
} from "lucide-react";

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (target === 0) return;
    startRef.current = null;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else setCount(target);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return count;
}

function useCryptoTicker() {
  const [prices, setPrices] = useState({
    BTC: { price: 67420, change: 2.34 },
    ETH: { price: 3891, change: 1.12 },
    SKY4444: { price: 4.44, change: 44.44 },
    DOGE: { price: 0.38, change: 5.67 },
    TRUMP: { price: 12.89, change: 8.92 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        BTC: { price: prev.BTC.price + (Math.random() - 0.5) * 200, change: prev.BTC.change + (Math.random() - 0.5) * 2 },
        ETH: { price: prev.ETH.price + (Math.random() - 0.5) * 50, change: prev.ETH.change + (Math.random() - 0.5) * 2 },
        SKY4444: { price: prev.SKY4444.price + (Math.random() - 0.5) * 0.5, change: prev.SKY4444.change + (Math.random() - 0.5) * 5 },
        DOGE: { price: prev.DOGE.price + (Math.random() - 0.5) * 0.05, change: prev.DOGE.change + (Math.random() - 0.5) * 3 },
        TRUMP: { price: prev.TRUMP.price + (Math.random() - 0.5) * 1, change: prev.TRUMP.change + (Math.random() - 0.5) * 4 }
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return prices;
}

const FEATURES = [
  { icon: Bot, name: "Hope AI", desc: "Strategic AI engine executing real actions from chat", accent: "cyan" },
  { icon: Wallet, name: "Unified Wallet", desc: "Multi-token management with real-time portfolio tracking", accent: "blue" },
  { icon: Gamepad2, name: "Gaming Hub", desc: "Play games, earn crypto rewards, compete globally", accent: "green" },
  { icon: Heart, name: "Dating Platform", desc: "AI-powered matching with real connections", accent: "pink" },
  { icon: Store, name: "Marketplace", desc: "Buy, sell, trade with secure escrow protection", accent: "yellow" },
  { icon: TrendingUp, name: "Trading", desc: "Real-time crypto trading with AI bot strategies", accent: "green" },
  { icon: MessageCircle, name: "Social Network", desc: "Connect, share, and build your community", accent: "cyan" },
  { icon: Trophy, name: "Leaderboards", desc: "Compete and earn rewards on global rankings", accent: "orange" },
  { icon: GraduationCap, name: "Learning Hub", desc: "AI-powered courses and certifications", accent: "purple" },
  { icon: Vote, name: "Governance", desc: "Community voting and treasury management", accent: "blue" },
  { icon: Shield, name: "Security", desc: "Enterprise-grade security and privacy", accent: "red" },
  { icon: Sparkles, name: "Creator Studio", desc: "Monetize content and build your audience", accent: "yellow" },
];

export default function Home() {
  const prices = useCryptoTicker();
  const users = useCountUp(1000000);
  const transactions = useCountUp(399);
  const screens = useCountUp(212);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Crypto Ticker */}
      <div className="sticky top-16 z-30 bg-slate-900/80 backdrop-blur border-b border-purple-500/20 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 overflow-x-auto">
          {Object.entries(prices).map(([symbol, data]) => (
            <div key={symbol} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-sm font-semibold text-white">{symbol}</span>
              <span className="text-sm text-yellow-400">${data.price.toFixed(2)}</span>
              <span className={`text-xs font-semibold ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section - Chess Theme */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Animated Chess Board Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Grid3x3 className="w-12 h-12 text-pink-500 animate-bounce" />
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                SKY4444
              </h1>
              <Grid3x3 className="w-12 h-12 text-yellow-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              Strategic Digital Ecosystem
            </p>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              One Platform. One Ecosystem. Unlimited Potential.
            </p>
            
            <p className="text-base md:text-lg text-purple-300 italic">
              "The social platform where chat executes real actions"
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a href={getLoginUrl()}>
              <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <Button variant="outline" className="border-purple-500/50 text-gray-300 hover:text-white px-8 py-6 text-lg font-semibold rounded-lg">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-purple-500/20">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-pink-500">{users.toLocaleString()}+</p>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-orange-500">{transactions}</p>
              <p className="text-gray-400">API Endpoints</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-yellow-500">{screens}+</p>
              <p className="text-gray-400">Features</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Strategic Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive ecosystem combining social, finance, gaming, and commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/5 rounded-xl transition-all" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className={`w-12 h-12 rounded-lg bg-${feature.accent}-500/20 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${feature.accent}-400`} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.name}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chess Strategy Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Strategic Gameplay
              </h2>
              <p className="text-gray-400 text-lg">
                Like chess, SKY4444 rewards strategic thinking. Every move matters. Build your empire through calculated decisions, smart investments, and community engagement.
              </p>
              <ul className="space-y-3">
                {[
                  "Mine crypto and earn passive income",
                  "Trade strategically on real markets",
                  "Build your creator presence",
                  "Compete in games and tournaments",
                  "Govern the ecosystem democratically"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl border border-purple-500/30 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:60px_60px] animate-pulse" />
              </div>
              <div className="relative z-10 text-center space-y-4">
                <Grid3x3 className="w-24 h-24 text-pink-500 mx-auto animate-bounce" />
                <p className="text-xl font-bold text-white">Strategic Ecosystem</p>
                <p className="text-gray-400">Every move creates value</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border-y border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Play?
          </h2>
          <p className="text-xl text-gray-400">
            Join millions of users building the future of digital commerce, finance, and community
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={getLoginUrl()}>
              <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
                Start Your Journey
                <Rocket className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400 space-y-4">
          <p>SKY4444 - One Platform. One Ecosystem. Unlimited Potential.</p>
          <p className="text-sm">Thanks God and Bless the USA 🇺🇸</p>
          <p className="text-xs text-gray-500">© 2026 SKY4444. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
