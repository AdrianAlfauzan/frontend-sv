"use client";

import { useState, useCallback } from "react";
import { updateArticle } from "@/lib/api";

export function useMoveToTrash() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const moveToTrash = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      await updateArticle(id, { status: "Thrash" });
    } catch (err: any) {
      // console.error(" Move to trash error:", err);
      setError(err.message || "Gagal pindah ke trash");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    moveToTrash,
    loading,
    error,
  };
}
