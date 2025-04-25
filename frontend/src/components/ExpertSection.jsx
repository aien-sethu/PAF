import React from 'react'

const ExpertSection = () => {
  const experts = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Organic Farming",
      image: "/experts/sarah.jpg",
      rating: 4.9,
      sessions: 120
    },
    // Add more experts...
  ]

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Learn from Industry Experts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={expert.image} 
                  alt={expert.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{expert.name}</h3>
                  <p className="text-gray-600">{expert.specialty}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>★ {expert.rating}</span>
                <span>{expert.sessions} sessions</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExpertSection