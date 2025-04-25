import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from './HeroSection'
import AgricultureSection from './AgriSection'
import VerticalFarmingSection from './VerticalFarming'
import ExpertSection from './ExpertSection'
import CommunitySection from './CommunitySection'
import MarketplacePreview from './MarketplacePreview'

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/profile');
  };

  return (
    <div className="space-y-16 py-8">
      <HeroSection />
      
      {/* Learning Modules Section with Animated Background */}
      <section id="learning-section" className="relative overflow-hidden bg-gradient-to-br from-black via-green-900 to-black py-20">
        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.1
              }}
            >
              🌿
            </div>
          ))}
        </div>

        <div className="container mx-auto px-7 relative z-10">
          <div className="text-center mb-12">
            {/* <span className="inline-block bg-gradient-to-br from-green-700 to-green-900 text-white px-9 py-1 rounded-full text-sm mb-6">
              
            </span> */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
              A Pioneer in Agricultural Technology,<br/>
              Transforming the Future of Farming
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              With a passion for innovation, we strive to empower farmers with advanced tools 
              and techniques to meet the challenges of modern agriculture.
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '300%', label: 'Yield Increase', icon: '🌾' },
              { value: '70%', label: 'Water Saved', icon: '💧' },
              { value: '24/7', label: 'Monitoring', icon: '📊' },
              { value: '100%', label: 'Sustainable', icon: '🌱' }
            ].map((stat, index) => (
              <div key={index} 
                   className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center
                            transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-green-400 font-bold text-xl">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AgricultureSection />
      <VerticalFarmingSection/>
      
      {/* Enhanced Community Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 to-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 transform hover:scale-105 transition-all duration-500">
              <span className="inline-block bg-gradient-to-br from-green-700 to-green-900 text-white px-4 py-1 rounded-full text-sm mb-6">
                Join Our Community
              </span>
              
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Revolutionize Your Farming Practices?
              </h2>
              
              <p className="text-lg mb-8 text-gray-300">
                Join our community to learn, share, and grow with innovative agricultural solutions.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "🌿", text: "Sustainable Methods", desc: "Eco-friendly farming" },
                  { icon: "🤝", text: "Expert Community", desc: "Connect with experts" },
                  { icon: "🚀", text: "Innovation Hub", desc: "Latest agri-tech" },
                ].map((feature, index) => (
                  <div key={index}
                       className="bg-black/30 backdrop-blur-sm p-4 rounded-lg
                                transition-all duration-300 hover:bg-black/40
                                border border-green-900/30">
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <div className="text-green-400 font-medium mb-1">{feature.text}</div>
                    <div className="text-sm text-gray-400">{feature.desc}</div>
                  </div>
                ))}
              </div>

              <button onClick={handleGetStarted}
                      className="group relative px-8 py-4 bg-gradient-to-r from-green-700 to-green-900
                               text-white rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 
                              transform scale-x-0 group-hover:scale-x-100 
                              transition-transform duration-500 origin-left"></div>
                <span className="relative flex items-center justify-center">
                  Get Started
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-500/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
