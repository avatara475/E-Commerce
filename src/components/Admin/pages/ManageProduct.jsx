// pages/ManageProduct.jsx
import React, { useState } from 'react';
import ProductCard from '../common/ProductCard';
import EditProductModal from '../component/EditProductModal';
import productData from '../../Products.json';
import { FiSearch } from "react-icons/fi";

const ManageProduct = () => {
  const [products, setProducts] = useState(productData.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query,setQuery] = useState("")
  const [categoryQuery,setCategoryQuery] = useState("")

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId) => {
   
      setProducts(products.filter(product => product.id !== productId));
    
  };

  const handleSave = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const FilterData = products.filter(u=>{
    return(
    (
      u.name.toLowerCase().includes(query.toLowerCase().trim()) ||
      String(u.price).toLowerCase().includes(query.toLowerCase().trim()) ||
      String(u.rating).toLowerCase().includes(query.toLowerCase().trim()) 
    ) &&
      u.category.toLowerCase().includes(categoryQuery.toLowerCase().trim())
    )
})

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600 mt-2">
            Manage your product inventory, edit details, and remove products
          </p>
        </div>

        <div className='sm:flex justify-between p-3 gap-5 space-y-1 sm:space-x-0'>
            <select name="" id="" className='border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0289de] focus:border-transparent p-3 mx-auto' value={categoryQuery} onChange={(e)=>setCategoryQuery(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Footwear">Footwear</option>
                <option value="Groceries">Groceries</option>                 
                <option value="Beauty">Beauty</option>
            </select>

            <form  className="flex w-full" onSubmit={(e)=> e.preventDefault()}>
                            <input
                              type="text"
                              placeholder="Search for products..."
                              value={query}
                              onChange={(e)=>setQuery(e.target.value)}
                              className="flex-1 px-4 py-2 min-w-5 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0289de] focus:border-transparent"
                            />
                            <button
                              className="bg-[#0289de] hover:bg-[#007ac7] text-white px-4 py-2 rounded-r-lg transition-colors"
                            >
                              <FiSearch className="h-5 w-5" />
                            </button>
            </form>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FilterData.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Add some products to get started</p>
          </div>
        )}

        {/* Edit Product Modal */}
        <EditProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default ManageProduct;