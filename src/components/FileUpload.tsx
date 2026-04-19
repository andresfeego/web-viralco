import type { ChangeEvent } from 'react';

interface FileUploadProps {
  preview: string | null;
  previewType: string | null;
  onChange: (
    file: File | null,
    preview: string | null,
    previewType: string | null
  ) => void;
}

export default function FileUpload({
  preview,
  previewType,
  onChange,
}: FileUploadProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      onChange(null, null, null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange(file, reader.result as string, file.type);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="vu-upload">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="vu-upload-input"
      />
      {preview ? (
        <div className="vu-upload-preview">
          {previewType?.startsWith('video/') ? (
            <video
              controls
              className="vu-upload-media"
              src={preview}
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="vu-upload-media"
            />
          )}
          <div className="vu-upload-meta">
            <span className="vu-badge-live">Preview listo</span>
            <p>Tu archivo ya quedó seleccionado. Puedes reemplazarlo haciendo clic en el panel.</p>
          </div>
        </div>
      ) : (
        <div className="vu-upload-empty">
          <span className="vu-upload-icon">+</span>
          <div>
            <p className="vu-upload-title">Selecciona una imagen o video</p>
            <p className="vu-upload-copy">
              Arrastra tu archivo o usa este módulo para preparar la pieza que irá al feed.
            </p>
          </div>
          <span className="vu-upload-cta">Elegir archivo</span>
        </div>
      )}
    </div>
  );
}
