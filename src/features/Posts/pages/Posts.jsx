import { postApi } from "@/api/postApi";
import { Pagination } from "@/components/Common/pagination";
import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { AddEditPostForm } from "../components/AddEditPostForm";
import { PostFilter } from "../components/PostFilter";
import { PostList } from "../components/PostList";
import { toast } from "react-toastify";

export default function Posts() {
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);

  const [filter, setFilter] = useState({ page: 1, limit: 6 });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    fetchPosts(filter);
  }, [filter]);

  const fetchPosts = async (filter) => {
    try {
      setLoading(true);
      const res = await postApi.getAll(filter);
      setPostList(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error("Lỗi khi tải bài viết:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedPost(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setSelectedPost(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedPost(null);
    setShowForm(false);
  };

  const handleSubmitForm = async (formData) => {
    try {
      setLoading(true);
      if (selectedPost) {
        await postApi.update(selectedPost._id, formData);
        toast.success("Cập nhật bài viết thành công!");
      } else {
        await postApi.create(formData);
        toast.success("Tạo bài viết mới thành công!");
      }

      handleCloseForm();
      fetchPosts(filter);
    } catch (err) {
      console.error("Lưu bài viết thất bại:", err);
      toast.error("Lưu bài viết thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!removeItem) return;
    try {
      setRemoveLoading(true);
      await postApi.remove(removeItem._id);
      setRemoveItem(null);
      fetchPosts();
      toast.success("Xoá bài viết thành công!");
    } catch (err) {
      console.error("Xoá bài viết thất bại:", err);
      toast.error("Xoá bài viết thất bại. Vui lòng thử lại!");
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Bài Viết</h1>
        <button
          onClick={handleCreate}
          className="bg-[#147265] hover:bg-[#115a52] text-white text-sm font-semibold px-4 py-2 rounded-md transition inline-flex items-center gap-2"
        >
          <FiPlus size={16} />
          Tạo mới
        </button>
      </div>

      <PostFilter filter={filter} onFilterChange={setFilter} />

      {loading ? (
        <p className="p-4 text-center text-gray-600">Đang tải dữ liệu...</p>
      ) : (
        <>
          <PostList
            postList={postList}
            onEdit={handleEdit}
            onDelete={setRemoveItem}
          />
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
          />
        </>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4  ">
          <div className="overflow-hidden bg-white rounded-lg shadow-lg">
            <div className=" p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={handleCloseForm}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold focus:outline-none"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {selectedPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
              </h2>

              <AddEditPostForm
                data={selectedPost}
                loading={loading}
                onSubmit={handleSubmitForm}
                onCancel={handleCloseForm}
              />
            </div>
          </div>
        </div>
      )}

      {removeItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Xác nhận xoá
            </h2>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xoá bài viết{" "}
              <strong>{removeItem.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRemoveItem(null)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Huỷ
              </button>
              <button
                disabled={removeLoading}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                {removeLoading ? "Đang xoá..." : "Xác nhận xoá"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
