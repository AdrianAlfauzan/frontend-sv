"use client";

import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Post } from "@/lib/types";

interface PostFormProps {
  initialData?: Partial<Post>;
  onSubmit: (data: { title: string; content: string; category: string; status: "Publish" | "Draft" }) => Promise<void>;
  submitLabel?: string;
  isEdit?: boolean;
  loading?: boolean;
}

export default function PostForm({ initialData = {}, onSubmit, submitLabel = "Create", isEdit = false, loading = false }: PostFormProps) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category?: string;
  }>({});

  useEffect(() => {
    const newErrors: { title?: string; content?: string; category?: string } = {};
    if (title && title.length < 20) newErrors.title = "Minimal 20 karakter";
    if (content && content.length < 200) newErrors.content = "Minimal 200 karakter";
    if (category && category.length < 3) newErrors.category = "Minimal 3 karakter";
    setErrors(newErrors);
  }, [title, content, category]);

  const handleSubmit = async (status: "Publish" | "Draft") => {
    setSubmitError(null);
    if (title.length < 20) {
      setErrors({ ...errors, title: "Minimal 20 karakter" });
      return;
    }
    if (content.length < 200) {
      setErrors({ ...errors, content: "Minimal 200 karakter" });
      return;
    }
    if (category.length < 3) {
      setErrors({ ...errors, category: "Minimal 3 karakter" });
      return;
    }

    try {
      await onSubmit({ title, content, category, status });
    } catch (err: any) {
      setSubmitError(err.message || "Terjadi kesalahan");
    }
  };

  const hasErrors = Object.keys(errors).some((key) => errors[key as keyof typeof errors]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-6">
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm">
            <strong>Error:</strong> {submitError}
          </div>
        )}

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul (min 20 karakter)"
          required
          minLength={20}
          error={errors.title}
          helper="Minimal 20 karakter"
          className="text-sm sm:text-base"
        />

        <Textarea
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Masukkan konten (min 200 karakter)"
          required
          minLength={200}
          error={errors.content}
          helper="Minimal 200 karakter"
          className="text-sm sm:text-base"
        />

        <Input
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Masukkan kategori (min 3 karakter)"
          required
          minLength={3}
          error={errors.category}
          helper="Minimal 3 karakter"
          className="text-sm sm:text-base"
        />

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2 sm:pt-4">
          <Button type="button" variant="success" disabled={loading || hasErrors} onClick={() => handleSubmit("Publish")} className="w-full sm:w-auto">
            {loading ? "Menyimpan..." : "Publish"}
          </Button>
          <Button type="button" variant="secondary" disabled={loading || hasErrors} onClick={() => handleSubmit("Draft")} className="w-full sm:w-auto">
            {loading ? "Menyimpan..." : "Draft"}
          </Button>
        </div>
      </form>
    </div>
  );
}
