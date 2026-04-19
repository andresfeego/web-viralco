import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createPost,
  getSignedUrl,
  uploadImageInBucket,
} from '../api.ts';
import FileUpload from '../components/FileUpload.tsx';
import { ThemeToggle } from '../design-system/components/index.ts';

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
    <div className="vu-page-shell">
      <div className="vu-page-backdrop" />
      <div className="vu-page-inner vu-page-inner-form">
        <div className="vu-page-toolbar">
          <ThemeToggle />
        </div>
        <section className="vu-hero-card">
          <div className="vu-hero-copy">
            <p className="vu-kicker">Uploader / Create post</p>
            <h1 className="vu-hero-title">Carga una pieza y publícala dentro del flujo premium de Viralco.</h1>
            <p className="vu-hero-body">
              Esta pantalla usa el DS para transformar el uploader en un módulo editorial: superficies oscuras, acciones ámbar y feedback de estado claro.
            </p>
          </div>
          <div className="vu-hero-metrics">
            <div className="vu-metric-panel">
              <span className="vu-metric-label">Input</span>
              <strong>Imagen o video</strong>
            </div>
            <div className="vu-metric-panel">
              <span className="vu-metric-label">Estado</span>
              <strong>{loading ? 'Subiendo' : 'Listo para publicar'}</strong>
            </div>
            <div className="vu-metric-panel">
              <span className="vu-metric-label">Progreso</span>
              <strong>{progress}%</strong>
            </div>
          </div>
        </section>

        <div className="vu-form-layout">
          <form className="vu-form-card" onSubmit={handleSubmit}>
            <div className="vu-form-header">
              <p className="vu-kicker">Post metadata</p>
              <h2>Preparar publicación</h2>
            </div>

            <div className="vu-field-block">
              <label htmlFor="title" className="vu-field-label">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="vu-input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className="vu-field-block">
              <label htmlFor="file" className="vu-field-label">
                Imagen
              </label>
              <FileUpload
                preview={preview}
                previewType={previewType}
                onChange={handleFileChange}
              />
            </div>

            {error && <p className="vu-feedback vu-feedback-danger">{error}</p>}

            {loading && (
              <div className="vu-progress-panel">
                <div className="vu-progress-meta">
                  <span>Subiendo archivo</span>
                  <span>{progress}%</span>
                </div>
                <div className="vu-progress-track">
                  <div
                    className="vu-progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="vu-form-actions">
              <button
                type="submit"
                disabled={loading}
                className="vu-btn vu-btn-primary vu-btn-large"
              >
                {loading ? 'Guardando...' : 'Publicar post'}
              </button>
            </div>
          </form>

          <aside className="vu-side-panel">
            <p className="vu-kicker">Workflow notes</p>
            <h3>Reglas del DS aplicadas</h3>
            <ul className="vu-side-list">
              <li>Jerarquía por superficies tonales en vez de bordes fuertes.</li>
              <li>Primary action ámbar para publicar y estados cian para feedback positivo.</li>
              <li>Inputs con base oscura y foco lineal, no boxed.</li>
              <li>Spacing amplio para que el uploader se sienta premium, no utilitario.</li>
            </ul>
            <div className="vu-side-state">
              <span className="vu-badge-live">DS active</span>
              <p>Este módulo ya puede servir como patrón base para futuros formularios de Viralco.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
