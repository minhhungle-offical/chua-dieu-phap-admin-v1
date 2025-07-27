import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "@/components/FormFields/InputField";

const schema = yup.object({
  email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
});

export const LoginForm = ({ loading, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues) => {
    onSubmit?.(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <InputField
        name="email"
        control={control}
        label="Email"
        placeholder="Nhập email"
        type="email"
      />

      <div className="border-t border-gray-300 my-4"></div>

      <button
        type="submit"
        disabled={loading || isSubmitting}
        className={`w-full py-2 rounded-md text-white font-semibold transition
      ${
        loading || isSubmitting
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#147265] hover:bg-[#115a52]"
      }
    `}
      >
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </button>
    </form>
  );
};
