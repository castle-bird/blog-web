"use client";

import {Button} from "@/components/ui/button";

type ErrorFallbackProps = {
  message?: string;
  onRetry: () => void;
};

const ErrorFallback = ({message = "문제가 발생했습니다.", onRetry}: ErrorFallbackProps) => (
    <div className="flex flex-col items-start gap-3 px-4 py-8">
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        다시 시도
      </Button>
    </div>
);

export default ErrorFallback;
