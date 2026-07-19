import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import MatchMe from './pages/MatchMe';
import MoodShopping from './pages/MoodShopping';
import OutfitBuilder from './pages/OutfitBuilder';
import VirtualTryOn from './pages/VirtualTryOn';
import AIAssistant from './pages/AIAssistant';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products/:type" element={<ProductListing />} />
            <Route path="/product/:type/:id" element={<ProductDetail />} />
            <Route path="/match-me" element={<MatchMe />} />
            <Route path="/mood-shopping" element={<MoodShopping />} />
            <Route path="/outfit-builder" element={<OutfitBuilder />} />
            <Route path="/virtual-tryon" element={<VirtualTryOn />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
