import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-300 items-center justify-between px-4">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-primary"
        >
          {"<CastleBird />"}
        </Link>
      </div>
    </header>
  );
}
