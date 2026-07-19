import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const OutfitBuilder = () => {
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedOutfits, setSavedOutfits] = useState([]);

  useEffect(() => {
    fetchSavedOutfits();
  }, []);

  const fetchSavedOutfits = async () => {
    try {
      const response = await api.get('/outfits');
      setSavedOutfits(response.data);
    } catch (error) {
      console.error('Error fetching outfits:', error);
    }
  };

  const generateOutfit = async () => {
    setLoading(true);
    try {
      const response = await api.get('/outfits/generate/random');
      setOutfit(response.data);
    } catch (error) {
      console.error('Error generating outfit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#351C24] via-[#A9445D] to-[#D45D79] p-8 md:p-12 mb-12 shadow-[0_20px_50px_rgba(169,68,93,0.15)] text-white">
        <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#FF8DA1]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] left-[10%] w-[250px] h-[250px] bg-[#D45D79]/25 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/10 backdrop-blur-md text-[#FFE5EC] uppercase tracking-wider mb-4 border border-white/15">
            <i className="ti ti-sparkles text-[#FF8DA1] animate-pulse"></i> Complete Look Generator
          </span>
          <h1 className="text-[38px] md:text-[52px] font-black tracking-tight capitalize drop-shadow-md mb-2">Outfit Builder</h1>
          <p className="text-[#FFE5EC]/90 font-medium max-w-xl text-[14px] md:text-[15px] opacity-90 leading-relaxed">
            Generate complete, coordinated fashion combinations featuring matching dresses, necklaces, and earrings styled for any mood or theme.
          </p>
        </div>
      </div>

      {/* Build Look Button Area */}
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.08)] text-center mb-10">
        <h2 className="text-[20px] font-black text-[#351C24] mb-3">Ready for a styling recommendation?</h2>
        <p className="text-[14px] text-[#8A606A] font-semibold mb-6 max-w-lg mx-auto leading-relaxed">
          Let our automated stylist pair a dress with matching neckwear and matching ear statements based on cohesive color schemes.
        </p>
        <button
          onClick={generateOutfit}
          disabled={loading}
          className="bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white px-10 py-4 rounded-2xl font-black text-md hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,46,99,0.35)] active:scale-95 transition-all duration-300 shadow-md disabled:opacity-50 inline-flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
              Styling Look...
            </>
          ) : (
            <>
              <i className="ti ti-wand text-lg"></i> Build My Look
            </>
          )}
        </button>
      </div>

      {/* Generated Outfit */}
      {outfit && (
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.08)] mb-12">
          <div className="flex items-center justify-between mb-8 border-b border-[#FFC2D1]/60 pb-4">
            <h2 className="text-[24px] md:text-[28px] font-black text-[#351C24]">Your Complete Look</h2>
            <span className="bg-[#FFE5EC] text-[#FF2E63] text-xs font-black px-4.5 py-1.5 rounded-full border border-[#FFC2D1]/50 uppercase tracking-widest">
              Coordinated Set
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dress */}
            <div className="text-center group bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-4 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 shadow-sm">
              <span className="inline-block text-[10px] font-black tracking-widest text-[#FF2E63] uppercase bg-[#FFE5EC] px-3 py-1 rounded-full border border-[#FFC2D1]/40 mb-4">
                Statement Piece
              </span>
              <Link to={`/product/dress/${outfit.dress._id}`} className="block">
                <div className="relative w-full aspect-[3/4] rounded-2xl mb-4 overflow-hidden border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.03)] group-hover:scale-103 transition-transform duration-500">
                  <img src={outfit.dress.image} alt={outfit.dress.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                </div>
                <p className="font-black text-[15px] text-[#351C24] group-hover:text-[#FF2E63] transition-colors truncate">{outfit.dress.name}</p>
                <p className="text-[#FF2E63] font-black text-lg mt-1">${outfit.dress.price}</p>
              </Link>
            </div>

            {/* Necklace */}
            <div className="text-center group bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-4 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 shadow-sm">
              <span className="inline-block text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-100/50 mb-4">
                Necklace Accent
              </span>
              <Link to={`/product/jewellery/${outfit.necklace._id}`} className="block">
                <div className="relative w-full aspect-[3/4] rounded-2xl mb-4 overflow-hidden border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.03)] group-hover:scale-103 transition-transform duration-500">
                  <img src={outfit.necklace.image} alt={outfit.necklace.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                </div>
                <p className="font-black text-[15px] text-[#351C24] group-hover:text-[#FF2E63] transition-colors truncate">{outfit.necklace.name}</p>
                <p className="text-[#FF2E63] font-black text-lg mt-1">${outfit.necklace.price}</p>
              </Link>
            </div>

            {/* Earrings */}
            <div className="text-center group bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-4 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 shadow-sm">
              <span className="inline-block text-[10px] font-black tracking-widest text-purple-600 uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100/50 mb-4">
                Ear Statement
              </span>
              <Link to={`/product/jewellery/${outfit.earring._id}`} className="block">
                <div className="relative w-full aspect-[3/4] rounded-2xl mb-4 overflow-hidden border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.03)] group-hover:scale-103 transition-transform duration-500">
                  <img src={outfit.earring.image} alt={outfit.earring.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                </div>
                <p className="font-black text-[15px] text-[#351C24] group-hover:text-[#FF2E63] transition-colors truncate">{outfit.earring.name}</p>
                <p className="text-[#FF2E63] font-black text-lg mt-1">${outfit.earring.price}</p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 border-t border-[#FFC2D1]/60 pt-6 gap-4">
            <div>
              <p className="text-xs font-black uppercase text-[#8A606A] tracking-wider">Estimated Styling Cost</p>
              <p className="text-sm font-bold text-[#351C24] mt-0.5">Includes full attire set & accessories</p>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-[#351C24] font-black text-lg">Total Price: <span className="font-black text-3xl text-[#FF2E63]">${outfit.dress.price + outfit.necklace.price + outfit.earring.price}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Saved Outfits */}
      {savedOutfits.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-[28px] md:text-[32px] font-black text-[#351C24]">Saved Look Portfolios</h2>
            <span className="h-1 flex-1 bg-gradient-to-r from-[#FFC2D1] to-transparent rounded-full"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedOutfits.map((savedOutfit) => (
              <div key={savedOutfit._id} className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.06)] hover:shadow-[0_20px_40px_rgba(255,133,161,0.12)] hover:-translate-y-1.5 transition-all duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-lg text-[#351C24]">{savedOutfit.name}</h3>
                    {savedOutfit.mood && (
                      <span className="text-[9px] font-black text-[#FF2E63] bg-[#FFE5EC] px-2.5 py-0.5 rounded-md border border-[#FFC2D1]/40 uppercase tracking-widest mt-1.5 inline-block">
                        Vibe: {savedOutfit.mood}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-[#FFC2D1]/60">
                  {savedOutfit.dressId && (
                    <Link to={`/product/dress/${savedOutfit.dressId._id}`} className="group flex items-center space-x-3.5 bg-white/40 hover:bg-white p-2.5 rounded-2xl border border-transparent hover:border-[#FFC2D1]/40 transition-all duration-300">
                      <img src={savedOutfit.dressId.image} alt={savedOutfit.dressId.name} className="w-14 h-14 object-cover rounded-xl border border-white shadow-sm" />
                      <div className="min-w-0 flex-1">
                        <p className="font-black text-[13px] text-[#351C24] truncate group-hover:text-[#FF2E63] transition-colors">{savedOutfit.dressId.name}</p>
                        <p className="text-[#FF2E63] text-[12px] font-black mt-0.5">${savedOutfit.dressId.price}</p>
                      </div>
                    </Link>
                  )}
                  {savedOutfit.necklaceId && (
                    <Link to={`/product/jewellery/${savedOutfit.necklaceId._id}`} className="group flex items-center space-x-3.5 bg-white/40 hover:bg-white p-2.5 rounded-2xl border border-transparent hover:border-[#FFC2D1]/40 transition-all duration-300">
                      <img src={savedOutfit.necklaceId.image} alt={savedOutfit.necklaceId.name} className="w-14 h-14 object-cover rounded-xl border border-white shadow-sm" />
                      <div className="min-w-0 flex-1">
                        <p className="font-black text-[13px] text-[#351C24] truncate group-hover:text-[#FF2E63] transition-colors">{savedOutfit.necklaceId.name}</p>
                        <p className="text-[#FF2E63] text-[12px] font-black mt-0.5">${savedOutfit.necklaceId.price}</p>
                      </div>
                    </Link>
                  )}
                  {savedOutfit.earringId && (
                    <Link to={`/product/jewellery/${savedOutfit.earringId._id}`} className="group flex items-center space-x-3.5 bg-white/40 hover:bg-white p-2.5 rounded-2xl border border-transparent hover:border-[#FFC2D1]/40 transition-all duration-300">
                      <img src={savedOutfit.earringId.image} alt={savedOutfit.earringId.name} className="w-14 h-14 object-cover rounded-xl border border-white shadow-sm" />
                      <div className="min-w-0 flex-1">
                        <p className="font-black text-[13px] text-[#351C24] truncate group-hover:text-[#FF2E63] transition-colors">{savedOutfit.earringId.name}</p>
                        <p className="text-[#FF2E63] text-[12px] font-black mt-0.5">${savedOutfit.earringId.price}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitBuilder;
