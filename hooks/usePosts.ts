"use client";

import { useState, useEffect, useCallback } from "react";
import { getArticles, updateArticle } from "@/lib/api";
import { Post } from "@/lib/types";

export function usePosts(limit: number = 100, offset: number = 0) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getArticles(limit, offset);

      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([]);
        setError("Data tidak valid");
      }
    } catch (err: any) {
      // console.error("Fetch posts error:", err);
      setError(err.message || "Gagal mengambil data");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [limit, offset]);

  const moveToTrash = useCallback(
    async (id: number) => {
      try {
        await updateArticle(id, { status: "Thrash" });
        await fetchPosts();
      } catch (err: any) {
        // console.error("Move to trash error:", err);
        setError(err.message || "Gagal pindah ke trash");
        throw err;
      }
    },
    [fetchPosts],
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    moveToTrash,
  };
}
