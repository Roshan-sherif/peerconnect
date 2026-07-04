import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Code2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            PeerConnect
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="#how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="#about" className="hover:text-primary transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="font-medium text-slate-600 hover:text-slate-900">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-6">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
