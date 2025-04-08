import React, { useState } from 'react';

// Permission management modal component
const PermissionModal = ({ isOpen, onClose, user }) => {
  const [permissions, setPermissions] = useState({
    dashboard: user?.permissions?.dashboard || false,
    users: user?.permissions?.users || false,
    products: user?.permissions?.products || false,
    orders: user?.permissions?.orders || false,
    content: user?.permissions?.content || false,
    settings: user?.permissions?.settings || false,
  });

  if (!isOpen) return null;

  const permissionsList = [
    { id: 'dashboard', label: 'Dashboard Access', description: 'View and interact with the admin dashboard' },
    { id: 'users', label: 'User Management', description: 'Create, edit, and delete user accounts' },
    { id: 'products', label: 'Product Management', description: 'Manage product catalog and inventory' },
    { id: 'orders', label: 'Order Management', description: 'View and process customer orders' },
    { id: 'content', label: 'Content Management', description: 'Manage blog posts and media content' },
    { id: 'settings', label: 'System Settings', description: 'Configure system-wide settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Manage Permissions - {user.name}</h3>
            <p className="mt-1 text-sm text-gray-500">Configure access permissions for this user</p>
          </div>

          <div className="space-y-4">
            {permissionsList.map((permission) => (
              <div key={permission.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={permission.id}
                    type="checkbox"
                    checked={permissions[permission.id]}
                    onChange={(e) => setPermissions(prev => ({
                      ...prev,
                      [permission.id]: e.target.checked
                    }))}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor={permission.id} className="font-medium text-gray-700">
                    {permission.label}
                  </label>
                  <p className="text-sm text-gray-500">{permission.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Save permissions logic here
                onClose();
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced UserRow component with permission indicators
const UserRow = ({ user, onManagePermissions, isSelected, onSelect }) => {
  const permissionCount = Object.values(user.permissions || {}).filter(Boolean).length;
  
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(user.id, e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-medium text-sm">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.role === 'super_admin' ? 'bg-purple-100 text-purple-800' :
          user.role === 'admin' ? 'bg-red-100 text-red-800' :
          user.role === 'editor' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {user.role.replace('_', ' ')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            permissionCount > 4 ? 'bg-green-100 text-green-800' :
            permissionCount > 2 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {permissionCount} Permissions
          </span>
          <button 
            onClick={() => onManagePermissions(user)}
            className="text-primary-600 hover:text-primary-900 text-sm font-medium"
          >
            Manage
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center space-x-3 justify-end">
          <button className="text-primary-600 hover:text-primary-900">Edit</button>
          <button 
            onClick={() => onManagePermissions(user)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Permissions
          </button>
          {user.role !== 'super_admin' && (
            <button className="text-red-600 hover:text-red-900">Delete</button>
          )}
        </div>
      </td>
    </tr>
  );
};

const UsersPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastActive: '2h ago',
      permissions: {
        dashboard: true,
        users: true,
        products: true,
        orders: true,
        content: false,
        settings: false,
      },
    },
    // Add more mock users as needed
  ]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleManagePermissions = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleBulkAction = (action) => {
    // Implement bulk actions logic here
    console.log(`Bulk action ${action} for users:`, selectedUsers);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor user accounts
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New User
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {selectedUsers.length} users selected
            </span>
            <div className="space-x-3">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-md hover:bg-yellow-200"
              >
                Deactivate
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
            <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Role
            </label>
            <div className="relative">
              <select
                id="role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full appearance-none rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-900 shadow-sm hover:border-primary-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="all">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="moderator">Moderator</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="search-users" className="block text-sm font-medium text-gray-700 mb-2">
              Search Users
            </label>
            <div className="relative">
              <input
                id="search-users"
                type="text"
                placeholder="Search by name, email, or role..."
                className="w-full rounded-lg border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 shadow-sm hover:border-primary-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
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

      {/* Users Table */}
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
                        setSelectedUsers(users.map(u => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <UserRow 
                  key={user.id} 
                  user={user}
                  isSelected={selectedUsers.includes(user.id)}
                  onSelect={(id, checked) => {
                    if (checked) {
                      setSelectedUsers(prev => [...prev, id]);
                    } else {
                      setSelectedUsers(prev => prev.filter(userId => userId !== id));
                    }
                  }}
                  onManagePermissions={handleManagePermissions}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Management Modal */}
      <PermissionModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersPage;