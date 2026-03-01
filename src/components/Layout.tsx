import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-charcoal">
      <Navbar />
      <main>
        {children || <Outlet />}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Layout;
