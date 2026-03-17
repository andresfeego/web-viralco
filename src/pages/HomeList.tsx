import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, getPosts, type Post } from '../api.ts';
import PostCard from '../components/PostCard.tsx';

export default function HomeList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting post');
    }
  };

  return (
    <div className="container mx-auto my-20 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link
          to="/add"
          className="bg-green-500 px-4 py-2 rounded-md text-white min-h-6"
        >
          Agregar
        </Link>
      </div>

      {loading && <p className="text-gray-600">Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && posts.length === 0 && (
        <p className="text-gray-600">No hay posts todavía.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={() => post.id && handleDelete(post.id)}
          />
        ))}
      </div>
    </div>
  );
}
