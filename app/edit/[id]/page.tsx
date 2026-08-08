"use client";

import { useRouter, useParams } from "next/navigation";
import { usePost } from "@/hooks/usePost";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import PostForm from "@/components/posts/PostForm";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { post, loading, error } = usePost(id);
  const { updatePost, loading: updating } = useUpdatePost();

  const handleSubmit = async (data: any) => {
    await updatePost(Number(id), data);
    router.push("/");
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error || !post) return <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">Error: {error || "Post not found"}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <PostForm initialData={post} onSubmit={handleSubmit} submitLabel="Update" isEdit={true} loading={updating} />
    </div>
  );
}
