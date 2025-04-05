import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from '../services/api';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // verifying, success, error
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setVerificationStatus('error');
          setError('Verification token is missing');
          return;
        }

        const response = await axios.get(`/auth/verify-email/${token}`);
        if (response.data.success) {
          setVerificationStatus('success');
          // Clean up stored credentials and logout
          localStorage.removeItem('pendingVerificationEmail');
          sessionStorage.removeItem('tempLoginPassword');
          logout();
        } else {
          throw new Error('Verification failed');
        }
      } catch (error) {
        setVerificationStatus('error');
        setError(error.response?.data?.error || 'Verification failed');
      }
    };

    verifyEmail();
  }, [searchParams, logout]);

  const handleContinue = () => {
    navigate('/login');
  };

  const handleResendVerification = async () => {
    try {
      const email = localStorage.getItem('pendingVerificationEmail');
      if (!email) {
        setError('Unable to resend verification email. Please try registering again.');
        return;
      }

      await axios.post('/auth/resend-verification', { email });
      setError('New verification email has been sent. Please check your inbox.');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to resend verification email');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-mobile-h1 md:text-3xl lg:text-4xl font-bold font-heading text-gray-900">
            Email Verification
          </h1>
        </div>

        <div className="bg-white py-8 px-4 shadow-mobile rounded-lg sm:px-10">
          {verificationStatus === 'verifying' && (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Email Verified Successfully!</h2>
              <p className="text-sm text-gray-600 mb-6">
                Your email has been verified. You can now log in to your account.
              </p>
              <button
                onClick={handleContinue}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-md text-sm font-medium transition duration-300"
              >
                Continue to Login
              </button>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Verification Failed</h2>
              <p className="text-sm text-secondary-600 mb-6">{error}</p>
              <button
                onClick={handleResendVerification}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-md text-sm font-medium transition duration-300"
              >
                Resend Verification Email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;