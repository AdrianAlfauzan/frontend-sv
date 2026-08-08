"use client";

import { Post } from "@/lib/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface PostTableProps {
  posts: Post[];
  onTrash: (id: number) => void;
}

export default function PostTable({ posts, onTrash }: PostTableProps) {
  const router = useRouter();

  if (!posts || posts.length === 0) {
    return <div className="text-center py-8 text-gray-500 text-sm sm:text-base">Tidak ada artikel dengan status ini.</div>;
  }

  const handleTrash = (id: number) => {
    if (id === undefined || id === null || isNaN(id) || id <= 0) return;
    onTrash(id);
  };

  const handleEdit = (id: number) => {
    if (id === undefined || id === null || isNaN(id) || id <= 0) return;
    router.push(`/edit/${id}`);
  };

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-gray-900 break-words max-w-[150px] sm:max-w-none">{post.title || "No Title"}</td>
                <td className="hidden sm:table-cell px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-gray-500">{post.category || "No Category"}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-gray-500">
                  <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post.id)} icon={<PencilIcon className="h-3 w-3 sm:h-4 sm:w-4" />} className="w-full sm:w-auto justify-center">
                      <span className="hidden sm:inline">Edit</span>
                      <span className="sm:hidden">✏️</span>
                    </Button>
                    {post.status !== "Thrash" && (
                      <Button variant="danger" size="sm" onClick={() => handleTrash(post.id)} icon={<TrashIcon className="h-3 w-3 sm:h-4 sm:w-4" />} className="w-full sm:w-auto justify-center">
                        <span className="hidden sm:inline">Trash</span>
                        <span className="sm:hidden">🗑️</span>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
