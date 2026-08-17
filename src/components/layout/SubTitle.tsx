import { cn } from "@/lib/utils";

type SubTitleProps = {
  textContent: string;
  className?: string;
};

const SubTitle = ({textContent, className}: SubTitleProps) => {
  return (
      <p className={cn("text-center text-base font-normal text-muted-foreground", className)}>
        {textContent}
      </p>
  )
}

export default SubTitle;
