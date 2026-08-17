import {cache} from "react";
import {api, throwApiError, type SuccessResponse} from "@/lib/api";

export type Post = {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  authorId: number;
  authorNickname: string;
  categoryId: number;
  categoryName: string;
  tags: string[];
  createdAt: string;
  updatedAt: string | null;
};

export type PostWriteRequest = {
  title: string;
  content: string;
  categoryId: number;
  tags: string[];
};

type PostListResponse = {
  posts: Post[];
  nextCursorId: number | null;
  hasNext: boolean;
};

export const getPosts = async (
    cursorId?: number,
    tag?: string,
    keyword?: string
): Promise<PostListResponse> => {
  const {data} = await api.get<SuccessResponse<PostListResponse>>("/api/posts", {
    params: {
      ...(cursorId ? {cursorId} : {}),
      ...(tag ? {tag} : {}),
      ...(keyword ? {keyword} : {}),
    },
  });
  return data.data;
};

// 상세 페이지에서 generateMetadata와 페이지 컴포넌트가 같은 postId로 중복 호출하는 걸 한 요청으로 합침.
export const getPost = cache(async (postId: number): Promise<Post> => {
  try {
    const {data} = await api.get<SuccessResponse<Post>>(`/api/posts/${postId}`);
    return data.data;
  } catch (err) {
    return throwApiError(err);
  }
});

export const createPost = async (payload: PostWriteRequest): Promise<Post> => {
  try {
    const {data} = await api.post<SuccessResponse<Post>>("/api/posts", payload);
    return data.data;
  } catch (err) {
    return throwApiError(err);
  }
};

export const updatePost = async (postId: number, payload: PostWriteRequest): Promise<Post> => {
  try {
    const {data} = await api.put<SuccessResponse<Post>>(`/api/posts/${postId}`, payload);
    return data.data;
  } catch (err) {
    return throwApiError(err);
  }
};

export const deletePost = async (postId: number): Promise<void> => {
  try {
    await api.delete(`/api/posts/${postId}`);
  } catch (err) {
    throwApiError(err);
  }
};
