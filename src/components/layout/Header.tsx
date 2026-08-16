"use client";

import {useRouter} from "next/navigation";
import Logo from "@/components/layout/logo";
import {Button} from "@/components/ui/button";
import {logout, useAccessToken} from "@/lib/auth";


const Header = () => {
  const router = useRouter();
  const accessToken = useAccessToken();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="mx-auto flex h-14 max-w-300 items-center justify-between px-4">
          <h1>
            <Logo/>
          </h1>

          <div>
            {accessToken && <Button onClick={handleLogout}>로그아웃</Button>}
          </div>
        </div>
      </header>
  );
}

export default Header;