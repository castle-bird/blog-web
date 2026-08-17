import {api, throwApiError, type SuccessResponse} from "@/lib/api";

export type Category = {
  id: number;
  name: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const {data} = await api.get<SuccessResponse<Category[]>>("/api/categories");
  return data.data;
};

export const createCategory = async (name: string): Promise<Category> => {
  try {
    const {data} = await api.post<SuccessResponse<Category>>("/api/categories", {name});
    return data.data;
  } catch (err) {
    return throwApiError(err);
  }
};

export const updateCategory = async (categoryId: number, name: string): Promise<Category> => {
  try {
    const {data} = await api.put<SuccessResponse<Category>>(`/api/categories/${categoryId}`, {name});
    return data.data;
  } catch (err) {
    return throwApiError(err);
  }
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
  try {
    await api.delete(`/api/categories/${categoryId}`);
  } catch (err) {
    throwApiError(err);
  }
};
