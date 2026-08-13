import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4">
        <Link href="/" className="font-mono font-medium">
          CastleBird Blog
        </Link>
      </div>
    </header>
  );
}
