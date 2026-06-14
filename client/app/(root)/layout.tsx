import { Toaster } from "sonner";

import Header from "./components/Header";
import Footer from "./components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-6.5rem)] mt-26">{children}</div>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
};

export default layout;
