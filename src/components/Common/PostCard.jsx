import clsx from "clsx";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { FiEdit, FiTrash2, FiCalendar } from "react-icons/fi";
import { MdOutlineArticle } from "react-icons/md";

export const PostCard = ({ post, onEdit, onDelete }) => {
  const { _id, title, excerpt, imageUrl, createdAt, status = "draft" } = post;

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white overflow-hidden flex flex-col cursor-pointer">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {excerpt || "Không có tóm tắt"}
        </p>

        <div className="text-sm text-gray-500 mb-1 flex items-center">
          <FiCalendar className="mr-2" />
          {createdAt
            ? format(new Date(createdAt), "dd/MM/yyyy", { locale: vi })
            : "Không rõ ngày"}
        </div>

        <div className="text-sm text-gray-600 flex items-center">
          <MdOutlineArticle className="mr-2" />
          Bài viết
        </div>

        <div className="flex-1" />

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
