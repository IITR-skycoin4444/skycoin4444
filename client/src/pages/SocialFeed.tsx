import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  image?: string;
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: { name: 'Alex Chen', handle: '@alexchen', avatar: 'AC' },
      content: 'Just hit a new ATH on my portfolio! 🚀 The power of compound growth and strategic diversification. #crypto #investing',
      timestamp: '2 hours ago',
      likes: 1240,
      comments: 156,
      shares: 89,
      liked: false,
    },
    {
      id: '2',
      author: { name: 'Sarah Moon', handle: '@sarahmoon', avatar: 'SM' },
      content: 'Bitcoin breaking through resistance levels. Technical analysis suggests bullish momentum. What are your thoughts on the current market?',
      timestamp: '4 hours ago',
      likes: 2840,
      comments: 342,
      shares: 234,
      liked: true,
    },
    {
      id: '3',
      author: { name: 'Dev Team', handle: '@devteam', avatar: 'DT' },
      content: 'Excited to announce the launch of our new staking pool! Earn up to 12% APY on your holdings. Early adopters get bonus rewards!',
      timestamp: '6 hours ago',
      likes: 5620,
      comments: 678,
      shares: 456,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: { name: 'You', handle: '@yourhandle', avatar: 'YH' },
        content: newPost,
        timestamp: 'now',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Social Feed</h1>
          <p className="text-muted-foreground">Connect with the crypto community and share insights</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>YH</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind? Share your crypto insights..."
                  className="w-full bg-background text-foreground placeholder-muted-foreground border border-border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={handlePostSubmit}
                    disabled={!newPost.trim()}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 flex-1">
                    <Avatar>
                      <AvatarFallback>{post.author.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{post.author.name}</span>
                        <span className="text-muted-foreground">{post.author.handle}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                <div className="flex gap-4 text-sm text-muted-foreground mb-4 py-2 border-y border-border">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                  <span>{post.shares} shares</span>
                </div>

                <div className="flex justify-around">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-muted-foreground hover:text-pink-500"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${post.liked ? 'fill-pink-500 text-pink-500' : ''}`}
                    />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-blue-500">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-green-500">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="w-full">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
}
