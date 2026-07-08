import React from 'react';
import { Link } from 'wouter';
import { Mail, Phone, MapPin, GitBranch, Share2, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2 font-bold text-lg mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  SK
                </div>
                <span>SKY4444</span>
              </a>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              The Strategic Digital Ecosystem Where Every Action Matters
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors">
                <GitBranch className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Finance & Trading */}
          <div>
            <h3 className="font-semibold text-white mb-4">💰 Finance</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/trading"><a className="hover:text-pink-400 transition-colors">Trading</a></Link></li>
              <li><Link href="/portfolio"><a className="hover:text-pink-400 transition-colors">Portfolio</a></Link></li>
              <li><Link href="/wallet"><a className="hover:text-pink-400 transition-colors">Wallet</a></Link></li>
              <li><Link href="/mining"><a className="hover:text-pink-400 transition-colors">Mining</a></Link></li>
              <li><Link href="/staking"><a className="hover:text-pink-400 transition-colors">Staking</a></Link></li>
              <li><Link href="/yield-farming"><a className="hover:text-pink-400 transition-colors">Yield Farming</a></Link></li>
            </ul>
          </div>

          {/* Community & Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">👥 Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/feed"><a className="hover:text-pink-400 transition-colors">Social Feed</a></Link></li>
              <li><Link href="/profiles"><a className="hover:text-pink-400 transition-colors">Profiles</a></Link></li>
              <li><Link href="/communities"><a className="hover:text-pink-400 transition-colors">Communities</a></Link></li>
              <li><Link href="/messages"><a className="hover:text-pink-400 transition-colors">Messaging</a></Link></li>
              <li><Link href="/followers"><a className="hover:text-pink-400 transition-colors">Followers</a></Link></li>
              <li><Link href="/creator-economy"><a className="hover:text-pink-400 transition-colors">Creator Economy</a></Link></li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">🛍️ Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/marketplace"><a className="hover:text-pink-400 transition-colors">Marketplace</a></Link></li>
              <li><Link href="/games"><a className="hover:text-pink-400 transition-colors">Gaming</a></Link></li>
              <li><Link href="/courses"><a className="hover:text-pink-400 transition-colors">Learning</a></Link></li>
              <li><Link href="/ai-tools"><a className="hover:text-pink-400 transition-colors">AI Tools</a></Link></li>
              <li><Link href="/api-docs"><a className="hover:text-pink-400 transition-colors">API</a></Link></li>
              <li><Link href="/analytics-dashboard"><a className="hover:text-pink-400 transition-colors">Analytics</a></Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">⚙️ Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help"><a className="hover:text-pink-400 transition-colors">Help Center</a></Link></li>
              <li><Link href="/docs"><a className="hover:text-pink-400 transition-colors">Documentation</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-pink-400 transition-colors">Contact Us</a></Link></li>
              <li><Link href="/privacy"><a className="hover:text-pink-400 transition-colors">Privacy</a></Link></li>
              <li><Link href="/terms"><a className="hover:text-pink-400 transition-colors">Terms</a></Link></li>
              <li><Link href="/security"><a className="hover:text-pink-400 transition-colors">Security</a></Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-pink-500" />
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-white hover:text-pink-400 transition-colors">support@sky4444.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-pink-500" />
              <div>
                <p className="text-sm text-slate-400">Phone</p>
                <p className="text-white hover:text-pink-400 transition-colors">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-pink-500" />
              <div>
                <p className="text-sm text-slate-400">Address</p>
                <p className="text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800 pt-8 mb-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-pink-500">1,055</p>
            <p className="text-sm text-slate-400">Working Screens</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-500">320</p>
            <p className="text-sm text-slate-400">API Endpoints</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-500">1M+</p>
            <p className="text-sm text-slate-400">Lines of Code</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">99.9%</p>
            <p className="text-sm text-slate-400">Uptime</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; 2026 SKY4444. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy"><a className="hover:text-pink-400 transition-colors">Privacy Policy</a></Link>
            <Link href="/terms"><a className="hover:text-pink-400 transition-colors">Terms of Service</a></Link>
            <Link href="/cookies"><a className="hover:text-pink-400 transition-colors">Cookie Policy</a></Link>
            <Link href="/sitemap"><a className="hover:text-pink-400 transition-colors">Sitemap</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
