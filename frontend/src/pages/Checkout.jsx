import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders', { shippingDetails });
      alert('Order placed successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-8 py-16 text-center animate-fadeIn flex-1">
        <h1 className="text-[32px] font-black text-[#4A0E17] mb-6">Checkout</h1>
        <p className="text-[#7D3E4D] font-bold mb-6">Please login to proceed with checkout.</p>
        <Link to="/login" className="bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold px-8 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(255,46,99,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(255,46,99,0.45)] transition-all duration-300 inline-block">
          Login to Account
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      <div className="mb-8 flex items-center gap-3">
        <i className="ti ti-sparkles text-[#FF2E63] text-2xl animate-pulse"></i>
        <h1 className="text-[36px] font-extrabold text-[#4A0E17] tracking-tight">Checkout</h1>
      </div>

      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-[#FFC2D1] shadow-[0_20px_50px_rgba(255,46,99,0.08)]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[13px] font-bold text-[#601A2E] mb-2 tracking-wide uppercase">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={shippingDetails.name}
              onChange={handleChange}
              className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 bg-white font-semibold text-[#4A0E17] text-[14px] focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#601A2E] mb-2 tracking-wide uppercase">Address</label>
            <input
              type="text"
              name="address"
              required
              value={shippingDetails.address}
              onChange={handleChange}
              className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 bg-white font-semibold text-[#4A0E17] text-[14px] focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#601A2E] mb-2 tracking-wide uppercase">City</label>
            <input
              type="text"
              name="city"
              required
              value={shippingDetails.city}
              onChange={handleChange}
              className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 bg-white font-semibold text-[#4A0E17] text-[14px] focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#601A2E] mb-2 tracking-wide uppercase">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={shippingDetails.phone}
              onChange={handleChange}
              className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3 bg-white font-semibold text-[#4A0E17] text-[14px] focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold py-[16px] rounded-xl hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,46,99,0.35)] transition-all duration-300 shadow-md disabled:opacity-50"
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

          <p className="text-sm text-[#7D3E4D] text-center font-semibold">
            Note: This is a demo project. No actual payment will be processed.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
