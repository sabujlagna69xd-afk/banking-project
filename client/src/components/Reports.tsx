import React from 'react';
import { BarChart3, Download, FileText, Filter } from 'lucide-react';

export const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Reports</h2>
            <p className="text-xs text-slate-500">View detailed reports of your transactions, account activity and more.</p>
          </div>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2">
          <Download className="w-4 h-4" /> Export All Reports
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Current Balance</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">৳ 48,250.00</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Recent Reports</h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b text-slate-400">
              <th className="py-2.5">Report Name</th>
              <th className="py-2.5">Type</th>
              <th className="py-2.5">Date Range</th>
              <th className="py-2.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium">
            <tr>
              <td className="py-3 font-bold">Transaction Report</td>
              <td>Transaction</td>
              <td>01 Sep 2026 - 12 Sep 2026</td>
              <td><button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Download</button></td>
            </tr>
            <tr>
              <td className="py-3 font-bold">Monthly Account Statement</td>
              <td>Account</td>
              <td>01 Aug 2026 - 31 Aug 2026</td>
              <td><button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};