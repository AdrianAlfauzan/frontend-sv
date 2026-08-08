"use client";

import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/useCreatePost";
import PostForm from "@/components/posts/PostForm";

export default function AddPage() {
  const router = useRouter();
  const { createPost, loading } = useCreatePost();

  const handleSubmit = async (data: any) => {
    await createPost(data);
    router.push("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Article</h1>
      <PostForm onSubmit={handleSubmit} submitLabel="Create" isEdit={false} loading={loading} />
    </div>
  );
}
