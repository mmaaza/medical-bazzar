import React, { useState } from "react";

const MediaPage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [view, setView] = useState("grid"); // 'grid' or 'list'

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
          <button className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600">
            Upload Media
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
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600">
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
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                : "space-y-2"
            }
          >
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className={`${
                  view === "grid"
                    ? "relative group aspect-square"
                    : "flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg"
                }`}
              >
                {/* Media item content here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
