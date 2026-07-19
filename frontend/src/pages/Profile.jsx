import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-8 py-16 text-center animate-fadeIn flex-1">
        <h1 className="text-[32px] font-black text-[#4A0E17] mb-6">User Profile</h1>
        <p className="text-[#7D3E4D] font-bold mb-6">Please login to view your personal dashboard and order history.</p>
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
        <h1 className="text-[36px] font-extrabold text-[#4A0E17] tracking-tight">My Profile</h1>
      </div>

      {/* User Info */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.04)] mb-8">
        <h2 className="text-[18px] font-extrabold text-[#4A0E17] mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="text-[#7D3E4D] font-bold w-20">Name:</span>
            <span className="font-bold text-[#4A0E17]">{user.name}</span>
          </div>
          <div className="flex items-center">
            <span className="text-[#7D3E4D] font-bold w-20">Email:</span>
            <span className="font-bold text-[#4A0E17]">{user.email}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-6 bg-[#4A0E17] hover:bg-[#601A2E] text-white px-6 py-3 rounded-xl font-bold hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Order History */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.04)]">
        <h2 className="text-[18px] font-extrabold text-[#4A0E17] mb-4">Order History</h2>
        {loading ? (
          <p className="text-[#7D3E4D] py-4 font-bold">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-[#7D3E4D] py-4 font-bold">No orders placed yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border border-[#FFC2D1] rounded-2xl p-5 bg-white/40">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-[#FFC2D1]/40">
                  <div>
                    <p className="font-extrabold text-[#4A0E17]">Order #{order._id.slice(-8)}</p>
                    <p className="text-sm text-[#7D3E4D] font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5">
                    <p className="font-black text-[#FF2E63] text-[18px]">${order.totalAmount.toFixed(2)}</p>
                    <span className={`text-[12px] font-bold px-3 py-1 rounded-full border ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-green-100 text-green-800 border-green-200'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-[#7D3E4D] font-bold">{item.productType} x {item.quantity}</span>
                      <span className="text-[#4A0E17] font-bold">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
