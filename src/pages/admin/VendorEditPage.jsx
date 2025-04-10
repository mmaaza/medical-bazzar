import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
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

const VendorEditPage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    registrationNumber: '',
    panNumber: '',
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      branch: ''
    },
    status: 'pending',
    documentsVerified: false
  });

  // Fetch vendor details
  useEffect(() => {
    const fetchVendorData = async () => {
      if (!vendorId) return;

      try {
        startLoading();
        // Fetch vendor details
        const response = await api.get(`/vendors/${vendorId}`);
        if (response.data?.success) {
          const vendor = response.data.data;
          setFormData({
            businessName: vendor.businessName || '',
            ownerName: vendor.ownerName || '',
            email: vendor.email || '',
            phone: vendor.phone || '',
            address: {
              street: vendor.address?.street || '',
              city: vendor.address?.city || '',
              state: vendor.address?.state || '',
              zip: vendor.address?.zip || ''
            },
            registrationNumber: vendor.registrationNumber || '',
            panNumber: vendor.panNumber || '',
            bankDetails: {
              accountName: vendor.bankDetails?.accountName || '',
              accountNumber: vendor.bankDetails?.accountNumber || '',
              bankName: vendor.bankDetails?.bankName || '',
              branch: vendor.bankDetails?.branch || ''
            },
            status: vendor.status || 'pending',
            documentsVerified: vendor.documentsVerified || false
          });
        } else {
          toast.error('Failed to load vendor data');
          navigate('/admin/vendors');
        }
      } catch (error) {
        console.error('Error fetching vendor data:', error);
        toast.error(error.response?.data?.error || 'Error fetching vendor data');
        navigate('/admin/vendors');
      } finally {
        stopLoading();
      }
    };

    fetchVendorData();
  }, [vendorId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    const requiredFields = ['businessName', 'ownerName', 'email', 'phone', 'registrationNumber', 'panNumber'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      startLoading();
      const response = await api.put(`/vendors/${vendorId}`, formData);
      
      if (response.data?.success) {
        toast.success('Vendor updated successfully');
        navigate(`/admin/vendors/${vendorId}`);
      } else {
        throw new Error(response.data?.error || 'Failed to update vendor');
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
      toast.error(error.response?.data?.error || error.message || 'Error updating vendor');
    } finally {
      stopLoading();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Skeleton for Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-1 h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Skeleton for form sections */}
        <div className="bg-white shadow-mobile rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <div className="flex items-center">
            <Link
              to={`/admin/vendors/${vendorId}`}
              className="mr-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Vendor</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Update vendor information and account details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Status Selection Section */}
        <div className="bg-white shadow-mobile rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
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
            
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="documentsVerified"
                name="documentsVerified"
                checked={formData.documentsVerified}
                onChange={(e) => setFormData({
                  ...formData,
                  documentsVerified: e.target.checked
                })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="documentsVerified" className="ml-2 block text-sm text-gray-900">
                Documents Verified
              </label>
            </div>
          </div>
        </div>

        {/* Business Details Section */}
        <div className="bg-white shadow-mobile rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Business Details
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter business name"
              />
              <FormField
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white shadow-mobile rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="business@example.com"
              />
              <FormField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+977 98XXXXXXXX"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white shadow-mobile rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Address
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormField
                  label="Street Address"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  placeholder="Enter street address"
                />
              </div>
              <FormField
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
              <FormField
                label="State"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
              <FormField
                label="ZIP Code"
                name="address.zip"
                value={formData.address.zip}
                onChange={handleChange}
                placeholder="Enter ZIP code"
              />
            </div>
          </div>
        </div>

        {/* Legal Information Section */}
        <div className="bg-white shadow-mobile rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Legal Information
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Enter registration number"
              />
              <FormField
                label="PAN Number"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                placeholder="Enter PAN number"
              />
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-white shadow-mobile rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Bank Details
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Account Name"
                name="bankDetails.accountName"
                value={formData.bankDetails.accountName}
                onChange={handleChange}
                placeholder="Enter account name"
              />
              <FormField
                label="Account Number"
                name="bankDetails.accountNumber"
                value={formData.bankDetails.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
              />
              <FormField
                label="Bank Name"
                name="bankDetails.bankName"
                value={formData.bankDetails.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
              />
              <FormField
                label="Branch"
                name="bankDetails.branch"
                value={formData.bankDetails.branch}
                onChange={handleChange}
                placeholder="Enter branch name"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={() => navigate(`/admin/vendors/${vendorId}`)}
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
  );
};

export default VendorEditPage;