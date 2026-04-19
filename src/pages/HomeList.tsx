import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, getPosts, type Post } from '../api.ts';
import PostCard from '../components/PostCard.tsx';
import { ThemeToggle } from '../design-system/components/index.ts';

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
    <div className="vu-page-shell">
      <div className="vu-page-backdrop" />
      <div className="vu-page-inner">
        <div className="vu-page-toolbar">
          <ThemeToggle />
        </div>
        <section className="vu-hero-card">
          <div className="vu-hero-copy">
            <p className="vu-kicker">Viralco uploader</p>
            <h1 className="vu-hero-title">Administra tus assets con la misma lógica visual del DS.</h1>
            <p className="vu-hero-body">
              El uploader ahora vive dentro del lenguaje Nocturnal Console: capas profundas, lectura editorial y llamadas a la acción de alto contraste.
            </p>
          </div>
          <div className="vu-hero-actions">
            <Link to="/ui-components" className="vu-btn vu-btn-secondary">
              Ver UI kit
            </Link>
            <Link to="/add" className="vu-btn vu-btn-primary">
              Nuevo post
            </Link>
          </div>
        </section>

        <section className="vu-stats-grid">
          <article className="vu-stat-card">
            <span className="vu-metric-label">Posts</span>
            <strong>{posts.length}</strong>
            <p>Assets visibles dentro del feed actual.</p>
          </article>
          <article className="vu-stat-card">
            <span className="vu-metric-label">Estado API</span>
            <strong>{error ? 'Con incidencia' : loading ? 'Sincronizando' : 'Operativa'}</strong>
            <p>Lectura en tiempo real del flujo hacia el backend.</p>
          </article>
          <article className="vu-stat-card">
            <span className="vu-metric-label">Sistema</span>
            <strong>DS active</strong>
            <p>Base visual alineada al portal de documentación del proyecto.</p>
          </article>
        </section>

        {loading && <p className="vu-feedback">Cargando assets...</p>}
        {error && <p className="vu-feedback vu-feedback-danger">{error}</p>}

        {!loading && posts.length === 0 && (
          <section className="vu-empty-state">
            <p className="vu-kicker">Empty state</p>
            <h2>No hay posts todavía.</h2>
            <p>Empieza creando tu primera pieza para que el feed use este mismo patrón de card y acciones.</p>
            <Link to="/add" className="vu-btn vu-btn-primary">
              Crear primer post
            </Link>
          </section>
        )}

        <div className="vu-post-grid">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => post.id && handleDelete(post.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
