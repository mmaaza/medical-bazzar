import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';

const FormField = ({ label, name, type = "text", value, onChange, placeholder, required = true }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="block w-full rounded-lg border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 transition duration-200 ease-in-out hover:border-gray-400"
      placeholder={placeholder}
    />
  </div>
);

const FileUploadField = ({ label, name, value, onChange, accept = ".pdf,.doc,.docx,image/*", required = true }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange({ target: { name, value: file } });
    }
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Choose File
        </button>
        <span className="text-sm text-gray-500">{fileName || 'No file chosen'}</span>
        <input
          type="file"
          ref={fileInputRef}
          id={name}
          name={name}
          onChange={handleFileChange}
          accept={accept}
          required={required}
          className="hidden"
        />
      </div>
    </div>
  );
};

// Skeleton loader component for vendors table
const VendorSkeletonLoader = () => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="w-full">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <div className="flex justify-end space-x-3">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>
    </td>
  </tr>
);

const VendorsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [loginAsVendorLoading, setLoginAsVendorLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    primaryPhone: '',
    secondaryPhone: '',
    city: '',
    companyRegistrationCertificate: '',
    vatNumber: ''
  });

  const fetchVendors = async () => {
    try {
      startLoading();
      const response = await api.get('/vendors');
      setVendors(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error(error.response?.data?.error || 'Error fetching vendors');
      setVendors([]);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'companyRegistrationCertificate' || !formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append file if exists
      if (formData.companyRegistrationCertificate instanceof File) {
        formDataToSend.append('files', formData.companyRegistrationCertificate);
        
        // Upload file first
        const mediaResponse = await api.post('/media/upload', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        // Get the uploaded file URL
        if (mediaResponse.data?.data?.[0]?.url) {
          formDataToSend.set('companyRegistrationCertificate', mediaResponse.data.data[0].url);
        }
      }

      const response = await api.post('/vendors', Object.fromEntries(formDataToSend));
      
      if (response.data?.success) {
        toast.success('Vendor created successfully');
        setShowForm(false);
        fetchVendors();
        setFormData({
          name: '',
          email: '',
          primaryPhone: '',
          secondaryPhone: '',
          city: '',
          companyRegistrationCertificate: '',
          vatNumber: ''
        });
      } else {
        throw new Error(response.data?.error || 'Failed to create vendor');
      }
    } catch (error) {
      console.error('Error creating vendor:', error);
      toast.error(error.response?.data?.error || error.message || 'Error creating vendor');
    } finally {
      stopLoading();
      setUploadProgress(0);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginAsVendor = async (vendor) => {
    try {
      setLoginAsVendorLoading(true);
      
      navigate('/vendor/login', {
        state: {
          adminLoginAsVendor: true,
          vendorEmail: vendor.email
        }
      });
    } catch (error) {
      console.error('Error logging in as vendor:', error);
      toast.error('Failed to access vendor account');
    } finally {
      setLoginAsVendorLoading(false);
    }
  };

  // Function to handle vendor status toggle
  const handleStatusToggle = async (vendorId, currentStatus) => {
    try {
      setStatusUpdateLoading(true);
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      const response = await api.put(`/vendors/${vendorId}`, { status: newStatus });
      
      if (response.data?.success) {
        toast.success(`Vendor ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
        fetchVendors(); // Refresh the vendors list
      } else {
        throw new Error(response.data?.error || 'Failed to update vendor status');
      }
    } catch (error) {
      console.error('Error updating vendor status:', error);
      toast.error(error.response?.data?.error || error.message || 'Error updating vendor status');
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // Function to open edit form with selected vendor data
  const openEditForm = (vendor) => {
    setSelectedVendor(vendor);
    setFormData({
      name: vendor.name || '',
      email: vendor.email || '',
      primaryPhone: vendor.primaryPhone || '',
      secondaryPhone: vendor.secondaryPhone || '',
      city: vendor.city || '',
      companyRegistrationCertificate: vendor.companyRegistrationCertificate || '',
      vatNumber: vendor.vatNumber || '',
      status: vendor.status || 'pending' // Add status initialization
    });
    setShowEditForm(true);
  };

  // Function to handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const formDataToSend = new FormData();
      
      // Handle file upload first if there's a new file
      if (formData.companyRegistrationCertificate instanceof File) {
        const fileFormData = new FormData();
        fileFormData.append('files', formData.companyRegistrationCertificate);
        
        // Upload file
        const mediaResponse = await api.post('/media/upload', fileFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        if (mediaResponse.data?.data?.[0]?.url) {
          // Delete old file if it exists
          if (formData.companyRegistrationCertificate && typeof formData.companyRegistrationCertificate === 'string') {
            const oldMediaId = formData.companyRegistrationCertificate.split('/').pop().split('_')[0];
            if (oldMediaId) {
              try {
                await api.delete(`/media/${oldMediaId}`);
              } catch (error) {
                console.error('Error deleting old file:', error);
              }
            }
          }

          formDataToSend.set('companyRegistrationCertificate', mediaResponse.data.data[0].url);
        }
      } else {
        // Keep existing file URL
        formDataToSend.set('companyRegistrationCertificate', formData.companyRegistrationCertificate || '');
      }

      // Create update data object
      const updateData = {
        name: formData.name,
        email: formData.email,
        primaryPhone: formData.primaryPhone,
        secondaryPhone: formData.secondaryPhone,
        city: formData.city,
        vatNumber: formData.vatNumber,
        status: formData.status, // Include status in update
        companyRegistrationCertificate: formDataToSend.get('companyRegistrationCertificate')
      };

      const response = await api.put(`/vendors/${selectedVendor._id}`, updateData);
      
      if (response.data?.success) {
        toast.success('Vendor updated successfully');
        setShowEditForm(false);
        fetchVendors();
      } else {
        throw new Error(response.data?.error || 'Failed to update vendor');
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
      toast.error(error.response?.data?.error || error.message || 'Error updating vendor');
    } finally {
      stopLoading();
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
        >
          Add New Vendor
        </button>
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-overlay flex items-start justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/50"></div>
          <div className="relative w-full max-w-3xl my-8 mx-auto p-4">
            <div className="bg-white rounded-lg shadow-xl relative">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Register New Vendor</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Business Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Business Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                    />
                    <FormField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Primary Phone"
                      name="primaryPhone"
                      value={formData.primaryPhone}
                      onChange={handleChange}
                      placeholder="Enter primary phone"
                    />
                    <FormField
                      label="Secondary Phone"
                      name="secondaryPhone"
                      value={formData.secondaryPhone}
                      onChange={handleChange}
                      placeholder="Enter secondary phone"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                {/* Legal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Legal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUploadField
                      label="Company Registration Certificate"
                      name="companyRegistrationCertificate"
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx,image/*"
                    />
                    <FormField
                      label="VAT Number"
                      name="vatNumber"
                      value={formData.vatNumber}
                      onChange={handleChange}
                      placeholder="Enter VAT number"
                    />
                  </div>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-500 h-2.5 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating...
                      </>
                    ) : (
                      'Create Vendor'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && selectedVendor && (
        <div className="fixed inset-0 z-overlay flex items-start justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/50"></div>
          <div className="relative w-full max-w-3xl my-8 mx-auto p-4">
            <div className="bg-white rounded-lg shadow-xl relative">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Edit Vendor Account</h2>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-8">
                {/* Status Selection Section */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Account Status</h3>
                    <p className="text-sm text-gray-500">Select the appropriate status for this vendor account</p>
                  </div>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={(e) => setFormData({
                        ...formData,
                        status: e.target.value
                      })}
                      className={`rounded-md py-2 pl-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 border focus:ring-primary-500 focus:border-primary-500 ${
                        formData.status === 'active' 
                          ? 'bg-green-50 text-green-700' 
                          : formData.status === 'pending' 
                            ? 'bg-yellow-50 text-yellow-700' 
                            : 'bg-red-50 text-red-700'
                      }`}
                    >
                      <option value="pending" className="bg-white text-yellow-700">Pending</option>
                      <option value="active" className="bg-white text-green-700">Active</option>
                      <option value="suspended" className="bg-white text-red-700">Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Business Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Business Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                    />
                    <FormField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Primary Phone"
                      name="primaryPhone"
                      value={formData.primaryPhone}
                      onChange={handleChange}
                      placeholder="Enter primary phone"
                    />
                    <FormField
                      label="Secondary Phone"
                      name="secondaryPhone"
                      value={formData.secondaryPhone}
                      onChange={handleChange}
                      placeholder="Enter secondary phone"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                {/* Legal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Legal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUploadField
                      label="Company Registration Certificate"
                      name="companyRegistrationCertificate"
                      value={formData.companyRegistrationCertificate}
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx,image/*"
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary-500 h-2.5 rounded-full transition-all duration-300" 
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                      </div>
                    )}
                    <FormField
                      label="VAT Number"
                      name="vatNumber"
                      value={formData.vatNumber}
                      onChange={handleChange}
                      placeholder="Enter VAT number"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Updating...
                      </>
                    ) : (
                      'Update Vendor'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Vendors List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Skeleton loaders while data is being fetched
              Array(5).fill(0).map((_, index) => (
                <VendorSkeletonLoader key={index} />
              ))
            ) : vendors.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No vendors found. Click "Add New Vendor" to create one.
                </td>
              </tr>
            ) : (
              vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.primaryPhone}</div>
                    <div className="text-sm text-gray-500">{vendor.secondaryPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${vendor.status === 'active' ? 'bg-green-100 text-green-800' : 
                        vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`${vendor.companyRegistrationCertificate ? 'text-green-600' : 'text-yellow-600'}`}>
                      {vendor.companyRegistrationCertificate ? 'Uploaded' : 'Pending Upload'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-primary-600 hover:text-primary-900 mr-3"
                      onClick={() => handleLoginAsVendor(vendor)}
                      disabled={loginAsVendorLoading}
                    >
                      {loginAsVendorLoading ? 'Accessing...' : 'Login as Vendor'}
                    </button>
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      onClick={() => openEditForm(vendor)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-primary-600 hover:text-primary-700"
                      onClick={() => navigate(`/admin/vendors/${vendor._id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorsPage;