import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-[#FFC2D1] shadow-[0_20px_50px_rgba(255,46,99,0.08)]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFE5EC] border border-[#FFC2D1] text-[#FF2E63] text-2xl mb-4 animate-bounce">
            🔑
          </div>
          <h2 className="text-[32px] font-black text-[#4A0E17] tracking-tight">Sign in to VogueMe</h2>
          <p className="text-[14px] text-[#7D3E4D] font-semibold mt-1">Discover your next look with AI styling</p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-[13px] font-bold shadow-sm">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                required
                className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3.5 bg-white font-semibold text-[#4A0E17] text-[14px] placeholder-[#8A606A]/75 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 transition-all"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="w-full border border-[#FFC2D1] rounded-xl px-4 py-3.5 bg-white font-semibold text-[#4A0E17] text-[14px] placeholder-[#8A606A]/75 focus:outline-none focus:border-[#FF2E63] focus:ring-2 focus:ring-[#FF2E63]/10 transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-[14px] px-4 border border-transparent text-[14px] font-bold rounded-xl text-white bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,46,99,0.35)] transition-all duration-300 shadow-md"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-[#7D3E4D] font-semibold">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-[#FF2E63] hover:text-[#4A0E17] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
