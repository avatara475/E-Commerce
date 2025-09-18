import { motion } from 'framer-motion';


const Wishlist = () => {

  return (
    <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">❤️</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8">Save your favorite items here for later.</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Start Shopping
              </button>
            </motion.div>
  )
}

export default Wishlist