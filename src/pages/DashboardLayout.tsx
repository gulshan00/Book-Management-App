import { useState, useEffect } from 'react';
import { LayoutDashboard, Book, Users, Settings, LogOut, Menu, X, Search, Bell, ChevronDown, UserCircle } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
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

  // Navigation items
  const navigationItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/", icon: Book, label: "Books" },
    { path: "/", icon: Users, label: "Authors" },
    { path: "/", icon: Settings, label: "Settings" },
  ];

  const isActiveRoute = (path: string) => location.pathname === path || (path === "/dashboard" && location.pathname === "/");

  const handleMobileMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMobileLinkClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogout = () => {
    alert("Logout functionality would be implemented here");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSidebarOpen(false);
          }}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-xl shadow-2xl z-50
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-all duration-300 ease-out flex flex-col border-r border-white/20 overflow-hidden`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg" role="img" aria-label="Books">📚</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BookDash
                </h1>
                <p className="text-xs text-gray-500">Library Management</p>
              </div>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" role="navigation" aria-label="Main navigation">
          {navigationItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              onClick={handleMobileLinkClick}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                isActiveRoute(path)
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-[1.02]"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-gray-900"
              }`}
              aria-current={isActiveRoute(path) ? "page" : undefined}
            >
              <Icon 
                size={20} 
                className={`transition-colors ${
                  isActiveRoute(path) 
                    ? "text-white" 
                    : "text-gray-600 group-hover:text-blue-600"
                }`} 
                aria-hidden="true"
              />
              <span className={`font-medium ${
                isActiveRoute(path) 
                  ? "text-white" 
                  : "group-hover:text-gray-900"
              }`}>
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-100/50 space-y-3 flex-shrink-0">
          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">John Doe</p>
              <p className="text-sm text-gray-500 truncate">Administrator</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            type="button"
            aria-label="Logout"
          >
            <LogOut size={18} aria-hidden="true" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-xl p-4 lg:px-6 shadow-sm border-b border-white/20 sticky top-0 z-30 flex-shrink-0">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              data-sidebar-toggle
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} className="text-gray-700" />
            </button>

            {/* Desktop Search Bar */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 text-gray-400" size={18} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search books, authors, or topics..."
                className="pl-10 pr-4 py-2.5 w-80 lg:w-96 border border-gray-200 rounded-xl bg-gray-50/50 backdrop-blur-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                aria-label="Search books, authors, or topics"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
              aria-label="Search"
            >
              <Search size={20} className="text-gray-600" />
            </button>

            {/* Notifications */}
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-gray-600" />
              <span 
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                aria-label="3 unread notifications"
              >
                3
              </span>
            </button>

            {/* Welcome Message - Hidden on mobile */}
            <span className="hidden lg:block text-gray-600 font-medium">
              Good morning! 👋
            </span>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  alt="Profile"
                  className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border-2 border-white shadow-sm"
                />
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${
                  userDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <UserCircle className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" />
                    Preferences
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
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
        <div className="md:hidden p-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search books, authors..."
              className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
              aria-label="Search books and authors"
            />
          </div>
        </div>

        {/* Main Content - This is where your Dashboard component will be rendered */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" role="main">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Content from <Outlet /> or your Dashboard component goes here */}
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
}