import type { PropsWithChildren } from 'react';

interface PreviewModalProps {
  open: boolean;
  title: string;
  mediaUrl: string;
  mediaType?: string;
  onClose: () => void;
}

export default function PreviewModal({
  open,
  title,
  mediaUrl,
  mediaType,
  onClose,
}: PropsWithChildren<PreviewModalProps>) {
  if (!open) return null;

  const isVideo = mediaType?.startsWith('video/');

  return (
    <div className="ui-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="ui-modal__backdrop" aria-label="Cerrar vista previa" onClick={onClose} type="button" />
      <div className="ui-modal__panel">
        <div className="ui-modal__header">
          <div>
            <span className="ui-label">preview modal</span>
            <h3 className="ui-modal__title">{title}</h3>
          </div>
          <button className="ui-theme-toggle" onClick={onClose} type="button">
            <span className="ui-theme-toggle__label">Cerrar</span>
          </button>
        </div>

        <div className="ui-modal__body">
          {isVideo ? (
            <video className="ui-modal__media" controls src={mediaUrl} />
          ) : (
            <img className="ui-modal__media" src={mediaUrl} alt={title} />
          )}
        </div>
      </div>
    </div>
  );
}
