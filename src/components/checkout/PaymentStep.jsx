import React, { useState } from 'react';

const PaymentStep = ({ onBack, onComplete, orderSummary }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ paymentMethod });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-mobile p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Methods */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300"
              />
              <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                Cash on Delivery
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="khalti"
                name="paymentMethod"
                value="khalti"
                checked={paymentMethod === 'khalti'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300"
              />
              <label htmlFor="khalti" className="ml-3 block text-sm font-medium text-gray-700">
                Khalti
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="esewa"
                name="paymentMethod"
                value="esewa"
                checked={paymentMethod === 'esewa'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300"
              />
              <label htmlFor="esewa" className="ml-3 block text-sm font-medium text-gray-700">
                eSewa
              </label>
            </div>
          </div>

          {/* Order Summary */}
          {orderSummary && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-base font-medium text-gray-900 mb-3">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>${orderSummary.shipping?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${orderSummary.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-1/2 bg-gray-100 text-gray-600 hover:bg-gray-200 py-3 px-4 rounded-md text-sm font-medium transition duration-300"
            >
              Back to Shipping
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-md text-sm font-medium transition duration-300"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentStep;