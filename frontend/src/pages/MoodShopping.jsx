import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const MoodShopping = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [dresses, setDresses] = useState([]);
  const [jewellery, setJewellery] = useState([]);
  const [loading, setLoading] = useState(false);

  const moods = ['Casual', 'Party', 'Wedding', 'Formal', 'Traditional'];

  const moodColors = {
    'Casual': 'from-[#FFE5EC] to-[#FFF0F2] text-[#351C24] border-[#FFC2D1]/60 hover:border-[#FF2E63] hover:shadow-[0_8px_20px_rgba(255,46,99,0.06)]',
    'Party': 'from-[#FF2E63] to-[#FF6B8B] text-white border-transparent hover:shadow-[0_8px_25px_rgba(255,46,99,0.25)] hover:scale-105',
    'Wedding': 'from-[#4A0E17] to-[#800020] text-white border-transparent hover:shadow-[0_8px_25px_rgba(74,14,23,0.25)] hover:scale-105',
    'Formal': 'from-[#351C24] to-[#601A2E] text-white border-transparent hover:shadow-[0_8px_25px_rgba(53,28,36,0.25)] hover:scale-105',
    'Traditional': 'from-amber-600 to-[#A9445D] text-white border-transparent hover:shadow-[0_8px_25px_rgba(217,119,6,0.25)] hover:scale-105'
  };

  const moodEmojis = {
    'Casual': '🏡',
    'Party': '🎉',
    'Wedding': '👑',
    'Formal': '💼',
    'Traditional': '🌸'
  };

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setLoading(true);
    try {
      const dressesRes = await api.get('/dresses', { params: { category: mood } });
      const jewelleryRes = await api.get('/jewellery');
      setDresses(dressesRes.data);
      setJewellery(jewelleryRes.data);
    } catch (error) {
      console.error('Error fetching mood products:', error);
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
            <i className="ti ti-sparkles text-[#FF8DA1] animate-pulse"></i> Personalized Styling
          </span>
          <h1 className="text-[38px] md:text-[52px] font-black tracking-tight capitalize drop-shadow-md mb-2">Mood Shopping</h1>
          <p className="text-[#FFE5EC]/90 font-medium max-w-xl text-[14px] md:text-[15px] opacity-90 leading-relaxed">
            Shop clothing and jewellery collections curated according to your occasion and vibe. Find the perfect aesthetic for every event.
          </p>
        </div>
      </div>

      {/* Mood Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood;
          return (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className={`bg-gradient-to-r ${moodColors[mood]} border p-6 rounded-3xl transition-all duration-500 transform flex flex-col items-center justify-center relative overflow-hidden ${
                isSelected 
                  ? 'ring-4 ring-[#FF2E63]/25 scale-95 shadow-inner' 
                  : 'hover:-translate-y-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.02)]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 text-[10px] font-black text-white bg-white/20 px-2.5 py-0.5 rounded-md">
                  Active
                </div>
              )}
              <div className="text-4xl mb-3 transform transition-transform duration-300">{moodEmojis[mood]}</div>
              <div className="font-black text-sm tracking-widest uppercase">{mood}</div>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF2E63]"></div>
        </div>
      ) : selectedMood ? (
        <div>
          <div className="flex items-center gap-3 mb-10 mt-6">
            <h2 className="text-[28px] md:text-[34px] font-black text-[#351C24] capitalize">{selectedMood} Selection</h2>
            <span className="h-1.5 flex-1 bg-gradient-to-r from-[#FFC2D1] to-transparent rounded-full"></span>
          </div>

          {/* Dresses */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6 border-b border-[#FFC2D1]/60 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E63]"></span>
              <h3 className="text-[20px] font-black text-[#351C24]">Dresses for this Mood</h3>
            </div>
            {dresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {dresses.map((dress) => (
                  <Link
                    key={dress._id}
                    to={`/product/dress/${dress._id}`}
                    className="group relative flex flex-col bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-3 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,133,161,0.14)]"
                  >
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.02)] mb-4 border border-white/20">
                      <img src={dress.image} alt={dress.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                      <div className="absolute top-3 right-3 z-10">
                        <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#A9445D] flex items-center justify-center shadow-md hover:bg-[#FF2E63] hover:text-white transition-all duration-300 transform active:scale-90">
                          <i className="ti ti-heart text-[15px]"></i>
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md border border-white/30 text-[#351C24] font-black text-sm px-3.5 py-1.5 rounded-xl shadow-md">
                        ${dress.price}
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h4 className="text-[14px] font-black text-[#351C24] group-hover:text-[#FF2E63] transition-colors duration-200 truncate leading-snug">{dress.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[10px] font-black tracking-widest text-[#FF2E63]/80 uppercase bg-[#FFE5EC] px-2 py-0.5 rounded-md">
                          {dress.category}
                        </span>
                        <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                          {dress.color}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-[#7D3E4D] font-bold">No dresses found for this mood.</p>
            )}
          </div>

          {/* Jewellery */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6 border-b border-[#FFC2D1]/60 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h3 className="text-[20px] font-black text-[#351C24]">Complementary Jewellery</h3>
            </div>
            {jewellery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {jewellery.slice(0, 8).map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/jewellery/${item._id}`}
                    className="group relative flex flex-col bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-3 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,133,161,0.14)]"
                  >
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.02)] mb-4 border border-white/20">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                      <div className="absolute top-3 right-3 z-10">
                        <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#A9445D] flex items-center justify-center shadow-md hover:bg-[#FF2E63] hover:text-white transition-all duration-300 transform active:scale-90">
                          <i className="ti ti-heart text-[15px]"></i>
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md border border-white/30 text-[#351C24] font-black text-sm px-3.5 py-1.5 rounded-xl shadow-md">
                        ${item.price}
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h4 className="text-[14px] font-black text-[#351C24] group-hover:text-[#FF2E63] transition-colors duration-200 truncate leading-snug">{item.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[10px] font-black tracking-widest text-[#FF2E63]/80 uppercase bg-[#FFE5EC] px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                          {item.color}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-[#7D3E4D] font-bold">No jewellery found.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-md border border-[#FFC2D1] rounded-3xl text-center py-16 text-[#7D3E4D] font-bold shadow-md">
          Select an occasion or mood from the panel above to view our curated collection.
        </div>
      )}
    </div>
  );
};

export default MoodShopping;
