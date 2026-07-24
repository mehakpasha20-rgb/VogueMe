import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Static hero dresses for homepage
  const heroDresses = [
    {
      _id: 'hero-2',
      name: 'Emerald Embroidered Dress with Dupatta',
      category: 'Traditional',
      image: '/images/dress_7.png',
      price: 12500
    },
    {
      _id: 'hero-3',
      name: 'Elegant Green Traditional Dress',
      category: 'Party',
      image: '/images/dress_8.png',
      price: 11800
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroDresses.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        const dressesRes = await api.get('/dresses');
        const jewelleryRes = await api.get('/jewellery');
        
        const allDresses = dressesRes.data || [];
        const allJewellery = jewelleryRes.data || [];

        // For New Arrivals: take first 4 dresses, replace with Pakistani dress
        let arrivals = allDresses.slice(0, 4).map(d => ({ ...d, type: 'dress' }));
        // Replace first dress with Pakistani dress
        if (arrivals.length > 0) {
          arrivals[0] = {
            _id: 'pakistani-1',
            name: 'Pakistani Casual Dress',
            category: 'Casual',
            image: '/images/party_2.png',
            price: 5800,
            type: 'dress'
          };
        }
        // Set reasonable PKR prices with variation based on category
        arrivals = arrivals.map((d, index) => {
          const basePrice = d.category === 'Casual' ? 6000 : 
                           d.category === 'Party' ? 12000 : 
                           d.category === 'Wedding' ? 15000 : 8000;
          const variation = (index % 3 - 1) * 500; // -500, 0, or +500
          return { ...d, price: basePrice + variation };
        });

        // For Trending Now: take the next 4 dresses
        let trending = allDresses.slice(4, 8).map(d => ({ ...d, type: 'dress' }));
        // Set reasonable PKR prices with variation based on category
        trending = trending.map((d, index) => {
          const basePrice = d.category === 'Casual' ? 6000 : 
                           d.category === 'Party' ? 12000 : 
                           d.category === 'Wedding' ? 15000 : 8000;
          const variation = (index % 3 - 1) * 500; // -500, 0, or +500
          return { ...d, price: basePrice + variation };
        });

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
    <div className="w-full bg-pink-50">
      
      {/* 1. HERO SECTION (Dress Image Carousel) */}
      <section className="relative w-full h-[450px] sm:h-[600px] md:h-[650px] overflow-hidden flex items-center justify-end px-6 sm:px-12 md:px-24">
        {/* Dress Image Background */}
        {heroDresses.length > 0 ? (
          <img
            src={heroDresses[activeSlide]?.image}
            alt={heroDresses[activeSlide]?.name}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none bg-zinc-800 animate-kenBurns"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-100 to-pink-200 z-0" />
        )}

        {/* Image Overlay Tint */}
        <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

        {/* Right-aligned Hero Call To Action */}
        <div className="z-20 text-right flex flex-col items-end gap-3 sm:gap-5 max-w-[600px] text-white">
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase text-white/90 animate-fadeIn font-mono">
            {heroDresses[activeSlide]?.category || 'CURATED FOR YOU'}
          </p>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-wide animate-slideIn select-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {heroDresses[activeSlide]?.name || 'VOGUE ME'}
          </h1>
          <Link 
            to={`/product/dress/${heroDresses[activeSlide]?._id}`}
            className="mt-2 px-8 py-3 text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase text-white border border-white hover:bg-white hover:text-[#4A0E17] transition-all duration-500 rounded-none shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95 select-none"
          >
            SHOP NOW
          </Link>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 select-none">
          {heroDresses.map((dress, idx) => (
            <button
              key={dress._id}
              onClick={() => setActiveSlide(idx)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="py-20 max-w-[1400px] mx-auto px-6 sm:px-12 scroll-mt-24">
        <div className="text-center mb-12">
          <p className="text-[#D45D79] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-1 font-sans">
            DISCOVER THE VOGUE ME ADVANTAGE
          </p>
          <h2 
            className="text-[32px] font-normal text-[#351C24] tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Why Choose VOGUE ME
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-black/5 shadow-sm hover:scale-[1.03] hover:shadow-md transition-all duration-300">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-base font-semibold text-[#351C24] mb-3">Smart AI Learning</h3>
            <p className="text-sm text-[#5C3A43] leading-relaxed">System learns your preferences with each interaction for increasingly accurate recommendations.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-black/5 shadow-sm hover:scale-[1.03] hover:shadow-md transition-all duration-300">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-base font-semibold text-[#351C24] mb-3">Virtual Try-On</h3>
            <p className="text-sm text-[#5C3A43] leading-relaxed">See how clothes fit your body in real-time using advanced AR technology.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-[#4A0E17] text-white p-8 rounded-xl border border-white/5 shadow-sm hover:scale-[1.03] hover:shadow-md transition-all duration-300">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-base font-semibold text-white mb-3">Color Matching</h3>
            <p className="text-sm text-white/80 leading-relaxed">Get colors that perfectly complement your skin tone and personal aesthetic.</p>
          </div>
        </div>
      </section>

      {/* 3. CURATED NEW ARRIVALS GRID */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="text-center mb-12 animate-fadeIn">
          <p className="text-[#D45D79] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-1 font-sans">
            CURATED BY YOUR AI STYLIST
          </p>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#351C24] tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            New Arrivals
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#4A0E17]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {newArrivals.map((item) => {
              // Custom badges to match the mockup design
              const isSale = item.name.toLowerCase().includes('wrap') || item.price < 100;
              const isNew = !isSale;

              return (
                <Link to={`/product/${item.type}/${item._id}`} key={item._id} className="group cursor-pointer block">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#FAF7F5] border border-black/5 shadow-sm transition-all duration-500 hover:shadow-md hover:scale-[1.02]">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Badge Overlay */}
                    {isNew && (
                      <div className="absolute top-3 left-3 bg-[#E91E63] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm select-none">
                        NEW
                      </div>
                    )}
                    {isSale && (
                      <div className="absolute top-3 left-3 bg-[#3D0B13] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm select-none">
                        SALE
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Details */}
                  <div className="mt-3 text-left">
                    <h3 className="text-xs sm:text-sm font-semibold text-[#351C24] uppercase tracking-wider group-hover:text-[#4A0E17] transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-[#4A0E17] mt-1">
                      Rs {item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* 3. TRENDING NOW SECTION */}
        <div className="text-center mt-20 mb-12">
          <p className="text-[#D45D79] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-1 font-sans">
            LATEST FASHION TRENDS
          </p>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#351C24] tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Trending Now
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#4A0E17]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {trendingNow.map((item) => {
              const isSale = item.price < 2000 && item.price % 3 === 0;
              const isNew = !isSale;

              return (
                <Link to={`/product/${item.type}/${item._id}`} key={item._id} className="group cursor-pointer block">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#FAF7F5] border border-black/5 shadow-sm transition-all duration-500 hover:shadow-md hover:scale-[1.02]">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Badge Overlay */}
                    {isNew && (
                      <div className="absolute top-3 left-3 bg-[#E91E63] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm select-none">
                        NEW
                      </div>
                    )}
                    {isSale && (
                      <div className="absolute top-3 left-3 bg-[#3D0B13] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm select-none">
                        SALE
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Details */}
                  <div className="mt-3 text-left">
                    <h3 className="text-xs sm:text-sm font-semibold text-[#351C24] uppercase tracking-wider group-hover:text-[#4A0E17] transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-[#4A0E17] mt-1">
                      Rs {item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. DESIGN SHOWCASE / COLLECTION PROMO */}
      <section className="bg-[#4A0E17] text-white py-20 px-6 sm:px-12 select-none">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[#FF8DA1] text-xs font-bold uppercase tracking-[0.3em] mb-4">THE CHIC WAY OF EXPRESSION</p>
          <h2 
            className="text-3xl sm:text-5xl font-normal leading-tight max-w-[800px] mx-auto mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Enhance Your Persona With Our AI Stylist Recommendation
          </h2>
          <div className="flex justify-center gap-4">
            <Link 
              to="/match-me" 
              className="px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase bg-white text-[#4A0E17] hover:bg-[#FAF7F5] transition-all"
            >
              TRY MATCH ME
            </Link>
            <Link 
              to="/virtual-tryon" 
              className="px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase border border-white hover:bg-white/10 transition-all"
            >
              VIRTUAL TRY-ON
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer id="contact" className="bg-[#3D0B13] border-t border-white/5 text-[#FAF7F5] py-16 px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 
              className="text-2xl font-bold tracking-[0.2em] mb-3 text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              VOGUE ME
            </h3>
            <p className="text-xs text-[#FAF7F5]/60">© 2026 VOGUE ME. All rights reserved.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm font-semibold">
            <a href="mailto:support@vogueme.com" className="hover:text-[#FF8DA1] transition-colors flex items-center justify-center md:justify-start gap-2">
              <i className="ti ti-mail text-base"></i> support@vogueme.com
            </a>
            <a href="tel:+15551234567" className="hover:text-[#FF8DA1] transition-colors flex items-center justify-center md:justify-start gap-2">
              <i className="ti ti-phone text-base"></i> +1 (555) 123-4567 (Call Us)
            </a>
            <Link to="/contact" className="hover:text-[#FF8DA1] transition-colors flex items-center justify-center md:justify-start gap-2">
              <i className="ti ti-info-circle text-base"></i> Contact Page
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
