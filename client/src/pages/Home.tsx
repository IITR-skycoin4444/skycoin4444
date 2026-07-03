import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Users, TrendingUp, Gamepad2, ShoppingCart, Radio, Brain, Award, Gem, Rocket, Lock, BarChart3, Zap as ZapIcon } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                SKY4444
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
              The Strategic Digital Ecosystem Where Every Action Matters
            </p>
            <p className="text-lg text-gray-400">
              Mine. Trade. Create. Earn. All in one platform.
            </p>
            
            <div className="flex gap-4 justify-center pt-8 flex-wrap">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto">
              <Card className="bg-black/50 border-purple-500/30 p-4">
                <div className="text-3xl font-bold text-pink-500">444+</div>
                <div className="text-sm text-gray-400">Production Pages</div>
              </Card>
              <Card className="bg-black/50 border-purple-500/30 p-4">
                <div className="text-3xl font-bold text-cyan-500">320</div>
                <div className="text-sm text-gray-400">API Endpoints</div>
              </Card>
              <Card className="bg-black/50 border-purple-500/30 p-4">
                <div className="text-3xl font-bold text-purple-500">1M+</div>
                <div className="text-sm text-gray-400">Lines of Code</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Finance */}
            <Link href="/walletoverview">
              <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all p-6 h-full">
                <Zap className="w-8 h-8 text-pink-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">💰 Finance</h3>
                <p className="text-gray-400 text-sm">Mining, trading, staking, and portfolio management</p>
              </Card>
            </Link>

            {/* Social */}
            <Link href="/social">
              <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all p-6 h-full">
                <Users className="w-8 h-8 text-cyan-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">👥 Social</h3>
                <p className="text-gray-400 text-sm">Connect, share, and build communities</p>
              </Card>
            </Link>

            {/* Gaming */}
            <Link href="/gamelobby">
              <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all p-6 h-full">
                <Gamepad2 className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">🎮 Gaming</h3>
                <p className="text-gray-400 text-sm">Play, compete, and earn rewards</p>
              </Card>
            </Link>

            {/* Marketplace */}
            <Link href="/marketplace">
              <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all p-6 h-full">
                <ShoppingCart className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">🛍️ Marketplace</h3>
                <p className="text-gray-400 text-sm">Buy, sell, and discover products</p>
              </Card>
            </Link>

            {/* Content */}
            <Link href="/streaming">
              <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all p-6 h-full">
                <Radio className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">🎬 Content</h3>
                <p className="text-gray-400 text-sm">Stream, create, and monetize</p>
              </Card>
            </Link>

            {/* Education */}
            <Link href="/school">
              <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all p-6 h-full">
                <Brain className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">🎓 Education</h3>
                <p className="text-gray-400 text-sm">Learn blockchain, crypto, and AI</p>
              </Card>
            </Link>

            {/* AI */}
            <Link href="/aiassistant">
              <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all p-6 h-full">
                <Brain className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">🤖 Hope AI</h3>
                <p className="text-gray-400 text-sm">Advanced AI assistance and automation</p>
              </Card>
            </Link>

            {/* Trading */}
            <Link href="/tokenswap">
              <Card className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all p-6 h-full">
                <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">📈 Trading</h3>
                <p className="text-gray-400 text-sm">Real-time trading and swaps</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* ICO & Sign-Up Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/10 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Join the SKY4444 Revolution</h2>
            <p className="text-xl text-gray-300">Limited-time opportunity to become part of an exclusive ecosystem</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Value Proposition */}
            <Card className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border-pink-500/30 p-8">
              <Gem className="w-12 h-12 text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Unmatched Value</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">✓</span>
                  <span>Access to 444+ production pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">✓</span>
                  <span>320 API endpoints for seamless integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">✓</span>
                  <span>24/7 autonomous AI mining engine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">✓</span>
                  <span>Real-time trading with AI optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">✓</span>
                  <span>Creator monetization and revenue sharing</span>
                </li>
              </ul>
            </Card>

            {/* Rarity & Exclusivity */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 p-8">
              <Award className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Exclusive Rarity</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">◆</span>
                  <span>Only 10,000 founding member slots available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">◆</span>
                  <span>Early adopters receive 50% lifetime discount</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">◆</span>
                  <span>Exclusive NFT badge for founding members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">◆</span>
                  <span>Priority access to new features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">◆</span>
                  <span>Governance voting rights</span>
                </li>
              </ul>
            </Card>

            {/* ICO Details */}
            <Card className="bg-gradient-to-br from-cyan-900/20 to-green-900/20 border-cyan-500/30 p-8">
              <Rocket className="w-12 h-12 text-cyan-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">ICO Details</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">Token Price</p>
                  <p className="text-2xl font-bold text-cyan-400">$0.444</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Supply</p>
                  <p className="text-2xl font-bold text-cyan-400">1 Billion SKY</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Minimum Investment</p>
                  <p className="text-2xl font-bold text-cyan-400">$100 USD</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Fundraising Goal</p>
                  <p className="text-2xl font-bold text-cyan-400">$50M USD</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Benefits Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">What You Get</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/50 border-purple-500/30 p-6">
                <ZapIcon className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-bold mb-2">Passive Income</h4>
                <p className="text-sm text-gray-400">Earn from mining, staking, and platform revenue sharing</p>
              </Card>
              <Card className="bg-black/50 border-purple-500/30 p-6">
                <BarChart3 className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-bold mb-2">Portfolio Growth</h4>
                <p className="text-sm text-gray-400">Track and optimize your digital assets in real-time</p>
              </Card>
              <Card className="bg-black/50 border-purple-500/30 p-6">
                <Users className="w-8 h-8 text-blue-500 mb-3" />
                <h4 className="font-bold mb-2">Community Access</h4>
                <p className="text-sm text-gray-400">Connect with 1M+ users and build your network</p>
              </Card>
              <Card className="bg-black/50 border-purple-500/30 p-6">
                <Lock className="w-8 h-8 text-red-500 mb-3" />
                <h4 className="font-bold mb-2">Security First</h4>
                <p className="text-sm text-gray-400">Enterprise-grade security and insurance coverage</p>
              </Card>
            </div>
          </div>

          {/* Sign-Up CTA */}
          <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/50 rounded-lg p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Become a Founding Member?</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the SKY4444 ecosystem today and start your journey toward financial independence and digital empowerment. Limited slots available—secure yours now.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-12 py-6 text-lg">
                  Sign Up Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-12 py-6 text-lg">
                Learn More About ICO
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">🔒 Secure. Verified. Transparent. All transactions are recorded on the blockchain.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Join the Ecosystem?</h2>
          <p className="text-xl text-gray-400">
            Start earning, trading, and creating today. No limits. No boundaries.
          </p>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-12 py-6 text-lg">
              Sign Up Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">SKY4444 Enterprise</h4>
            <p className="text-gray-400 text-sm">The leading strategic digital ecosystem for Web3, AI, and decentralized finance. Empowering users to mine, trade, create, and earn with unparalleled security and innovation.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-purple-400"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-400"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-400"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="#" className="text-gray-400 hover:text-purple-400"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/dashboard"><a className="hover:text-purple-400">Dashboard</a></Link></li>
              <li><Link href="/walletoverview"><a className="hover:text-purple-400">Wallet</a></Link></li>
              <li><Link href="/marketplace"><a className="hover:text-purple-400">Marketplace</a></Link></li>
              <li><Link href="/school"><a className="hover:text-purple-400">Education</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-purple-400">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400">Partnerships</a></li>
              <li><a href="#" className="hover:text-purple-400">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 SKY4444. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
