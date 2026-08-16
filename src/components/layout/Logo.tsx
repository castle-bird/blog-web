import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
}

const Logo = ({className}: LogoProps) => {
  return (
      <Link
          href="/"
          className={cn("font-mono text-lg font-bold tracking-tight text-primary", className)}
      >
        {`<CastleBird />`}
      </Link>
  )
}

export default Logo;