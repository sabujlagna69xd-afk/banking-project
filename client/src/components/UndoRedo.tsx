import React, { useState } from 'react';
import { RotateCcw, RotateCw, Layers, HelpCircle } from 'lucide-react';

export const UndoRedo = ({ transactions, balance, setBalance, setTransactions }: any) => {
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [msg, setMsg] = useState('');

  const handleUndo = () => {
    if (transactions.length === 0) {
      setMsg('No transactions available to undo!');
      return;
    }
    const lastTxn = transactions[0];
    const newTxns = transactions.slice(1);
    
    // Reverse balance effect
    if (lastTxn.type === 'Deposit') {
      setBalance((prev: number) => prev - lastTxn.amount);
    } else {
      setBalance((prev: number) => prev + lastTxn.amount);
    }

    setTransactions(newTxns);
    setRedoStack([lastTxn, ...redoStack]);
    setMsg(`Undone: ${lastTxn.id} (${lastTxn.type} of ৳ ${lastTxn.amount})`);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) {
      setMsg('No transactions available to redo!');
      return;
    }
    const lastRedo = redoStack[0];
    const newRedoStack = redoStack.slice(1);

    if (lastRedo.type === 'Deposit') {
      setBalance((prev: number) => prev + lastRedo.amount);
    } else {
      setBalance((prev: number) => prev - lastRedo.amount);
    }

    setTransactions([lastRedo, ...transactions]);
    setRedoStack(newRedoStack);
    setMsg(`Redone: ${lastRedo.id} (${lastRedo.type} of ৳ ${lastRedo.amount})`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Undo / Redo Operation</h2>
            <p className="text-xs text-slate-500">Revert or re-apply transactions using Stack Data Structure (LIFO).</p>
          </div>
        </div>
      </div>

      {msg && <div className="p-3 bg-blue-600 text-white rounded-xl text-xs font-bold">{msg}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <RotateCcw className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-800">Undo (Last Transaction)</h3>
              </div>
              <p className="text-xs text-slate-500">Revert your most recent transaction.</p>
              <button onClick={handleUndo} className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow transition">Undo Last Action</button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-emerald-600">
                <RotateCw className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-800">Redo (Cancelled Action)</h3>
              </div>
              <p className="text-xs text-slate-500">Re-apply the last undone transaction.</p>
              <button onClick={handleRedo} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition">Redo Transaction</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Stack Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-blue-900">Undo Stack</p>
                  <p className="text-sm font-black text-blue-700 mt-1">{transactions.length} transactions</p>
                </div>
                <Layers className="w-6 h-6 text-blue-500" />
              </div>
              <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-purple-900">Redo Stack</p>
                  <p className="text-sm font-black text-purple-700 mt-1">{redoStack.length} transaction</p>
                </div>
                <Layers className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-blue-600" /> How It Works?
          </div>
          <div className="space-y-3 text-xs text-slate-600">
            <p><span className="font-bold text-blue-600">1. Undo:</span> Reverts recent transaction balance.</p>
            <p><span className="font-bold text-blue-600">2. Redo:</span> Re-applies undone transaction balance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};