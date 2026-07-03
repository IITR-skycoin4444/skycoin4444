import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight, Settings, Home } from "lucide-react";
import { Link } from "wouter";

export default function Product51() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product51</h1>
          <p className="text-gray-400 mb-8">Product listing 51</p>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-pink-600 to-purple-600">
              Sign Up to Access <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <Home className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
            Product51
          </h1>
          <p className="text-gray-400">Product listing 51</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-black/40 border-purple-500/20 p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ArrowRight className="w-4 h-4 mr-2" /> Continue
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-black/40 border-purple-500/20 p-8">
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-white mb-4">Product51</h2>
                <p className="text-gray-400 mb-6">Product listing 51</p>
                <Badge className="bg-gradient-to-r from-pink-600 to-purple-600">
                  ✓ Active & Ready
                </Badge>
              </div>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="bg-black/40 border-b border-purple-500/20">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-gray-400">Overview content for Product51</p>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-gray-400">Details content for Product51</p>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-gray-400">Settings content for Product51</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
