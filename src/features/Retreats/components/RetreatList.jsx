import { RetreatCard } from "@/components/Common/RetreatCard";

export const RetreatList = ({ retreatList = [], onEdit, onDelete }) => {
  if (!retreatList.length) {
    return (
      <div className="text-gray-500 italic text-sm text-center py-10">
        Không có khóa tu nào.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {retreatList.map((retreat) => (
        <RetreatCard
          key={retreat._id}
          retreat={retreat}
          onEdit={() => onEdit?.(retreat.slug)}
          onDelete={() => onDelete?.(retreat)}
        />
      ))}
    </div>
  );
};
