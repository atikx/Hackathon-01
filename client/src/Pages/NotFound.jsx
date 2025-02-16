import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-100 text-gray-800 p-6">
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
      <p className="text-center text-gray-600 mb-6 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;
