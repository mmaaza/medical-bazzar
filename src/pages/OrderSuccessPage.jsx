import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="bg-white rounded-lg shadow-mobile p-8">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll send you a confirmation email with your order details.
          </p>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Order Number:</span>
                <span className="text-sm font-medium text-gray-900">#ORD12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estimated Delivery:</span>
                <span className="text-sm font-medium text-gray-900">3-5 Business Days</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/account/orders"
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-md text-sm font-medium transition duration-300"
            >
              View Order
            </Link>
            <Link
              to="/"
              className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 py-3 px-4 rounded-md text-sm font-medium transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;