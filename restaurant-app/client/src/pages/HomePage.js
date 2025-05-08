import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [testimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      review: "The atmosphere was perfect for our anniversary dinner. The staff was attentive and the food was exceptional.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Roberts",
      review: "Best culinary experience in town! Every dish was a masterpiece of flavors.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Chen",
      review: "The wine selection paired perfectly with our meal. We'll definitely be returning soon!",
      rating: 4
    }
  ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Features section items
  const features = [
    {
      title: "Elegant Ambiance",
      description: "Enjoy a beautifully designed space with modern aesthetics and comfortable seating.",
      icon: "✨"
    },
    {
      title: "Exquisite Cuisine",
      description: "Savor carefully crafted dishes made with locally sourced, fresh ingredients.",
      icon: "🍽️"
    },
    {
      title: "Premium Service",
      description: "Our attentive staff ensures your dining experience exceeds expectations.",
      icon: "👨‍🍳"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Animation */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
              A Culinary Journey Awaits
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
              Experience extraordinary flavors in an atmosphere of elegance and comfort.
            </p>
            <Link to="/reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                Reserve Your Table
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            What Makes Us Special
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            What Our Guests Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      {i < testimonial.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.review}"</p>
                <p className="font-medium text-gray-800">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Our Cuisine?</h2>
            <p className="text-xl mb-8">Book your table now and embark on a memorable culinary journey.</p>
            <Link to="/reservation">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition duration-300">
                Make a Reservation
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Restaurant Name</h3>
            <p className="text-gray-400">Fine dining at its best. Experience the art of culinary excellence.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p className="text-gray-400">Monday - Thursday: 5:30pm - 10:00pm</p>
            <p className="text-gray-400">Friday - Sunday: 5:00pm - 11:30pm</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">123 Gourmet Street</p>
            <p className="text-gray-400">New York, NY 10001</p>
            <p className="text-gray-400">info@restaurant.com</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Restaurant Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;