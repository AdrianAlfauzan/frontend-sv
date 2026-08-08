"use client";

import { useState, useCallback } from "react";
import { updateArticle } from "@/lib/api";
import { PostUpdate } from "@/lib/types";

export function useUpdatePost() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updatePost = useCallback(async (id: number, data: PostUpdate) => {
    try {
      setLoading(true);
      setError(null);

      await updateArticle(id, data);
    } catch (err: any) {
      // console.error("Update post error:", err);
      setError(err.message || "Gagal mengupdate artikel");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updatePost,
    loading,
    error,
  };
}
