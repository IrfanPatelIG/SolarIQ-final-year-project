import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sun, Eye, EyeOff, Database } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for registration
    if (!isLogin) {
      if (!fullName) {
        alert('Please enter your full name');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }
    
    // TODO: Integrate with auth API
    console.log('Auth:', { fullName, email, password, isLogin });
    
    // Save user to auth context
    const userData = {
      fullName: fullName || 'Alex Rivera',
      email: email,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGjdx8YfZAQFRTnhsMwj9Z5ZsIZBz5qTEIBKjORAVpRg5GzxjiBSvydGo-yP4BICqsmlrfC89PTZXXFrL4L19Lmv48rctwvRVp0k_TWdTtZrr46tbCCxeOxph-AHyJZfkLIr1kJXu6Zyxe5tekfXP4vF1S8im5QXkSD60doyg-2qEgAgy-FX1apFnYgpIe8DyQqXdcw_gP0bY9ayDjq2wZE1kItrxVqeICnr8F8_Ws_eVuAbYywUWFMZFlDJOQ9Tdce1gqbG74YbZ9'
    };
    
    login(userData);
    
    // Navigate to onboarding after successful auth
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-transparent w-full top-0 z-50">
        <div className="flex justify-between items-center px-8 py-6 w-full max-w-screen-2xl mx-auto">
          <div className="text-2xl font-bold tracking-tight text-blue-900 dark:text-blue-100">SolarIQ</div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 items-center">
              <a className="text-base text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="#">Solutions</a>
              <a className="text-base text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="#">Technology</a>
              <a className="text-base text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="#">Pricing</a>
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
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-5 text-center font-bold text-base transition-all border-b-2 ${
                  isLogin 
                    ? 'border-blue-600 text-blue-600 bg-white dark:bg-slate-900' 
                    : 'border-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
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
                    />
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1" htmlFor="email">
                    Email address
                  </label>
                  <input 
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
                    id="email" 
                    placeholder="name@company.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
                      id="password" 
                      placeholder="••••••••" 
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-300 dark:border-slate-600 focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-0 transition-all font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
                        id="confirmPassword" 
                        placeholder="••••••••" 
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {isLogin ? 'Login' : 'Register'}
                  </button>
                </div>

                {/* SSO Section */}
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                  <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-widest">Or connect with</span>
                  <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="flex items-center justify-center py-3 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95">
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Google</span>
                  </button>
                  <button type="button" className="flex items-center justify-center py-3 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95">
                    <Database className="text-blue-600 dark:text-blue-400 mr-3" size={20} />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Enterprise</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Supporting Brand Messaging */}
          <div className="mt-8 text-center px-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-yellow-400/30 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Global Network Active</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
              Powering over 14.2 GW of solar assets worldwide with precision monitoring.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-4 w-full">
          <div className="font-bold text-slate-900 dark:text-slate-100 mb-2 md:mb-0">SolarIQ</div>
          <div className="flex gap-6 mb-2 md:mb-0">
            <a className="text-xs text-slate-500 hover:text-yellow-500 transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs text-slate-500 hover:text-yellow-500 transition-colors" href="#">Terms of Service</a>
            <a className="text-xs text-slate-500 hover:text-yellow-500 transition-colors" href="#">Contact Support</a>
          </div>
          <div className="text-xs text-slate-500">© 2024 SolarIQ. Precision Energy Monitoring.</div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
