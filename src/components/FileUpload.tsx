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
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] relative">
      {preview ? (
        <div className="mt-6">
          {previewType?.startsWith('video/') ? (
            <video
              controls
              className="max-w-xs max-h-72 rounded bg-black"
              src={preview}
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="max-w-xs max-h-72 rounded"
            />
          )}
        </div>
      ) : (
        <div className="cursor-pointer flex flex-col items-center gap-2">
          <span className="text-gray-700 font-medium">
            Selecciona una imagen o video
          </span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <span className="px-4 py-2 text-blue-600 hover:bg-blue-700 transition">
            Elegir archivo
          </span>
        </div>
      )}
    </div>
  );
}
