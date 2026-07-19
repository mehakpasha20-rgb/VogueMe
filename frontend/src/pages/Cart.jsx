import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await api.put(`/cart/${itemId}`, { quantity: newQuantity });
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.productId?.price || 0) * item.quantity;
  }, 0);

  if (!user) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-8 py-16 text-center animate-fadeIn flex-1">
        <h1 className="text-[32px] font-black text-[#4A0E17] mb-6">Shopping Cart</h1>
        <p className="text-[#7D3E4D] font-bold mb-6">Please login to view and checkout your shopping cart.</p>
        <Link to="/login" className="bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold px-8 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(255,46,99,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(255,46,99,0.45)] transition-all duration-300 inline-block">
          Login to Account
        </Link>
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
      <div className="mb-8 flex items-center gap-3">
        <i className="ti ti-sparkles text-[#FF2E63] text-2xl animate-pulse"></i>
        <h1 className="text-[36px] font-extrabold text-[#4A0E17] tracking-tight">Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm border border-[#FFC2D1] rounded-2xl text-center py-16 shadow-sm">
          <p className="text-[#7D3E4D] font-bold mb-6">Your shopping cart is empty</p>
          <Link to="/products/dresses" className="bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold px-8 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(255,46,99,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(255,46,99,0.45)] transition-all duration-300 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.04)] flex flex-col sm:flex-row items-center gap-4 sm:space-x-4">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-sm"
                />
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <h3 className="font-bold text-[#4A0E17] text-lg truncate">{item.productId?.name}</h3>
                  <p className="text-sm text-[#7D3E4D] font-medium">{item.productType}</p>
                  <p className="text-[#FF2E63] font-black text-lg mt-1">${item.productId?.price}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-8 h-8 bg-[#FFE5EC] text-[#FF2E63] rounded-xl flex items-center justify-center hover:bg-[#FFC2D1] font-black transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-[#4A0E17] font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-8 h-8 bg-[#FFE5EC] text-[#FF2E63] rounded-xl flex items-center justify-center hover:bg-[#FFC2D1] font-black transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-[#FF2E63] hover:text-[#4A0E17] p-2 transition-colors"
                >
                  <i className="ti ti-trash text-[22px]"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.04)] h-fit">
            <h2 className="text-[18px] font-extrabold text-[#4A0E17] mb-4 pb-2 border-b border-[#FFC2D1]/40">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[#7D3E4D] font-bold">
                <span>Subtotal</span>
                <span className="text-[#4A0E17]">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#7D3E4D] font-bold">
                <span>Shipping</span>
                <span className="text-[#4A0E17]">Free</span>
              </div>
              <div className="border-t border-[#FFC2D1] pt-3 flex justify-between font-extrabold text-lg">
                <span className="text-[#4A0E17]">Total</span>
                <span className="text-[#FF2E63] text-[22px] font-black">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold py-[14px] rounded-xl hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,46,99,0.35)] transition-all duration-300 shadow-md"
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
