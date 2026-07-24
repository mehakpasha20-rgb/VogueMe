import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate('/');
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Dresses', path: '/products/dresses' },
    { name: 'Jewellery', path: '/products/jewellery' },
    { name: 'Mood Shopping', path: '/mood-shopping' },
    { name: 'Try On', path: '/virtual-tryon' },
    { name: 'Match Me', path: '/match-me' },
    { name: 'Outfit Builder', path: '/outfit-builder' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#351C24] flex flex-col w-full overflow-x-hidden relative">
      
      {/* 1. Backdrop Overlay (Always slides on top of page content) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-[4px] z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Slide-out Sidebar Drawer */}
      <aside 
        className={`fixed left-0 top-0 h-full w-72 bg-[#3D0B13] text-[#FAF7F5] border-r border-white/5 transform transition-transform duration-300 ease-in-out z-50 shadow-2xl flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 
              className="text-2xl font-semibold tracking-[0.2em]" 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              VOGUE ME
            </h2>
            <button 
              className="text-[#FAF7F5]/80 hover:text-white text-2xl transition-colors duration-200" 
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <i className="ti ti-x"></i>
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="space-y-1.5 flex-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#4A0E17] text-white shadow-md border-l-4 border-[#FF8DA1]'
                      : 'text-[#FAF7F5]/85 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Authentication & User Section inside Sidebar Drawer */}
          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            {user ? (
              <div className="space-y-3">
                <div className="px-4 py-2">
                  <p className="text-[11px] text-[#FAF7F5]/60 uppercase tracking-widest font-bold">Logged In As</p>
                  <p className="text-sm font-semibold truncate text-[#FF8DA1]">{user.name || user.email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setSidebarOpen(false)}
                  className="block w-full text-center py-3 text-sm font-bold text-[#4A0E17] bg-[#FAF7F5] hover:bg-[#FAF7F5]/90 rounded-xl transition-all shadow-md active:scale-98"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center py-3 text-sm font-bold border border-white/20 hover:bg-white/5 rounded-xl transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="block text-center py-3 text-sm font-bold border border-white/20 hover:bg-white/5 rounded-xl transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setSidebarOpen(false)}
                  className="block text-center py-3 text-sm font-bold text-[#4A0E17] bg-[#FAF7F5] hover:bg-[#FAF7F5]/90 rounded-xl transition-all shadow-md active:scale-98"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 3. Main Full-Width Content Container */}
      <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden transition-all duration-300">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
