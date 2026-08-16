import { ApiError, type SuccessResponse, type ErrorResponse } from "@/lib/api";

type LoginResponse = {
  accessToken: string;
};

let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err: ErrorResponse = await res.json();
    throw new ApiError(err.code, err.message);
  }

  const body: SuccessResponse<LoginResponse> = await res.json();
  setAccessToken(body.data.accessToken);
};
