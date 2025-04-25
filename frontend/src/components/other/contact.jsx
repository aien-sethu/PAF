import React, { useState } from 'react';
import AnimatedBackground from '../AnimatedBackground';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto relative">
        <AnimatedBackground />
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div 
          className="rounded-xl shadow-sm p-8 relative overflow-hidden"
          style={{
            backgroundImage: "url('/src/assets/images/formbg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Add an overlay for better text readability */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
          
          {/* Content container */}
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-2">📍</div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-sm text-gray-600">123 AgriTech Street</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📧</div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-sm text-gray-600">info@agriconnect.com</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-sm text-gray-600">+1 234 567 8900</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;