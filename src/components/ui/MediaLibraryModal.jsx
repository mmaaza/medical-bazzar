import React, { useState, useRef, useEffect } from 'react';
import api from '../../services/api';

const MediaLibraryModal = ({ isOpen, onClose, onSelect, maxSelect = 1 }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [view, setView] = useState("grid");
  const [selectedResizeOption, setSelectedResizeOption] = useState("original");
  const fileInputRef = useRef(null);

  const resizeOptions = [
    { value: "original", label: "Original Size" },
    { value: "product", label: "Product Photo (800x800)" },
    { value: "thumbnail", label: "Thumbnail (300x300)" }
  ];

  useEffect(() => {
    if (isOpen) {
      fetchMediaItems();
    }
  }, [isOpen]);

  const fetchMediaItems = async () => {
    try {
      const response = await api.get("/media");
      setMediaItems(response.data.media);
    } catch (error) {
      console.error("Error fetching media items:", error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
    formData.append("resize", selectedResizeOption);

    try {
      const response = await api.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      await fetchMediaItems();
      setIsUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleItemClick = (item) => {
    if (maxSelect === 1) {
      setSelectedItems([item]);
      onSelect([item]);
      onClose();
    } else {
      setSelectedItems(prev => {
        const isSelected = prev.some(i => i._id === item._id);
        if (isSelected) {
          return prev.filter(i => i._id !== item._id);
        }
        if (prev.length < maxSelect) {
          return [...prev, item];
        }
        return prev;
      });
    }
  };

  const handleConfirmSelection = () => {
    onSelect(selectedItems);
    onClose();
  };

  const renderMediaItem = (item) => {
    const isImage = item.type.startsWith("image/");
    const isVideo = item.type.startsWith("video/");
    const isDocument = !isImage && !isVideo;
    const isSelected = selectedItems.some(i => i._id === item._id);

    return (
      <div
        key={item._id}
        onClick={() => handleItemClick(item)}
        className={`
          ${view === "grid" 
            ? "relative group aspect-square overflow-hidden rounded-lg border cursor-pointer"
            : "flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer"}
          ${isSelected ? "border-primary-500 ring-2 ring-primary-500" : "border-gray-200"}
        `}
      >
        <div className={view === "grid" ? "h-full w-full" : "flex-shrink-0 h-16 w-16"}>
          {isImage && (
            <img
              src={item.url}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          )}
          {isVideo && (
            <video
              src={item.url}
              className="h-full w-full object-cover"
            />
          )}
          {isDocument && (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {view === "grid" && (
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-white text-sm truncate">{item.name}</p>
            </div>
          </div>
        )}

        {view === "list" && (
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Media Library</h3>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedResizeOption}
                      onChange={(e) => setSelectedResizeOption(e.target.value)}
                      className="block px-3 py-2 text-sm border rounded-md"
                    >
                      {resizeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleUploadClick}
                      disabled={isUploading}
                      className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50"
                    >
                      {isUploading ? `Uploading ${uploadProgress}%` : "Upload New"}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className={view === "grid" 
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                    : "space-y-2"
                  }>
                    {mediaItems.map(renderMediaItem)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {maxSelect > 1 && (
              <button
                type="button"
                onClick={handleConfirmSelection}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Select {selectedItems.length} items
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;