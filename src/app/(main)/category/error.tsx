"use client";

import ErrorFallback from "@/components/common/ErrorFallback";

const CategoryError = ({reset}: { error: Error; reset: () => void }) => (
    <ErrorFallback message="카테고리를 불러오지 못했습니다." onRetry={reset}/>
);

export default CategoryError;
