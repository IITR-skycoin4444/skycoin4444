import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Mail, Lock, User, Eye, EyeOff, Zap, Shield, Sparkles } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shadowMode, setShadowMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.login.useMutation();
  const signupMutation = trpc.auth.signup.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "login") {
        await loginMutation.mutateAsync({ email, password });
        window.location.href = "/";
      } else {
        await signupMutation.mutateAsync({ email, password, name, shadowMode });
        window.location.href = "/";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SKYCOIN4444</h1>
          <p className="text-purple-300">The AI-Powered Web3 Social Ecosystem</p>
        </div>

        {/* Auth Card */}
        <Card className="bg-slate-800/80 backdrop-blur border-purple-500/30 p-8">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                mode === "login"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                mode === "signup"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>
            </div>

            {/* Name (Signup only) */}
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Shadow Mode Toggle (Signup only) */}
            {mode === "signup" && (
              <div className="bg-slate-700/50 border border-purple-500/30 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shadowMode}
                    onChange={(e) => setShadowMode(e.target.checked)}
                    className="w-5 h-5 rounded bg-slate-600 border-purple-500 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Shield className="w-4 h-4 text-purple-400" />
                      Shadow Mode
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Post anonymously. Your posts appear as "Shadow" instead of your username.
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Features */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">Platform Features</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Anonymous Shadow Mode posting</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>AI-powered features</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
