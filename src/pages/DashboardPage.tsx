import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter } from 'lucide-react';
import { postApi } from '@/db/api';
import type { PostWithAuthor, Post } from '@/types/index';
import { PostCard } from '@/components/posts/PostCard';
import { PostForm } from '@/components/posts/PostForm';
import { AppLayout } from '@/components/layouts/AppLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const categories = ['All', 'General', 'Tutorial', 'Discussion', 'Announcement', 'Question'];

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadPosts();
  }, [searchQuery, selectedCategory]);

  const loadPosts = async () => {
    setLoading(true);
    const filters: { search?: string; category?: string } = {};

    if (searchQuery) {
      filters.search = searchQuery;
    }

    if (selectedCategory !== 'All') {
      filters.category = selectedCategory;
    }

    const data = await postApi.getPosts(filters);
    setPosts(data);
    setLoading(false);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setFormOpen(true);
  };

  const handleEditPost = (post: PostWithAuthor) => {
    setEditingPost(post as Post);
    setFormOpen(true);
  };

  const handleDeletePost = async (postId: string) => {
    const { error } = await postApi.deletePost(postId);

    if (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete post',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Post deleted successfully',
    });

    loadPosts();
  };

  const handleFormSuccess = () => {
    loadPosts();
    toast({
      title: 'Success',
      description: editingPost ? 'Post updated successfully' : 'Post created successfully',
    });
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'my-posts') {
      return post.user_id === user?.id;
    }
    if (activeTab === 'published') {
      return post.status === 'published';
    }
    return true;
  });

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col max-sm:flex-col sm:flex-row justify-between items-start max-sm:items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {profile?.full_name || profile?.username}!
            </p>
          </div>
          <Button onClick={handleCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Create, manage, and share your posts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col max-sm:flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full max-sm:w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="my-posts">My Posts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {loading ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4 bg-muted" />
                          <Skeleton className="h-4 w-1/2 bg-muted" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-20 w-full bg-muted" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts found</p>
                    {activeTab === 'my-posts' && (
                      <Button onClick={handleCreatePost} className="mt-4">
                        Create Your First Post
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredPosts.map(post => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        showActions={post.user_id === user?.id || profile?.role === 'admin'}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <PostForm
        open={formOpen}
        onOpenChange={setFormOpen}
        post={editingPost}
        onSuccess={handleFormSuccess}
      />
    </AppLayout>
  );
}
