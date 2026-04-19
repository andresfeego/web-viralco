import { useState } from 'react';
import type { Post } from '../api.ts';
import { PreviewModal, UIButton, UICard } from '../design-system/components/index.ts';

interface PostCardProps {
  post: Post;
  onDelete: () => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <UICard
        className="vu-post-card"
        eyebrow="Media asset"
        title={post.title}
        body="Asset listo para revisar, descargar o eliminar desde el flujo operativo."
        headerAside={<span className="vu-post-status">Live</span>}
        media={
          <div className="vu-post-frame">
            {post.mediaType?.startsWith('video/') ? (
              <video
                controls
                className="vu-post-media"
                src={post.imageUrl}
              />
            ) : (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="vu-post-media"
              />
            )}
          </div>
        }
        actions={
          <>
            {post.id && (
              <UIButton
                href={`http://localhost:4000/api/posts/${post.id}/download`}
                variant="primary"
                size="sm"
                target="_blank"
                rel="noreferrer"
              >
                Descargar
              </UIButton>
            )}
            <UIButton variant="secondary" onClick={() => setIsPreviewOpen(true)} size="sm">
              Ver
            </UIButton>
            <UIButton
              variant="danger"
              onClick={onDelete}
              size="sm"
              type="button"
            >
              Eliminar
            </UIButton>
          </>
        }
      >
        <div className="vu-post-meta">
          <span className="vu-post-meta-item">{post.mediaType ?? 'asset'}</span>
        </div>
      </UICard>

      <PreviewModal
        mediaType={post.mediaType}
        mediaUrl={post.imageUrl}
        onClose={() => setIsPreviewOpen(false)}
        open={isPreviewOpen}
        title={post.title}
      />
    </>
  );
}
