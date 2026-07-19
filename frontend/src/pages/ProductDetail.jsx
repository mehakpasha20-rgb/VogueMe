import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { type, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [type, id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const endpoint = type === 'dress' ? '/dresses' : '/jewellery';
      const response = await api.get(`${endpoint}/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      await api.post('/cart', {
        productId: product._id,
        productType: type === 'dress' ? 'Dress' : 'Jewellery',
        quantity: 1
      });
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const addToWishlist = async () => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    try {
      await api.post('/wishlist', {
        productId: product._id,
        productType: type === 'dress' ? 'Dress' : 'Jewellery'
      });
      alert('Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#FFC2D1] shadow-[0_20px_50px_rgba(255,46,99,0.08)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 lg:p-12">
          <div>
            <div className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-[0_15px_35px_rgba(255,74,122,0.12)] flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2E63]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <i className="ti ti-sparkles text-[#FF2E63] text-sm animate-pulse"></i>
              <span className="text-[12px] font-bold tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B]">AI RECOMMENDED</span>
            </div>
            
            <h1 className="text-[32px] font-black text-[#4A0E17] mb-4 leading-tight">{product.name}</h1>
            <p className="text-[#7D3E4D] mb-6 leading-relaxed text-[15px] font-medium">{product.description || 'Beautiful fashion item'}</p>
            
            <div className="mb-4 text-[14px]">
              <span className="text-[#7D3E4D] font-bold">Category:</span>
              <span className="ml-2 font-bold text-[#4A0E17]">{product.category}</span>
            </div>
            <div className="mb-6 text-[14px]">
              <span className="text-[#7D3E4D] font-bold">Color:</span>
              <span className="ml-2 font-bold text-[#4A0E17]">{product.color}</span>
            </div>
            
            <p className="text-[36px] font-black text-[#FF2E63] mb-8">${product.price}</p>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={addToCart}
                className="flex-1 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold py-[16px] px-[24px] rounded-xl shadow-[0_8px_25px_rgba(255,46,99,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,46,99,0.45)] transition-all duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                Add to Cart
              </button>
              <button
                onClick={addToWishlist}
                className="w-[52px] h-[52px] bg-white border border-[#FFC2D1] rounded-xl flex items-center justify-center text-[#7D3E4D] hover:text-[#FF2E63] hover:bg-[#FFE5EC] hover:border-[#FF2E63] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <i className="ti ti-heart text-[20px]"></i>
              </button>
            </div>

            {type === 'dress' && (
              <Link
                to={`/match-me?dress=${product._id}`}
                className="block w-full bg-gradient-to-r from-[#4A0E17] to-[#7D3E4D] text-white text-[14px] font-bold py-[16px] rounded-xl shadow-[0_8px_25px_rgba(74,14,23,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(74,14,23,0.35)] transition-all text-center duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                Find Matching Jewellery
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
