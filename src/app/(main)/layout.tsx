import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const MainLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
