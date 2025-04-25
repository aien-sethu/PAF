import React from 'react';

const CommunitySection = () => {
  const highlights = [
    {
      id: 1,
      name: "John Smith",
      location: "California, USA",
      achievement: "Increased crop yield by 300% using hydroponics",
      image: "/community/john.jpg"
    },
    {
      id: 2,
      name: "Maria Garcia",
      location: "Spain",
      achievement: "Successfully implemented vertical farming in urban area",
      image: "/community/maria.jpg"
    },
    {
      id: 3,
      name: "David Chen",
      location: "Singapore",
      achievement: "Pioneered sustainable pest control methods",
      image: "/community/david.jpg"
    },
    {
      id: 4,
      name: "Emma Wilson",
      location: "UK",
      achievement: "Developed community farming initiative",
      image: "/community/emma.jpg"
    }
  ];

  return (
    <section
      className="relative bg-cover bg-center py-16"
      style={{ backgroundImage: "url('/src/assets/images/farming-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Revolutionize Your Farming Practices?</h2>
        <p className="text-lg mb-8">
          Join our community to learn, share, and grow with innovative agricultural solutions.
        </p>
        <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-600 transition">
          Get Started →
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {highlights.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-center">{member.name}</h3>
            <p className="text-sm text-gray-500 text-center mb-2">{member.location}</p>
            <p className="text-sm text-gray-600 text-center">{member.achievement}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;