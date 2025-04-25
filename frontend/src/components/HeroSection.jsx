import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './auth/AuthModal';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = false;

  // Add parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Video loading handler
  const handleVideoLoad = () => setIsLoading(false);

  const scrollToLearning = () => {
    const learningSection = document.querySelector('#learning-section');
    if (learningSection) {
      learningSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    if (!isLoggedIn) {
      navigate('/profile'); // This will show login/signup form
    } else {
      navigate('/profile'); // This will show the user profile
    }
  };

  return (
    <div className="relative h-screen w-full -mt-16 pt-16 overflow-hidden">
      {/* Simple background video */}
      <video
        autoPlay
        loop
        muted
        onLoadedData={handleVideoLoad}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/src/assets/videos/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Simple overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Enhanced Feature Box */}
      <div className="relative h-full flex flex-col lg:flex-row">
        {/* Left side content */}
        <div className="container mx-auto px-6 py-12 md:py-24 h-full flex flex-col justify-center lg:w-1/2">
          <div className="max-w-2xl relative">
            {/* Animated badge */}
            <div className="relative inline-block group mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
              <div className="relative px-4 py-2 bg-black text-white rounded-full text-sm font-medium ring-1 ring-gray-900/5">
                Agriculture Technology
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Revolutionizing Agriculture Through Technology
            </h1>
            
            <div className="mt-8">
              <button 
                onClick={handleGetStarted}
                className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-green-500 transition duration-300 flex items-center"
              >
                Get Started
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </button><br/>

              <button 
                onClick={scrollToLearning}
                className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-green-500 transition duration-300 flex items-center"
              >
                Discover More 
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right side stats dashboard */}
        <div className="lg:w-1/2 flex items-center justify-center p-6">
          <div className="mt-8 relative group max-w-md w-full"> {/* Reduced max-width */}
            {/* Animated gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Main container */}
            <div className="relative bg-black/80 backdrop-blur-sm rounded-lg p-4 shadow-lg 
                            hover:scale-105 hover:shadow-xl transition-all duration-300">
              {/* Quick Stats Carousel */}
              <div className="overflow-x-auto scrollbar-hide mb-4">
                <div className="flex space-x-2">
                  {[
                    { label: 'Yield', value: '+300%', icon: '🌾' },
                    { label: 'Water', value: '70%', icon: '💧' },
                    { label: 'Sensors', value: '24/7', icon: '📡' },
                    { label: 'AI', value: '100%', icon: '🤖' }
                  ].map((stat, index) => (
                    <div key={index} 
                         className="flex-shrink-0 bg-white/10 rounded-lg p-3 text-center
                                  hover:bg-white/20 transition-all duration-300 w-24">
                      <div className="text-xl mb-1">{stat.icon}</div>
                      <div className="text-green-400 font-bold">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Updates Ticker */}
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-white text-sm font-medium">Live Updates</span>
                </div>
                <div className="relative h-16 overflow-hidden">
                  <div className="absolute w-full animate-scrollY">
                    {[
                      'AI monitoring active',
                      'Smart irrigation engaged',
                      'Climate control optimal',
                      'Crop health: Excellent'
                    ].map((update, index) => (
                      <div key={index} 
                           className="py-1 text-xs text-gray-300 flex items-center gap-2">
                        <span className="text-green-500">›</span>
                        {update}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default HeroSection;