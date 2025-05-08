import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white font-bold">
          Restaurant App
        </div>
        <div className="space-x-4">
          <Link 
            to="/" 
            className={`text-white ${location.pathname === '/' ? 'underline' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/reservation" 
            className={`text-white ${location.pathname === '/reservation' ? 'underline' : ''}`}
          >
            Book Table
          </Link>
          <Link 
            to="/admin" 
            className={`text-white ${location.pathname === '/admin' ? 'underline' : ''}`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
