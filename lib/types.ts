export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  status: "Publish" | "Draft" | "Thrash";
  created_date: string;
  updated_date: string;
}

export interface PostCreate {
  title: string;
  content: string;
  category: string;
  status: "Publish" | "Draft";
}

export interface PostUpdate {
  title?: string;
  content?: string;
  category?: string;
  status?: "Publish" | "Draft" | "Thrash";
}

export interface ApiResponse {
  message?: string;
  data?: Post | Post[];
}
