/**
 * MatchMe Page Component
 * 
 * An interactive styling advisor that helps users find complementary jewellery (necklaces,
 * earrings, bracelets) for a selected dress. Can be pre-loaded with a specific dress ID
 * via URL query parameters (e.g. `?dress=123`). Communicates with backend endpoints to
 * fetch dress catalogs and recommendation sets.
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';

const MatchMe = () => {
  // Hook for reading URL query string search parameters
  const [searchParams] = useSearchParams();
  const dressId = searchParams.get('dress');

  // React state storing all available dresses in the catalogue
  const [dresses, setDresses] = useState([]);
  
  // React state storing the currently chosen dress object
  const [selectedDress, setSelectedDress] = useState(null);
  
  // React state storing matching items categorised into necklaces, earrings, and bracelets
  const [matchingJewellery, setMatchingJewellery] = useState({ necklaces: [], earrings: [], bracelets: [] });
  
  // React state indicating whether recommendations are actively being requested/loaded
  const [loading, setLoading] = useState(false);

  // Fetch full dress catalogue on mount and automatically select dress if ID is present in URL query
  useEffect(() => {
    fetchDresses();
    if (dressId) {
      fetchDressById(dressId);
    }
  }, []);

  /**
   * Fetches full dress catalog items from the database
   */
  const fetchDresses = async () => {
    try {
      const response = await api.get('/dresses');
      setDresses(response.data);
    } catch (error) {
      console.error('Error fetching dresses:', error);
    }
  };

  /**
   * Fetches details of a specific dress and its recommended matching jewellery
   */
  const fetchDressById = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/dresses/${id}`);
      setSelectedDress(response.data);
      await fetchMatchingJewellery(id);
    } catch (error) {
      console.error('Error fetching dress:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches corresponding matching jewellery categorisations based on dress attributes
   */
  const fetchMatchingJewellery = async (id) => {
    try {
      const response = await api.get(`/dresses/${id}/matching-jewellery`);
      setMatchingJewellery(response.data);
    } catch (error) {
      console.error('Error fetching matching jewellery:', error);
    }
  };

  /**
   * Callback fired when a user selects a dress from the listing grid
   */
  const handleDressSelect = async (dress) => {
    setSelectedDress(dress);
    await fetchMatchingJewellery(dress._id);
  };


  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#351C24] via-[#A9445D] to-[#D45D79] p-8 md:p-12 mb-12 shadow-[0_20px_50px_rgba(169,68,93,0.15)] text-white">
        <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#FF8DA1]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] left-[10%] w-[250px] h-[250px] bg-[#D45D79]/25 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/10 backdrop-blur-md text-[#FFE5EC] uppercase tracking-wider mb-4 border border-white/15">
            <i className="ti ti-sparkles text-[#FF8DA1] animate-pulse"></i> Intelligent Recommendations
          </span>
          <h1 className="text-[38px] md:text-[52px] font-black tracking-tight capitalize drop-shadow-md mb-2">Match Me</h1>
          <p className="text-[#FFE5EC]/90 font-medium max-w-xl text-[14px] md:text-[15px] opacity-90 leading-relaxed">
            Find the perfect jewellery combination for any selected dress. Our rule-based recommendation matching system suggests necklaces, earrings, and bracelets.
          </p>
        </div>
      </div>

      {/* Dress Selection Container */}
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.08)] mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-black text-[#351C24] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E63]"></span> Select a Dress
          </h2>
          <span className="text-xs font-black text-[#A9445D]/80 bg-[#FFE5EC] px-3 py-1 rounded-full uppercase tracking-wider border border-[#FFC2D1]/40">
            {dresses.length} Styles Loaded
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {dresses.map((dress) => {
            const isSelected = selectedDress?._id === dress._id;
            return (
              <div
                key={dress._id}
                onClick={() => handleDressSelect(dress)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 relative ${
                  isSelected 
                    ? 'border-[#FF2E63] scale-95 shadow-[0_8px_20px_rgba(255,46,99,0.25)] bg-[#FFE5EC]/30' 
                    : 'border-white/40 hover:border-[#FF85A1] hover:scale-102 bg-white/40'
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img src={dress.image} alt={dress.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#FF2E63]/10 flex items-center justify-center">
                      <span className="bg-[#FF2E63] text-white rounded-full p-1.5 shadow-md">
                        <i className="ti ti-check text-xs"></i>
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[12px] font-black text-[#351C24] truncate group-hover:text-[#FF2E63] transition-colors">{dress.name}</p>
                  <p className="text-[11px] font-bold text-[#FF2E63] mt-0.5">${dress.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF2E63]"></div>
        </div>
      ) : selectedDress ? (
        <div>
          {/* Selected Dress Presentation */}
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.08)] mb-10">
            <div className="flex flex-col md:flex-row items-stretch gap-8">
              {/* Left Column: Image */}
              <div className="w-full md:w-1/3 max-w-[280px] self-center md:self-auto">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.05)] bg-white">
                  <img src={selectedDress.image} alt={selectedDress.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-sm font-black text-[#FF2E63] shadow-md border border-[#FFC2D1]/40">
                    ${selectedDress.price}
                  </span>
                </div>
              </div>
              
              {/* Right Column: Spec / Details */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black tracking-widest text-[#FF2E63] uppercase bg-[#FFE5EC] px-3 py-1 rounded-full border border-[#FFC2D1]/40">
                      {selectedDress.category} Occasion
                    </span>
                    <span className="text-[10px] font-black tracking-widest text-[#A9445D] uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      Primary Color: {selectedDress.color}
                    </span>
                  </div>
                  <h3 className="text-[28px] md:text-[34px] font-black text-[#351C24] leading-tight mb-4">{selectedDress.name}</h3>
                  <p className="text-[#8A606A] text-[14px] leading-relaxed mb-6 font-medium">
                    {selectedDress.description || "Indulge in absolute luxury. A perfect synthesis of comfort, fashion, and contemporary style. Designed to make a subtle but powerful impression wherever you go."}
                  </p>
                </div>
                
                {/* Match Indicator Info Box */}
                <div className="bg-gradient-to-r from-[#FFE5EC] to-[#FFF0F2] border border-[#FFC2D1]/50 rounded-2xl p-5 flex items-start gap-4">
                  <div className="bg-[#FF2E63] text-white rounded-full p-2.5 shadow-md flex items-center justify-center self-center">
                    <i className="ti ti-activity text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#351C24]">AI Recommendation Logic Active</h4>
                    <p className="text-xs text-[#8A606A] font-bold mt-0.5 leading-relaxed">
                      We have matched jewellery items that harmonize with the color tone <strong className="text-[#FF2E63] font-black">{selectedDress.color}</strong> and complement the <strong className="text-[#A9445D] font-black">{selectedDress.category}</strong> styling of your dress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matching Jewellery columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Necklaces */}
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.08)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-[#FFC2D1]/60 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E63]"></span>
                  <h3 className="text-[18px] font-black text-[#351C24]">Matching Necklaces</h3>
                </div>
                <div className="space-y-4">
                  {matchingJewellery.necklaces.length === 0 ? (
                    <p className="text-[#8A606A] text-sm text-center py-8 font-bold">No matching necklaces found</p>
                  ) : (
                    matchingJewellery.necklaces.map((item) => (
                      <Link
                        key={item._id}
                        to={`/product/jewellery/${item._id}`}
                        className="group flex items-center space-x-4 p-3 rounded-2xl bg-white/40 hover:bg-white border border-transparent hover:border-[#FFC2D1]/60 transition-all duration-300 shadow-sm"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-white">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-black text-[13px] text-[#351C24] truncate group-hover:text-[#FF2E63] transition-colors">{item.name}</p>
                          <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/50 w-max mt-1">{item.color}</p>
                          <p className="text-[#FF2E63] font-black text-sm mt-1">${item.price}</p>
                        </div>
                        <span className="text-[#A9445D] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <i className="ti ti-chevron-right font-black"></i>
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Earrings */}
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.08)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-[#FFC2D1]/60 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <h3 className="text-[18px] font-black text-[#351C24]">Matching Earrings</h3>
                </div>
                <div className="space-y-4">
                  {matchingJewellery.earrings.length === 0 ? (
                    <p className="text-[#8A606A] text-sm text-center py-8 font-bold">No matching earrings found</p>
                  ) : (
                    matchingJewellery.earrings.map((item) => (
                      <Link
                        key={item._id}
                        to={`/product/jewellery/${item._id}`}
                        className="group flex items-center space-x-4 p-3 rounded-2xl bg-white/40 hover:bg-white border border-transparent hover:border-[#FFC2D1]/60 transition-all duration-300 shadow-sm"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-white">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-black text-[13px] text-[#351C24] truncate group-hover:text-[#FF2E63] transition-colors">{item.name}</p>
                          <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/50 w-max mt-1">{item.color}</p>
                          <p className="text-[#FF2E63] font-black text-sm mt-1">${item.price}</p>
                        </div>
                        <span className="text-[#A9445D] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <i className="ti ti-chevron-right font-black"></i>
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.08)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-[#FFC2D1]/60 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h3 className="text-[18px] font-black text-[#351C24]">Bracelets & Accessories</h3>
                </div>
                <div className="space-y-4">
                  {matchingJewellery.bracelets.length === 0 ? (
                    <p className="text-[#8A606A] text-sm text-center py-8 font-bold">No matching accessories found</p>
                  ) : (
                    matchingJewellery.bracelets.map((item) => (
                      <Link
                        key={item._id}
                        to={`/product/jewellery/${item._id}`}
                        className="group flex items-center space-x-4 p-3 rounded-2xl bg-white/40 hover:bg-white border border-transparent hover:border-[#FFC2D1]/60 transition-all duration-300 shadow-sm"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-white">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-black text-[13px] text-[#351C24] truncate group-hover:text-[#FF2E63] transition-colors">{item.name}</p>
                          <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/50 w-max mt-1">{item.color}</p>
                          <p className="text-[#FF2E63] font-black text-sm mt-1">${item.price}</p>
                        </div>
                        <span className="text-[#A9445D] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <i className="ti ti-chevron-right font-black"></i>
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-md border border-[#FFC2D1]/60 rounded-3xl text-center py-20 text-[#8A606A] font-bold shadow-md">
          <div className="text-4xl mb-3">👗 ✨ 💍</div>
          Select a dress from the catalog above to automatically calculate and show matching jewellery recommendations.
        </div>
      )}
    </div>
  );
};

export default MatchMe;
