import { useEffect, useState } from "react";
import { AddEditRetreatForm } from "../components/AddEditRetreatForm";
import { useNavigate, useParams } from "react-router-dom";
import { retreatApi } from "@/api/retreatApi";
import { toast } from "react-toastify";

export function RetreatDetail() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("detail"); // "detail" | "attendees"
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await retreatApi.getBySlug(slug);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (data && data._id) {
        await retreatApi.update(data._id, formData);
        toast.success("Cập nhật khóa tu thành công!");
        navigate(`/bang-dieu-khien/khoa-tu/${data._id}`);
        return;
      }

      await retreatApi.create(formData);
      toast.success("Tạo khóa tu thành công!");
      navigate("/bang-dieu-khien/khoa-tu");
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý Khóa Tu</h1>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("detail")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            activeTab === "detail"
              ? "border-[#147265] text-[#147265]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Thông tin khóa tu
        </button>
        <button
          onClick={() => setActiveTab("attendees")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            activeTab === "attendees"
              ? "border-[#147265] text-[#147265]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Người tham dự
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === "detail" && (
          <AddEditRetreatForm
            loading={loading}
            data={data}
            onSubmit={handleSubmit}
          />
        )}

        {activeTab === "attendees" && (
          <div>
            <p className="text-gray-600 italic">
              Danh sách người tham dự (TODO)
            </p>
            {/* TODO: render attendee list ở đây nếu có */}
          </div>
        )}
      </div>
    </div>
  );
}
