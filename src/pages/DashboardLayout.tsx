import { useState, useEffect } from 'react';
import { LayoutDashboard, Settings, Users,LogOut, Menu, X,BookOpen, Search, Bell, ChevronDown, UserCircle } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface NavigationItem {
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  color: string;
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobile && sidebarOpen && !target.closest('aside') && !target.closest('[data-sidebar-toggle]')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (userDropdownOpen && !target.closest('[data-user-dropdown]')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userDropdownOpen]);

  // Navigation items
  const navigationItems: NavigationItem[] = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard", color: "from-emerald-500 to-teal-600" },
    { path: "/books", icon: BookOpen, label: "Books", color: "from-violet-500 to-purple-600" },
    { path: "/authors", icon: Users, label: "Authors", color: "from-orange-500 to-red-500" },
    { path: "/setting", icon: Settings, label: "Setting", color: "from-slate-500 to-gray-600" },
  ];

  const isActiveRoute = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogout = () => {
    alert("Logout functionality would be implemented here");
  };

  const getCurrentPageTitle = (): string => {
    if (location.pathname === '/') return 'Dashboard';
    return location.pathname.replace('/', '').replace('-', ' ');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Escape') setSidebarOpen(false);
          }}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl z-50
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-all duration-300 ease-out flex flex-col border-r border-slate-700/50 overflow-hidden`}>
        
        {/* Logo Section */}
        <div className="p-4 border-b border-slate-700/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-lg" role="img" aria-label="Books">📚</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Book Management App
                </h1>
                <p className="text-xs text-slate-400 font-medium">Library Management</p>
              </div>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-all duration-200 text-slate-400 hover:text-white"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* User Profile Preview */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600/50">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-emerald-400 shadow-lg"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-sm truncate">John Doe</p>
              <p className="text-emerald-400 text-xs font-medium truncate">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent" role="navigation" aria-label="Main navigation">
          {navigationItems.map(({ path, icon: Icon, label, color }) => (
            <Link
              key={path}
              to={path}
              onClick={handleNavClick}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 text-left group relative overflow-hidden ${
                isActiveRoute(path)
                  ? `bg-gradient-to-r ${color} text-white shadow-xl shadow-emerald-500/20 transform scale-[1.01] border border-white/20`
                  : "hover:bg-slate-700/50 text-slate-300 hover:text-white border border-transparent hover:border-slate-600/50"
              }`}
              aria-current={isActiveRoute(path) ? "page" : undefined}
            >
              {/* Active indicator */}
              {isActiveRoute(path) && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"></div>
              )}
              
              <div className={`p-2 rounded-lg transition-all duration-300 relative z-10 ${
                isActiveRoute(path) 
                  ? "bg-white/20 shadow-md" 
                  : "bg-slate-700/50 group-hover:bg-slate-600/70"
              }`}>
                <Icon 
                  size={18} 
                  className={`transition-all duration-300 ${
                    isActiveRoute(path) 
                      ? "text-white" 
                      : "text-slate-400 group-hover:text-white"
                  }`} 
                />
              </div>
              <span className={`font-semibold text-sm transition-all duration-300 relative z-10 ${
                isActiveRoute(path) 
                  ? "text-white" 
                  : "text-slate-300 group-hover:text-white"
              }`}>
                {label}
              </span>
              
              {/* Hover effect */}
              {!isActiveRoute(path) && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 via-slate-600/20 to-slate-700/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out rounded-xl"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700/50 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-xl hover:shadow-red-500/20 transform hover:scale-[1.01] group border border-red-500/30"
            type="button"
            aria-label="Logout"
          >
            <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-all duration-300">
              <LogOut size={16} />
            </div>
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Enhanced Dark Top Header */}
        <header className="flex items-center justify-between bg-slate-800/95 backdrop-blur-xl px-4 lg:px-6 py-3 shadow-2xl border-b border-slate-700/50 sticky top-0 z-30 flex-shrink-0">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              data-sidebar-toggle
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2.5 hover:bg-slate-700/50 rounded-lg transition-all duration-200 border border-slate-600/50 text-slate-300 hover:text-white"
              type="button"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>

            {/* Page Title */}
            <div className="hidden sm:block">
              <h2 className="text-xl font-bold text-white capitalize">
                {getCurrentPageTitle()}
              </h2>
              <p className="text-slate-400 text-xs font-medium mt-0.5">Welcome back, manage your library efficiently</p>
            </div>

            {/* Desktop Search Bar */}
            <div className="relative hidden md:flex items-center ml-6">
              <Search className="absolute left-3 text-slate-400" size={18} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search books, authors, categories..."
                className="pl-10 pr-4 py-2.5 w-72 lg:w-80 xl:w-96 border border-slate-600/50 rounded-xl bg-slate-700/50 backdrop-blur-sm focus:bg-slate-700 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 outline-none text-white placeholder-slate-400 text-sm font-medium shadow-lg"
                aria-label="Search books, authors, or categories"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Button */}
            <button 
              className="md:hidden p-2.5 hover:bg-slate-700/50 rounded-lg transition-all duration-200 border border-slate-600/50 text-slate-300 hover:text-white"
              type="button"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                className="relative p-2.5 hover:bg-slate-700/50 rounded-lg transition-all duration-200 border border-slate-600/50 group text-slate-300 hover:text-white"
                type="button"
                aria-label="Notifications"
              >
                <Bell size={18} className="transition-colors" />
                <div className="absolute -top-1 -right-1 flex items-center justify-center">
                  <span className="w-5 h-5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    5
                  </span>
                </div>
              </button>
            </div>

            {/* Time & Date - Hidden on mobile */}
            <div className="hidden xl:flex flex-col items-end text-slate-300 mr-2">
              <span className="font-bold text-sm text-white">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              <span className="text-xs font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" data-user-dropdown>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-700/50 rounded-xl transition-all duration-200 cursor-pointer border border-slate-600/50 group"
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/40?img=1"
                    alt="Profile"
                    className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border-2 border-emerald-400 shadow-lg"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-white">John Doe</p>
                  <p className="text-xs text-slate-400 font-medium">Admin</p>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-all duration-300 group-hover:text-white ${
                  userDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <p className="font-bold text-white">John Doe</p>
                    <p className="text-sm text-slate-400">john.doe@bookdash.com</p>
                  </div>
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors font-medium">
                    <UserCircle className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors font-medium">
                    <Settings className="w-4 h-4" />
                    Preferences
                  </button>
                  <hr className="my-2 border-slate-700/50" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Search Bar */}
        <div className="md:hidden p-4 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search books and authors..."
              className="pl-11 pr-4 py-3 w-full border-2 border-slate-600/50 rounded-2xl bg-slate-700/50 focus:bg-slate-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 outline-none shadow-lg text-white placeholder-slate-400"
              aria-label="Search books and authors"
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50" role="main">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Content from <Outlet /> goes here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}