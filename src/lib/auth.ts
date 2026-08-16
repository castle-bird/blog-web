import { useSyncExternalStore } from "react";
import { ApiError, type SuccessResponse, type ErrorResponse } from "@/lib/api";

type LoginResponse = {
  accessToken: string;
};

let accessToken: string | null = null;
const listeners = new Set<() => void>();

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// 로그인 상태에 반응해서 리렌더해야 하는 컴포넌트에서 사용
export const useAccessToken = () => useSyncExternalStore(subscribe, getAccessToken, () => null);

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

export const logout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    setAccessToken(null);
  }
};

let refreshPromise: Promise<string> | null = null;

export const refresh = async (): Promise<string> => {
  // 동시 401이 refresh를 여러 번 트리거해도 요청 하나로 합침.
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      setAccessToken(null);
      const err: ErrorResponse = await res.json();
      throw new ApiError(err.code, err.message);
    }

    const body: SuccessResponse<LoginResponse> = await res.json();
    setAccessToken(body.data.accessToken);
    return body.data.accessToken;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};
