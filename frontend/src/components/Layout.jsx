import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5EC] via-[#FFC2D1] to-[#FFE5EC] flex flex-col lg:flex-row w-full overflow-x-hidden">
      {/* Backdrop overlay */}
      {sidebarOpen && (
        <div 
          className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
            isHome ? 'lg:hidden' : 'block'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#FFC2D1]/95 backdrop-blur-md border-r border-[#FF85A1] transform transition-transform duration-300 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isHome ? 'lg:translate-x-0' : ''}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[28px] font-extrabold text-[#FF2E63] tracking-wider drop-shadow-sm">VOGUE ME</h2>
            {/* Close button */}
            <button 
              className={`text-[#601A2E] hover:text-[#FF2E63] text-xl transition-all duration-200 ${
                isHome ? 'lg:hidden' : 'block'
              }`} 
              onClick={() => setSidebarOpen(false)}
            >
              <i className="ti ti-x"></i>
            </button>
          </div>
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`block font-bold transition-all py-3 px-4 rounded-xl ${
                    isActive
                      ? 'bg-[#FF2E63] text-white shadow-[0_4px_12px_rgba(255,46,99,0.2)]'
                      : 'text-[#601A2E] hover:text-[#FF2E63] hover:bg-white/20'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className={`flex-1 flex flex-col min-h-screen w-full overflow-x-hidden transition-all duration-300 ${
        isHome ? 'lg:ml-64' : 'lg:ml-0'
      }`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} isHome={isHome} />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
