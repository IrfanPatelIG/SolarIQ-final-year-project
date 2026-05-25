import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sun, Eye, EyeOff } from 'lucide-react';
import BrandLogo from '../../components/common/BrandLogo.jsx';

const Auth = () => {
  const navigate = useNavigate();
  const { loginUser, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        if (!email || !password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        await loginUser(email, password);
        navigate('/');
      } else {
        // Register
        if (!fullName || !email || !password || !confirmPassword) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        await register(fullName, email, password);
        setError('');
        setIsLogin(true);
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError(
        err?.message ||
        (typeof err === 'string' ? err : 'An error occurred. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-transparent w-full top-0 z-50">
        <div className="flex justify-between items-center px-8 py-6 w-full max-w-screen-2xl mx-auto">
          <BrandLogo />
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 items-center">
              <a className="text-base text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="/">Home</a>
              <a className="text-base text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="/">Technology</a>
              <a className="text-base text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="/">Pricing</a>
            </div>
            <button className="text-blue-900 dark:text-blue-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:opacity-80">
              <Sun size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

        <div className="w-full max-w-[480px] z-10">
          {/* Auth Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_32px_64px_-12px_rgba(25,28,30,0.06)] overflow-hidden">
            {/* Tab Headers */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800">
              <button 
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                className={`flex-1 py-5 text-center font-bold text-base transition-all border-b-2 ${
                  isLogin 
                    ? 'border-blue-600 text-blue-600 bg-white dark:bg-slate-900' 
                    : 'border-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className={`flex-1 py-5 text-center font-bold text-base transition-all border-b-2 ${
                  !isLogin 
                    ? 'border-blue-600 text-blue-600 bg-white dark:bg-slate-900' 
                    : 'border-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-blue-900 dark:text-blue-100 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {isLogin ? 'Monitor your solar performance in real-time.' : 'Start monitoring your solar energy today.'}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name Field (Register only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1" htmlFor="fullName">
                      Full Name
                    </label>
                    <input 
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
                      id="fullName" 
                      placeholder="John Doe" 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1" htmlFor="email">
                    Email address
                  </label>
                  <input 
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 disabled:opacity-50" 
                    id="email" 
                    placeholder="name@company.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1" htmlFor="password">
                      Password
                    </label>
                    {isLogin && (
                      <a className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors" href="#">
                        Forgot Password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <input 
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 disabled:opacity-50" 
                      id="password" 
                      placeholder="••••••••" 
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
                      disabled={loading}
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field (Register only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input 
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 disabled:opacity-50" 
                        id="confirmPassword" 
                        placeholder="••••••••" 
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
                        disabled={loading}
                      >
                        {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Login to SolarIQ' : 'Create Account')}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">Or</span>
                  </div>
                </div>

                {/* Alternative Auth */}
                <button 
                  className="w-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50"
                  type="button"
                  disabled={loading}
                >
                  Continue with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
