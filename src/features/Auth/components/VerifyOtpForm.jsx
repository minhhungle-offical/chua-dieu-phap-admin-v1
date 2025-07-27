import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VerifyOtpField } from "@/components/FormFields/VerifyOtpField";

const schema = yup.object({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP")
    .length(6, "Mã OTP phải gồm 6 số"),
});

export const VerifyOtpForm = ({ loading, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      otp: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-800">
          Mã xác thực OTP
        </label>
        <VerifyOtpField name="otp" control={control} />
      </div>

      <div className="border-t border-gray-300" />

      <button
        type="submit"
        disabled={loading || isSubmitting}
        className={`w-full py-2 rounded-md text-white font-semibold transition
          ${
            loading || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#147265] hover:bg-[#115a52]"
          }`}
      >
        {loading ? "Đang xác thực..." : "Xác nhận"}
      </button>
    </form>
  );
};
