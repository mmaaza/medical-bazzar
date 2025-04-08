import React from 'react';

const StatCard = ({ title, value, icon, trend, trendValue }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 relative overflow-hidden">
    <div className="absolute right-0 top-0 w-24 h-24 opacity-10 transform translate-x-8 -translate-y-8">
      {icon}
    </div>
    <div className="relative z-10">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg shadow-sm">
          <div className="text-primary-600">
            {icon}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'} bg-${trend === 'up' ? 'green' : 'red'}-50 px-2 py-1 rounded-full`}>
              <span className="text-sm font-medium">{trendValue}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={trend === 'up' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const RecentOrderRow = ({ order }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-900">#{order.id}</span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-xs font-medium">{order.customer.charAt(0)}</span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{order.customer}</p>
          <p className="text-xs text-gray-500">{order.email}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="text-sm text-gray-900">${order.amount}</span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'}`}>
        {order.status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {order.date}
    </td>
  </tr>
);

const AdminDashboard = () => {
  // Sample data - replace with real data from your backend
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      trend: 'up',
      trendValue: '12%',
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Orders',
      value: '156',
      trend: 'up',
      trendValue: '8%',
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: 'Customers',
      value: '2,345',
      trend: 'up',
      trendValue: '5%',
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Products',
      value: '450',
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: '299.99',
      status: 'Completed',
      date: 'Apr 8, 2025'
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: '199.99',
      status: 'Processing',
      date: 'Apr 8, 2025'
    },
    {
      id: 'ORD003',
      customer: 'Bob Wilson',
      email: 'bob@example.com',
      amount: '499.99',
      status: 'Pending',
      date: 'Apr 7, 2025'
    },
    {
      id: 'ORD004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      amount: '149.99',
      status: 'Completed',
      date: 'Apr 7, 2025'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track, manage, and analyze your business metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-mobile rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm font-medium text-primary-500 hover:text-primary-600">
              View all
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <RecentOrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Products */}
        <div className="bg-white shadow-mobile rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Products</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Product Name</h3>
                  <p className="text-sm text-gray-500">Category</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$99.99</p>
                  <p className="text-xs text-green-600">+12% sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-mobile rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New order placed</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;