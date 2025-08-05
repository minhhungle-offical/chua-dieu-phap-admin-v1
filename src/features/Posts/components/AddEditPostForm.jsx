import { UploadField } from "@/components/FormFields/UploadField";
import { InputField } from "@/components/FormFields/InputField";
import { CKEditorField } from "@/components/FormFields/CKEditorField/CKEditorField";
import { SelectField } from "@/components/FormFields/SelectField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TextareaField } from "@/components/FormFields/TextareaField";
import { MultiSelectField } from "@/components/FormFields/MultiSelectField";

const statusOptions = [
  { label: "Bản nháp", value: "draft" },
  { label: "Công khai", value: "published" },
  { label: "Lưu trữ", value: "archived" },
];

const schema = yup.object({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  excerpt: yup.string(),
  content: yup.string().required("Nội dung không được để trống"),
  status: yup
    .string()
    .oneOf(["draft", "published", "archived"])
    .default("draft"),
  tags: yup.string().trim().default([]),
});

const defaultValues = {
  title: "",
  excerpt: "",
  content: "",
  status: "draft",
  image: null,
  tags: [],
};

export const AddEditPostForm = ({
  data,
  loading = false,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const disabled = loading || isSubmitting;

  useEffect(() => {
    if (data) {
      const newData = {
        ...data,
        image: data.imageUrl ? { url: data.imageUrl } : null,
        tags: data.tags?.split(",").map((t) => t.trim()) || [],
      };

      delete newData.imageUrl;
      delete newData.publicId;
      reset(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFormSubmit = (formValues) => {
    if (disabled) return;

    const formData = new FormData();

    for (const key in formValues) {
      const value = formValues[key];

      if (key === "image") {
        if (value instanceof File) {
          formData.append("image", value);
        }
        continue;
      }

      formData.append(key, value ?? "");
    }

    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="w-full sm:w-1/2 md:w-1/3">
        <UploadField
          name="image"
          control={control}
          label="Ảnh đại diện bài viết"
          disabled={disabled}
        />
      </div>

      <InputField
        name="title"
        control={control}
        label="Tiêu đề bài viết"
        placeholder="Nhập tiêu đề"
        disabled={disabled}
      />

      <TextareaField
        name="excerpt"
        control={control}
        label="Tóm tắt"
        placeholder="Viết tóm tắt ngắn (tuỳ chọn)"
        disabled={disabled}
        rows={3}
      />

      <MultiSelectField
        name="tags"
        control={control}
        label="Thẻ (tags)"
        options={[
          { label: "Pháp thoại", value: "phap-thoai" },
          { label: "Kinh tụng", value: "kinh-tung" },
          { label: "Thiền tập", value: "thien-tap" },
          { label: "Phật sự", value: "phat-su" },
          { label: "Thông báo", value: "thong-bao" },
          { label: "Hình ảnh", value: "hinh-anh" },
          { label: "Giáo lý", value: "giao-ly" },
          { label: "Sự kiện", value: "su-kien" },
          { label: "Chia sẻ", value: "chia-se" },
        ]}
        disabled={disabled}
      />

      <SelectField
        name="status"
        control={control}
        label="Trạng thái"
        options={statusOptions}
        disabled={disabled}
      />

      <CKEditorField
        name="content"
        control={control}
        label="Nội dung bài viết"
        placeholder="Nhập nội dung chi tiết..."
        disabled={disabled}
      />

      <div className="border-t border-gray-300 my-4" />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Hủy
        </button>

        <button
          type="submit"
          disabled={disabled}
          className={`px-4 py-2 rounded-md text-white font-semibold transition ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#147265] hover:bg-[#115a52]"
          }`}
        >
          {disabled ? "Đang xử lý..." : "Lưu bài viết"}
        </button>
      </div>
    </form>
  );
};
