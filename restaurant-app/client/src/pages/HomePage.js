import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
          Welcome to Our Restaurant
        </h1>
        <p className="text-xl text-white mb-8">
          Experience fine dining like never before.
        </p>
        <Link to="/reservation">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
            className="px-8 py-3 bg-blue-600 text-white rounded-full transition duration-300"
          >
            Book a Table
          </motion.button>
        </Link>
      </motion.div>
      {/* Additional grids/cards to demonstrate modern UI design */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto px-4">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold text-xl mb-2">Exquisite Ambiance</h3>
          <p className="text-gray-700">Enjoy a beautifully designed space with modern aesthetics.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold text-xl mb-2">Delicious Cuisine</h3>
          <p className="text-gray-700">Savor flavors crafted by our top chefs.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold text-xl mb-2">Exceptional Service</h3>
          <p className="text-gray-700">Experience service that cares about every detail.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
