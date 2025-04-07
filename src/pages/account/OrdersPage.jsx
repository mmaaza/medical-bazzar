import React, { useState } from 'react';

const OrdersPage = () => {
  const [orders] = useState([
    {
      id: 'ORD123456',
      date: '2025-04-05',
      status: 'delivered',
      total: 199.99,
      items: [
        { id: 1, name: 'Digital Thermometer', quantity: 1, price: 29.99 },
        { id: 2, name: 'Blood Pressure Monitor', quantity: 1, price: 169.99 }
      ]
    },
    {
      id: 'ORD123455',
      date: '2025-04-01',
      status: 'processing',
      total: 89.99,
      items: [
        { id: 3, name: 'Pulse Oximeter', quantity: 1, price: 89.99 }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">My Orders</h2>
        <div className="text-sm text-gray-500">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-mobile p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="space-y-2 md:space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-3">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Track Order
                </button>
                <button className="text-sm font-medium text-primary-500 hover:text-primary-600">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-mobile">
          <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;