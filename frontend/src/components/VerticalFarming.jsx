import React, { useState } from 'react';

const VerticalFarmingSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      id: 1,
      title: "Less Water And Pesticides",
      subtitle: "More Yield All Year Around",
      stats: "90% less water usage",
      icon: "💧",
      details: "Vertical farming is revolutionizing agriculture by using up to 90% less water compared to traditional farming methods. This innovative approach allows crops to grow in stacked layers, optimizing space and resources. With controlled environments, vertical farms can produce higher yields throughout the year, reducing the need for pesticides and minimizing environmental impact. This technology is paving the way for sustainable, efficient food production in urban areas."
    },
    {
      id: 2,
      title: "Minimum Space Usage",
      subtitle: "Maximum Harvest In 2023",
      stats: "75% space optimization",
      icon: "🌱",
      details: "Vertical farming revolutionizes agriculture by maximizing yield while minimizing space. With a 75% optimization in land use, it enables sustainable food production in urban areas. In 2023, this innovation led to record-high harvests, proving its potential for a greener future."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 relative h-full">
      <div className="text-center mb-10">
        <span className="bg-white text-black text-xs px-3 py-1 rounded-full">
          Future of Farming
        </span>
        <h2 className="text-3xl font-bold mt-4">
          Innovations In Vertical Farming!
        </h2>
        <div className="h-1 bg-gradient-to-r from-green-500 to-blue-500 w-24 mx-auto my-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-6 relative 
                      transform transition-all duration-300 hover:scale-105 cursor-pointer
                      ${activeCard === feature.id ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => setActiveCard(activeCard === feature.id ? null : feature.id)}
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-white opacity-5 rounded-xl"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-bold text-lg">
                  {feature.title}
                </h3>
                <span className="text-4xl">{feature.icon}</span>
              </div>

              {/* Stats */}
              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <span className="text-green-300 font-medium">
                  {feature.stats}
                </span>
              </div>

              {/* Subtitle */}
              <div className="text-white/80 text-sm mb-4">
                {feature.subtitle}
              </div>

              {/* Expandable content */}
              <div className={`overflow-hidden transition-all duration-300 
                            ${activeCard === feature.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-green-300 text-sm">
                  {feature.details}
                </p>
              </div>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalFarmingSection;