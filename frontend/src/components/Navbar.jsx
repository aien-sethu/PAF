import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './auth/AuthModal';
import { useAuth } from '../context/AuthContext';

const NavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to === '/learn' && location.pathname.startsWith('/learn/'));

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'bg-green-600 text-white shadow-md'
          : 'text-gray-700 hover:bg-green-50'
      }`}
    >
      {label}
    </Link>
  );
};

const ProfileImage = ({ user }) => {
  const firstLetter = user?.name?.[0]?.toUpperCase() || '?';

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold transform hover:scale-105 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full rotate-45"></div>
        <span className="transform group-hover:scale-110 transition-transform duration-200">
          {firstLetter}
        </span>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOtherMenu, setShowOtherMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const otherLinks = [
    { path: '/other/about', label: 'About' },
    { path: '/other/products', label: 'Products' },
    { path: '/other/contact', label: 'Contact' }
  ];

  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevent default for all cases
    if (location.pathname === '/') {
      // On home page, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // On other pages, navigate to home and then scroll to top
      navigate('/');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Spacer div to prevent content overlap */}
      <div className="h-20"></div>
      
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-gradient-to-r from-blue-300/50 to-green-300/40 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo section with enhanced animation */}
            <div className="flex-shrink-0 group relative">
              <div className="absolute -inset-2 bg-gradient-to-r 
                            opacity-0 group-hover:opacity-75 blur transition duration-500 rounded-lg" />
              <Link 
                to="/" 
                onClick={handleLogoClick}
                className="flex items-center space-x-3 relative"
              >
                <div className="relative w-12 h-12 transform group-hover:scale-110 transition-all duration-500">
                  <div className="absolute inset-0  rounded-full 
                                animate-pulse opacity-75" />
                  <img 
                    src="/src/assets/images/logo.png" 
                    alt="AgriConnect Logo" 
                    className="relative w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className={`text-2xl font-bold transition-all duration-500 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'
                    : 'text-green-700'
                }`}>
                  AgriConnect
                </span>
              </Link>
            </div>
            
            {/* Navigation Links with updated styling */}
            <div className="hidden md:flex items-center space-x-6"> {/* Changed from space-x-1 to space-x-6 */}
              <NavLink to="/" label="Home" />
              <NavLink to="/skills" label="Skills" />
              <NavLink to="/learn" label="Learn" />
              <NavLink to="/discuss" label="Discuss" />
              
              <div onClick={() => navigate('/profile')} 
                   className="cursor-pointer transform hover:scale-110 transition-all duration-300 mx-4"> {/* Changed from mx-2 to mx-4 */}
                <ProfileImage user={user} />
              </div>
              
              {/* Enhanced Other button with floating animation */}
              <div className="relative group ml-2"> {/* Added ml-2 for extra spacing */}
                <button 
                  onClick={() => setShowOtherMenu(!showOtherMenu)}
                  className={`relative overflow-hidden px-6 py-2 rounded-full text-sm font-medium
                            transition-all duration-300 ${
                              isScrolled
                                ? 'border-2 border-green-500 text-green-600 hover:text-white'
                                : 'bg-white/10 text-green-950 hover:bg-white/20'
                            }`}
                >
                  <span className="relative z-10">Other</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 
                                transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
                
                {/* Enhanced Dropdown with animations */}
                {showOtherMenu && (
                  <div className="absolute right-0 mt-2 w-48 perspective-1000">
                    <div className="relative transform transition-all duration-300 animate-dropdown-enter">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl opacity-50 blur"></div>
                      <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-green-100 
                                    overflow-hidden divide-y divide-gray-100">
                        {otherLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r 
                                     hover:from-green-50 hover:to-blue-50 hover:text-green-600
                                     transition-all duration-300 group"
                            onClick={() => setShowOtherMenu(false)}
                          >
                            <span className="relative">
                              {link.label}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r 
                                           from-green-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;