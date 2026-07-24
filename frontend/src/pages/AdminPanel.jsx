import React, { useState } from 'react';
import api from '../utils/api';

const AdminPanel = () => {
  // Authentication states
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active form tab: 'dress' or 'jewellery'
  const [activeTab, setActiveTab] = useState('dress');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Dress Form State
  const [dressForm, setDressForm] = useState({
    name: '',
    category: 'Casual',
    color: 'Red',
    price: '',
    image: '',
    description: ''
  });

  // Jewellery Form State
  const [jewelleryForm, setJewelleryForm] = useState({
    name: '',
    category: 'Necklace',
    color: 'Gold',
    price: '',
    image: '',
    description: ''
  });

  // Sample image options to quickly auto-fill during live demonstration
  const sampleImages = {
    dress: [
      { label: 'Sample Evening Gown', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&fit=crop' },
      { label: 'Sample Floral Dress', url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&fit=crop' },
      { label: 'Sample Elegant Sari', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&fit=crop' }
    ],
    jewellery: [
      { label: 'Sample Gold Necklace', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&fit=crop' },
      { label: 'Sample Silver Earrings', url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&fit=crop' },
      { label: 'Sample Diamond Bracelet', url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&fit=crop' }
    ]
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthorized(true);
      setAuthError('');
      setMessage({ type: '', text: '' });
    } else {
      setAuthError('Incorrect passcode! Please try again.');
    }
  };

  const handleDressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        ...dressForm,
        price: parseFloat(dressForm.price)
      };

      await api.post('/dresses', payload);
      setMessage({ type: 'success', text: `Dress "${dressForm.name}" successfully added to the database!` });
      // Reset form
      setDressForm({
        name: '',
        category: 'Casual',
        color: 'Red',
        price: '',
        image: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding dress:', error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to insert dress into database.' });
    } finally {
      setLoading(false);
    }
  };

  const handleJewellerySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        ...jewelleryForm,
        price: parseFloat(jewelleryForm.price)
      };

      await api.post('/jewellery', payload);
      setMessage({ type: 'success', text: `Jewellery "${jewelleryForm.name}" successfully added to the database!` });
      // Reset form
      setJewelleryForm({
        name: '',
        category: 'Necklace',
        color: 'Gold',
        price: '',
        image: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding jewellery:', error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to insert jewellery into database.' });
    } finally {
      setLoading(false);
    }
  };

  // Lockscreen Challenge
  if (!isAuthorized) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-8 py-24 flex items-center justify-center flex-1">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#FFC2D1] p-8 max-w-md w-full shadow-[0_20px_50px_rgba(255,46,99,0.08)]">
          <div className="text-center mb-6">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFE5EC] text-[#FF2E63] mb-4">
              <i className="ti ti-lock text-3xl"></i>
            </span>
            <h1 className="text-2xl font-extrabold text-[#4A0E17]">Developer Admin Panel</h1>
            <p className="text-sm text-[#7D3E4D] font-semibold mt-1">Please enter the security passcode to access database tools.</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode..."
                className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17]"
              />
            </div>
            {authError && (
              <p className="text-xs text-red-500 font-bold bg-red-50 p-2.5 rounded-lg border border-red-100">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white font-bold rounded-xl shadow-md hover:shadow-[0_8px_20px_rgba(255,46,99,0.2)] transition-all"
            >
              Verify Passcode
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <i className="ti ti-database text-[#FF2E63] text-2xl"></i>
            <h1 className="text-[32px] font-extrabold text-[#4A0E17] tracking-tight">Database Admin Console</h1>
          </div>
          <p className="text-[#7D3E4D] font-semibold mt-1">Directly insert dresses and jewellery items into the active database in real-time.</p>
        </div>
        <button
          onClick={() => setIsAuthorized(false)}
          className="px-5 py-2.5 bg-white border border-[#FFC2D1] text-[#7D3E4D] font-bold rounded-xl text-xs hover:border-[#FF2E63] hover:text-[#FF2E63] transition-colors self-start md:self-auto"
        >
          🔒 Lock Console
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#FFC2D1] mb-8 space-x-6">
        <button
          onClick={() => {
            setActiveTab('dress');
            setMessage({ type: '', text: '' });
          }}
          className={`pb-4 text-[15px] font-black transition-all duration-300 ${
            activeTab === 'dress'
              ? 'text-[#FF2E63] border-b-2 border-[#FF2E63]'
              : 'text-[#7D3E4D] hover:text-[#FF2E63]'
          }`}
        >
          👗 Add New Dress
        </button>
        <button
          onClick={() => {
            setActiveTab('jewellery');
            setMessage({ type: '', text: '' });
          }}
          className={`pb-4 text-[15px] font-black transition-all duration-300 ${
            activeTab === 'jewellery'
              ? 'text-[#FF2E63] border-b-2 border-[#FF2E63]'
              : 'text-[#7D3E4D] hover:text-[#FF2E63]'
          }`}
        >
          💎 Add New Jewellery
        </button>
      </div>

      {/* Status Notifications */}
      {message.text && (
        <div
          className={`p-4 rounded-2xl border mb-8 text-sm font-bold flex items-center gap-2.5 ${
            message.type === 'success'
              ? 'bg-[#EBFDF5] text-[#047857] border-[#A7F3D0]'
              : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]'
          }`}
        >
          <i className={`ti ${message.type === 'success' ? 'ti-circle-check-filled text-lg' : 'ti-alert-circle-filled text-lg'}`}></i>
          {message.text}
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#FFC2D1] shadow-[0_20px_50px_rgba(255,46,99,0.05)] overflow-hidden p-8 max-w-3xl">
        {activeTab === 'dress' ? (
          <form onSubmit={handleDressSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dress Name */}
              <div>
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Dress Name</label>
                <input
                  type="text"
                  required
                  value={dressForm.name}
                  onChange={(e) => setDressForm({ ...dressForm, name: e.target.value })}
                  placeholder="e.g. Sapphire Blue Silk Maxi"
                  className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17] bg-white"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Price ($)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={dressForm.price}
                  onChange={(e) => setDressForm({ ...dressForm, price: e.target.value })}
                  placeholder="e.g. 199"
                  className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17] bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Category (Occasion)</label>
                <select
                  value={dressForm.category}
                  onChange={(e) => setDressForm({ ...dressForm, category: e.target.value })}
                  className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-black text-sm text-[#4A0E17] bg-white"
                >
                  <option value="Casual">Casual</option>
                  <option value="Party">Party</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Formal">Formal</option>
                  <option value="Traditional">Traditional</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Primary Color</label>
                <select
                  value={dressForm.color}
                  onChange={(e) => setDressForm({ ...dressForm, color: e.target.value })}
                  className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-black text-sm text-[#4A0E17] bg-white"
                >
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Green">Green</option>
                  <option value="Pink">Pink</option>
                  <option value="Purple">Purple</option>
                  <option value="Orange">Orange</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider">Product Image URL</label>
                <div className="flex gap-2">
                  <span className="text-[10px] text-[#7D3E4D] font-bold self-center">Auto-fill mock:</span>
                  {sampleImages.dress.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDressForm({ ...dressForm, image: sample.url })}
                      className="px-2 py-0.5 bg-[#FFE5EC] border border-[#FFC2D1] rounded-md text-[9px] font-black text-[#FF2E63] hover:bg-[#FF2E63] hover:text-white transition-colors"
                    >
                      Fill {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="url"
                required
                value={dressForm.image}
                onChange={(e) => setDressForm({ ...dressForm, image: e.target.value })}
                placeholder="https://example.com/dress.jpg"
                className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17] bg-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Description</label>
              <textarea
                required
                rows="3"
                value={dressForm.description}
                onChange={(e) => setDressForm({ ...dressForm, description: e.target.value })}
                placeholder="Explain the item's design features, materials, and styling suggestions..."
                className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17] bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white font-bold rounded-xl shadow-lg hover:shadow-[0_8px_20px_rgba(255,46,99,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <i className="ti ti-plus font-bold"></i> Add Dress to Database
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleJewellerySubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jewellery Name */}
              <div>
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Jewellery Name</label>
                <input
                  type="text"
                  required
                  value={jewelleryForm.name}
                  onChange={(e) => setJewelleryForm({ ...jewelleryForm, name: e.target.value })}
                  placeholder="e.g. Royal Diamond Drops"
                  className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17] bg-white"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Price ($)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={jewelleryForm.price}
                  onChange={(e) => setJewelleryForm({ ...jewelleryForm, price: e.target.value })}
                  placeholder="e.g. 149"
                  className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17] bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Category (Type)</label>
                <select
                  value={jewelleryForm.category}
                  onChange={(e) => setJewelleryForm({ ...jewelleryForm, category: e.target.value })}
                  className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-black text-sm text-[#4A0E17] bg-white"
                >
                  <option value="Necklace">Necklace</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Bracelet">Bracelet</option>
                  <option value="Ring">Ring</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Color Tone</label>
                <select
                  value={jewelleryForm.color}
                  onChange={(e) => setJewelleryForm({ ...jewelleryForm, color: e.target.value })}
                  className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-black text-sm text-[#4A0E17] bg-white"
                >
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Rose Gold">Rose Gold</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider">Product Image URL</label>
                <div className="flex gap-2">
                  <span className="text-[10px] text-[#7D3E4D] font-bold self-center">Auto-fill mock:</span>
                  {sampleImages.jewellery.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setJewelleryForm({ ...jewelleryForm, image: sample.url })}
                      className="px-2 py-0.5 bg-[#FFE5EC] border border-[#FFC2D1] rounded-md text-[9px] font-black text-[#FF2E63] hover:bg-[#FF2E63] hover:text-white transition-colors"
                    >
                      Fill {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="url"
                required
                value={jewelleryForm.image}
                onChange={(e) => setJewelleryForm({ ...jewelleryForm, image: e.target.value })}
                placeholder="https://example.com/jewellery.jpg"
                className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17] bg-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-black text-[#4A0E17] uppercase tracking-wider mb-2">Description</label>
              <textarea
                required
                rows="3"
                value={jewelleryForm.description}
                onChange={(e) => setJewelleryForm({ ...jewelleryForm, description: e.target.value })}
                placeholder="Explain the item's design features, materials, and styling suggestions..."
                className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 font-semibold text-sm text-[#4A0E17] bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white font-bold rounded-xl shadow-lg hover:shadow-[0_8px_20px_rgba(255,46,99,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <i className="ti ti-plus font-bold"></i> Add Jewellery to Database
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
