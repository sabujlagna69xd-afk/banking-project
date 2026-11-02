import React, { useState } from 'react';
import API from './api';

interface RegisterProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/auth/register', {
        username,
        password,
        role,
        account_number: 'SB' + Math.floor(100000 + Math.random() * 900000)
      });
      
      setLoading(false);
      alert(response.data.message || 'Registration successful!');
      onRegisterSuccess();
    } catch (err: any) {
      setLoading(false);
      // সার্ভারের সরাসরি আসল এরর মেসেজ রেন্ডার করা হচ্ছে
      const serverMsg = err.response?.data?.message || err.message || 'Network/Server Error';
      setError(serverMsg);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100">
      <div className="flex w-full items-center justify-center p-8">
        <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-2xl">
          <h2 className="mb-2 text-2xl font-bold">Create Account</h2>
          <p className="mb-6 text-sm text-slate-400">Register a new banking profile</p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20 break-words">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Enter unique username"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-blue-400 hover:underline"
            >
              Login Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};