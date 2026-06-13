import Header from "./components/Header";
import Footer from "./components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen mt-26">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
