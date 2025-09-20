import React from "react";
import type { Book } from "../api/booksApi";

interface Props {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookTable: React.FC<Props> = ({ books, onEdit, onDelete }) => {
  const getStatusBadge = (status: string) => {
    return status === "Available" 
      ? "bg-green-500/20 text-green-400 border-green-500/30" 
      : "bg-orange-500/20 text-orange-400 border-orange-500/30";
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">No Books Found</h3>
        <p className="text-slate-500">Try adjusting your search or filters, or add a new book to get started.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr className="bg-slate-700/50 border-b border-slate-600/50">
            <th className="p-4 text-left text-slate-200 font-semibold tracking-wide">
              <div className="flex items-center gap-2">
                📖 <span>Title</span>
              </div>
            </th>
            <th className="p-4 text-left text-slate-200 font-semibold tracking-wide">
              <div className="flex items-center gap-2">
                ✍️ <span>Author</span>
              </div>
            </th>
            <th className="p-4 text-left text-slate-200 font-semibold tracking-wide">
              <div className="flex items-center gap-2">
                🎭 <span>Genre</span>
              </div>
            </th>
            <th className="p-4 text-left text-slate-200 font-semibold tracking-wide">
              <div className="flex items-center gap-2">
                📅 <span>Published</span>
              </div>
            </th>
            <th className="p-4 text-center text-slate-200 font-semibold tracking-wide">
              <div className="flex items-center justify-center gap-2">
                📊 <span>Status</span>
              </div>
            </th>
            <th className="p-4 text-center text-slate-200 font-semibold tracking-wide">
              <div className="flex items-center justify-center gap-2">
                ⚙️ <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book.id}
              className={`
                border-b border-slate-700/30 text-white hover:bg-slate-700/30 transition-all duration-200
                ${index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'}
              `}
            >
              <td className="p-4">
                <div className="font-medium text-slate-100 hover:text-blue-400 transition-colors">
                  {book.title}
                </div>
              </td>
              <td className="p-4">
                <div className="text-slate-200">
                  {book.author}
                </div>
              </td>
              <td className="p-4">
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {book.genre}
                </div>
              </td>
              <td className="p-4">
                <div className="text-slate-300 font-mono">
                  {book.publishedYear}
                </div>
              </td>
              <td className="p-4 text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(book.status)}`}>
                  {book.status === "Available" ? "✅" : "📤"} {book.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-blue-500/20 min-w-[70px]"
                    onClick={() => onEdit(book)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-red-500/20 min-w-[70px]"
                    onClick={() => book.id && onDelete(book.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Table Footer */}
      <div className="bg-slate-700/30 px-4 py-3 border-t border-slate-600/50">
        <p className="text-sm text-slate-400 text-center">
          Displaying {books.length} book{books.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default BookTable;