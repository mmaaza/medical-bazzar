import React, { useState } from 'react';

const ProductsPage = () => {
  // Sample product data - would come from your backend in production
  const [products] = useState([
    {
      id: 1,
      name: 'Digital Thermometer',
      category: 'Diagnostic Devices',
      price: 29.99,
      stock: 150,
      status: 'active',
      image: 'https://placehold.co/300x300?text=Thermometer'
    },
    {
      id: 2,
      name: 'Blood Pressure Monitor',
      category: 'Diagnostic Devices',
      price: 89.99,
      stock: 75,
      status: 'active',
      image: 'https://placehold.co/300x300?text=BP+Monitor'
    },
    {
      id: 3,
      name: 'Pulse Oximeter',
      category: 'Diagnostic Devices',
      price: 49.99,
      stock: 200,
      status: 'low',
      image: 'https://placehold.co/300x300?text=Oximeter'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'low':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'out':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return 'bg-admin-slate-100 dark:bg-admin-slate-800 text-admin-slate-800 dark:text-admin-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-admin-slate-900 dark:text-admin-slate-100">Products</h1>
          <p className="mt-1 text-sm text-admin-slate-600 dark:text-admin-slate-400">Manage your medical supplies inventory</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-admin-ucla-500 hover:bg-admin-ucla-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admin-ucla-500 transition duration-300">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-admin-slate-800 shadow-sm rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-56">
            <label htmlFor="category-select" className="block text-sm font-medium text-admin-slate-600 dark:text-admin-slate-400 mb-2">
              Filter by Category
            </label>
            <div className="relative">
              <select
                id="category-select"
                className="w-full appearance-none rounded-lg border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 py-2.5 pl-4 pr-10 text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100 shadow-sm hover:border-admin-ucla-500 focus:border-admin-ucla-500 focus:outline-none focus:ring-1 focus:ring-admin-ucla-500"
              >
                <option value="all">All Categories</option>
                <option value="diagnostic">Diagnostic Devices</option>
                <option value="hospital">Hospital Equipment</option>
                <option value="laboratory">Laboratory Supplies</option>
                <option value="disposables">Medical Disposables</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-admin-slate-400 dark:text-admin-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-56">
            <label htmlFor="status-select" className="block text-sm font-medium text-admin-slate-600 dark:text-admin-slate-400 mb-2">
              Filter by Status
            </label>
            <div className="relative">
              <select
                id="status-select"
                className="w-full appearance-none rounded-lg border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 py-2.5 pl-4 pr-10 text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100 shadow-sm hover:border-admin-ucla-500 focus:border-admin-ucla-500 focus:outline-none focus:ring-1 focus:ring-admin-ucla-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-admin-slate-400 dark:text-admin-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="search-products" className="block text-sm font-medium text-admin-slate-600 dark:text-admin-slate-400 mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                id="search-products"
                placeholder="Search by name, category or ID..."
                className="w-full rounded-lg border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 py-2.5 pl-10 pr-4 text-sm text-admin-slate-900 dark:text-admin-slate-100 placeholder-admin-slate-400 dark:placeholder-admin-slate-500 shadow-sm hover:border-admin-ucla-500 focus:border-admin-ucla-500 focus:outline-none focus:ring-1 focus:ring-admin-ucla-500"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-admin-slate-400 dark:text-admin-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-admin-slate-800 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-admin-slate-200 dark:divide-admin-slate-700">
            <thead className="bg-admin-slate-50 dark:bg-admin-slate-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-admin-slate-800 divide-y divide-admin-slate-200 dark:divide-admin-slate-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt={product.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100">{product.name}</div>
                        <div className="text-sm text-admin-slate-500 dark:text-admin-slate-400">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-admin-slate-900 dark:text-admin-slate-100">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-admin-slate-900 dark:text-admin-slate-100">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-admin-slate-900 dark:text-admin-slate-100">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-admin-ucla-500 hover:text-admin-ucla-600 dark:text-admin-ucla-400 dark:hover:text-admin-ucla-300 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-admin-slate-800 px-4 py-3 flex items-center justify-between border-t border-admin-slate-200 dark:border-admin-slate-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-admin-slate-200 dark:border-admin-slate-700 text-sm font-medium rounded-md text-admin-slate-700 dark:text-admin-slate-200 bg-white dark:bg-admin-slate-800 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-admin-slate-200 dark:border-admin-slate-700 text-sm font-medium rounded-md text-admin-slate-700 dark:text-admin-slate-200 bg-white dark:bg-admin-slate-800 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-admin-slate-700 dark:text-admin-slate-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-sm font-medium text-admin-slate-500 dark:text-admin-slate-400 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-sm font-medium text-admin-slate-700 dark:text-admin-slate-200 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-sm font-medium text-admin-slate-700 dark:text-admin-slate-200 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-sm font-medium text-admin-slate-700 dark:text-admin-slate-200 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-sm font-medium text-admin-slate-500 dark:text-admin-slate-400 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;