export interface Profile {
  id: string;
  username: string | null;
  email: string | null;
  full_name: string | null;
  bio: string | null;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string | null;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface PostWithAuthor extends Post {
  author?: {
    username: string | null;
    full_name: string | null;
  };
}
