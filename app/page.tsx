"use client";

import { usePosts } from "@/hooks/usePosts";
import { useMoveToTrash } from "@/hooks/useMoveToTrash";
import PostTabs from "@/components/posts/PostTabs";

export default function Home() {
  const { posts, loading, error, refetch } = usePosts(100, 0);
  const { moveToTrash } = useMoveToTrash();

  const handleMoveToTrash = async (id: number) => {
    await moveToTrash(id);
    await refetch();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm sm:text-base">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:px-0">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">All Posts</h1>
      <PostTabs posts={posts} onMoveToTrash={handleMoveToTrash} />
    </div>
  );
}
