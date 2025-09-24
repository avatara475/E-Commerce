// components/common/EditProductModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiUpload, FiPlus, FiTrash2, FiImage } from 'react-icons/fi';

const EditProductModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    rating: '',
    reviewCount: '',
    image: '',
    isNew: false,
    isBestSeller: false,
    colors: [],
    inStock: true,
    details: []
  });

  const [newColor, setNewColor] = useState('');
  const [newDetail, setNewDetail] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        rating: product.rating || '',
        reviewCount: product.reviewCount || '',
        image: product.image || '',
        isNew: product.isNew || false,
        isBestSeller: product.isBestSeller || false,
        colors: product.colors || [],
        inStock: product.inStock !== undefined ? product.inStock : true,
        details: product.details || []
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }));
      setNewColor('');
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }));
  };

  const handleAddDetail = () => {
    if (newDetail) {
      setFormData(prev => ({
        ...prev,
        details: [...prev.details, newDetail]
      }));
      setNewDetail('');
    }
  };

  const handleRemoveDetail = (detailToRemove) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter(detail => detail !== detailToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...product,
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount)
    });
  };

  const handleKeyPress = (e, callback) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: -50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiImage className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                  <p className="text-gray-600">Update product information</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-2 hover:bg-white"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={24} />
              </motion.button>
            </div>

            {/* Form */}
            <div className="max-h-[calc(95vh-140px)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={itemVariants}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Bags">Bags</option>
                      <option value="Beauty">Beauty</option>
                    </select>
                  </div>
                </motion.div>

                {/* Pricing */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={itemVariants}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Original Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </motion.div>

                {/* Ratings */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={itemVariants}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating (0-5) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Review Count *
                    </label>
                    <input
                      type="number"
                      name="reviewCount"
                      value={formData.reviewCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </motion.div>

                {/* Image URL */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL *
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    {formData.image && (
                      <div className="w-16 h-16 rounded-lg border overflow-hidden">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Colors */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Colors
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, handleAddColor)}
                      placeholder="Enter color name or hex code"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <motion.button
                      type="button"
                      onClick={handleAddColor}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiPlus size={18} />
                      Add
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {formData.colors.map((color, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        layout
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm font-medium">{color}</span>
                        <motion.button
                          type="button"
                          onClick={() => handleRemoveColor(color)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <FiTrash2 size={14} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Details
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newDetail}
                      onChange={(e) => setNewDetail(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, handleAddDetail)}
                      placeholder="Add a product detail"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <motion.button
                      type="button"
                      onClick={handleAddDetail}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiPlus size={18} />
                      Add
                    </motion.button>
                  </div>
                  <div className="space-y-2">
                    {formData.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        layout
                      >
                        <span className="text-sm">{detail}</span>
                        <motion.button
                          type="button"
                          onClick={() => handleRemoveDetail(detail)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <FiTrash2 size={16} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Checkboxes */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-xl"
                  variants={itemVariants}
                >
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="isNew"
                        checked={formData.isNew}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        formData.isNew ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        formData.isNew ? 'transform translate-x-6' : ''
                      }`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      New Product
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="isBestSeller"
                        checked={formData.isBestSeller}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        formData.isBestSeller ? 'bg-orange-500' : 'bg-gray-300'
                      }`} />
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        formData.isBestSeller ? 'transform translate-x-6' : ''
                      }`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Best Seller
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        formData.inStock ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        formData.inStock ? 'transform translate-x-6' : ''
                      }`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      In Stock
                    </span>
                  </label>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-4 pt-6 border-t border-gray-200"
                  variants={itemVariants}
                >
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold cursor-pointer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiSave size={20} />
                    Save Changes
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProductModal;