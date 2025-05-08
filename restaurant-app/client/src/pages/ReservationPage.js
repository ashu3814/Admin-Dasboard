import React, { useState } from 'react';
import axios from 'axios';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    time: ''
  });
  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { name, email, phone, time } = formData;
    const newErrors = {};
    
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!time) newErrors.time = "Reservation time is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setErrors({});
    setLoading(true);
    
    try {
      // API call to backend for posting the reservation
      await axios.post('/api/reservations', formData);
      setResponseMsg('Reservation booked successfully!');
      setFormData({ name: '', email: '', phone: '', message: '', time: '' });
    } catch (error) {
      console.error(error);
      setResponseMsg('Error booking reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Book Your Table</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your contact number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Reservation Time</label>
            <input 
              type="datetime-local" 
              name="time" 
              value={formData.time} 
              onChange={handleChange} 
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Special Requests (Optional)</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 h-32"
              placeholder="Any special requests or dietary requirements..."
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium text-lg hover:opacity-90 transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Book Reservation'}
          </button>
          
          {responseMsg && (
            <div className={`mt-4 p-3 rounded-lg text-center ${responseMsg.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {responseMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReservationPage;