"use client";

import {useEffect} from "react";
import {refresh, setAuthReady} from "@/lib/auth";

// 새로고침 시 RT 쿠키로 AT 재발급, 실패(RT 없음/만료)는 로그아웃 상태로 둠
const AuthRehydrate = () => {
  useEffect(() => {
    refresh().catch(() => {}).finally(setAuthReady);
  }, []);

  return null;
};

export default AuthRehydrate;
