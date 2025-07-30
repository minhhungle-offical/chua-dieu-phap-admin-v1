import { CKEditorField } from "@/components/FormFields/CKEditorField/CKEditorField";
import { DateField } from "@/components/FormFields/DateField";
import { InputField } from "@/components/FormFields/InputField";
import { NumberField } from "@/components/FormFields/NumberField";
import { SelectField } from "@/components/FormFields/SelectField";
import { TimeField } from "@/components/FormFields/TimeField";
import { UploadField } from "@/components/FormFields/UploadField";
import { retreatOption, statusOptions } from "@/constants/retreat";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name là trường bắt buộc"),
  description: yup.string().default(""),
  type: yup
    .string()
    .oneOf([
      "bqt",
      "phat-that",
      "thien",
      "summer",
      "gieo-duyen",
      "hoc-phap",
      "khac",
    ])
    .default("khac"),
  status: yup
    .string()
    .oneOf(["draft", "published", "archived"])
    .default("draft"),
  startTime: yup
    .string()
    .required("Giờ bắt đầu là bắt buộc")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Giờ bắt đầu không hợp lệ"),
  endTime: yup
    .string()
    .required("Giờ kết thúc là bắt buộc")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Giờ kết thúc không hợp lệ")
    .test(
      "is-after-startTime",
      "Giờ kết thúc phải sau giờ bắt đầu",
      function (value) {
        const { startTime } = this.parent;
        if (!startTime || !value) return true;
        return value > startTime;
      }
    ),
  startDate: yup.date().required(),
  endDate: yup
    .date()
    .required()
    .min(yup.ref("startDate"), "endDate phải lớn hơn hoặc bằng startDate"),
  location: yup.string().default("Chùa Diệu Pháp"),
  capacity: yup.number().default(100),
});

const defaultValues = {
  name: "",
  description: "",
  type: "khac",
  status: "draft",
  startDate: dayjs().format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD"),
  startTime: "08:00",
  endTime: "17:00",
  location: "Chùa Diệu Pháp",
  capacity: 100,
  image: null,
};

export const AddEditRetreatForm = ({ data, loading = false, onSubmit }) => {
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
        startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
        image: {
          url: data.imageUrl,
        },
      };

      delete newData.imageUrl;
      delete newData.publicId;
      reset(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFormSubmit = (formValues) => {
    if (disabled) return;

    const { startDate, endDate, ...rest } = formValues;
    const formattedStartDate = dayjs(startDate).startOf("day").toISOString();
    const formattedEndDate = dayjs(endDate).endOf("day").toISOString();

    const formData = new FormData();

    for (const key in rest) {
      const value = rest[key];
      if (key === "image") {
        console.log(value);
        if (value instanceof File) {
          formData.append("image", value);
        }
        continue;
      }

      formData.append(key, value ?? "");
    }

    formData.append("startDate", formattedStartDate);
    formData.append("endDate", formattedEndDate);

    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="w-full sm:w-1/2 md:w-1/3">
        <UploadField
          name="image"
          control={control}
          label="Ảnh đại diện khóa tu"
          disabled={disabled}
        />
      </div>

      <InputField
        name="name"
        control={control}
        label="Tên khóa tu"
        placeholder="Nhập tên khóa tu"
        disabled={disabled}
      />

      <SelectField
        name="type"
        control={control}
        label="Loại khóa tu"
        options={retreatOption}
        disabled={disabled}
      />

      <SelectField
        name="status"
        control={control}
        label="Trạng thái"
        options={statusOptions}
        disabled={disabled}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <TimeField
          name="startTime"
          control={control}
          label="Thời gian bắt đầu"
          disabled={disabled}
        />
        <TimeField
          name="endTime"
          control={control}
          label="Thời gian kết thúc"
          disabled={disabled}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <DateField
          name="startDate"
          control={control}
          label="Ngày bắt đầu"
          disabled={disabled}
        />
        <DateField
          name="endDate"
          control={control}
          label="Ngày kết thúc"
          disabled={disabled}
        />
      </div>

      <InputField
        name="location"
        control={control}
        label="Địa điểm"
        placeholder="Ví dụ: Chùa Diệu Pháp"
        disabled={disabled}
      />

      <NumberField
        name="capacity"
        control={control}
        label="Sức chứa tối đa"
        disabled={disabled}
      />

      <CKEditorField
        name="description"
        control={control}
        label="Mô tả"
        placeholder="Mô tả (tuỳ chọn)"
        disabled={disabled}
      />

      <div className="border-t border-gray-300 my-4" />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={disabled}
          className={`p-2 rounded-md text-white font-semibold transition ${
            loading || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#147265] hover:bg-[#115a52]"
          }`}
        >
          {loading || isSubmitting ? "Đang xử lý..." : "Lưu thông tin"}
        </button>
      </div>
    </form>
  );
};
