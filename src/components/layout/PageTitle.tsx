import { cn } from "@/lib/utils";

type PageTitleProps = {
  textContent: string;
  className?: string;
  level?: "h1" | "h2" | "h3";
};

const PageTitle = ({textContent, className, level = "h2"}: PageTitleProps) => {
  const Tag = level;
  return (
      <Tag className={cn("text-xl font-bold text-foreground", className)}>
        {textContent}
      </Tag>
  )
}

export default PageTitle;
