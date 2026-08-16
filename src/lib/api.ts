import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export type SuccessResponse<T> = {
  data: T;
  message: "Success";
};

export type ErrorResponse = {
  code: string;
  message: string;
};

export class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}
