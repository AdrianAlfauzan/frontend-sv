import { Post, PostCreate, PostUpdate } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

export async function getArticles(limit: number = 10, offset: number = 0): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/article/${limit}/${offset}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to fetch articles");
  }
  return res.json();
}

export async function createArticle(data: PostCreate): Promise<object> {
  const res = await fetch(`${API_BASE}/article`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to create article");
  }
  return res.json();
}

export async function getArticle(id: number): Promise<Post> {
  const res = await fetch(`${API_BASE}/article/${id}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to fetch article");
  }
  return res.json();
}

export async function updateArticle(id: number, data: PostUpdate): Promise<object> {
  const res = await fetch(`${API_BASE}/article/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to update article");
  }
  return res.json();
}

export async function deleteArticle(id: number): Promise<object> {
  const res = await fetch(`${API_BASE}/article/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to delete article");
  }
  return res.json();
}
