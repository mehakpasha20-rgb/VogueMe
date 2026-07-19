import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const response = await api.get('/wishlist');
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/wishlist/${itemId}`);
      await fetchWishlist();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-8 py-16 animate-fadeIn flex-1 flex flex-col justify-center items-center">
        <div className="bg-white/70 backdrop-blur-lg border border-white/40 p-12 rounded-3xl text-center max-w-lg shadow-[0_12px_40px_rgba(255,133,161,0.08)]">
          <div className="text-5xl mb-6 animate-float">🔒</div>
          <h1 className="text-[28px] font-black text-[#351C24] mb-3">Login Required</h1>
          <p className="text-[#8A606A] font-semibold mb-8">Please log in to your account to save, view, and organize your personal wishlist.</p>
          <Link to="/login" className="bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold px-10 py-4 rounded-2xl shadow-[0_8px_20px_rgba(255,46,99,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(255,46,99,0.4)] transition-all duration-300 inline-block w-full">
            Login to Account
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 flex-1">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF2E63]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#351C24] via-[#A9445D] to-[#D45D79] p-8 md:p-12 mb-12 shadow-[0_20px_50px_rgba(169,68,93,0.15)] text-white">
        <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#FF8DA1]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] left-[10%] w-[250px] h-[250px] bg-[#D45D79]/25 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/10 backdrop-blur-md text-[#FFE5EC] uppercase tracking-wider mb-4 border border-white/15">
              <i className="ti ti-heart text-[#FF8DA1] animate-pulse"></i> Saved Items
            </span>
            <h1 className="text-[38px] md:text-[52px] font-black tracking-tight capitalize drop-shadow-md mb-2">My Wishlist</h1>
            <p className="text-[#FFE5EC]/90 font-medium max-w-xl text-[14px] md:text-[15px] opacity-90 leading-relaxed">
              Keep track of your favorite styles. Add them to your cart directly, build look collections, or share your curated fashion list.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 text-center shadow-lg self-start md:self-auto min-w-[140px] border-b-4 border-b-[#FF8DA1]/40">
            <div className="text-[32px] md:text-[40px] font-black text-white leading-none">{wishlistItems.length}</div>
            <div className="text-[10px] font-extrabold text-[#FF8DA1] uppercase tracking-widest mt-1.5">Saved Pieces</div>
          </div>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl text-center py-20 shadow-md max-w-2xl mx-auto p-8">
          <div className="text-5xl mb-6">💖</div>
          <h2 className="text-[20px] font-black text-[#351C24] mb-3">Your Wishlist is Empty</h2>
          <p className="text-[#8A606A] font-semibold mb-8 max-w-sm mx-auto leading-relaxed">Explore our catalog and heart your favorite items to save them here for later!</p>
          <Link to="/products/dresses" className="bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold px-10 py-4 rounded-2xl shadow-[0_8px_20px_rgba(255,46,99,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(255,46,99,0.4)] transition-all duration-300 inline-block">
            Browse Dresses Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="group relative flex flex-col bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-3 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,133,161,0.14)]"
            >
              {/* Product Image Wrapper */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.02)] mb-4 border border-white/20">
                <img 
                  src={item.productId?.image} 
                  alt={item.productId?.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" 
                />
                
                {/* Floating Heart / Delete overlay */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => removeItem(item._id)}
                    className="w-8 h-8 rounded-full bg-[#FF2E63] text-white flex items-center justify-center shadow-md hover:bg-[#A9445D] transition-all duration-300 transform active:scale-90"
                    title="Remove from wishlist"
                  >
                    <i className="ti ti-x text-[13px] font-black"></i>
                  </button>
                </div>

                {/* Price tag badge overlay */}
                <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md border border-white/30 text-[#351C24] font-black text-sm px-3.5 py-1.5 rounded-xl shadow-md">
                  ${item.productId?.price}
                </div>
              </div>

              {/* Product Info */}
              <Link to={`/product/${item.productType.toLowerCase()}/${item.productId?._id}`} className="px-2 pb-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[14px] font-black text-[#351C24] group-hover:text-[#FF2E63] transition-colors duration-200 truncate leading-snug">
                    {item.productId?.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[9px] font-black tracking-widest text-[#FF2E63]/80 uppercase bg-[#FFE5EC] px-2 py-0.5 rounded-md">
                      {item.productType}
                    </span>
                    <span className="text-[9px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/50">
                      {item.productId?.color || 'Multicolor'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
