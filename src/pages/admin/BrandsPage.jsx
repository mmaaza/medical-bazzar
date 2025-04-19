import React, { useState } from 'react';

const BrandsPage = () => {
  // Sample brand data - would come from your backend in production
  const [brands] = useState([
    {
      id: 1,
      name: 'Philips Healthcare',
      slug: 'philips-healthcare',
      description: 'Leading healthcare technology company',
      productsCount: 120,
      status: 'active',
      logo: 'https://placehold.co/300x300?text=Philips',
      country: 'Netherlands'
    },
    {
      id: 2,
      name: 'Siemens Healthineers',
      slug: 'siemens-healthineers',
      description: 'Medical technology solutions provider',
      productsCount: 95,
      status: 'active',
      logo: 'https://placehold.co/300x300?text=Siemens',
      country: 'Germany'
    },
    {
      id: 3,
      name: 'GE Healthcare',
      slug: 'ge-healthcare',
      description: 'Global medical technology company',
      productsCount: 150,
      status: 'active',
      logo: 'https://placehold.co/300x300?text=GE',
      country: 'USA'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-admin-slate-900 dark:text-admin-slate-100">Brands</h1>
          <p className="mt-1 text-sm text-admin-slate-600 dark:text-admin-slate-400">
            Manage medical equipment brands
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-admin-ucla-500 hover:bg-admin-ucla-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admin-ucla-500 dark:focus:ring-offset-admin-slate-800 transition duration-300">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Brand
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-admin-slate-800 shadow-sm rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-56">
            <label htmlFor="status-select" className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
              Filter by Status
            </label>
            <div className="relative">
              <select
                id="status-select"
                className="w-full appearance-none rounded-lg border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 py-2.5 pl-4 pr-10 text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100 shadow-sm hover:border-admin-ucla-500 focus:border-admin-ucla-500 focus:outline-none focus:ring-1 focus:ring-admin-ucla-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-admin-slate-400 dark:text-admin-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="search-brands" className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
              Search Brands
            </label>
            <div className="relative">
              <input
                type="text"
                id="search-brands"
                placeholder="Search by name, country or ID..."
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

      {/* Brands Table */}
      <div className="bg-white dark:bg-admin-slate-800 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-admin-slate-200 dark:divide-admin-slate-700">
            <thead className="bg-admin-slate-50 dark:bg-admin-slate-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Country
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Products
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
              {brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-lg object-cover" src={brand.logo} alt={brand.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100">{brand.name}</div>
                        <div className="text-sm text-admin-slate-500 dark:text-admin-slate-400">{brand.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-admin-slate-900 dark:text-admin-slate-100">{brand.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-admin-slate-900 dark:text-admin-slate-100">
                    {brand.productsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                      {brand.status}
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
      </div>

      {/* Pagination */}
      <div className="bg-white dark:bg-admin-slate-800 px-4 py-3 flex items-center justify-between border-t border-admin-slate-200 dark:border-admin-slate-700 sm:px-6 rounded-lg">
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
              <span className="font-medium">20</span> results
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
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-sm font-medium text-admin-slate-500 dark:text-admin-slate-400 hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;