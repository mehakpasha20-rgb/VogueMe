import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar, sidebarOpen, isHome }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 h-[80px] bg-white/75 backdrop-blur-md border-b border-[#FF85A1]/20 flex items-center transition-all duration-300">
      <div className="max-w-[1400px] w-full mx-auto px-6 flex justify-between items-center">
        {/* Logo and Sidebar toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className={`text-[#601A2E] hover:text-[#FF2E63] p-2 rounded-xl hover:bg-[#FFE5EC] active:scale-95 transition-all duration-300 ${
              isHome ? 'lg:hidden flex' : 'flex'
            }`}
            aria-label="Toggle Sidebar"
          >
            <i className={`ti ti-menu-${sidebarOpen ? 'open' : '2'} text-2xl`}></i>
          </button>
          <Link to="/" className="text-2xl font-black text-[#4A0E17] tracking-wider hover:text-[#FF2E63] transition-colors">
            VOGUE ME
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[14px] font-bold text-[#601A2E] hover:text-[#FF2E63] transition-colors duration-300">Home</Link>
          <a href="#features" className="text-[14px] font-bold text-[#601A2E] hover:text-[#FF2E63] transition-colors duration-300">Features</a>
          <div className="relative group">
            <button className="text-[14px] font-bold text-[#601A2E] hover:text-[#FF2E63] transition-colors duration-300 flex items-center gap-1">
              Shop <i className="ti ti-chevron-down text-[10px]"></i>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_30px_rgba(255,46,99,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#FFC2D1]">
              <Link to="/products/dresses" className="block px-4 py-3 text-[13px] font-bold text-[#601A2E] hover:bg-[#FFE5EC] hover:text-[#FF2E63] transition-colors rounded-t-xl">Dresses</Link>
              <Link to="/products/jewellery" className="block px-4 py-3 text-[13px] font-bold text-[#601A2E] hover:bg-[#FFE5EC] hover:text-[#FF2E63] transition-colors rounded-b-xl">Jewellery</Link>
            </div>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <Link to="/wishlist" className="text-[#601A2E] hover:text-[#FF2E63] transition-colors duration-300 flex items-center justify-center">
            <i className="ti ti-heart text-[22px]"></i>
          </Link>
          <Link to="/cart" className="text-[#601A2E] hover:text-[#FF2E63] transition-colors duration-300 flex items-center justify-center">
            <i className="ti ti-shopping-bag text-[22px]"></i>
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-[14px] font-bold text-[#601A2E] hover:text-[#FF2E63] transition-colors duration-300">Profile</Link>
              <button onClick={handleLogout} className="text-[13px] font-bold text-white bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] px-5 py-2.5 rounded-xl hover:shadow-[0_8px_20px_rgba(255,46,99,0.35)] transition-all duration-300 hover:-translate-y-[2px]">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[14px] font-bold text-[#601A2E] hover:text-[#FF2E63] transition-colors duration-300">Login</Link>
              <Link to="/signup" className="text-[13px] font-bold text-white bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] px-5 py-2.5 rounded-xl hover:shadow-[0_8px_20px_rgba(255,46,99,0.35)] transition-all duration-300 hover:-translate-y-[2px]">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
