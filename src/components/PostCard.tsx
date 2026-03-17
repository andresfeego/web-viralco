import type { Post } from '../api.ts';

interface PostCardProps {
  post: Post;
  onDelete: () => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <div className="bg-white shadow-md rounded-md border border-gray-200">
      <picture>
        {post.mediaType?.startsWith('video/') ? (
          <video
            controls
            className="w-full h-[250px] object-contain rounded-t-md bg-black"
            src={post.imageUrl}
          />
        ) : (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[250px] aspect-square object-contain rounded-t-md"
          />
        )}
      </picture>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
        <div className="flex flex-wrap gap-3">
          {post.id && (
            <a
              className="bg-blue-600 px-4 py-2 rounded-md text-white"
              href={`http://localhost:4000/api/posts/${post.id}/download`}
            >
              Descargar
            </a>
          )}
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-white"
            onClick={onDelete}
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
