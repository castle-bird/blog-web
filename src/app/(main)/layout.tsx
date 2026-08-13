import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const MainLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-300">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
