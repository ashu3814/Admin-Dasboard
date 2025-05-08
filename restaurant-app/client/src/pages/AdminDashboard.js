import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [auth, setAuth] = useState({
    email: '',
    password: ''
  });
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setAuth(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', auth);
      setToken(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/reservations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReservations(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reservations. Please try again.');
      if (err.response && err.response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('adminToken');
        setToken('');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id, status) => {
    setLoading(true);
    try {
      await axios.put(`/api/admin/reservations/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchReservations();
    } catch (err) {
      console.error(err);
      setError(`Failed to update reservation status to ${status}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchReservations();
    }
  }, [token]);

  // Filter reservations based on selected status
  const filteredReservations = filterStatus === 'all'
    ? reservations
    : reservations.filter(res => res.status === filterStatus || 
        (!res.status && filterStatus === 'Pending'));

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={auth.email} 
                onChange={handleLoginChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input 
                type="password" 
                name="password" 
                value={auth.password} 
                onChange={handleLoginChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
                placeholder="Enter your password"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Reservation Management</h2>
          <button 
            onClick={() => {
              setToken('');
              localStorage.removeItem('adminToken');
            }}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Logout
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <span className="font-medium text-gray-700">Filter by status:</span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus('Pending')}
              className={`px-4 py-2 rounded-lg ${filterStatus === 'Pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilterStatus('Confirmed')}
              className={`px-4 py-2 rounded-lg ${filterStatus === 'Confirmed' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Confirmed
            </button>
            <button 
              onClick={() => setFilterStatus('Cancelled')}
              className={`px-4 py-2 rounded-lg ${filterStatus === 'Cancelled' ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Cancelled
            </button>
          </div>
          <button 
            onClick={fetchReservations}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Contact Info</th>
                  <th className="py-3 px-4 text-left">Reservation Time</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Special Requests</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      Loading reservations...
                    </td>
                  </tr>
                ) : filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No reservations found for the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((reservation) => (
                    <tr key={reservation._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">{reservation.name}</td>
                      <td className="py-4 px-4">
                        <div>{reservation.email}</div>
                        <div className="text-gray-600">{reservation.phone}</div>
                      </td>
                      <td className="py-4 px-4">{formatDate(reservation.time)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          !reservation.status || reservation.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : reservation.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {reservation.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="max-w-xs truncate">
                          {reservation.message || 'No special requests'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => updateReservationStatus(reservation._id, 'Confirmed')}
                            disabled={reservation.status === 'Confirmed' || loading}
                            className={`bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition ${
                              (reservation.status === 'Confirmed' || loading) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => updateReservationStatus(reservation._id, 'Cancelled')}
                            disabled={reservation.status === 'Cancelled' || loading}
                            className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ${
                              (reservation.status === 'Cancelled' || loading) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;