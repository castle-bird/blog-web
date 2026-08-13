export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-[1200px] px-4 py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} CastleBird Blog
      </div>
    </footer>
  );
}
