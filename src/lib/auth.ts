import {useSyncExternalStore} from "react";
import type {AxiosError, InternalAxiosRequestConfig} from "axios";
import {api, throwApiError, type SuccessResponse} from "@/lib/api";

type LoginResponse = {
  accessToken: string;
};

let accessToken: string | null = null;
let authReady = false;
const listeners = new Set<() => void>();

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  listeners.forEach((listener) => listener());
};

// 최초 rehydrate(refresh) 시도가 끝났는지 여부. 끝나기 전엔 accessToken이 null이어도 미로그인 확정이 아님.
export const getAuthReady = () => authReady;

export const setAuthReady = () => {
  authReady = true;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// 로그인 상태에 반응해서 리렌더해야 하는 컴포넌트에서 사용
export const useAccessToken = () => useSyncExternalStore(subscribe, getAccessToken, () => null);
export const useAuthReady = () => useSyncExternalStore(subscribe, getAuthReady, () => false);

export const login = async (email: string, password: string) => {
  try {
    const {data} = await api.post<SuccessResponse<LoginResponse>>("/api/auth/login", {email, password});
    setAccessToken(data.data.accessToken);
  } catch (err) {
    throwApiError(err);
  }
};

export const logout = async () => {
  try {
    await api.post("/api/auth/logout");
  } finally {
    setAccessToken(null);
  }
};

let refreshPromise: Promise<string> | null = null;

export const refresh = async (): Promise<string> => {
  // 동시 401이 refresh를 여러 번 트리거해도 요청 하나로 합침.
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const {data} = await api.post<SuccessResponse<LoginResponse>>("/api/auth/refresh");
      setAccessToken(data.data.accessToken);
      return data.data.accessToken;
    } catch (err) {
      setAccessToken(null);
      return throwApiError(err);
    }
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

// 요청마다 최신 AT를 Authorization 헤더에 첨부
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 보호 API가 401이면 refresh 후 원 요청을 한 번만 재시도
api.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
      const config = err.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
      const isAuthEndpoint = config?.url?.startsWith("/api/auth/");

      if (err.response?.status !== 401 || !config || config._retry || isAuthEndpoint) {
        throw err;
      }

      config._retry = true;
      await refresh().catch(() => {
        throw err;
      });
      return api(config);
    },
);
