import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import api from "../../services/api";

const MediaPage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [view, setView] = useState("grid");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMediaItems();
  }, []);

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

    try {
      await api.post("/media/upload", formData, {
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

  const handleDelete = async (mediaId) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) {
      return;
    }

    try {
      await api.delete(`/media/${mediaId}`);
      setMediaItems(prev => prev.filter(item => item.id !== mediaId));
    } catch (error) {
      console.error("Error deleting media item:", error);
    }
  };

  const renderMediaItem = (item) => {
    const isImage = item.type.startsWith("image/");
    const isVideo = item.type.startsWith("video/");
    const isDocument = !isImage && !isVideo;

    return (
      <div
        className={`${
          view === "grid"
            ? "relative group aspect-square overflow-hidden rounded-lg border border-gray-200"
            : "flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg"
        }`}
      >
        <div className={view === "grid" ? "h-full w-full" : "flex-shrink-0 h-16 w-16"}>
          {isImage && (
            <img
              src={item.url}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {isVideo && (
            <video
              src={item.url}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                  title="Delete"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-white">
                <p className="font-medium truncate text-xs">
                  {item.name}
                </p>
                <p className="text-xs text-gray-300 mt-0.5">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </>
        )}

        {view === "list" && (
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-900 font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-full text-red-500 hover:bg-red-50"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your media files, including images, videos, and documents.
          </p>
        </div>
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? `Uploading ${uploadProgress}%` : "Upload Media"}
          </button>
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setView("grid")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                view === "grid"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 hover:text-gray-900"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                view === "list"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 hover:text-gray-900"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {mediaItems.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No media</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading your first media file.
            </p>
            <div className="mt-6">
              <button
                onClick={handleUploadClick}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Upload Media
              </button>
            </div>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
                : "space-y-2"
            }
          >
            {mediaItems.map((item) => (
              <React.Fragment key={item._id || item.id}>
                {renderMediaItem(item)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
