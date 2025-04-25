import React from 'react';

const MarketplacePreview = () => {
  const products = [
    {
      id: 1,
      name: "Organic Seeds Pack",
      price: 29.99,
      image: "/products/seeds.jpg",
      category: "Seeds"
    },
    {
      id: 2,
      name: "Hydroponic Starter Kit",
      price: 149.99,
      image: "/products/hydroponics.jpg",
      category: "Equipment"
    },
    {
      id: 3,
      name: "Smart Soil Sensor",
      price: 79.99,
      image: "/products/sensor.jpg",
      category: "Technology"
    },
    {
      id: 4,
      name: "Vertical Garden System",
      price: 299.99,
      image: "/products/vertical.jpg",
      category: "Systems"
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <span className="text-xs text-green-600 font-medium">{product.category}</span>
          <h3 className="font-semibold mt-1">{product.name}</h3>
          <p className="text-gray-900 font-bold mt-2">${product.price}</p>
          <button className="w-full mt-4 bg-green-50 text-green-600 py-2 rounded-full text-sm font-medium hover:bg-green-100 transition">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default MarketplacePreview;