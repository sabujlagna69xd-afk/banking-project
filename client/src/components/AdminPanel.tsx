import React, { useState } from 'react';
import { 
  ShieldAlert, UserPlus, Lock, Settings, FileText, 
  Search, CheckCircle, AlertCircle, RefreshCcw, Eye
} from 'lucide-react';

export const AdminPanel = () => {
  const [users, setUsers] = useState<any[]>([
    { id: 1, name: 'Rafiq Ahmed', email: 'rafiq@gmail.com', phone: '01712345678', type: 'Savings', status: 'Active' },
    { id: 2, name: 'Sadia Islam', email: 'sadia@gmail.com', phone: '01887654321', type: 'Current', status: 'Active' },
    { id: 3, name: 'Tanvir Hasan', email: 'tanvir@gmail.com', phone: '01755551234', type: 'Savings', status: 'Active' },
    { id: 4, name: 'Nusrat Jahan', email: 'nusrat@gmail.com', phone: '01678901234', type: 'Current', status: 'Active' },
    { id: 5, name: 'Mahfuz Alam', email: 'mahfuz@gmail.com', phone: '01911112222', type: 'Savings', status: 'Pending' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [msg, setMsg] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newType, setNewType] = useState('Savings');

  // ১. ইউজার ব্লক/আনব্লক হ্যান্ডলার
  const toggleUserStatus = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        setMsg(`User "${u.name}" is now ${nextStatus}!`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // ২. নতুন ইউজার অ্যাড হ্যান্ডলার
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newUser = {
      id: users.length + 1,
      name: newName,
      email: newEmail,
      phone: newPhone || '01700000000',
      type: newType,
      status: 'Active'
    };

    setUsers([newUser, ...users]);
    setMsg(`New User "${newName}" added successfully!`);
    setShowAddModal(false);
    setNewName(''); setNewEmail(''); setNewPhone('');
  };

  // ফিল্টার ইউজার
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Admin Panel</h2>
            <p className="text-xs text-slate-500">Manage users, accounts, system settings and monitor all activities from here.</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-medium hidden sm:block">
          Today: <span className="text-slate-700 font-bold">12 Sep 2026, 11:28 AM</span>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow flex items-center justify-between">
          <span>{msg}</span>
          <button onClick={() => setMsg('')} className="hover:opacity-80">✕</button>
        </div>
      )}

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Total Users</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">{users.length}</h3>
          <span className="text-[10px] text-emerald-600 font-bold">↑ 3 new today</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Total Accounts</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">52</h3>
          <span className="text-[10px] text-emerald-600 font-bold">↑ 2 new today</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Total Transactions</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">156</h3>
          <span className="text-[10px] text-emerald-600 font-bold">↑ 12 today</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Pending Requests</span>
          <h3 className="text-2xl font-black text-slate-800 mt-2">7</h3>
          <span className="text-[10px] text-blue-600 font-bold">↓ 2 resolved today</span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: User Management Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 overflow-x-auto">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-slate-800">Recent Users</h3>
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 py-2">
                <th className="py-2.5">#</th>
                <th className="py-2.5">Name</th>
                <th className="py-2.5">Email</th>
                <th className="py-2.5">Phone</th>
                <th className="py-2.5">Type</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {filteredUsers.map((u, i) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 text-slate-400">{i + 1}</td>
                  <td className="py-3 font-bold text-slate-800">{u.name}</td>
                  <td className="py-3 text-slate-500">{u.email}</td>
                  <td className="py-3 text-slate-500">{u.phone}</td>
                  <td className="py-3 text-slate-700">{u.type}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      u.status === 'Blocked' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <button 
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                        u.status === 'Active' 
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {u.status === 'Active' ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Col: Quick Actions & System Overview */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase">Quick Actions</h4>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition"
            >
              <UserPlus className="w-4 h-4" /> Add New User
            </button>

            <button 
              onClick={() => setMsg('System Logs synced & up to date.')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition"
            >
              <FileText className="w-4 h-4" /> View System Logs
            </button>

            <button 
              onClick={() => setMsg('System Settings refreshed!')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Settings className="w-4 h-4" /> System Settings
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase">System Overview</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span>Database Connection</span>
                <span className="font-bold text-emerald-600">● Online</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span>Server Status</span>
                <span className="font-bold text-emerald-600">● Running (Port 5005)</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Backup Status</span>
                <span className="font-bold text-emerald-600">● Completed</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Create New User Account</h3>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Shakib Al Hasan" 
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={newEmail} 
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="shakib@gmail.com" 
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={newPhone} 
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="01700000000" 
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Account Type</label>
                <select 
                  value={newType} 
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs text-slate-700"
                >
                  <option value="Savings">Savings Account</option>
                  <option value="Current">Current Account</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 border rounded-xl text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs shadow hover:bg-blue-700"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};