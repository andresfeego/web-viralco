import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createPost,
  getSignedUrl,
  uploadImageInBucket,
} from '../api.ts';
import FileUpload from '../components/FileUpload.tsx';

export default function HomeAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (
    nextFile: File | null,
    nextPreview: string | null,
    nextPreviewType: string | null
  ) => {
    setFile(nextFile);
    setPreview(nextPreview);
    setPreviewType(nextPreviewType);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !file) {
      setError('Completa el título y selecciona una imagen.');
      return;
    }

    setLoading(true);
    setProgress(0);
    setError(null);

    try {
      const signedResponse = await getSignedUrl(file.type);
      await uploadImageInBucket(signedResponse.signedUrl, file, setProgress);
      await createPost({
        title,
        imageUrl: signedResponse.url,
        mediaType: file.type,
      });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl font-semibold">Add Post</h1>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="mt-1 block w-full border px-4 min-h-10 border-gray-300 rounded-md"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="file"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Imagen
            </label>
            <FileUpload
              preview={preview}
              previewType={previewType}
              onChange={handleFileChange}
            />
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {loading && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Subiendo archivo</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Guardando...' : 'Add Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
