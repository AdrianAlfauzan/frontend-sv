"use client";

import { Post } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Belum diperbarui";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Tanggal tidak valid";

      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Tanggal tidak valid";
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">{post.title || "No Title"}</h2>
        <Badge status={post.status} />
      </div>

      <p className="text-sm text-gray-500 mb-2">Category: {post.category || "Tidak ada kategori"}</p>

      <p className="text-gray-700 mt-2 line-clamp-3 text-sm sm:text-base">{post.content || "Tidak ada konten"}</p>

      <div className="text-xs text-gray-400 mt-3 space-y-0.5">
        <p>Created: {formatDate(post.created_date)}</p>
        <p>Updated: {formatDate(post.updated_date)}</p>
      </div>
    </div>
  );
}
