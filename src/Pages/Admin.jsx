import React, { useEffect, useState } from 'react';
import { Trash2, RefreshCw, Menu, X } from 'lucide-react';

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

const Admin = () => {
  const [submissions, setSubmissions] = useState([]);
  const [activeMenu, setActiveMenu] = useState('submissions');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    try {
      const raw = localStorage.getItem('soilSubmissions') || '[]';
      const parsed = JSON.parse(raw);
      const normalized = (Array.isArray(parsed) ? parsed : []).map((s) => ({
        ...s,
        status: s.status || 'Pending',
      }));
      setSubmissions(normalized);
    } catch (e) {
      console.error('Failed to load submissions', e);
      setSubmissions([]);
    }
  };

  const persist = (items) => {
    localStorage.setItem('soilSubmissions', JSON.stringify(items));
  };

  const deleteEntry = (id) => {
    if (!confirm('Delete this submission?')) return;
    const filtered = submissions.filter((s) => s.id !== id);
    persist(filtered);
    setSubmissions(filtered);
  };

  const clearAll = () => {
    if (!confirm('Clear all soil testing submissions? This cannot be undone.')) return;
    localStorage.removeItem('soilSubmissions');
    setSubmissions([]);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = submissions.map((s) => (s.id === id ? { ...s, status: newStatus } : s));
    setSubmissions(updated);
    persist(updated);
  };

  const filtered = submissions.filter((s) => (filterStatus === 'All' ? true : s.status === filterStatus));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            {/* <Menu className="w-6 h-6 text-green-600" /> */}
            <h2 className="text-lg font-bold">Admin Panel</h2>
          </div>
          <p className="text-sm text-gray-500 mt-2">Soil Test form submissions</p>
        </div>

        <nav className="p-4">
          <button
            onClick={() => setActiveMenu('submissions')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
              activeMenu === 'submissions' ? 'bg-green-100 text-green-800 font-semibold' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Form Submissions
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Form Submissions</h1>
            <p className="text-sm text-gray-600">View and manage soil testing form submissions.</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded bg-white"
            >
              <option>All</option>
              {STATUS_OPTIONS.map((so) => (
                <option key={so} value={so}>{so}</option>
              ))}
            </select>

            <button
              onClick={loadSubmissions}
              title="Refresh"
              className="px-3 py-2 bg-white border rounded hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={clearAll}
              title="Clear All"
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Pin Code</th>
                <th className="p-3 text-left">Address / Village</th>
                <th className="p-3 text-left">Submitted At</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-600">No submissions found.</td>
                </tr>
              )}

              {filtered.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 align-middle">{s.fullName}</td>
                  <td className="p-3 align-middle">{s.phoneNumber}</td>
                  <td className="p-3 align-middle">{s.pinCode}</td>
                  <td className="p-3 align-middle max-w-xs truncate">{s.village}</td>
                  <td className="p-3 align-middle">{s.submittedAt ? new Date(s.submittedAt).toLocaleString() : '-'}</td>
                  <td className="p-3 align-middle">
                    <select
                      value={s.status || 'Pending'}
                      onChange={(e) => handleStatusChange(s.id, e.target.value)}
                      className="px-2 py-1 border rounded"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => deleteEntry(s.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          {/* <p>
            Data is stored in the browser's localStorage under the key <code>soilSubmissions</code>.
            Status changes are saved automatically.
          </p> */}
        </div>
      </main>
    </div>
  );
};

export default Admin;
