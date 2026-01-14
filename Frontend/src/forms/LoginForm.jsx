import React, { useState } from 'react';
import { useAuth } from "../context/authcontext.jsx";
import { login } from '../../api.js';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(e.target);
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await login(credentials);
      setUser(response.user);
      navigate('/');
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
        <input
          type="email"
          name="email"
          required
          placeholder="name@company.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center">
          <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <label htmlFor="remember" className="ml-2 text-xs text-gray-600">Remember me</label>
        </div>
        <a href="#" className="text-xs font-medium text-indigo-600 hover:underline">Forgot password?</a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing in...
          </span>
        ) : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;