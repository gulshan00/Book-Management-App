import React from "react";

const BookSkeleton: React.FC = () => {
  // Show 5 fake rows while loading
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Genre</th>
            <th className="p-2 border">Published</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="p-2 border">
                <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
              </td>
              <td className="p-2 border">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
              <td className="p-2 border">
                <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
              </td>
              <td className="p-2 border">
                <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
              </td>
              <td className="p-2 border">
                <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
              </td>
              <td className="p-2 border">
                <div className="h-6 bg-gray-300 rounded w-20 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookSkeleton;
