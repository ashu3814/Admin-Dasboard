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

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setAuth(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend endpoint for admin login (replace with your actual endpoint if different)
      const res = await axios.post('/api/auth/login', auth);
      setToken(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get('/api/admin/reservations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReservations(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reservations');
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      await axios.put(`/api/admin/reservations/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchReservations();
    } catch (err) {
      console.error(err);
      setError('Failed to update reservation status');
    }
  };

  useEffect(() => {
    if (token) {
      fetchReservations();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <form onSubmit={handleLoginSubmit} className="w-full max-w-md bg-white p-8 shadow-md rounded">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={auth.email} 
              onChange={handleLoginChange} 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              value={auth.password} 
              onChange={handleLoginChange} 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-gray-200">Name</th>
              <th className="py-3 px-5 bg-gray-200">Email</th>
              <th className="py-3 px-5 bg-gray-200">Phone</th>
              <th className="py-3 px-5 bg-gray-200">Time</th>
              <th className="py-3 px-5 bg-gray-200">Status</th>
              <th className="py-3 px-5 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No reservations found.
                </td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td className="border px-4 py-2">{reservation.name}</td>
                  <td className="border px-4 py-2">{reservation.email}</td>
                  <td className="border px-4 py-2">{reservation.phone}</td>
                  <td className="border px-4 py-2">{new Date(reservation.time).toLocaleString()}</td>
                  <td className="border px-4 py-2">{reservation.status || 'Pending'}</td>
                  <td className="border px-4 py-2">
                    <button 
                      onClick={() => updateReservationStatus(reservation._id, 'Confirmed')}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => updateReservationStatus(reservation._id, 'Cancelled')}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-center">
        <button 
          onClick={() => {
            setToken('');
            localStorage.removeItem('adminToken');
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
