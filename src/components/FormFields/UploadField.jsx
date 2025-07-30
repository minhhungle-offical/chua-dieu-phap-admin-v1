import { useController } from "react-hook-form";
import { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

export function UploadField({
  name,
  control,
  label = "Upload hình ảnh",
  aspectRatio = "16/9",
  disabled,
}) {
  const [preview, setPreview] = useState("");

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("Không tìm thấy file");
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    onChange(file);
  };

  useEffect(() => {
    if (!preview && value?.url) {
      setPreview(value.url);
    }
  }, [value, preview]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-800">{label}</label>

      <label className="flex items-center gap-2 px-4 py-2 bg-[#147265] text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-[#115a52] w-fit">
        <FiUploadCloud size={18} /> Chọn ảnh
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
      </label>

      <div
        className={`w-full relative rounded-md overflow-hidden bg-gray-100 border ${
          error ? "border-red-500" : "border-gray-300"
        } aspect-[${aspectRatio}] flex items-center justify-center`}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <FiUploadCloud className="text-gray-400" size={48} />
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
