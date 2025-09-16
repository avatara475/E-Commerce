import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../../home/ProductCard';
import FilterComponent from '../components/FilterComponent';
import productsData from '../../Products.json';

const MainCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    rating: 0,
    inStock: false,
    isNew: false,
    isBestSeller: false
  });

  // Extract all unique categories
  const categories = ['All', ...new Set(productsData.products.map(product => product.category))];

  // Filter products based on URL category parameter
  useEffect(() => {
    if (categoryName && categoryName !== 'All') {
      const categoryProducts = productsData.products.filter(
        product => product.category.toLowerCase() === categoryName.toLowerCase()
      );
      setFilteredProducts(categoryProducts);
    } else if (categoryName === 'All') {
      setFilteredProducts(productsData.products);
    }
  }, [categoryName]);

  // Apply additional filters
  useEffect(() => {
    let result = productsData.products;
    
    // Filter by category from URL
    if (categoryName && categoryName !== 'All') {
      result = result.filter(
        product => product.category.toLowerCase() === categoryName.toLowerCase()
      );
    }
    
    // Apply additional filters
    result = result.filter(product => {
      return (
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        product.rating >= filters.rating &&
        (!filters.inStock || product.inStock) &&
        (!filters.isNew || product.isNew) &&
        (!filters.isBestSeller || product.isBestSeller)
      );
    });
    
    setFilteredProducts(result);
  }, [categoryName, filters]);

  const handleCategoryChange = (category) => {
    navigate(`/category/${category}`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Navigation */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10'>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          {categoryName === 'All' ? 'All Products' : categoryName}
        </h2>
        
        <div className='flex flex-wrap gap-3 md:gap-5'>
          {categories.map(category => (
            <div 
              key={category} 
              className="relative cursor-pointer"
              onClick={() => handleCategoryChange(category)}
            >
              <span 
                className={`text-sm font-medium transition-colors duration-300 ${
                  categoryName === category ? 'text-[#0289de]' : 'text-gray-600 hover:text-[#0289de]'
                }`}
              >
                {category.toUpperCase()}
              </span>
              
              {/* Animated underline */}
              {categoryName === category && (
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterComponent 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
            
            {/* Sort dropdown would go here */}
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <button 
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setFilters({
                  priceRange: [0, 500],
                  rating: 0,
                  inStock: false,
                  isNew: false,
                  isBestSeller: false
                })}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCategory;