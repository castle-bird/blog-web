import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MainLayout = ({children}: LayoutProps<"/">) => {
  return (
      <>
        <Header/>
        <main className="mx-auto max-w-300">
          {children}
        </main>
        <Footer/>
      </>
  );
};

export default MainLayout;
