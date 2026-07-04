import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
