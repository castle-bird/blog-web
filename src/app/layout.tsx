import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthRehydrate from "@/components/auth/AuthRehydrate";

const pretendard = localFont({
  src: [
    {path: "../fonts/pretendard/Pretendard-Regular.subset.woff2", weight: "400"},
    {path: "../fonts/pretendard/Pretendard-Medium.subset.woff2", weight: "500"},
    {path: "../fonts/pretendard/Pretendard-SemiBold.subset.woff2", weight: "600"},
    {path: "../fonts/pretendard/Pretendard-Bold.subset.woff2", weight: "700"},
  ],
  variable: "--font-pretendard",
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrainsMono/JetBrainsMono-Regular.woff2",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "CastleBird Blog",
  description: "CastleBird Blog 입니다.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="ko">
      <body id="body">
        <div
          id="bodyWrap"
          className={`${jetbrainsMono.variable} ${pretendard.variable} antialiased font-sans min-h-screen flex flex-col`}
        >
          <AuthRehydrate/>
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
