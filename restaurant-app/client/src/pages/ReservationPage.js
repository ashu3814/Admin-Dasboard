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

  const validateForm = () => {
    const { name, email, phone, time } = formData;
    const newErrors = {};
    
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!time) newErrors.time = "Reservation time is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setErrors({});
    try {
      // API call to backend for posting the reservation
      await axios.post('/api/reservations', formData);
      setResponseMsg('Reservation booked successfully!');
      setFormData({ name: '', email: '', phone: '', message: '', time: '' });
    } catch (error) {
      console.error(error);
      setResponseMsg('Error booking reservation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Reservation Booking</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Reservation Time</label>
          <input 
            type="datetime-local" 
            name="time" 
            value={formData.time} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700">Message (Optional)</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Submit Reservation
        </button>
        {responseMsg && <p className="mt-4 text-center text-gray-700">{responseMsg}</p>}
      </form>
    </div>
  );
};

export default ReservationPage;
