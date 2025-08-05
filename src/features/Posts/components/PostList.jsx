import { PostCard } from "@/components/Common/PostCard";

export const PostList = ({ postList = [], onEdit, onDelete }) => {
  if (!postList.length) {
    return (
      <div className="text-gray-500 italic text-sm text-center py-10">
        Không có bài viết nào.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {postList.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onEdit={() => onEdit?.(post)}
          onDelete={() => onDelete?.(post)}
        />
      ))}
    </div>
  );
};
