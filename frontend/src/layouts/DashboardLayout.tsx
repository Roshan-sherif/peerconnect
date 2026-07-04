import { Outlet, Link, useLocation } from "react-router-dom";
import { Code2, LayoutDashboard, MessageSquare, Calendar, Bell, User, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const DashboardLayout = () => {
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Chats", path: "/chats", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Rooms", path: "/rooms", icon: <Code2 className="w-5 h-5" /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar className="w-5 h-5" /> },
    { name: "Notifications", path: "/notifications", icon: <Bell className="w-5 h-5" /> },
    { name: "Profile", path: "/profile", icon: <User className="w-5 h-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">PeerConnect</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
              />
            </div>
          </div>
          
          <div className="ml-4 flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-500 relative">
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary text-white font-medium text-sm">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
