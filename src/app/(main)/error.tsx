"use client";

import ErrorFallback from "@/components/common/ErrorFallback";

const HomeError = ({reset}: { error: Error; reset: () => void }) => (
    <ErrorFallback message="게시글을 불러오지 못했습니다." onRetry={reset}/>
);

export default HomeError;
