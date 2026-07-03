import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Calendar, Eye, Share2, DollarSign, TrendingUp } from "lucide-react";

export default function CreatorStudio() {
  const { user } = useAuth();

  if (!user) return <div className="p-8 text-center">Please login to access Creator Studio</div>;

  const mockContent = [
    { id: 1, title: "My First Video", views: 12450, earnings: 245.50, status: "published" },
    { id: 2, title: "Tutorial Series", views: 8920, earnings: 178.40, status: "published" },
    { id: 3, title: "Behind the Scenes", views: 0, earnings: 0, status: "draft" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Creator Studio</h1>
          <p className="text-muted-foreground">Upload, schedule, and monetize your content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21,370</div>
              <p className="text-xs text-muted-foreground">+2,450 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$423.90</div>
              <p className="text-xs text-muted-foreground">+$89.50 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">+120 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Avg Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5%</div>
              <p className="text-xs text-muted-foreground">Industry avg: 3.2%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">My Content</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="monetization">Monetization</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Your Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {item.views.toLocaleString()} views</span>
                          <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> ${item.earnings.toFixed(2)}</span>
                        </div>
                      </div>
                      <Badge variant={item.status === "published" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input placeholder="Enter content title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea placeholder="Describe your content..." rows={4} />
                </div>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Drag and drop your file here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <Button className="w-full">Upload Content</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Content</label>
                  <select className="w-full border rounded-lg p-2">
                    <option>Choose a video...</option>
                    {mockContent.map((item) => (
                      <option key={item.id}>{item.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Publish Date & Time</label>
                  <Input type="datetime-local" />
                </div>
                <Button className="w-full">Schedule Publishing</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monetization">
            <Card>
              <CardHeader>
                <CardTitle>Monetization Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold mb-2">Ad Revenue Share</p>
                  <p className="text-sm text-muted-foreground mb-4">Earn 70% of ad revenue from your content</p>
                  <Badge>Enabled</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold mb-2">Sponsorships</p>
                  <p className="text-sm text-muted-foreground mb-4">Connect with brands for sponsored content</p>
                  <Button variant="outline" className="w-full">Browse Sponsorships</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold mb-2">Subscriber Perks</p>
                  <p className="text-sm text-muted-foreground mb-4">Offer exclusive content to subscribers</p>
                  <Button variant="outline" className="w-full">Configure Perks</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
