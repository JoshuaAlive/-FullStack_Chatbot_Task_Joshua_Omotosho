import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Trash2, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'Student' | 'Customer' | 'Other';
  serviceOfInterest: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  createdAt: string;
}

const Admin = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // 1. GET ALL
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/enquiries');
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // 2. GET BY ID (Used when clicking 'View')
  const handleView = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/enquiries/${id}`);
      setSelectedEnquiry(data);
    } catch (error) {
      console.error('Error fetching single enquiry:', error);
      alert('Failed to fetch full enquiry details.');
    }
  };

  // 3. PATCH (Update Status)
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/enquiries/${id}`, { status: newStatus });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus as any } : e));
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as any });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // 4. DELETE
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
      setEnquiries(prev => prev.filter(e => e._id !== id));
      if (selectedEnquiry && selectedEnquiry._id === id) setSelectedEnquiry(null);
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  // Filter logic
  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                          e.email.toLowerCase().includes(search.toLowerCase()) ||
                          e.serviceOfInterest.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || e.userType === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[85vh]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage incoming leads and student enquiries</p>
        </div>
        <button onClick={fetchEnquiries} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, email, or service..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="w-full sm:w-auto flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by Type:</span>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-40 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
          >
            <option value="All">All Types</option>
            <option value="Customer">Customer</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">Loading enquiries...</td></tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">No enquiries found.</td></tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{enq.name}</div>
                      <div className="text-sm text-gray-500">{enq.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{enq.userType}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">{enq.serviceOfInterest}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(enq.status)}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleView(enq._id)} className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                      <button onClick={() => handleDelete(enq._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Enquiry Details</h3>
                <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                  <p className="text-gray-900 font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Contact</label>
                  <p className="text-gray-900">{selectedEnquiry.email}</p>
                  <p className="text-gray-900">{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">User Type & Service</label>
                  <p className="text-gray-900"><span className="font-semibold">{selectedEnquiry.userType}</span> — {selectedEnquiry.serviceOfInterest}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status Management</label>
                  <select 
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border ${getStatusColor(selectedEnquiry.status)}`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-800 border border-gray-200 min-h-[100px] whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                <button 
                  onClick={() => setSelectedEnquiry(null)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
