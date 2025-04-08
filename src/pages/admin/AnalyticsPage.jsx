import React from 'react';

const StatCard = ({ title, value, trend, trendValue, icon }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 relative overflow-hidden">
    {/* Icon Background */}
    <div className="absolute right-0 top-0 w-24 h-24 opacity-10 transform translate-x-8 -translate-y-8">
      {icon}
    </div>
    
    {/* Content */}
    <div className="relative z-10">
      <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg inline-block">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-500 mt-4 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      
      {/* Trend Indicator */}
      <div className={`flex items-center space-x-1 mt-2 ${
        trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
      } px-2 py-1 rounded-full inline-flex`}>
        {trend === 'up' ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
          </svg>
        )}
        <span className="text-sm font-medium">{trendValue}</span>
      </div>
    </div>
  </div>
);

const AnalyticsPage = () => {
  // This data would typically come from your backend
  const stats = [
    {
      title: 'Total Revenue',
      value: 'NPR 2.4M',
      trend: 'up',
      trendValue: '+12.5%',
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Total Orders',
      value: '1,248',
      trend: 'up',
      trendValue: '+8.2%',
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: 'Active Users',
      value: '856',
      trend: 'up',
      trendValue: '+18.3%',
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Average Order Value',
      value: 'NPR 2,560',
      trend: 'down',
      trendValue: '-2.1%',
      icon: (
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="mt-1 text-sm text-gray-500">View detailed statistics and insights</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <select className="w-full sm:w-auto appearance-none bg-white py-2 pl-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-medium text-gray-700 rounded-lg cursor-pointer hover:border-gray-400 transition-colors duration-200">
            <option className="py-2">Last 7 days</option>
            <option className="py-2">Last 30 days</option>
            <option className="py-2">Last 90 days</option>
            <option className="py-2">This year</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Revenue chart will be implemented here</p>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Statistics</h3>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Orders chart will be implemented here</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <button className="text-sm font-medium text-primary-500 hover:text-primary-600">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <p className="text-gray-500 text-sm">Activity feed will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;