import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ProductListing = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredNew, setFeaturedNew] = useState([]);
  const [featuredTrending, setFeaturedTrending] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    color: '',
    sort: ''
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    try {
      await api.post('/cart', {
        productId: product._id,
        productType: type === 'dresses' ? 'Dress' : 'Jewellery',
        quantity: 1
      });
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const handleToggleWishlist = async (product) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      navigate('/login');
      return;
    }
    try {
      await api.post('/wishlist', {
        productId: product._id,
        productType: type === 'dresses' ? 'Dress' : 'Jewellery'
      });
      navigate('/wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
    }
  };

  const handleBuyNow = async (product) => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }
    try {
      await api.post('/cart', {
        productId: product._id,
        productType: type === 'dresses' ? 'Dress' : 'Jewellery',
        quantity: 1
      });
      navigate('/cart');
    } catch (error) {
      console.error('Error in Buy Now checkout:', error);
      alert('Failed to proceed to buy now');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [type, filters]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [type]);

  const fetchFeaturedProducts = async () => {
    try {
      const endpoint = type === 'dresses' ? '/dresses' : '/jewellery';
      const response = await api.get(endpoint);
      const allProducts = response.data || [];
      setFeaturedNew(allProducts.slice(0, 4));
      setFeaturedTrending(allProducts.slice(4, 8));
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const endpoint = type === 'dresses' ? '/dresses' : '/jewellery';
      const response = await api.get(endpoint, { params: filters });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = type === 'dresses' 
    ? ['Casual', 'Party', 'Wedding', 'Formal', 'Traditional']
    : ['Necklace', 'Earrings', 'Bracelet', 'Ring'];

  const colors = ['Red', 'Blue', 'Black', 'White', 'Gold', 'Silver', 'Rose Gold', 'Green', 'Pink'];

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#351C24] via-[#A9445D] to-[#D45D79] p-8 md:p-12 mb-12 shadow-[0_20px_50px_rgba(169,68,93,0.15)] text-white">
        {/* Floating circles decoration */}
        <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#FF8DA1]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] left-[10%] w-[250px] h-[250px] bg-[#D45D79]/25 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/10 backdrop-blur-md text-[#FFE5EC] uppercase tracking-wider mb-4 border border-white/15">
              <i className="ti ti-sparkles text-[#FF8DA1] animate-pulse"></i> Curated Collection
            </span>
            <h1 className="text-[38px] md:text-[52px] font-black tracking-tight capitalize drop-shadow-md mb-2">{type}</h1>
            <p className="text-[#FFE5EC]/90 font-medium max-w-xl text-[14px] md:text-[15px] opacity-90 leading-relaxed">
              Indulge in our exquisite selection of {type}, crafted for those who value superior style, premium fabrics, and unmatched aesthetic charm.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 text-center shadow-lg self-start md:self-auto min-w-[140px] border-b-4 border-b-[#FF8DA1]/40">
            <div className="text-[32px] md:text-[40px] font-black text-white leading-none">{products.length}</div>
            <div className="text-[10px] font-extrabold text-[#FF8DA1] uppercase tracking-widest mt-1.5">Styles Available</div>
          </div>
        </div>
      </div>

      {/* Featured Sections for Dresses/Jewellery */}
      {featuredNew.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[24px] md:text-[28px] font-black text-[#351C24] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E63]"></span> New Arrivals in {type === 'dresses' ? 'Dresses' : 'Jewellery'}
            </h2>
            <span className="h-0.5 flex-1 bg-gradient-to-r from-[#FFC2D1] to-transparent rounded-full"></span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredNew.map((product) => (
              <div
                key={product._id}
                className="group relative flex flex-col bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-3 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,133,161,0.14)]"
              >
                <Link to={`/product/${type === 'dresses' ? 'dress' : 'jewellery'}/${product._id}`} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.02)] mb-4 border border-white/20 block">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                  <div className="absolute top-3 left-3 bg-[#FF2E63] text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                    New
                  </div>
                  <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md border border-white/30 text-[#351C24] font-black text-sm px-3.5 py-1.5 rounded-xl shadow-md">
                    ${product.price}
                  </div>
                </Link>
                <div className="px-2 pb-2 flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${type === 'dresses' ? 'dress' : 'jewellery'}/${product._id}`}>
                      <h3 className="text-[14px] font-black text-[#351C24] group-hover:text-[#FF2E63] transition-colors duration-200 truncate leading-snug mb-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1.5 mb-4">
                      <span className="text-[10px] font-black tracking-widest text-[#FF2E63]/80 uppercase bg-[#FFE5EC] px-2 py-0.5 rounded-md">{product.category}</span>
                      <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">{product.color}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#FFC2D1]/20">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[11px] font-black py-2.5 px-3 rounded-xl shadow-[0_4px_12px_rgba(255,46,99,0.2)] hover:shadow-[0_6px_16px_rgba(255,46,99,0.3)] transition-all duration-300 active:scale-95 uppercase tracking-wider text-center"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2.5 bg-white border border-[#FFC2D1] text-[#FF2E63] rounded-xl hover:bg-[#FFE5EC] transition-all duration-300 active:scale-95"
                      title="Add to Cart"
                    >
                      <i className="ti ti-shopping-cart text-[15px]"></i>
                    </button>
                    <button
                      onClick={() => handleToggleWishlist(product)}
                      className="p-2.5 bg-white border border-[#FFC2D1] text-[#FF2E63] rounded-xl hover:bg-[#FFE5EC] transition-all duration-300 active:scale-95"
                      title="Add to Wishlist"
                    >
                      <i className="ti ti-heart text-[15px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {featuredTrending.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[24px] md:text-[28px] font-black text-[#351C24] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Trending Now in {type === 'dresses' ? 'Dresses' : 'Jewellery'}
            </h2>
            <span className="h-0.5 flex-1 bg-gradient-to-r from-[#FFC2D1] to-transparent rounded-full"></span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTrending.map((product) => (
              <div
                key={product._id}
                className="group relative flex flex-col bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-3 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,133,161,0.14)]"
              >
                <Link to={`/product/${type === 'dresses' ? 'dress' : 'jewellery'}/${product._id}`} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.02)] mb-4 border border-white/20 block">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                  <div className="absolute top-3 left-3 bg-[#FF8DA1] text-[#351C24] text-[10px] font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                    Trending
                  </div>
                  <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md border border-white/30 text-[#351C24] font-black text-sm px-3.5 py-1.5 rounded-xl shadow-md">
                    ${product.price}
                  </div>
                </Link>
                <div className="px-2 pb-2 flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${type === 'dresses' ? 'dress' : 'jewellery'}/${product._id}`}>
                      <h3 className="text-[14px] font-black text-[#351C24] group-hover:text-[#FF2E63] transition-colors duration-200 truncate leading-snug mb-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1.5 mb-4">
                      <span className="text-[10px] font-black tracking-widest text-[#FF2E63]/80 uppercase bg-[#FFE5EC] px-2 py-0.5 rounded-md">{product.category}</span>
                      <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">{product.color}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#FFC2D1]/20">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[11px] font-black py-2.5 px-3 rounded-xl shadow-[0_4px_12px_rgba(255,46,99,0.2)] hover:shadow-[0_6px_16px_rgba(255,46,99,0.3)] transition-all duration-300 active:scale-95 uppercase tracking-wider text-center"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2.5 bg-white border border-[#FFC2D1] text-[#FF2E63] rounded-xl hover:bg-[#FFE5EC] transition-all duration-300 active:scale-95"
                      title="Add to Cart"
                    >
                      <i className="ti ti-shopping-cart text-[15px]"></i>
                    </button>
                    <button
                      onClick={() => handleToggleWishlist(product)}
                      className="p-2.5 bg-white border border-[#FFC2D1] text-[#FF2E63] rounded-xl hover:bg-[#FFE5EC] transition-all duration-300 active:scale-95"
                      title="Add to Wishlist"
                    >
                      <i className="ti ti-heart text-[15px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sleek Filters Panel */}
      <div className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl border border-white/40 shadow-[0_12px_40px_rgba(255,133,161,0.08)] mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[12px] font-black text-[#8A606A] mb-2 tracking-widest uppercase">Category</label>
            <select
              className="w-full border border-[#FFC2D1]/60 rounded-xl px-4 py-3 text-[13px] font-bold text-[#4A0E17] focus:outline-none focus:border-[#FF2E63] focus:ring-4 focus:ring-[#FF2E63]/10 bg-white/90 transition-all duration-300 shadow-sm"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-black text-[#8A606A] mb-2 tracking-widest uppercase">Color Aesthetic</label>
            <select
              className="w-full border border-[#FFC2D1]/60 rounded-xl px-4 py-3 text-[13px] font-bold text-[#4A0E17] focus:outline-none focus:border-[#FF2E63] focus:ring-4 focus:ring-[#FF2E63]/10 bg-white/90 transition-all duration-300 shadow-sm"
              value={filters.color}
              onChange={(e) => setFilters({ ...filters, color: e.target.value })}
            >
              <option value="">All Colors</option>
              {colors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-black text-[#8A606A] mb-2 tracking-widest uppercase">Sort By</label>
            <select
              className="w-full border border-[#FFC2D1]/60 rounded-xl px-4 py-3 text-[13px] font-bold text-[#4A0E17] focus:outline-none focus:border-[#FF2E63] focus:ring-4 focus:ring-[#FF2E63]/10 bg-white/90 transition-all duration-300 shadow-sm"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Releases</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF2E63]"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#FFC2D1] text-center py-16 text-[#7D3E4D] font-bold shadow-sm">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative flex flex-col bg-white/45 backdrop-blur-sm rounded-3xl border border-white/50 p-3 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,133,161,0.14)]"
            >
              <Link to={`/product/${type === 'dresses' ? 'dress' : 'jewellery'}/${product._id}`} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.02)] mb-4 border border-white/20 block">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-md border border-white/30 text-[#351C24] font-black text-sm px-3.5 py-1.5 rounded-xl shadow-md">
                  ${product.price}
                </div>
              </Link>
              <div className="px-2 pb-2 flex-1 flex flex-col justify-between">
                <div>
                  <Link to={`/product/${type === 'dresses' ? 'dress' : 'jewellery'}/${product._id}`}>
                    <h3 className="text-[14px] font-black text-[#351C24] group-hover:text-[#FF2E63] transition-colors duration-200 truncate leading-snug mb-1">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-[10px] font-black tracking-widest text-[#FF2E63]/80 uppercase bg-[#FFE5EC] px-2 py-0.5 rounded-md">{product.category || 'Premium'}</span>
                    <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">{product.color || 'Multicolor'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[#FFC2D1]/20">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[11px] font-black py-2.5 px-3 rounded-xl shadow-[0_4px_12px_rgba(255,46,99,0.2)] hover:shadow-[0_6px_16px_rgba(255,46,99,0.3)] transition-all duration-300 active:scale-95 uppercase tracking-wider text-center"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2.5 bg-white border border-[#FFC2D1] text-[#FF2E63] rounded-xl hover:bg-[#FFE5EC] transition-all duration-300 active:scale-95"
                    title="Add to Cart"
                  >
                    <i className="ti ti-shopping-cart text-[15px]"></i>
                  </button>
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className="p-2.5 bg-white border border-[#FFC2D1] text-[#FF2E63] rounded-xl hover:bg-[#FFE5EC] transition-all duration-300 active:scale-95"
                    title="Add to Wishlist"
                  >
                    <i className="ti ti-heart text-[15px]"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;
