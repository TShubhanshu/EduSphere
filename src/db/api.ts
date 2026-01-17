import { supabase } from './supabase';
import type { Profile, Post, PostWithAuthor } from '@/types/index';

export const profileApi = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.full_name || null,
          bio: updates.bio || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  async getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles:', error);
      return [];
    }
    return Array.isArray(data) ? data : [];
  },

  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
};

export const postApi = {
  async getPosts(filters?: { search?: string; category?: string; status?: string }): Promise<PostWithAuthor[]> {
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:profiles!posts_user_id_fkey(username, full_name)
      `)
      .order('created_at', { ascending: false });

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return Array.isArray(data) ? data.map(post => ({
      ...post,
      author: Array.isArray(post.author) ? post.author[0] : post.author,
    })) : [];
  },

  async getPost(postId: string): Promise<PostWithAuthor | null> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles!posts_user_id_fkey(username, full_name)
      `)
      .eq('id', postId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching post:', error);
      return null;
    }

    if (data) {
      return {
        ...data,
        author: Array.isArray(data.author) ? data.author[0] : data.author,
      };
    }

    return null;
  },

  async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Post | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: post.user_id,
          title: post.title,
          content: post.content,
          category: post.category || null,
          status: post.status || 'draft',
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updatePost(postId: string, updates: Partial<Post>): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: updates.title,
          content: updates.content,
          category: updates.category || null,
          status: updates.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  async deletePost(postId: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  async getUserPosts(userId: string): Promise<PostWithAuthor[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles!posts_user_id_fkey(username, full_name)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }

    return Array.isArray(data) ? data.map(post => ({
      ...post,
      author: Array.isArray(post.author) ? post.author[0] : post.author,
    })) : [];
  },
};
