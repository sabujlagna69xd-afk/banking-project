import React, { useState } from 'react';
import { 
  Building2, LayoutDashboard, UserCheck, ArrowRightLeft, Send, History, RotateCcw, 
  Users, BarChart3, ShieldAlert, LogOut, Search, Bell, Clock, ChevronRight, ChevronDown, 
  X, ArrowDownLeft, ArrowUpRight, HelpCircle
} from 'lucide-react';

import { AccountManagement } from './components/AccountManagement';
import { TransactionManagement } from './components/TransactionManagement';
import { FundTransfer } from './components/FundTransfer';
import { UndoRedo } from './components/UndoRedo';
import { ServiceQueue } from './components/ServiceQueue';
import { Reports } from './components/Reports';
import { AdminPanel } from './components/AdminPanel';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export type MenuType = 
  | 'dashboard' | 'account' | 'transactions' | 'transfer' 
  | 'history' | 'undoredo' | 'queue' | 'reports' | 'admin';

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const userData = user?.user || user || {};

  // 1. INITIAL BALANCE SET TO 0.00 BDT
  const [balance, setBalance] = useState<number>(Number(userData?.balance) || 0.00);
  const [activeMenu, setActiveMenu] = useState<MenuType>('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Real Dynamic Transactions List
  const [transactions, setTransactions] = useState<any[]>([
    { id: 'TXN001245', date: '12 Sep 2026, 06:45 PM', type: 'Deposit', amount: 5000, fromTo: 'Self Deposit', status: 'Success' },
    { id: 'TXN001244', date: '11 Sep 2026, 04:12 PM', type: 'Transfer', amount: 2500, fromTo: 'To: B9876543210', status: 'Success' },
  ]);

  // Global Transaction Adder with Strict Balance Validation
  const addTransaction = (newTxn: { type: 'Deposit' | 'Withdraw' | 'Transfer'; amount: number; fromTo: string; status: string }) => {
    // Prevent Minus Balance Condition
    if ((newTxn.type === 'Withdraw' || newTxn.type === 'Transfer') && (balance <= 0 || newTxn.amount > balance)) {
      setMessage('Error: Insufficient balance! Please deposit money first.');
      return false;
    }

    const txnObj = {
      id: `TXN00${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      ...newTxn
    };

    if (newTxn.type === 'Deposit') {
      setBalance(prev => prev + newTxn.amount);
      setMessage(`৳ ${newTxn.amount.toLocaleString()} Deposited successfully!`);
    } else {
      setBalance(prev => prev - newTxn.amount);
      setMessage(`৳ ${newTxn.amount.toLocaleString()} ${newTxn.type === 'Withdraw' ? 'Withdrawn' : 'Transferred'} successfully!`);
    }

    setTransactions([txnObj, ...transactions]);
    return true;
  };

  return (
    <div className="flex min-h-screen bg-[#F3F6FA] text-slate-800 font-sans relative">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A192F] text-slate-300 flex flex-col justify-between shrink-0 shadow-xl border-r border-slate-800">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-wide">SafeBank</h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider">Secure • Simple • For You</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-sm font-medium">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'account', label: 'Account Management', icon: UserCheck },
              { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
              { id: 'transfer', label: 'Fund Transfer', icon: Send },
              { id: 'history', label: 'Transaction History', icon: History },
              { id: 'undoredo', label: 'Undo / Redo', icon: RotateCcw },
              { id: 'queue', label: 'Service Queue', icon: Users },
              { id: 'reports', label: 'Reports', icon: BarChart3 },
              { id: 'admin', label: 'Admin Panel', icon: ShieldAlert },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as MenuType)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                    isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30' 
                      : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.id !== 'dashboard' && <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-red-400 hover:bg-slate-800/60 rounded-xl transition text-sm font-medium"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
          <div className="text-center pt-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white mx-auto mb-1">
              <Building2 className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-300">SafeBank</p>
            <p className="text-[9px] text-slate-500">Your Trust Our Priority</p>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions, account, etc..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-slate-600 hover:text-slate-800" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow">
                {userData?.username?.charAt(0).toUpperCase() || 'T'}
              </div>
              <div className="text-left leading-tight hidden sm:block">
                <p className="text-xs font-bold text-slate-800">{userData?.username || 'Md. Tanim Khan'}</p>
                <p className="text-[10px] text-slate-500 capitalize">{userData?.role || 'Customer'}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <main className="p-8 space-y-6 overflow-y-auto">
          
          {message && (
            <div className={`p-4 text-white rounded-xl text-xs font-semibold shadow flex items-center justify-between ${message.includes('Error') ? 'bg-rose-600' : 'bg-blue-600'}`}>
              <span>{message}</span>
              <X className="w-4 h-4 cursor-pointer" onClick={() => setMessage('')} />
            </div>
          )}

          {/* DASHBOARD VIEW (MATCHED EXACTLY WITH YOUR DESIGN IMAGE) */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 rounded-2xl p-6 border border-blue-100 shadow-sm flex items-center justify-between relative overflow-hidden">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Welcome Back, {userData?.username || 'Md. Tanim Khan'}!</h2>
                  <p className="text-xs text-slate-500 mt-1">Here's a quick overview of your account.</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-3 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Last login: 12 Sep 2026, 09:42 PM
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-semibold italic text-blue-900 font-serif">Better Banking</span>
                  <span className="text-xs italic text-blue-700 font-serif">Brighter Future</span>
                </div>
              </div>

              {/* 4 Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-500">Current Balance</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">৳</div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">৳ {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                  <button onClick={() => setActiveMenu('account')} className="text-[11px] text-blue-600 font-semibold hover:underline mt-3 block">View Account Details →</button>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-500">Total Transactions</span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><ArrowRightLeft className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{transactions.length}</h3>
                  <button onClick={() => setActiveMenu('history')} className="text-[11px] text-blue-600 font-semibold hover:underline mt-3 block">View All Transactions →</button>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-500">Pending Services</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">3</h3>
                  <button onClick={() => setActiveMenu('queue')} className="text-[11px] text-blue-600 font-semibold hover:underline mt-3 block">View Service Queue →</button>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-500">This Month's Deposits</span>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><ArrowDownLeft className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">৳ 25,000.00</h3>
                  <button onClick={() => setActiveMenu('reports')} className="text-[11px] text-blue-600 font-semibold hover:underline mt-3 block">View Reports →</button>
                </div>
              </div>

              {/* Middle Section Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Overview Graph & Recent Transactions */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Transaction Overview Graph */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-bold text-slate-800">Transaction Overview</h3>
                      <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 font-medium focus:outline-none">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-6 mb-4 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Deposit</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Withdraw</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Transfer</span>
                    </div>

                    <div className="h-44 w-full flex items-end justify-between gap-4 pt-4 border-b border-slate-100 px-2">
                      {[
                        { d: '06 Sep', h: '30%' },
                        { d: '07 Sep', h: '45%' },
                        { d: '08 Sep', h: '50%' },
                        { d: '09 Sep', h: '65%' },
                        { d: '10 Sep', h: '85%' },
                        { d: '11 Sep', h: '70%' },
                        { d: '12 Sep', h: '75%' },
                      ].map((pt, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                          <div className="w-full bg-blue-50/50 rounded-t-lg flex items-end justify-center pb-2 relative transition-all group-hover:bg-blue-100/60" style={{ height: pt.h }}>
                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white shadow"></div>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400">{pt.d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Transactions Table */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-800">Recent Transactions</h3>
                      <button onClick={() => setActiveMenu('history')} className="text-xs text-blue-600 font-semibold hover:underline">View All →</button>
                    </div>

                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                          <th className="py-2.5">Date & Time</th>
                          <th className="py-2.5">Transaction ID</th>
                          <th className="py-2.5">Type</th>
                          <th className="py-2.5">Amount</th>
                          <th className="py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs font-medium divide-y divide-slate-50">
                        {transactions.slice(0, 5).map((t, idx) => (
                          <tr key={idx}>
                            <td className="py-3 text-slate-500">{t.date}</td>
                            <td className="py-3 text-slate-700 font-bold">{t.id}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                t.type === 'Deposit' ? 'bg-emerald-100 text-emerald-700' :
                                t.type === 'Withdraw' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {t.type}
                              </span>
                            </td>
                            <td className="py-3 font-bold text-slate-800">৳ {t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td className="py-3"><span className="text-emerald-600 text-[11px] font-semibold">{t.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Right Col: Quick Actions & Service Queue Widget */}
                <div className="space-y-6">
                  
                  {/* Quick Actions Strip */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setActiveMenu('transactions')}
                        className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex flex-col items-center justify-center gap-1.5 transition border border-emerald-100"
                      >
                        <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-700">Deposit</span>
                      </button>

                      <button 
                        onClick={() => setActiveMenu('transactions')}
                        className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl flex flex-col items-center justify-center gap-1.5 transition border border-blue-100"
                      >
                        <ArrowUpRight className="w-5 h-5 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700">Withdraw</span>
                      </button>

                      <button 
                        onClick={() => setActiveMenu('transfer')}
                        className="p-3 bg-indigo-50 hover:bg-indigo-100 rounded-xl flex flex-col items-center justify-center gap-1.5 transition border border-indigo-100"
                      >
                        <Send className="w-5 h-5 text-indigo-600" />
                        <span className="text-xs font-bold text-slate-700">Transfer</span>
                      </button>

                      <button 
                        onClick={() => setActiveMenu('history')}
                        className="p-3 bg-purple-50 hover:bg-purple-100 rounded-xl flex flex-col items-center justify-center gap-1.5 transition border border-purple-100"
                      >
                        <History className="w-5 h-5 text-purple-600" />
                        <span className="text-xs font-bold text-slate-700">History</span>
                      </button>
                    </div>
                  </div>

                  {/* Service Queue Widget */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-slate-800">Service Queue</h3>
                      <button onClick={() => setActiveMenu('queue')} className="text-[11px] text-blue-600 font-semibold hover:underline">View All →</button>
                    </div>

                    <div className="flex items-center justify-between bg-blue-50/70 p-3 rounded-xl border border-blue-100 mb-4">
                      <div>
                        <p className="text-[10px] text-slate-500 font-medium">Your Token Number</p>
                        <p className="text-lg font-black text-blue-900">A023</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 font-medium">Position</p>
                        <p className="text-sm font-black text-blue-900">2 <span className="text-slate-400 font-normal text-xs">/ 5</span></p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-medium">
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                        <span className="text-slate-500">A021</span>
                        <span className="text-slate-700 font-semibold">Deposit</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Served</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                        <span className="text-blue-600 font-bold">→ A023</span>
                        <span className="text-slate-800 font-bold">Fund Transfer</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">Now Serving</span>
                      </div>
                    </div>
                  </div>

                  {/* Need Help Card */}
                  <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-5 rounded-2xl shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-blue-400" />
                      </div>
                      <h4 className="font-bold text-sm">Need Help?</h4>
                    </div>
                    <p className="text-xs text-slate-300 mb-4">Our support team is available 24/7 to assist you.</p>
                    <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition shadow">
                      Contact Support
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* OTHER SECTIONS (KEPT FULLY WORKABLE & STABLE) */}
          {activeMenu === 'account' && <AccountManagement userData={userData} balance={balance} setActiveMenu={setActiveMenu} />}
          {activeMenu === 'transactions' && <TransactionManagement userData={userData} balance={balance} setBalance={setBalance} addTransaction={addTransaction} />}
          {activeMenu === 'transfer' && <FundTransfer userData={userData} balance={balance} setBalance={setBalance} addTransaction={addTransaction} />}
          
          {activeMenu === 'history' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Transaction History</h2>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 py-2">
                    <th className="py-2.5">Date & Time</th>
                    <th className="py-2.5">Transaction ID</th>
                    <th className="py-2.5">Type</th>
                    <th className="py-2.5">From / To</th>
                    <th className="py-2.5">Amount</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {transactions.map((t, i) => (
                    <tr key={i}>
                      <td className="py-3 text-slate-500">{t.date}</td>
                      <td className="py-3 font-bold text-slate-700">{t.id}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.type === 'Deposit' ? 'bg-emerald-100 text-emerald-700' :
                          t.type === 'Withdraw' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="py-3 text-slate-600">{t.fromTo}</td>
                      <td className="py-3 font-bold text-slate-800">৳ {t.amount.toLocaleString()}</td>
                      <td className="py-3 text-emerald-600 font-semibold">{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeMenu === 'undoredo' && <UndoRedo transactions={transactions} balance={balance} setBalance={setBalance} setTransactions={setTransactions} />}
          {activeMenu === 'queue' && <ServiceQueue />}
          {activeMenu === 'reports' && <Reports />}
          {activeMenu === 'admin' && <AdminPanel />}

        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <LogOut className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Are you sure you want to logout?</h3>
              <p className="text-xs text-slate-500 mt-2">You will be signed out from your account.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => setShowLogoutModal(false)} className="py-2.5 border rounded-xl text-xs font-semibold hover:bg-slate-50">Cancel</button>
              <button onClick={onLogout} className="py-2.5 bg-red-500 text-white rounded-xl text-xs font-semibold shadow hover:bg-red-600">Logout</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};