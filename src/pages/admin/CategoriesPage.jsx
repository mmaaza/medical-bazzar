import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useLoading } from '../../contexts/LoadingContext';
import MediaUploadButton from '../../components/ui/MediaUploadButton';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === 'error' 
    ? 'bg-red-100 dark:bg-red-900/30' 
    : 'bg-green-100 dark:bg-green-900/30';
  const textColor = type === 'error' 
    ? 'text-red-800 dark:text-red-400' 
    : 'text-green-800 dark:text-green-400';
  const borderColor = type === 'error' 
    ? 'border-red-300 dark:border-red-700' 
    : 'border-green-300 dark:border-green-700';
  const iconColor = type === 'error' 
    ? 'text-red-400 dark:text-red-300' 
    : 'text-green-400 dark:text-green-300';

  return (
    <div className={`rounded-md ${bgColor} p-4 mb-4 border ${borderColor}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'error' ? (
            <svg className={`h-5 w-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className={`h-5 w-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 ${textColor} hover:bg-${type === 'error' ? 'red' : 'green'}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type === 'error' ? 'red' : 'green'}-500`}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryModal = ({ isOpen, onClose, mode, selectedCategory, categories, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentId: '',
    status: 'active',
    image: ''
  });

  useEffect(() => {
    if (mode === 'add' && selectedCategory) {
      setFormData({
        name: '',
        description: '',
        parentId: selectedCategory._id,
        status: 'active',
        image: ''
      });
    } else if (selectedCategory && mode === 'edit') {
      setFormData({
        name: selectedCategory.name || '',
        description: selectedCategory.description || '',
        parentId: selectedCategory.parentId || '',
        status: selectedCategory.status || 'active',
        image: selectedCategory.image || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        parentId: '',
        status: 'active',
        image: ''
      });
    }
  }, [selectedCategory, mode]);

  const handleMediaSelect = (media) => {
    setFormData(prev => ({
      ...prev,
      image: media.url
    }));
  };

  if (!isOpen) return null;

  const getFlatCategories = (cats = [], level = 0, prefix = '') => {
    if (!Array.isArray(cats)) return [];
    
    return cats.flatMap(cat => {
      const flatCat = {
        _id: cat._id,
        name: prefix + cat.name,
        level
      };
      if (cat.children?.length > 0) {
        return [flatCat, ...getFlatCategories(cat.children, level + 1, prefix + '── ')];
      }
      return [flatCat];
    });
  };

  const getAvailableParents = () => {
    if (!selectedCategory) return getFlatCategories(categories);
    return getFlatCategories(categories).filter(cat => 
      cat._id !== selectedCategory._id && 
      !selectedCategory.ancestors?.includes(cat._id)
    );
  };

  return (
    <div className="fixed inset-0 z-overlay flex items-start justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-admin-slate-900/50"></div>
      <div className="relative w-full max-w-3xl my-8 mx-auto p-4">
        <div className="bg-white dark:bg-admin-slate-800 rounded-lg shadow-xl relative">
          <div className="flex justify-between items-center px-6 py-4 border-b border-admin-slate-200 dark:border-admin-slate-700">
            <h3 className="text-xl font-bold text-admin-slate-900 dark:text-admin-slate-100">
              {mode === 'add' ? 'Add New Category' : 'Edit Category'}
            </h3>
            <button 
              onClick={onClose} 
              className="text-admin-slate-400 dark:text-admin-slate-500 hover:text-admin-slate-500 dark:hover:text-admin-slate-400 focus:outline-none focus:ring-2 focus:ring-admin-ucla-500 focus:ring-offset-2 dark:focus:ring-offset-admin-slate-800 rounded-full p-1"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }} className="p-6 space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-1.5">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 text-sm focus:ring-2 focus:ring-admin-ucla-500 focus:border-admin-ucla-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-1.5">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 text-sm focus:ring-2 focus:ring-admin-ucla-500 focus:border-admin-ucla-500 transition-colors resize-none"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-1.5">Parent Category</label>
                <div className="relative">
                  <select
                    value={formData.parentId}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 text-sm focus:ring-2 focus:ring-admin-ucla-500 focus:border-admin-ucla-500 transition-colors appearance-none"
                  >
                    <option value="">None (Top Level)</option>
                    {getAvailableParents().map(cat => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-admin-slate-400 dark:text-admin-slate-500">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-1.5">Status</label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-admin-slate-200 dark:border-admin-slate-700 bg-white dark:bg-admin-slate-800 text-admin-slate-900 dark:text-admin-slate-100 text-sm focus:ring-2 focus:ring-admin-ucla-500 focus:border-admin-ucla-500 transition-colors appearance-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-admin-slate-400 dark:text-admin-slate-500">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-1.5">Category Image</label>
                <div className="space-y-3">
                  {formData.image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <img 
                        src={formData.image} 
                        alt="Category preview" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-1 right-1 p-1 bg-red-500 dark:bg-red-600 rounded-full text-white hover:bg-red-600 dark:hover:bg-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <MediaUploadButton
                    onSelect={handleMediaSelect}
                    selectedMedia={formData.image}
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-admin-slate-200 dark:border-admin-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 bg-white dark:bg-admin-slate-800 border border-admin-slate-300 dark:border-admin-slate-600 rounded-md shadow-sm hover:bg-admin-slate-50 dark:hover:bg-admin-slate-700 focus:outline-none focus:ring-2 focus:ring-admin-ucla-500 focus:ring-offset-2 dark:focus:ring-offset-admin-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-admin-ucla-500 hover:bg-admin-ucla-600 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-admin-ucla-500 focus:ring-offset-2 dark:focus:ring-offset-admin-slate-800"
              >
                {mode === 'add' ? 'Create Category' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CategorySkeleton = () => {
  const rows = Array(5).fill(null);
  
  return rows.map((_, index) => (
    <tr key={index} className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-admin-slate-200 dark:bg-admin-slate-700 rounded-lg"></div>
          <div className="ml-4">
            <div className="h-4 bg-admin-slate-200 dark:bg-admin-slate-700 rounded w-32"></div>
            <div className="h-3 bg-admin-slate-200 dark:bg-admin-slate-700 rounded w-24 mt-2"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-admin-slate-200 dark:bg-admin-slate-700 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-admin-slate-200 dark:bg-admin-slate-700 rounded w-8"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-5 bg-admin-slate-200 dark:bg-admin-slate-700 rounded w-16"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex justify-end space-x-4">
          <div className="h-4 bg-admin-slate-200 dark:bg-admin-slate-700 rounded w-12"></div>
          <div className="h-4 bg-admin-slate-200 dark:bg-admin-slate-700 rounded w-24"></div>
          <div className="h-4 bg-admin-slate-200 dark:bg-admin-slate-700 rounded w-14"></div>
        </div>
      </td>
    </tr>
  ));
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const fetchCategories = async () => {
    try {
      startLoading();
      const response = await api.get('/categories', {
        params: {
          status: statusFilter === 'all' ? undefined : statusFilter
        }
      });
      setCategories(response.data.data);
    } catch (error) {
      setNotification({
        message: 'Failed to fetch categories',
        type: 'error'
      });
      console.error('Error fetching categories:', error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [statusFilter]);

  const handleSaveCategory = async (formData) => {
    try {
      // Convert empty parentId to null
      const categoryData = {
        ...formData,
        parentId: formData.parentId || null
      };

      if (modalMode === 'add') {
        await api.post('/categories', categoryData);
        setNotification({
          message: 'Category created successfully',
          type: 'success'
        });
      } else {
        await api.put(`/categories/${selectedCategory._id}`, categoryData);
        setNotification({
          message: 'Category updated successfully',
          type: 'success'
        });
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      setNotification({
        message: error.response?.data?.error || 'Operation failed',
        type: 'error'
      });
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete?._id) return;

    try {
      await api.delete(`/categories/${categoryToDelete._id}`);
      setNotification({
        message: 'Category deleted successfully',
        type: 'success'
      });
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      setNotification({
        message: 'Failed to delete category',
        type: 'error'
      });
      console.error('Error deleting category:', error);
    }
  };

  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
  
          <div className="relative bg-white dark:bg-admin-slate-800 rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 dark:bg-secondary-900 mb-4">
                <svg className="h-6 w-6 text-secondary-500 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-admin-slate-900 dark:text-admin-slate-100 text-center">Delete Category</h3>
              <p className="mt-2 text-sm text-admin-slate-500 dark:text-admin-slate-400 text-center">
                Are you sure you want to delete this category and all its subcategories? This action cannot be undone.
              </p>
            </div>
  
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-1/2 px-4 py-2 bg-admin-slate-100 dark:bg-admin-slate-700 text-admin-slate-700 dark:text-admin-slate-300 hover:bg-admin-slate-200 dark:hover:bg-admin-slate-600 rounded-md text-sm font-medium transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="w-full sm:w-1/2 px-4 py-2 bg-secondary-500 dark:bg-secondary-600 text-white hover:bg-secondary-600 dark:hover:bg-secondary-700 rounded-md text-sm font-medium transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCategories = (categories = [], level = 0) => {
    if (!categories) return [];
    
    return categories.flatMap(category => {
      if (searchQuery && !category.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !category.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return [];
      }

      const rows = [
        <tr key={category._id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div style={{ width: `${level * 24}px` }} />
              <div className="h-10 w-10 flex-shrink-0">
                <img className="h-10 w-10 rounded-lg object-cover" src={category.image} alt={category.name} />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-admin-slate-900 dark:text-admin-slate-100">
                  {level > 0 && '└─ '}{category.name}
                </div>
                <div className="text-sm text-admin-slate-500 dark:text-admin-slate-400">{category.description}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-admin-slate-900 dark:text-admin-slate-100">{category.slug}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-admin-slate-900 dark:text-admin-slate-100">
            {category.productsCount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              category.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
            }`}>
              {category.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button 
              onClick={() => {
                setSelectedCategory(category);
                setModalMode('edit');
                setIsModalOpen(true);
              }}
              className="text-admin-ucla-500 dark:text-admin-ucla-400 hover:text-admin-ucla-600 dark:hover:text-admin-ucla-300 mr-4"
            >
              Edit
            </button>
            <button 
              onClick={() => {
                setSelectedCategory(category);
                setModalMode('add');
                setIsModalOpen(true);
              }}
              className="text-admin-ucla-500 dark:text-admin-ucla-400 hover:text-admin-ucla-600 dark:hover:text-admin-ucla-300 mr-4"
            >
              Add Sub-category
            </button>
            <button 
              onClick={() => handleDeleteClick(category)}
              className="text-secondary-500 dark:text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
            >
              Delete
            </button>
          </td>
        </tr>
      ];

      if (category.children?.length > 0) {
        rows.push(...renderCategories(category.children, level + 1));
      }

      return rows;
    });
  };

  return (
    <div className="space-y-6">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />

      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-admin-slate-900 dark:text-admin-slate-100">Categories</h1>
          <p className="mt-1 text-sm text-admin-slate-600 dark:text-admin-slate-400">
            Manage your product categories
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => {
              setSelectedCategory(null);
              setModalMode('add');
              setIsModalOpen(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-admin-ucla-500 hover:bg-admin-ucla-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admin-ucla-500 dark:focus:ring-offset-admin-slate-800 transition duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-admin-slate-800 shadow-sm rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-56">
            <label htmlFor="status-select" className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
              Filter by Status
            </label>
            <div className="relative">
              <select
                id="status-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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
            <label htmlFor="search-categories" className="block text-sm font-medium text-admin-slate-700 dark:text-admin-slate-300 mb-2">
              Search Categories
            </label>
            <div className="relative">
              <input
                type="text"
                id="search-categories"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or description..."
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

      <div className="bg-white dark:bg-admin-slate-800 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-admin-slate-200 dark:divide-admin-slate-700">
            <thead className="bg-admin-slate-50 dark:bg-admin-slate-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-admin-slate-500 dark:text-admin-slate-400 uppercase tracking-wider">
                  Slug
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
              {isLoading ? <CategorySkeleton /> : renderCategories(categories)}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        selectedCategory={selectedCategory}
        categories={categories}
        onSave={handleSaveCategory}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CategoriesPage;