import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Home, Compass, ShoppingCart, Users, User, Settings, HelpCircle,
  Wallet, Zap, Gamepad2, Radio, TrendingUp, Code, Lock, Bell,
  MoreHorizontal, Menu, X, Heart, Flame, Sparkles, Cpu
} from "lucide-react";
import { useState } from "react";

const navCategories = {
  "💰 Finance": [
    { name: "🏦 Wallet", path: "/walletoverview", icon: Wallet },
    { name: "📈 Trading", path: "/tokenswap", icon: TrendingUp },
    { name: "🔒 Staking", path: "/stakingdashboard", icon: Lock },
    { name: "💼 Portfolio", path: "/portfoliotracker", icon: TrendingUp },
    { name: "⛏️ Mining", path: "/miningdashboard", icon: Zap },
  ],
  "🛍️ Marketplace": [
    { name: "🏪 Shop", path: "/marketplace", icon: ShoppingCart },
    { name: "🛒 Cart", path: "/shoppingcart", icon: ShoppingCart },
    { name: "💳 Checkout", path: "/checkout", icon: Wallet },
    { name: "📦 Orders", path: "/ordertracking", icon: Home },
  ],
  "👥 Social": [
    { name: "📰 Feed", path: "/social", icon: Home },
    { name: "👫 Community", path: "/communityhub", icon: Users },
    { name: "💬 Messages", path: "/directmessages", icon: Bell },
    { name: "🔔 Notifications", path: "/notificationcenter", icon: Bell },
    { name: "❤️ Dating", path: "/datingdiscovery", icon: Heart },
  ],
  "🎮 Gaming": [
    { name: "🕹️ Games", path: "/gamelobby", icon: Gamepad2 },
    { name: "🏆 Tournaments", path: "/tournaments", icon: Flame },
    { name: "📊 Leaderboards", path: "/leaderboards", icon: TrendingUp },
    { name: "⭐ Achievements", path: "/achievements", icon: Sparkles },
  ],
  "🎬 Content": [
    { name: "📺 Streaming", path: "/streaming", icon: Radio },
    { name: "✍️ Blog", path: "/blogeditor", icon: Code },
    { name: "🎥 Videos", path: "/videouploader", icon: Radio },
    { name: "🖼️ Gallery", path: "/imagegallery", icon: Compass },
  ],
  "🤖 AI": [
    { name: "🧠 Hope AI", path: "/aiassistant", icon: Cpu },
    { name: "💡 AI Tools", path: "/aitoolshub", icon: Sparkles },
    { name: "🔮 AI Trading", path: "/aitrading", icon: TrendingUp },
  ],
  "⚙️ Admin": [
    { name: "📊 Dashboard", path: "/admindashboard", icon: Home },
    { name: "👤 Users", path: "/usermanagement", icon: Users },
    { name: "📈 Analytics", path: "/analyticsdashboard", icon: TrendingUp },
    { name: "📋 Logs", path: "/systemlogs", icon: Code },
  ],
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-40 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/20 px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              SKY4444
            </a>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {Object.entries(navCategories).map(([category, items]) => (
              <DropdownMenu key={category}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-slate-300 hover:text-white hover:bg-purple-500/20 transition-all"
                  >
                    {category}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-slate-800 border-slate-700">
                  <DropdownMenuLabel className="text-white">{category}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  {items.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <a>
                        <DropdownMenuItem className="cursor-pointer text-gray-300 hover:text-white hover:bg-purple-500/20">
                          {item.name}
                        </DropdownMenuItem>
                      </a>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/notificationcenter">
              <a>
                <Button size="icon" variant="ghost" className="text-slate-300 hover:text-white hover:bg-purple-500/20">
                  <Bell className="w-5 h-5" />
                </Button>
              </a>
            </Link>
            <Link href="/settings">
              <a>
                <Button size="icon" variant="ghost" className="text-slate-300 hover:text-white hover:bg-purple-500/20">
                  <Settings className="w-5 h-5" />
                </Button>
              </a>
            </Link>
            <Link href="/profile">
              <a>
                <Button size="icon" variant="ghost" className="text-slate-300 hover:text-white hover:bg-purple-500/20">
                  <User className="w-5 h-5" />
                </Button>
              </a>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden text-slate-300 hover:text-white hover:bg-purple-500/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 max-h-96 overflow-y-auto">
          <div className="px-4 py-3 space-y-2">
            {Object.entries(navCategories).map(([category, items]) => (
              <div key={category}>
                <p className="text-sm font-semibold text-purple-400 px-3 py-2">{category}</p>
                <div className="space-y-1 ml-2">
                  {items.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <a
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-purple-500/20 rounded transition-colors"
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
