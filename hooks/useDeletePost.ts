"use client";

import { useState, useCallback } from "react";
import { deleteArticle } from "@/lib/api";

export function useDeletePost() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      await deleteArticle(id);
    } catch (err: any) {
      // console.error("Delete post error:", err);
      setError(err.message || "Gagal menghapus artikel");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deletePost,
    loading,
    error,
  };
}
