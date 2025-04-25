import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          About AgriConnect
        </h1>
        
        <div className="bg-gray-50 rounded-xl shadow-lg p-8 space-y-6 relative overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-6xl animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float 15s infinite ${i * 0.5}s linear`
                }}
              >
                🌿
              </div>
            ))}
          </div>

          {/* Content with hover effects */}
          <div className="space-y-4 relative z-10 hover:transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-green-500 flex items-center gap-2">
              <span className="text-3xl">🎯</span>
              Our Mission
            </h2>
            <p className="text-black bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              AgriConnect is dedicated to revolutionizing agriculture through innovative technology 
              and sustainable practices. We aim to empower farmers with cutting-edge solutions 
              while promoting environmental stewardship.
            </p>
          </div>

          <div className="space-y-4 relative z-10 hover:transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-green-600 flex items-center gap-2">
              <span className="text-3xl">👁️</span>
              Our Vision
            </h2>
            <p className="text-gray-600 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              We envision a future where agriculture is sustainable, efficient, and accessible to all. 
              Through our platform, we connect farmers, experts, and innovators to create a thriving 
              agricultural ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: "🌱", title: "Innovation", desc: "Leading agricultural technology solutions", color: "green" },
              { icon: "🤝", title: "Community", desc: "Building connections in farming", color: "blue" },
              { icon: "🌍", title: "Sustainability", desc: "Promoting eco-friendly practices", color: "teal" }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`text-center p-6 rounded-xl bg-gradient-to-br from-${item.color}-50 to-white 
                          hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 
                          border border-${item.color}-100 cursor-pointer`}
              >
                <div className={`text-4xl mb-3 transform transition-transform duration-300 hover:scale-125`}>
                  {item.icon}
                </div>
                <h3 className={`font-semibold mb-2 text-${item.color}-700`}>{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;