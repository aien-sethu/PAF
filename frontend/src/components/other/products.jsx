import React from 'react';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory;

  const products = [
    {
      id: 1,
      name: "Smart Irrigation System",
      price: 299.99,
      description: "Automated irrigation system with soil moisture sensors",
      image: "/src/assets/images/System.png",
      category: "Technology"
    },
    {
      id: 2,
      name: "Rotary Tiller Equipment",
      price: 449.99,
      description: "Rotary Tiller is a piece of farming equipment that is useful for filtering. It is suitable for farming.",
      image: "/src/assets/images/Tools.png",
      category: "Equipment"
    },
    {
      id: 3,
      name: "Soil Analysis Kit",
      price: 149.99,
      description: "Professional soil testing and analysis toolkit",
      image: "/src/assets/images/Crop.png",
      category: "Tools"
    }
  ];

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {selectedCategory ? `${selectedCategory} Products` : 'Our Products'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span className="text-sm text-green-600 font-medium">{product.category}</span>
            <h2 className="text-xl font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-2xl font-bold">${product.price}</span>
              <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;