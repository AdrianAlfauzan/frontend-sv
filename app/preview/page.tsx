"use client";

import { useState, useEffect } from "react";
import { getArticles } from "@/lib/api";
import { Post } from "@/lib/types";
import PostCard from "@/components/posts/PostCard";
import Pagination from "@/components/ui/Pagination";

export default function PreviewPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getArticles(100, 0);

        setAllPosts(data);

        const published = data.filter((post: Post) => post.status === "Publish");
        setPublishedPosts(published);
      } catch (err: any) {
        console.error("Fetch posts error:", err);
        setError(err.message || "Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(publishedPosts.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentPosts = publishedPosts.slice(startIndex, endIndex);

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

  const checkPublished = allPosts.filter((p) => p.status === "Publish");

  return (
    <div className="px-2 sm:px-4 md:px-0">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Preview Published Articles</h1>

      {publishedPosts.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-gray-500 border rounded-lg text-sm sm:text-base">
          <p>Belum ada artikel yang dipublish.</p>
          <div className="mt-2 text-xs sm:text-sm text-gray-400">
            Total artikel di database: {allPosts.length}
            <br />
            Status yang ditemukan: {[...new Set(allPosts.map((p) => p.status))].join(", ") || "Tidak ada"}
            <br />
            <span className="text-blue-600">Cek manual Publish: {checkPublished.length} artikel</span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:gap-6">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 sm:mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}

          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
            Menampilkan {currentPosts.length} dari {publishedPosts.length} artikel
          </div>
        </>
      )}
    </div>
  );
}
