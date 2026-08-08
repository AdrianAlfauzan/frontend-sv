"use client";

import { useState, useCallback } from "react";
import { createArticle } from "@/lib/api";
import { PostCreate } from "@/lib/types";

export function useCreatePost() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(async (data: PostCreate) => {
    try {
      setLoading(true);
      setError(null);

      await createArticle(data);
    } catch (err: any) {
      // console.error("Create post error:", err);
      setError(err.message || "Gagal membuat artikel");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createPost,
    loading,
    error,
  };
}
