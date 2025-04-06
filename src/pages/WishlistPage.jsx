import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const WishlistPage = () => {
  const { currentUser } = useAuth();

  // This would typically come from your backend/state management
  const wishlistItems = [
    { id: 1, name: 'Digital Thermometer', price: 29.99, image: 'https://placehold.co/300x300?text=Thermometer', rating: 4.5, reviews: 128, discount: 20 },
    { id: 2, name: 'Blood Pressure Monitor', price: 89.99, image: 'https://placehold.co/300x300?text=BP+Monitor', rating: 4.8, reviews: 356, discount: 0 },
    { id: 3, name: 'Pulse Oximeter', price: 49.99, image: 'https://placehold.co/300x300?text=Oximeter', rating: 4.7, reviews: 245, discount: 15 }
  ];

  const handleRemoveFromWishlist = (itemId) => {
    // Implementation for removing item from wishlist
    console.log('Removing item:', itemId);
  };

  const handleAddToCart = (itemId) => {
    // Implementation for adding item to cart
    console.log('Adding to cart:', itemId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">My Wishlist</h2>
          <p className="text-sm text-gray-500">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved to your wishlist
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-mobile hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-5 h-5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <Link 
                    to={`/product/${item.id}`}
                    className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center mt-2 mb-4">
                    <div className="flex text-accent-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-accent-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({item.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {item.discount > 0 ? (
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900">
                            ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-mobile">
            <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Browse our products and add items to your wishlist</p>
            <Link
              to="/products"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-md text-sm font-medium transition duration-300"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;