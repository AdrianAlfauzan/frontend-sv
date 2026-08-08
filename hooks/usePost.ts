"use client";

import { useState, useEffect, useCallback } from "react";
import { getArticle } from "@/lib/api";
import { Post } from "@/lib/types";

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getArticle(Number(id));
      setPost(data);
    } catch (err: any) {
      console.error("Fetch post error:", err);
      setError(err.message || "Gagal mengambil data artikel");
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [fetchPost, id]);

  return {
    post,
    loading,
    error,
    refetch: fetchPost,
  };
}
