import React from "react";
import type { Book } from "../api/booksApi";

interface Props {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookTable: React.FC<Props> = ({ books, onEdit, onDelete }) => {
  return (
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
        {books.map((book) => (
          <tr key={book.id} className="text-center">
            <td className="p-2 border">{book.title}</td>
            <td className="p-2 border">{book.author}</td>
            <td className="p-2 border">{book.genre}</td>
            <td className="p-2 border">{book.publishedYear}</td>
            <td className="p-2 border">{book.status}</td>
            <td className="p-2 border">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                onClick={() => onEdit(book)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => book.id && onDelete(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
