import React, { useState } from 'react';
import { ShieldCheck, User, Lock, ArrowRight, Building2, CheckCircle2, RefreshCw, Zap, MapPin, KeyRound, X } from 'lucide-react';
import API from './api';
import bankImage from './assets/bank_logo.jpg';

interface LoginProps {
  onLoginSuccess: (userData: any) => void;
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/auth/login', { username, password, role });
      setLoading(false);
      onLoginSuccess(response.data);
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed. Invalid credentials.');
    }
  };

  // Open Forgot Password Modal Fresh (No autofill or previous data)
  const handleOpenForgotModal = () => {
    setForgotUsername('');
    setNewPassword('');
    setForgotMsg('');
    setShowForgotModal(true);
  };

  // Handle Password Reset Submit to Backend Database
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotUsername || !newPassword) return;

    setResetLoading(true);
    setForgotMsg('');

    try {
      // Direct Database Update via Express Backend API
      const res = await API.post('/auth/reset-password', { 
        username: forgotUsername.trim(), 
        newPassword: newPassword 
      });

      setForgotMsg(res.data?.message || 'Password updated successfully in Database!');
      
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotMsg('');
        setForgotUsername('');
        setNewPassword('');
      }, 2000);
    } catch (err: any) {
      setForgotMsg(err.response?.data?.message || 'Failed to update password. User not found.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 sm:p-6 lg:p-8 relative">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[650px]">
        
        {/* Left Decorative Banner */}
        <div 
          className="lg:w-1/2 relative bg-cover bg-center p-8 lg:p-12 flex flex-col justify-between"
          style={{ 
            backgroundImage: `linear-gradient(180deg, rgba(15, 32, 67, 0.92) 0%, rgba(20, 50, 110, 0.85) 60%, rgba(15, 23, 42, 0.95) 100%), url(${bankImage})` 
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wide text-white block">SafeBank</span>
              <span className="text-[10px] text-blue-200 tracking-wider uppercase font-medium">Your Trust Our Priority</span>
            </div>
          </div>

          <div className="space-y-4 my-8">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Banking Transaction <br />
              <span className="text-blue-300">Management System</span>
            </h1>
            <p className="text-slate-200 text-xs lg:text-sm max-w-sm leading-relaxed opacity-90">
              Track transactions, manage your account, use undo/redo operations and enjoy a smarter banking experience.
            </p>
            <div className="flex items-center gap-2 pt-2 text-blue-200 text-xs font-medium">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Location: Main Branch, Dhaka, Bangladesh</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-white/90 text-xs">
              <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/90 text-xs">
              <Zap className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Fast & Easy Banking</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/90 text-xs">
              <User className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Better Service Queue</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/90 text-xs">
              <RefreshCw className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Undo / Redo Operations</span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back!</h2>
              <p className="mt-1 text-sm text-slate-500">Login to your account</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Username"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-20 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                  {/* Forgot Password Link Button */}
                  <button
                    type="button"
                    onClick={handleOpenForgotModal}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-600">Select Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-medium text-sm transition-all disabled:opacity-50 mt-2 shadow-lg shadow-blue-600/20"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center space-y-3">
              <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">OR</p>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                New User? Register Here
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Forgot Password Popup Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 relative">
            
            <button 
              onClick={() => setShowForgotModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Reset Password</h3>
              <p className="text-xs text-slate-500">Enter your username to update your password in Database.</p>
            </div>

            {forgotMsg && (
              <div className={`p-3 rounded-xl text-xs font-semibold text-center ${
                forgotMsg.includes('Failed') || forgotMsg.includes('not found') 
                  ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              }`}>
                {forgotMsg}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-3" autoComplete="off">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Account Username</label>
                <input
                  type="text"
                  placeholder="e.g. tanim123"
                  value={forgotUsername}
                  onChange={(e) => setForgotUsername(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                {resetLoading ? 'Updating Database...' : 'Reset Password Now'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};