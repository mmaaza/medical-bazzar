import React from 'react';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';
import MediaLibraryModal from './MediaLibraryModal';

const MediaUploadButton = ({ onSelect, maxSelect = 1, selectedMedia, className = '' }) => {
  const { isModalOpen, openMediaLibrary, closeMediaLibrary, handleSelect } = useMediaLibrary(onSelect, maxSelect);

  return (
    <>
      <button
        onClick={openMediaLibrary}
        className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${className}`}
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {selectedMedia ? 'Change Media' : 'Upload Media'}
      </button>

      <MediaLibraryModal
        isOpen={isModalOpen}
        onClose={closeMediaLibrary}
        onSelect={handleSelect}
        maxSelect={maxSelect}
      />
    </>
  );
};

export default MediaUploadButton;