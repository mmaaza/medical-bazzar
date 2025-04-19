import React, { useState } from 'react';

const OrdersPage = () => {
  const [orders] = useState([
    {
      id: 'ORD123456',
      date: '2025-04-08',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+977-9841234567'
      },
      status: 'processing',
      paymentStatus: 'paid',
      total: 399.99,
      items: [
        { id: 1, name: 'Digital Thermometer', quantity: 2, price: 29.99 },
        { id: 2, name: 'Blood Pressure Monitor', quantity: 1, price: 169.99 },
        { id: 3, name: 'Pulse Oximeter', quantity: 2, price: 85.00 }
      ]
    },
    {
      id: 'ORD123455',
      date: '2025-04-07',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+977-9857654321'
      },
      status: 'delivered',
      paymentStatus: 'paid',
      total: 259.99,
      items: [
        { id: 4, name: 'First Aid Kit', quantity: 1, price: 89.99 },
        { id: 5, name: 'Medical Stethoscope', quantity: 1, price: 170.00 }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return 'bg-admin-slate-100 dark:bg-admin-slate-700/50 text-admin-slate-800 dark:text-admin-slate-300';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return 'bg-admin-slate-100 dark:bg-admin-slate-700/50 text-admin-slate-800 dark:text-admin-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-admin-slate-800 to-admin-slate-700 dark:from-admin-slate-900 dark:to-admin-slate-800 p-8">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="mt-1 text-sm text-admin-slate-200">
            Manage and track all orders
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
      </div>

      {/* Search and Export */}
      <div className="flex items-center justify-between">
        <div className="relative max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-admin-slate-400 dark:text-admin-slate-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-admin-slate-200 dark:border-admin-slate-700 pl-10 pr-3 py-2 text-sm placeholder-admin-slate-500 dark:placeholder-admin-slate-400 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 focus:border-admin-ucla-500 focus:ring-admin-ucla-500"
            placeholder="Search orders..."
          />
        </div>
        <button className="px-4 py-2 bg-admin-ucla-500 hover:bg-admin-ucla-600 text-white rounded-lg text-sm font-medium transition-colors duration-200">
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-admin-slate-800 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <select className="block w-full rounded-lg border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 py-2 pl-3 pr-10 text-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500">
            <option>All Orders</option>
            <option>Processing</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <select className="block w-full rounded-lg border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 py-2 pl-3 pr-10 text-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500">
            <option>Payment Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <input
            type="date"
            className="block w-full rounded-lg border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 py-2 pl-3 pr-10 text-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500"
            placeholder="Start Date"
          />
          <input
            type="date"
            className="block w-full rounded-lg border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 py-2 pl-3 pr-10 text-sm focus:border-admin-ucla-500 focus:ring-admin-ucla-500"
            placeholder="End Date"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-admin-slate-800 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-admin-slate-200 dark:divide-admin-slate-700">
            <thead className="bg-admin-slate-50 dark:bg-admin-slate-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-admin-slate-800 divide-y divide-admin-slate-200 dark:divide-admin-slate-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-admin-ucla-100 dark:bg-admin-ucla-500/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-admin-ucla-600 dark:text-admin-ucla-400">
                          {order.customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100">
                          {order.customer.name}
                        </div>
                        <div className="text-sm text-admin-slate-500 dark:text-admin-slate-400">
                          {order.customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-admin-slate-900 dark:text-admin-slate-100">
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100">
                      ${order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button className="text-admin-ucla-600 hover:text-admin-ucla-700 dark:text-admin-ucla-400 dark:hover:text-admin-ucla-300">
                      View
                    </button>
                    <button className="text-admin-slate-500 hover:text-admin-slate-600 dark:text-admin-slate-400 dark:hover:text-admin-slate-300">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center">
          <p className="text-sm text-admin-slate-700 dark:text-admin-slate-400">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">20</span> results
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-admin-slate-200 dark:border-admin-slate-700 text-sm font-medium rounded-lg text-admin-slate-700 dark:text-admin-slate-200 bg-white dark:bg-admin-slate-800 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700/50">
            Previous
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-admin-slate-200 dark:border-admin-slate-700 text-sm font-medium rounded-lg text-admin-slate-700 dark:text-admin-slate-200 bg-white dark:bg-admin-slate-800 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700/50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;