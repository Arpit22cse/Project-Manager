import React, { useState } from 'react';
import { register } from '../../api.js';
import { useAuth } from '../context/authcontext.jsx';
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(e.target);
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: password,
    };

    try {
      const response = await register(actualData);
      setUser(response.user);
      navigate('/');
      console.log("Registration successful:", response);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="John Doe"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
        <input
          type="email"
          name="email"
          required
          placeholder="john@example.com"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1">Confirm</label>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      
      <p className="text-[11px] text-center text-gray-400 px-4">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
};

export default RegisterForm;