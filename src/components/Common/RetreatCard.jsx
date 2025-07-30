import { retreatTypeMap } from "@/constants/retreat";
import clsx from "clsx";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  FiCalendar,
  FiEdit,
  FiMapPin,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { GiMeditation } from "react-icons/gi";
export const RetreatCard = ({ retreat, onEdit, onDelete }) => {
  const {
    _id,
    name,
    location,
    status,
    startDate,
    endDate,
    capacity,
    imageUrl,
    type,
  } = retreat;

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white overflow-hidden flex flex-col cursor-pointer">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>

        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <FiMapPin className="mr-2" />
          {location || "Chưa rõ địa điểm"}
        </div>

        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <FiCalendar className="mr-2" />
          {format(new Date(startDate), "dd/MM/yyyy", { locale: vi })} →{" "}
          {format(new Date(endDate), "dd/MM/yyyy", { locale: vi })}
        </div>

        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <FiUsers className="mr-2" />
          {capacity} người
        </div>

        <div className="text-sm text-gray-600 flex items-center">
          <GiMeditation className="mr-2" />
          {retreatTypeMap[type] || "Loại khác"}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <span
            className={clsx(
              "text-xs font-medium px-2 py-1 rounded",
              status === "published"
                ? "bg-green-100 text-green-700"
                : status === "draft"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-200 text-gray-600"
            )}
          >
            {status === "published"
              ? "Đã xuất bản"
              : status === "draft"
              ? "Bản nháp"
              : "Đã lưu trữ"}
          </span>

          <div className="flex-1" />

          <button
            onClick={() => onEdit?.(_id)}
            className="text-sm text-[#147265] hover:text-[#0e5248] flex items-center gap-1"
          >
            <FiEdit size={16} />
            Sửa
          </button>
          <button
            onClick={() => onDelete?.(_id)}
            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <FiTrash2 size={16} />
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};
