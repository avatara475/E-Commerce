// components/common/ProductCard.jsx
import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiStar, FiShoppingBag } from 'react-icons/fi';
import ConfirmModal from './ConfirmModal';

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  className = '' 
}) => {
  const {
    id,
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    image,
    isNew,
    isBestSeller,
    colors,
    inStock
  } = product;

   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleEdit = () => {
    onEdit(product);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setIsDeleteModalOpen(false);
    }
  };


  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      {/* Product Image */}
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              New
            </span>
          )}
          {isBestSeller && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="absolute top-2 right-2">
          {inStock ? (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
              In Stock
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <FiShoppingBag className="text-xs" />
          <span>{category}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <FiStar className="text-yellow-400 fill-current" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-600">Colors:</span>
          <div className="flex gap-1">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          {originalPrice > price && (
            <span className="text-lg text-gray-500 line-through">${originalPrice}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiEdit className="text-sm" />
            Edit
          </button>
          <button
             onClick={handleDeleteClick}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiTrash2 className="text-sm" />
            Delete
          </button>
        </div>
      </div>
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ProductCard;