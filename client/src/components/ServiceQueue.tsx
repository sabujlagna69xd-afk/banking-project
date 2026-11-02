import React from 'react';
import { Users, CheckCircle2, Clock, Ticket, RefreshCw } from 'lucide-react';

export const ServiceQueue = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Service Queue Management</h2>
            <p className="text-xs text-slate-500">View and manage customer service queue. Serve customers in order.</p>
          </div>
        </div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-sm shadow">
          Now Serving: A103
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Total Customers</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">15</h3>
          <span className="text-[10px] text-blue-600 font-bold">In Queue</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Served Today</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">47</h3>
          <span className="text-[10px] text-emerald-600 font-bold">Completed</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Average Waiting Time</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">8 min</h3>
          <span className="text-[10px] text-slate-400 font-bold">(Today)</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Current Serving</span>
          <h3 className="text-2xl font-black text-blue-600 mt-2">A103</h3>
          <span className="text-[10px] text-slate-400 font-bold">(Counter 1)</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Live Queue</h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b text-slate-400">
              <th className="py-2.5">Ticket No</th>
              <th className="py-2.5">Customer Name</th>
              <th className="py-2.5">Service Type</th>
              <th className="py-2.5">Counter</th>
              <th className="py-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium">
            <tr><td className="py-3 font-bold text-blue-600">A103</td><td className="font-bold">Rafiqul Islam</td><td>Account Opening</td><td>Counter 1</td><td><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">Serving</span></td></tr>
            <tr><td className="py-3 font-bold">A104</td><td className="font-bold">Sadia Akter</td><td>Cash Deposit</td><td>Counter 2</td><td><span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">Waiting</span></td></tr>
            <tr><td className="py-3 font-bold">B201</td><td className="font-bold">Tanvir Hasan</td><td>Fund Transfer</td><td>Counter 3</td><td><span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">Waiting</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};