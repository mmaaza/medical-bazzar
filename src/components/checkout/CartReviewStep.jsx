import React from 'react';

const CartReviewStep = ({ onNext, cart = [] }) => {
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-mobile p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Your Cart</h3>
        
        {cart.length > 0 ? (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="py-4 flex justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated next</span>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Next Step Button */}
            <button
              onClick={onNext}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-md text-sm font-medium transition duration-300"
            >
              Proceed to Shipping
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500">Add items to your cart to continue shopping</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartReviewStep;