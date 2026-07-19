import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        const dressesRes = await api.get('/dresses');
        const jewelleryRes = await api.get('/jewellery');
        
        const allDresses = dressesRes.data || [];
        const allJewellery = jewelleryRes.data || [];

        // For New Arrivals: take first 2 dresses and first 2 jewellery items
        const arrivals = [
          ...allDresses.slice(0, 2).map(d => ({ ...d, type: 'dress' })),
          ...allJewellery.slice(0, 2).map(j => ({ ...j, type: 'jewellery' }))
        ];

        // For Trending Now: take the next 2 dresses and next 2 jewellery items
        const trending = [
          ...allDresses.slice(2, 4).map(d => ({ ...d, type: 'dress' })),
          ...allJewellery.slice(2, 4).map(j => ({ ...j, type: 'jewellery' }))
        ];

        setNewArrivals(arrivals);
        setTrendingNow(trending);
      } catch (error) {
        console.error('Error fetching home products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFD2DF] via-[#FFE3EB] to-[#FFD2DF] pt-12 pb-12 border-b border-[#FF85A1]">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-8 animate-fadeIn">
          
          {/* Left Dress Model Image */}
          <div className="w-full lg:w-1/4 hidden lg:block animate-slideIn">
            <div 
              onClick={() => scrollToSection('new-arrivals-section')}
              className="relative group overflow-hidden rounded-2xl border-4 border-white shadow-[0_15px_30px_rgba(255,74,122,0.15)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(255,74,122,0.25)] cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=533&fit=crop" 
                alt="Latest Dress Collection Left" 
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF2E63]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-semibold tracking-wider">NEW ARRIVALS</p>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="w-full lg:w-2/4 text-center py-8">
            <div className="mb-8">
              <span className="bg-[#FFC2D1] text-[#FF2E63] text-[12px] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase">Exclusive AI Fashion</span>
              <h1 className="text-[56px] font-extrabold mb-4 text-[#351C24] leading-tight animate-slideIn tracking-tight mt-4">
                VOGUE ME
              </h1>
              <p className="text-[24px] font-bold text-[#FF2E63] mb-6 animate-slideIn" style={{ animationDelay: '0.1s' }}>
                Your AI Stylist Awaits
              </p>
            </div>
            <p className="text-[16px] text-[#5C3A43] max-w-[500px] mx-auto mb-10 leading-relaxed font-medium animate-slideIn" style={{ animationDelay: '0.2s' }}>
              Discover clothing that matches your unique style, body type, and lifestyle. Our AI learns your preferences with every interaction.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/match-me" className="bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold px-[40px] py-[14px] rounded-lg shadow-[0_8px_25px_rgba(255,46,99,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,46,99,0.45)] transition-all duration-300 inline-block">
                Start Styling Now
              </Link>
              <Link to="/products/dresses" className="bg-[#FFF0F2] text-[#FF2E63] border-2 border-[#FF2E63] text-[14px] font-bold px-[36px] py-[12px] rounded-lg hover:bg-[#FF2E63] hover:text-white transition-colors duration-300 inline-block">
                View Collection
              </Link>
            </div>
          </div>

          {/* Right Dress Model Image */}
          <div className="w-full lg:w-1/4 hidden lg:block animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <div 
              onClick={() => scrollToSection('trending-now-section')}
              className="relative group overflow-hidden rounded-2xl border-4 border-white shadow-[0_15px_30px_rgba(255,74,122,0.15)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(255,74,122,0.25)] cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=533&fit=crop" 
                alt="Latest Dress Collection Right" 
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF2E63]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-semibold tracking-wider">TRENDING NOW</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="py-24 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[32px] font-bold text-[#4A0E17] text-center mb-12">Why Choose VOGUE ME</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[12px] border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.06)] hover:scale-105 hover:shadow-[0_15px_45px_rgba(255,46,99,0.15)] transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4 animate-float">🧠</div>
            <h3 className="text-[16px] font-semibold text-[#4A0E17] mb-3">Smart AI Learning</h3>
            <p className="text-[13px] text-[#7D3E4D] leading-[1.6]">System learns your preferences with each interaction for increasingly accurate recommendations.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[12px] border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.06)] hover:scale-105 hover:shadow-[0_15px_45px_rgba(255,46,99,0.15)] transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.5s' }}>
            <div className="text-4xl mb-4 animate-float" style={{ animationDelay: '0.2s' }}>👁️</div>
            <h3 className="text-[16px] font-semibold text-[#4A0E17] mb-3">Virtual Try-On</h3>
            <p className="text-[13px] text-[#7D3E4D] leading-[1.6]">See how clothes fit your body in real-time using advanced AR technology.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[12px] border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.06)] hover:scale-105 hover:shadow-[0_15px_45px_rgba(255,46,99,0.15)] transition-all duration-300 animate-scaleIn" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl mb-4 animate-float" style={{ animationDelay: '0.4s' }}>🎨</div>
            <h3 className="text-[16px] font-semibold text-[#4A0E17] mb-3">Color Matching</h3>
            <p className="text-[13px] text-[#7D3E4D] leading-[1.6]">Get colors that perfectly complement your skin tone and personal aesthetic.</p>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT COLLECTIONS */}
      <section className="py-16 max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-bold text-[#4A0E17] mb-2">Shop by Collection</h2>
          <p className="text-[13px] text-[#7D3E4D]">Explore our curated collections</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Link to="/products/dresses" className="group cursor-pointer">
            <div className="relative w-full aspect-square rounded-[12px] mb-3 overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(255,46,99,0.2)] group-hover:scale-[1.03]">
              <img 
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop" 
                alt="Dresses" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-[14px] font-semibold text-[#4A0E17] text-center group-hover:text-[#FF2E63] transition-colors">Dresses</h3>
          </Link>
          <Link to="/products/jewellery" className="group cursor-pointer">
            <div className="relative w-full aspect-square rounded-[12px] mb-3 overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(255,46,99,0.2)] group-hover:scale-[1.03]">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop" 
                alt="Jewellery" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-[14px] font-semibold text-[#4A0E17] text-center group-hover:text-[#FF2E63] transition-colors">Jewellery</h3>
          </Link>
          <Link to="/match-me" className="group cursor-pointer">
            <div className="relative w-full aspect-square rounded-[12px] mb-3 overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(255,46,99,0.2)] group-hover:scale-[1.03]">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de27d2bc?w=400&h=400&fit=crop" 
                alt="Match Me" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-[14px] font-semibold text-[#4A0E17] text-center group-hover:text-[#FF2E63] transition-colors">Match Me</h3>
          </Link>
          <Link to="/outfit-builder" className="group cursor-pointer">
            <div className="relative w-full aspect-square rounded-[12px] mb-3 overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(255,46,99,0.2)] group-hover:scale-[1.03]">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop" 
                alt="Outfit Builder" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-[14px] font-semibold text-[#4A0E17] text-center group-hover:text-[#FF2E63] transition-colors">Outfit Builder</h3>
          </Link>
        </div>

        {/* NEW ARRIVALS - Product Grid */}
        <div id="new-arrivals-section" className="text-center mb-12 scroll-mt-24">
          <h2 className="text-[32px] font-bold text-[#4A0E17] mb-2 hover:text-[#FF2E63] transition-colors cursor-pointer inline-block">
            <Link to="/products/dresses">New Arrivals</Link>
          </h2>
          <div className="flex justify-center gap-4 text-xs font-black uppercase tracking-wider text-[#A9445D]/80 mt-1">
            <Link to="/products/dresses" className="hover:text-[#FF2E63] border-r border-[#FFC2D1] pr-4">Shop Dresses</Link>
            <Link to="/products/jewellery" className="hover:text-[#FF2E63]">Shop Jewellery</Link>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF2E63]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {newArrivals.map((item) => (
              <Link to={`/product/${item.type}/${item._id}`} key={item._id} className="group cursor-pointer">
                <div className="relative w-full aspect-[3/4] rounded-[12px] mb-3 overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(255,46,99,0.25)] group-hover:scale-[1.03]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-[#FF2E63] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                    NEW
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-[13px] text-[#7D3E4D] mb-1 group-hover:text-[#4A0E17] transition-colors truncate font-bold">{item.name}</h3>
                <p className="text-[14px] font-bold text-[#FF2E63]">${item.price}</p>
              </Link>
            ))}
          </div>
        )}

        {/* TRENDING NOW - Product Grid */}
        <div id="trending-now-section" className="text-center mb-12 scroll-mt-24">
          <h2 className="text-[32px] font-bold text-[#4A0E17] mb-2 hover:text-[#FF2E63] transition-colors cursor-pointer inline-block">
            <Link to="/products/dresses">Trending Now</Link>
          </h2>
          <div className="flex justify-center gap-4 text-xs font-black uppercase tracking-wider text-[#A9445D]/80 mt-1">
            <Link transition-colors to="/products/dresses" className="hover:text-[#FF2E63] border-r border-[#FFC2D1] pr-4">Shop Dresses</Link>
            <Link to="/products/jewellery" className="hover:text-[#FF2E63]">Shop Jewellery</Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF2E63]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingNow.map((item) => (
              <Link to={`/product/${item.type}/${item._id}`} key={item._id} className="group cursor-pointer">
                <div className="relative w-full aspect-[3/4] rounded-[12px] mb-3 overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(255,46,99,0.25)] group-hover:scale-[1.03]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-[#FF8DA1] text-[#351C24] text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    HOT
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-[13px] text-[#7D3E4D] mb-1 group-hover:text-[#4A0E17] transition-colors truncate font-bold">{item.name}</h3>
                <p className="text-[14px] font-bold text-[#FF2E63]">${item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 5. FOOTER */}
      <footer id="contact" className="bg-[#4A0E17] border-t border-[#FF85A1]/20 text-white mt-16 py-12 px-8 animate-fadeIn">
        <div className="max-w-[1400px] mx-auto text-center opacity-90 text-[14px]">
          <h3 className="text-[24px] font-bold text-[#FF6B8B] mb-3">VOGUE ME</h3>
          <p className="mb-4 text-[#FFE5EC]/75">© 2026 VOGUE ME. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-6 text-sm font-semibold text-[#FFE5EC]/85">
            <a href="mailto:support@vogueme.com" className="hover:text-[#FF6B8B] transition-colors flex items-center justify-center gap-2">
              <i className="ti ti-mail text-base"></i> support@vogueme.com
            </a>
            <a href="tel:+15551234567" className="hover:text-[#FF6B8B] transition-colors flex items-center justify-center gap-2">
              <i className="ti ti-phone text-base"></i> +1 (555) 123-4567 (Call Us)
            </a>
            <Link to="/contact" className="hover:text-[#FF6B8B] transition-colors flex items-center justify-center gap-2">
              <i className="ti ti-info-circle text-base"></i> Contact Page
            </Link>
          </div>
          <p className="text-[#FF6B8B]/80 font-medium text-[11px] tracking-wider uppercase">Powered by Advanced AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
