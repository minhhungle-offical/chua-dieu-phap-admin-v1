import { retreatApi } from "@/api/retreatApi";
import { Pagination } from "@/components/Common/pagination";
import { useCallback, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { RetreatFilter } from "../components/RetreatFilter";
import { RetreatList } from "../components/RetreatList";
import { toast } from "react-toastify";

const PAGE_SIZE = 6;

export function RetreatPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  });
  const [retreats, setRetreats] = useState([]);
  const [removeItem, setRemoveItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const navigate = useNavigate();

  const fetch = useCallback(async (filter) => {
    setLoading(true);
    try {
      const { data, pagination } = await retreatApi.getAll(filter);
      setPagination(pagination);
      setRetreats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleRemove = async () => {
    if (!removeItem) return;
    console.log("click");

    setRemoveLoading(true);
    try {
      await retreatApi.remove(removeItem._id);
      setRemoveItem(null);
      fetch(filter);
    } catch (error) {
      console.error("Xoá thất bại:", error);
      toast.error(`${error}`);
    } finally {
      setRemoveLoading(false);
    }
  };

  const handleCreate = () => {
    navigate("/bang-dieu-khien/khoa-tu/create");
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  console.log({ filter });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Khóa Tu</h1>

        <button
          onClick={handleCreate}
          className="bg-[#147265] hover:bg-[#115a52] text-white text-sm font-semibold px-4 py-2 rounded-md transition inline-flex items-center gap-2"
        >
          <FiPlus size={16} />
          Tạo mới
        </button>
      </div>

      <RetreatFilter filter={filter} onFilterChange={handleFilterChange} />

      {loading ? (
        <p className="p-3">Loading ...</p>
      ) : retreats.length === 0 ? (
        <div className="text-center text-gray-500 italic py-12">
          Chưa có khóa tu nào.
        </div>
      ) : (
        <>
          <RetreatList
            retreatList={retreats}
            onDelete={(item) => setRemoveItem(item)}
            onEdit={(slug) => navigate(`/bang-dieu-khien/khoa-tu/${slug}`)}
          />
          <Pagination
            currentPage={filter.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => handleFilterChange({ ...filter, page })}
          />
        </>
      )}

      {removeItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Xác nhận xóa
            </h2>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa khóa tu{" "}
              <strong>{removeItem.name}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRemoveItem(null)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                disabled={removeLoading}
                onClick={handleRemove}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                {removeLoading ? "Đang xử lý ..." : `Xác nhận xóa`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
