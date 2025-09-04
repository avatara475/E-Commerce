import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import productsData from '../Products.json';

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get all unique categories from products
  const categories = ['All', ...new Set(productsData.products.map(product => product.category))];
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? productsData.products 
    : productsData.products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10'>
        <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Featured Products</h2>
        
        <div className='flex flex-wrap gap-3 md:gap-5'>
          {categories.map(category => (
            <div 
              key={category} 
              className="relative cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <span 
                className={`text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category ? 'text-[#0289de]' : 'text-gray-600 hover:text-[#0289de]'
                }`}
              >
                {category.toUpperCase()}
              </span>
              
              {/* Animated underline */}
              {selectedCategory === category && (
                <motion.div 
                  className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#0289de]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={selectedCategory} // This helps React identify when to re-render with animation
      >
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {/* Show message if no products in category */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;