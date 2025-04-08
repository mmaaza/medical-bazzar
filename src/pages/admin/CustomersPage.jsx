import React, { useState } from 'react';

const CustomerRow = ({ customer, isSelected, onSelect }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(customer.id, e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-medium text-sm">
                {customer.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
            <div className="text-sm text-gray-500">{customer.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">{customer.totalOrders}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">Rs. {customer.totalSpent}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          customer.status === 'active' ? 'bg-green-100 text-green-800' : 
          customer.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {customer.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(customer.lastPurchase).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center space-x-3 justify-end">
          <button className="text-primary-600 hover:text-primary-900">View Orders</button>
          <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
          <button className="text-red-600 hover:text-red-900">Delete</button>
        </div>
      </td>
    </tr>
  );
};

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      totalOrders: 15,
      totalSpent: 25000,
      status: 'active',
      lastPurchase: '2025-04-01',
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      totalOrders: 8,
      totalSpent: 12000,
      status: 'active',
      lastPurchase: '2025-03-28',
    },
    // Add more mock customers as needed
  ]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleBulkAction = (action) => {
    // Implement bulk actions logic here
    console.log(`Bulk action ${action} for customers:`, selectedCustomers);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your customer base and view customer information
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Customer
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {selectedCustomers.length} customers selected
            </span>
            <div className="space-x-3">
              <button
                onClick={() => handleBulkAction('export')}
                className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
              >
                Export
              </button>
              <button
                onClick={() => handleBulkAction('email')}
                className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
              >
                Email
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white shadow-mobile rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-56">
            <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <div className="relative">
              <select
                id="status-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border appearance-none rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-900 shadow-sm hover:border-primary-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="search-customers" className="block text-sm font-medium text-gray-700 mb-2">
              Search Customers
            </label>
            <div className="relative">
              <input
                id="search-customers"
                type="text"
                placeholder="Search by name, email, or order ID..."
                className="w-full border rounded-lg border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 shadow-sm hover:border-primary-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-mobile rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCustomers(customers.map(c => c.id));
                      } else {
                        setSelectedCustomers([]);
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Purchase
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  isSelected={selectedCustomers.includes(customer.id)}
                  onSelect={(id, checked) => {
                    if (checked) {
                      setSelectedCustomers(prev => [...prev, id]);
                    } else {
                      setSelectedCustomers(prev => prev.filter(customerId => customerId !== id));
                    }
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;