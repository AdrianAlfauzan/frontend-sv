"use client";

import { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import PostTable from "@/components/posts/PostTable";
import { Post } from "@/lib/types";

interface PostTabsProps {
  posts: Post[];
  onMoveToTrash: (id: number) => void;
}

export default function PostTabs({ posts, onMoveToTrash }: PostTabsProps) {
  const [activeTab, setActiveTab] = useState<"Publish" | "Draft" | "Thrash">("Publish");
  const tabs = ["Publish", "Draft", "Thrash"];

  const filteredPosts = posts.filter((post) => post.status === activeTab);

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as any)} />
      <div className="mt-4 sm:mt-6">
        <PostTable posts={filteredPosts} onTrash={onMoveToTrash} />
      </div>
    </div>
  );
}
