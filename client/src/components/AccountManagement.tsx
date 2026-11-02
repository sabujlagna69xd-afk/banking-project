import React from 'react';
import { 
  User, CreditCard, MapPin, Building2, Calendar, Edit, ChevronRight, 
  ArrowDownLeft, ArrowUpRight, ArrowRightLeft, FileText 
} from 'lucide-react';

interface AccountManagementProps {
  userData: any;
  balance: number;
  setActiveMenu: (menu: any) => void;
}

export const AccountManagement: React.FC<AccountManagementProps> = ({ 
  userData, 
  balance, 
  setActiveMenu 
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Account Management</h2>
            <p className="text-xs text-slate-500">View and manage your bank account details, balance and operations.</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Dashboard &gt; <span className="text-slate-600">Account Management</span>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Account Details Gradient Card */}
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold tracking-wide">Account Details</h3>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
            <div>
              <p className="text-xs text-blue-100 font-medium flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" /> Account Number
              </p>
              <p className="text-xl font-black mt-1 tracking-wider">
                {userData?.account_number || 'A1234567890'}
              </p>
              <p className="text-xs text-blue-100 font-medium mt-3">Account Holder</p>
              <p className="text-sm font-bold">{userData?.username || 'Md. Tanim Khan'}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-blue-100">Account Type</span>
                <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold">Savings Account</span>
              </div>
            </div>

            <div>
              <p className="text-xs text-blue-100 font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Branch
              </p>
              <p className="text-sm font-bold mt-1">Dhaka Main Branch</p>
              <p className="text-xs text-blue-100 font-medium mt-3 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> IFSC
              </p>
              <p className="text-sm font-bold mt-1">SB0012</p>
            </div>
          </div>
        </div>

        {/* Current Balance Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                ৳
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500">Current Balance</span>
                <h3 className="text-2xl font-black text-slate-800 mt-0.5">
                  ৳ {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h3>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium pl-13">
              Available Balance: ৳ {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button 
              onClick={() => setActiveMenu('transactions')}
              className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow transition"
            >
              <ArrowDownLeft className="w-4 h-4" /> Deposit
            </button>
            <button 
              onClick={() => setActiveMenu('transfer')}
              className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow transition"
            >
              <ArrowUpRight className="w-4 h-4" /> Withdraw
            </button>
          </div>
        </div>

      </div>

      {/* 4 Quick Action Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => setActiveMenu('transfer')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Fund Transfer</h4>
              <p className="text-[10px] text-slate-400">Send money to other accounts</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div onClick={() => setActiveMenu('transactions')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Deposit</h4>
              <p className="text-[10px] text-slate-400">Add money to your account</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div onClick={() => setActiveMenu('transfer')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Withdraw</h4>
              <p className="text-[10px] text-slate-400">Withdraw money from account</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div onClick={() => setActiveMenu('reports')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Account Statement</h4>
              <p className="text-[10px] text-slate-400">View account statement</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Account Info & Recent Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Account Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-5">Account Information</h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-2"><CreditCard className="w-4 h-4 text-slate-400" /> Account Number</span>
              <span className="font-bold text-slate-800">{userData?.account_number || 'A1234567890'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-2"><User className="w-4 h-4 text-slate-400" /> Account Holder</span>
              <span className="font-bold text-slate-800">{userData?.username || 'Md. Tanim Khan'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400" /> Account Type</span>
              <span className="font-bold text-slate-800">Savings Account</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> Branch</span>
              <span className="font-bold text-slate-800">Dhaka Main Branch</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-400" /> IFSC</span>
              <span className="font-bold text-slate-800">SB0012</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Date Opened</span>
              <span className="font-bold text-slate-800">12 Jan 2024</span>
            </div>

            <button className="w-full mt-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center justify-between px-4 transition">
              <span className="flex items-center gap-2"><Edit className="w-4 h-4 text-blue-600" /> Edit Account Details</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Right Side: Recent Transactions Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
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
              <tr>
                <td className="py-3 text-slate-500">12 Sep 2026, 06:45 PM</td>
                <td className="py-3 text-slate-700 font-bold">TXN001245</td>
                <td className="py-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold">Deposit</span></td>
                <td className="py-3 font-bold text-slate-800">৳ 5,000.00</td>
                <td className="py-3"><span className="text-emerald-600 text-[11px] font-semibold">Success</span></td>
              </tr>
              <tr>
                <td className="py-3 text-slate-500">11 Sep 2026, 04:12 PM</td>
                <td className="py-3 text-slate-700 font-bold">TXN001244</td>
                <td className="py-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold">Transfer</span></td>
                <td className="py-3 font-bold text-slate-800">৳ 2,500.00</td>
                <td className="py-3"><span className="text-emerald-600 text-[11px] font-semibold">Success</span></td>
              </tr>
              <tr>
                <td className="py-3 text-slate-500">10 Sep 2026, 02:30 PM</td>
                <td className="py-3 text-slate-700 font-bold">TXN001243</td>
                <td className="py-3"><span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[10px] font-bold">Withdraw</span></td>
                <td className="py-3 font-bold text-slate-800">৳ 1,000.00</td>
                <td className="py-3"><span className="text-emerald-600 text-[11px] font-semibold">Success</span></td>
              </tr>
              <tr>
                <td className="py-3 text-slate-500">09 Sep 2026, 11:20 AM</td>
                <td className="py-3 text-slate-700 font-bold">TXN001242</td>
                <td className="py-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold">Deposit</span></td>
                <td className="py-3 font-bold text-slate-800">৳ 10,000.00</td>
                <td className="py-3"><span className="text-emerald-600 text-[11px] font-semibold">Success</span></td>
              </tr>
              <tr>
                <td className="py-3 text-slate-500">08 Sep 2026, 09:15 PM</td>
                <td className="py-3 text-slate-700 font-bold">TXN001241</td>
                <td className="py-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold">Transfer</span></td>
                <td className="py-3 font-bold text-slate-800">৳ 3,000.00</td>
                <td className="py-3"><span className="text-emerald-600 text-[11px] font-semibold">Success</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};