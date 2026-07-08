import React from 'react';
import { Card } from '@/components/ui/card';

const pages = {
  trading: { title: 'Trading', icon: '📈' },
  portfolio: { title: 'Portfolio', icon: '💼' },
  'crypto-ai': { title: 'Crypto AI', icon: '🤖' },
  stocks: { title: 'Stocks', icon: '📊' },
  wallet: { title: 'Wallet', icon: '💰' },
  mining: { title: 'Mining', icon: '⛏️' },
  'social-feed': { title: 'Social Feed', icon: '👥' },
  profiles: { title: 'Profiles', icon: '👤' },
  messaging: { title: 'Messaging', icon: '💬' },
  communities: { title: 'Communities', icon: '🏘️' },
  games: { title: 'Games', icon: '🎮' },
  leaderboard: { title: 'Leaderboard', icon: '🏆' },
  tournaments: { title: 'Tournaments', icon: '🎯' },
  rewards: { title: 'Rewards', icon: '🎁' },
  marketplace: { title: 'Marketplace', icon: '🛍️' },
  'marketplace-sell': { title: 'Sell Items', icon: '📤' },
  orders: { title: 'Orders', icon: '📦' },
  auctions: { title: 'Auctions', icon: '🔨' },
  courses: { title: 'Courses', icon: '📚' },
  tutorials: { title: 'Tutorials', icon: '🎓' },
  certifications: { title: 'Certifications', icon: '📜' },
  resources: { title: 'Resources', icon: '📖' },
  'creator-dashboard': { title: 'Creator Dashboard', icon: '🎬' },
  'creator-analytics': { title: 'Creator Analytics', icon: '📊' },
  monetization: { title: 'Monetization', icon: '💵' },
  'creator-content': { title: 'Creator Content', icon: '✍️' },
  'ai-brain': { title: 'AI Brain', icon: '🧠' },
  'ai-assistant': { title: 'AI Assistant', icon: '🤖' },
  'ai-tools': { title: 'AI Tools', icon: '🛠️' },
  'ai-agents': { title: 'AI Agents', icon: '👾' },
  'dev-tools': { title: 'Developer Tools', icon: '⚙️' },
  utilities: { title: 'Utilities', icon: '🔧' },
  converters: { title: 'Converters', icon: '🔄' },
  generators: { title: 'Generators', icon: '✨' },
  'admin-dashboard': { title: 'Admin Dashboard', icon: '🔐' },
  'admin-users': { title: 'User Management', icon: '👨‍💼' },
  'admin-settings': { title: 'Settings', icon: '⚙️' },
  'admin-reports': { title: 'Reports', icon: '📈' }
};

export function PageTemplate({ pageKey }: { pageKey: keyof typeof pages }) {
  const page = pages[pageKey];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-5xl">{page.icon}</span>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            {page.title}
          </h1>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 p-8">
          <p className="text-slate-300 text-lg mb-4">
            Welcome to {page.title}
          </p>
          <p className="text-slate-400">
            This page is ready for implementation. All navigation is functional and routing works perfectly.
          </p>
        </Card>
      </div>
    </div>
  );
}

// Export individual page components
export const Trading = () => <PageTemplate pageKey="trading" />;
export const Portfolio = () => <PageTemplate pageKey="portfolio" />;
export const Stocks = () => <PageTemplate pageKey="stocks" />;
export const Wallet = () => <PageTemplate pageKey="wallet" />;
export const Mining = () => <PageTemplate pageKey="mining" />;
export const SocialFeed = () => <PageTemplate pageKey="social-feed" />;
export const Profiles = () => <PageTemplate pageKey="profiles" />;
export const Messaging = () => <PageTemplate pageKey="messaging" />;
export const Communities = () => <PageTemplate pageKey="communities" />;
export const Games = () => <PageTemplate pageKey="games" />;
export const Leaderboard = () => <PageTemplate pageKey="leaderboard" />;
export const Tournaments = () => <PageTemplate pageKey="tournaments" />;
export const Rewards = () => <PageTemplate pageKey="rewards" />;
export const Marketplace = () => <PageTemplate pageKey="marketplace" />;
export const MarketplaceSell = () => <PageTemplate pageKey="marketplace-sell" />;
export const Orders = () => <PageTemplate pageKey="orders" />;
export const Auctions = () => <PageTemplate pageKey="auctions" />;
export const Courses = () => <PageTemplate pageKey="courses" />;
export const Tutorials = () => <PageTemplate pageKey="tutorials" />;
export const Certifications = () => <PageTemplate pageKey="certifications" />;
export const Resources = () => <PageTemplate pageKey="resources" />;
export const CreatorDashboard = () => <PageTemplate pageKey="creator-dashboard" />;
export const CreatorAnalytics = () => <PageTemplate pageKey="creator-analytics" />;
export const Monetization = () => <PageTemplate pageKey="monetization" />;
export const CreatorContent = () => <PageTemplate pageKey="creator-content" />;
export const AIBrain = () => <PageTemplate pageKey="ai-brain" />;
export const AIAssistant = () => <PageTemplate pageKey="ai-assistant" />;
export const AITools = () => <PageTemplate pageKey="ai-tools" />;
export const AIAgents = () => <PageTemplate pageKey="ai-agents" />;
export const DevTools = () => <PageTemplate pageKey="dev-tools" />;
export const Utilities = () => <PageTemplate pageKey="utilities" />;
export const Converters = () => <PageTemplate pageKey="converters" />;
export const Generators = () => <PageTemplate pageKey="generators" />;
export const AdminDashboard = () => <PageTemplate pageKey="admin-dashboard" />;
export const AdminUsers = () => <PageTemplate pageKey="admin-users" />;
export const AdminSettings = () => <PageTemplate pageKey="admin-settings" />;
export const AdminReports = () => <PageTemplate pageKey="admin-reports" />;
