import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgricultureSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: 'Precision Farming Tools',
      description:
        'This advanced technology utilizes precision sensors and data analysis to optimize every step of the agricultural process, from planting to harvest.',
      image: '/src/assets/images/Tools.png',
      category: 'Equipment'
    },
    {
      id: 2,
      title: 'Smart Irrigation Systems',
      description:
        'Our smart irrigation systems use sensors and automatic controls to regulate watering volume and schedules based on soil and weather conditions.',
      image: '/src/assets/images/System.png',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Sustainable Crop Management',
      description:
        'Innovative solutions for sustainable crop management to ensure long-term productivity and environmental health.',
      image: '/src/assets/images/Crop.png',
      category: 'Tools'
    },
  ];

  const handleFeatureClick = (category) => {
    navigate('/other/products', { state: { selectedCategory: category } });
  };

  return (
    <div className="bg-green-50 rounded-3xl p-8 relative overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-12">
        <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full inline-block mb-4">
          Our Products
        </span>
        <h2 className="text-4xl font-bold mb-4">
          Sustainable Agriculture Solutions: Nurturing Crops, Preserving Resources
        </h2>
        <div className="h-1 bg-gradient-to-r from-green-500 to-blue-500 w-24 mx-auto my-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our range of innovative agricultural solutions designed to optimize crop yield, minimize resource usage, and streamline farming operations.
        </p>
        <button className="mt-6 bg-green-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black transition-all duration-300
                         transform hover:scale-105 shadow-md hover:shadow-lg">
          <a href="/other/products">Explore More</a>
          <svg
            className="w-0 h-0 ml-0"
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

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl shadow-sm p-6 hover:scale-105 transition cursor-pointer"
            onClick={() => handleFeatureClick(feature.category)}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <span className="text-xs text-white font-medium">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-semibold mt-2 text-lg text-white">{feature.title}</h3>
            <p className="text-sm text-gray-200 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgricultureSection;