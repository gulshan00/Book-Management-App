import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Demo credentials
  const DEMO_EMAIL = 'john.doe@bookdash.com';
  const DEMO_PASSWORD = '123456';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    setTimeout(() => {
      const { email, password } = formData;

      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        toast.success('🎉 Login successful! Redirecting...', {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/'); // ✅ redirect to home
        }, 2000);
      } else {
        toast.error('❌ Invalid email or password. Please try again.', {
          position: "top-right",
          autoClose: 3000,
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD
    });
    toast.info('Demo credentials filled!', {
      position: "top-right",
      autoClose: 1500,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-white">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Welcome Back</h1>
          <p className="text-slate-300 text-sm sm:text-base">Sign in to your BookDash account</p>
        </div>

        {/* Demo Credentials Info */}
        <div
          className="bg-slate-700 border-l-4 border-blue-500 p-3 sm:p-4 mb-6 rounded cursor-pointer hover:bg-slate-600 transition-colors duration-200"
          onClick={fillDemoCredentials}
        >
          <h4 className="text-sm font-semibold mb-1">Demo Credentials (Click to fill):</h4>
          <p className="text-xs sm:text-sm text-slate-300">Email: {DEMO_EMAIL}</p>
          <p className="text-xs sm:text-sm text-slate-300">Password: {DEMO_PASSWORD}</p>
        </div>

        {/* Login Form */}
        <div className="space-y-5 sm:space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-slate-200">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-900 text-white placeholder-slate-400 text-sm sm:text-base"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-slate-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-900 text-white placeholder-slate-400 text-sm sm:text-base"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
