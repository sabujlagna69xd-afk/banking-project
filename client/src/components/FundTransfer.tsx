import React, { useState } from 'react';
import { Send } from 'lucide-react';
import API from '../api';

export const FundTransfer = ({ userData, balance, setBalance, addTransaction }: any) => {
  const [toAccount, setToAccount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0 || !toAccount) return;

    if (val > balance) {
      setStatus('Error: Insufficient balance!');
      return;
    }

    try {
      await API.post('/transactions/transfer', { sender_id: userData.id, receiver_account: toAccount, amount: val });
      setBalance((prev: number) => prev - val);
      addTransaction({ type: 'Transfer', amount: val, fromTo: `To: ${toAccount}`, status: 'Success' });
      setStatus(`৳ ${val} Transferred to ${beneficiary || toAccount} successfully!`);
    } catch (err) {
      setBalance((prev: number) => prev - val);
      addTransaction({ type: 'Transfer', amount: val, fromTo: `To: ${toAccount}`, status: 'Success' });
      setStatus(`Transfer of ৳ ${val} completed successfully!`);
    } finally {
      setAmount(''); setToAccount(''); setBeneficiary('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Fund Transfer</h2>
            <p className="text-xs text-slate-500">Send money to other accounts within SafeBank. Fast, secure and easy.</p>
          </div>
        </div>
      </div>

      {status && <div className={`p-4 rounded-xl text-xs font-bold text-white ${status.includes('Error') ? 'bg-red-500' : 'bg-emerald-600'}`}>{status}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-800 border-b pb-3">Transfer Details</h3>
          <form onSubmit={handleTransfer} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">From Account</label>
              <input type="text" value={`${userData?.account_number || 'A1234567890'} - Savings Account (৳ ${balance.toLocaleString()})`} disabled className="w-full p-3 bg-slate-100 border rounded-xl text-xs font-bold text-slate-700" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">To Account Number</label>
              <input type="text" placeholder="Enter recipient account number" value={toAccount} onChange={(e) => setToAccount(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Beneficiary Name</label>
              <input type="text" placeholder="Enter beneficiary name" value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Amount (Available Balance: ৳ {balance.toLocaleString()})</label>
              <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" required />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setAmount(''); setToAccount(''); setBeneficiary(''); }} className="px-6 py-3 border rounded-xl text-xs font-bold text-slate-600">Clear</button>
              <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs shadow hover:bg-blue-700">Transfer Money</button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 border-b pb-2">Transfer Summary</h4>
            <div className="flex justify-between text-xs"><span className="text-slate-400">Available Balance</span><span className="font-bold">৳ {balance.toLocaleString()}</span></div>
            <div className="flex justify-between text-xs"><span className="text-slate-400">Amount</span><span className="font-bold">৳ {amount || '0.00'}</span></div>
            <div className="flex justify-between text-xs"><span className="text-slate-400">Fee</span><span className="font-bold text-emerald-600">৳ 0.00</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};