import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const companyLinks = [
    { name: 'About Us', path: '/other/about' },
    { name: 'Contact', path: '/other/contact' }
  ];

  const socialLinks = [
    // {
    //   name: 'Facebook',
    //   icon: (
    //     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    //     </svg>
    //   ),
    //   url: 'https://facebook.com'
    // },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      ),
      url: 'https://www.youtube.com/channel/UCNzuGv__nUDW5VYy4UNTLQQ'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description - Takes 2 columns */}
          <div className="space-y-4 md:col-span-2">
            <div className="group">
              <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent 
                             group-hover:from-blue-400 group-hover:to-green-400 transition-all duration-500 cursor-pointer">
                AgriConnect
              </span>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-500 to-blue-500 
                             transition-all duration-500" />
            </div>
            <p className="text-gray-300 text-sm max-w-sm">
              Revolutionizing agriculture through sustainable vertical farming solutions.
            </p>
          </div>
          
          {/* Company Section - Takes 1 column with padding */}
          <div className="space-y-4 md:px-8">
            <h3 className="font-semibold text-white/90">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="text-gray-300 hover:text-green-400 text-sm relative group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 
                                   group-hover:w-full transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section - Takes 2 columns */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-white/90">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-all duration-300 text-white/80 hover:text-green-400 
                           relative group"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full 
                                opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                  <div className="relative bg-black/30 p-3 rounded-full backdrop-blur-sm">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-white">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-center text-white text-sm">
              © 2025 AgriConnect. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                              bg-green-900/50 text-green-400 backdrop-blur-sm border border-green-500/20">
                🌱 Sustainable
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                              bg-blue-900/50 text-blue-400 backdrop-blur-sm border border-blue-500/20">
                🌿 Eco-Friendly
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;