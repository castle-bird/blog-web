import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MainLayout = ({children}: LayoutProps<"/">) => {
  return (
      <>
        <Header/>
        <main className="mx-auto w-full max-w-300 flex-1">
          {children}
        </main>
        <Footer/>
      </>
  );
};

export default MainLayout;
