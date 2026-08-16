import Logo from "@/components/layout/logo";


const Header = () => {
  return (
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-300 items-center justify-between px-4">
          <h1>
            <Logo/>
          </h1>
        </div>
      </header>
  );
}

export default Header;