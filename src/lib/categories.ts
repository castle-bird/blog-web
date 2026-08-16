import { api, type SuccessResponse } from "@/lib/api";

export type Category = {
  id: number;
  name: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<SuccessResponse<Category[]>>("/api/categories");
  return data.data;
};
