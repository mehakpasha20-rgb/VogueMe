import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products/dresses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="w-full flex flex-col z-40 sticky top-0 shadow-md">
      {/* 1. Announcement Bar */}
      <div className="w-full bg-[#3D0B13] text-[#FAF7F5] py-2 text-[9px] sm:text-[11px] font-medium tracking-widest text-center uppercase border-b border-[#FAF7F5]/10 select-none">
        FREE SHIPPING ON ORDERS OVER $75 · TRY OUR AI STYLIST FOR FREE
      </div>

      {/* 2. Main Navbar */}
      <nav className="relative h-[70px] sm:h-[80px] bg-[#4A0E17] flex items-center border-b border-white/5 transition-all duration-300">
        <div className="max-w-[1400px] w-full mx-auto px-6 flex justify-between items-center relative">
          
          {/* Left: Sidebar Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-[#FF8DA1] p-2 rounded-xl active:scale-95 transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle Sidebar"
            >
              <i className={`ti ti-${sidebarOpen ? 'x' : 'menu-2'} text-2xl`}></i>
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-[0.25em] hover:text-[#FF8DA1] transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              VOGUE ME
            </Link>
          </div>

          {/* Right: Icon Options */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Icon */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-white hover:text-[#FF8DA1] p-1.5 transition-colors duration-300 flex items-center justify-center"
              aria-label="Search"
            >
              <i className="ti ti-search text-[20px] sm:text-[22px]"></i>
            </button>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="text-white hover:text-[#FF8DA1] p-1.5 transition-colors duration-300 flex items-center justify-center"
              aria-label="Wishlist"
            >
              <i className="ti ti-heart text-[20px] sm:text-[22px]"></i>
            </Link>

            {/* Profile (Direct Link) */}
            <Link 
              to="/profile" 
              className="text-white hover:text-[#FF8DA1] p-1.5 transition-colors duration-300 flex items-center justify-center"
              aria-label="Profile"
            >
              <i className="ti ti-user text-[20px] sm:text-[22px]"></i>
            </Link>

            {/* Shopping Cart */}
            <Link 
              to="/cart" 
              className="text-white hover:text-[#FF8DA1] p-1.5 transition-colors duration-300 flex items-center justify-center"
              aria-label="Cart"
            >
              <i className="ti ti-shopping-bag text-[20px] sm:text-[22px]"></i>
            </Link>
          </div>
        </div>

        {/* Sliding Search Overlay */}
        {searchOpen && (
          <div className="absolute inset-0 bg-[#4A0E17] px-6 flex items-center justify-between z-50 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-[800px] mx-auto flex items-center gap-3">
              <i className="ti ti-search text-white text-xl"></i>
              <input
                type="text"
                placeholder="Search for dresses, jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm sm:text-base font-medium py-2"
                autoFocus
              />
            </form>
            <button 
              onClick={() => setSearchOpen(false)} 
              className="text-white hover:text-[#FF8DA1] p-2 text-xl"
              aria-label="Close search"
            >
              <i className="ti ti-x"></i>
            </button>
          </div>
        )}
      </nav>

      {/* 3. Sub-Navbar Banner */}
      <div className="w-full bg-[#3D0B13] border-b border-white/5 overflow-x-auto scrollbar-none py-3 select-none">
        <div className="max-w-[600px] mx-auto px-4 flex justify-between sm:justify-center sm:gap-12 items-center whitespace-nowrap text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#FAF7F5]/90 uppercase">
          <Link to="/" className="hover:text-white transition-colors py-0.5 border-b border-transparent hover:border-white">HOME</Link>
          <a href="/#features" className="hover:text-white transition-colors py-0.5 border-b border-transparent hover:border-white">FEATURES</a>
          <Link to="/products/dresses" className="hover:text-white transition-colors py-0.5 border-b border-transparent hover:border-white">SHOP</Link>
          <Link to="/contact" className="hover:text-white transition-colors py-0.5 border-b border-transparent hover:border-white">CONTACTS</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
