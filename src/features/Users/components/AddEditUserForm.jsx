import { DateField } from "@/components/FormFields/DateField";
import { InputField } from "@/components/FormFields/InputField";
import { SelectField } from "@/components/FormFields/SelectField";
import { UploadField } from "@/components/FormFields/UploadField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Owner", value: "owner" },
  { label: "Thành viên", value: "member" },
];

const genderOptions = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
  { label: "Khác", value: "other" },
];

const maritalStatusOptions = [
  { label: "Độc thân", value: "single" },
  { label: "Đã kết hôn", value: "married" },
  { label: "Góa", value: "widowed" },
  { label: "Ly hôn", value: "divorced" },
  { label: "Khác", value: "other" },
];

const schema = yup.object({
  email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  fullName: yup.string().required("Họ tên là bắt buộc"),
  phone: yup.string().nullable(),
  gender: yup.string().oneOf(["male", "female", "other"]).nullable(),
  role: yup.string().oneOf(["admin", "owner", "member"]).required(),
  avatar: yup.mixed().nullable(),

  // only for role === member
  dharmaName: yup.string().nullable(),
  dateOfBirth: yup.date().nullable(),
  address: yup.string().nullable(),
  occupation: yup.string().nullable(),
  maritalStatus: yup
    .string()
    .oneOf(["single", "married", "widowed", "divorced", "other"])
    .nullable(),
});

const defaultValues = {
  email: "",
  fullName: "",
  phone: "",
  gender: null,
  role: "admin",
  avatar: null,

  dharmaName: "",
  dateOfBirth: null,
  address: "",
  occupation: "",
  maritalStatus: null,
};

export const AddEditUserForm = ({
  data,
  loading = false,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const disabled = loading || isSubmitting;
  const role = watch("role");

  useEffect(() => {
    if (data) {
      const newData = {
        ...data,
        avatar: data.avatarUrl ? { url: data.avatarUrl } : null,
      };

      delete newData.avatarUrl;
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

      if (key === "avatar") {
        if (value instanceof File) {
          formData.append("avatar", value);
        }
        continue;
      }

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }

    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="w-full sm:w-1/2 md:w-1/3">
        <UploadField
          name="avatar"
          control={control}
          label="Ảnh đại diện"
          disabled={disabled}
          aspectRatio="1/1"
        />
      </div>

      <InputField
        name="email"
        control={control}
        label="Email"
        placeholder="Nhập email"
        disabled={!!data || disabled}
      />

      <InputField
        name="fullName"
        control={control}
        label="Họ tên"
        placeholder="Nhập họ tên"
        disabled={disabled}
      />

      <InputField
        name="phone"
        control={control}
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        disabled={disabled}
      />

      <SelectField
        name="gender"
        control={control}
        label="Giới tính"
        options={genderOptions}
        disabled={disabled}
      />

      <SelectField
        name="role"
        control={control}
        label="Vai trò"
        options={roleOptions}
        disabled={disabled}
      />

      {role === "member" && (
        <>
          <InputField
            name="dharmaName"
            control={control}
            label="Pháp danh"
            placeholder="Nhập pháp danh"
            disabled={disabled}
          />

          <DateField
            name="dateOfBirth"
            control={control}
            label="Ngày sinh"
            disabled={disabled}
          />

          <InputField
            name="address"
            control={control}
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            disabled={disabled}
          />

          <InputField
            name="occupation"
            control={control}
            label="Nghề nghiệp"
            placeholder="Nhập nghề nghiệp"
            disabled={disabled}
          />

          <SelectField
            name="maritalStatus"
            control={control}
            label="Tình trạng hôn nhân"
            options={maritalStatusOptions}
            disabled={disabled}
          />
        </>
      )}

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
          {disabled ? "Đang xử lý..." : "Lưu thông tin"}
        </button>
      </div>
    </form>
  );
};
