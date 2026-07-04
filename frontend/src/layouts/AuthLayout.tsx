import { Outlet, Link } from "react-router-dom";
import { Code2 } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Branding Panel */}
      <div className="hidden md:flex flex-1 bg-slate-900 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-0" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="bg-primary p-1.5 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">PeerConnect</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Your collaborative coding workspace
          </h1>
          <p className="text-lg text-slate-300 max-w-md">
            Join thousands of developers coding together in real-time with integrated voice, video, and chat.
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-400">
          © {new Date().getFullYear()} PeerConnect. All rights reserved.
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 md:px-24 py-12 bg-white border-l border-slate-100">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <Link to="/" className="flex md:hidden items-center gap-2 mb-8 justify-center">
            <div className="bg-primary p-1.5 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">PeerConnect</span>
          </Link>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
