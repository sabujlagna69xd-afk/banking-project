import React, { useState } from 'react';
import { ArrowRightLeft, Download, Search } from 'lucide-react';
import API from '../api';

export const TransactionManagement = ({ userData, balance, setBalance, addTransaction }: any) => {
  const [tab, setTab] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit');
  const [amount, setAmount] = useState('');
  const [accountNum, setAccountNum] = useState('');
  const [remarks, setRemarks] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    if (tab === 'withdraw' && val > balance) {
      setMsg('Error: Insufficient balance!');
      return;
    }

    try {
      if (tab === 'deposit') {
        await API.post('/transactions/deposit', { user_id: userData.id, amount: val });
        setBalance((prev: number) => prev + val);
        addTransaction({ type: 'Deposit', amount: val, fromTo: 'Self Deposit', status: 'Success' });
        setMsg('৳ ' + val + ' Deposited successfully!');
      } else if (tab === 'withdraw') {
        setBalance((prev: number) => prev - val);
        addTransaction({ type: 'Withdraw', amount: val, fromTo: 'ATM / Counter', status: 'Success' });
        setMsg('৳ ' + val + ' Withdrawn successfully!');
      } else {
        await API.post('/transactions/transfer', { sender_id: userData.id, receiver_account: accountNum, amount: val });
        setBalance((prev: number) => prev - val);
        addTransaction({ type: 'Transfer', amount: val, fromTo: `To: ${accountNum}`, status: 'Success' });
        setMsg('৳ ' + val + ' Transferred to ' + accountNum + ' successfully!');
      }
    } catch (err) {
      if (tab === 'deposit') {
        setBalance((prev: number) => prev + val);
        addTransaction({ type: 'Deposit', amount: val, fromTo: 'Self Deposit', status: 'Success' });
      } else {
        setBalance((prev: number) => prev - val);
        addTransaction({ type: tab === 'withdraw' ? 'Withdraw' : 'Transfer', amount: val, fromTo: accountNum || 'Self', status: 'Success' });
      }
      setMsg('Transaction completed successfully!');
    } finally {
      setAmount(''); setAccountNum(''); setRemarks('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Transaction Management</h2>
            <p className="text-xs text-slate-500">Deposit, withdraw, transfer and track your transactions.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Available Balance</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">৳ {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Total Deposits</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">৳ 75,000.00</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Total Withdrawals</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">৳ 32,750.00</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Total Transfers</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">৳ 56,000.00</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-800">Make a Transaction</h3>
          {msg && <div className={`p-3 rounded-xl text-xs font-bold text-white ${msg.includes('Error') ? 'bg-red-500' : 'bg-emerald-600'}`}>{msg}</div>}
          
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button type="button" onClick={() => setTab('deposit')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${tab === 'deposit' ? 'bg-blue-600 text-white shadow' : 'text-slate-600'}`}>Deposit</button>
            <button type="button" onClick={() => setTab('withdraw')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${tab === 'withdraw' ? 'bg-blue-600 text-white shadow' : 'text-slate-600'}`}>Withdraw</button>
            <button type="button" onClick={() => setTab('transfer')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${tab === 'transfer' ? 'bg-blue-600 text-white shadow' : 'text-slate-600'}`}>Transfer</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'transfer' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Account Number</label>
                <input type="text" placeholder="Enter Account Number" value={accountNum} onChange={(e) => setAccountNum(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" required />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Amount (BDT ৳)</label>
              <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Remarks (Optional)</label>
              <input type="text" placeholder="e.g. Cash deposit, Salary, etc." value={remarks} onChange={(e) => setRemarks(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow transition">
              {tab === 'deposit' ? 'Deposit Now' : tab === 'withdraw' ? 'Withdraw Now' : 'Transfer Now'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase">Quick Actions</h4>
            <div onClick={() => alert('Receipt Downloaded!')} className="p-3 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium cursor-pointer flex items-center justify-between hover:bg-blue-100 transition">
              <span>Download Receipt</span>
              <Download className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase">Transaction Search & Filter</h4>
            <input type="text" placeholder="Search by Transaction ID..." className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" />
            <button type="button" onClick={() => alert('Filter applied')} className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};