import React, { useState, useEffect } from "react";
import type { Book } from "../api/booksApi";

interface Props {
  onSave: (book: Book) => void;
  editingBook: Book | null;
  onCancel: () => void;
}

const BookForm: React.FC<Props> = ({ onSave, editingBook, onCancel }) => {
  const [formData, setFormData] = useState<Book>({
    title: "",
    author: "",
    genre: "",
    publishedYear: new Date().getFullYear(),
    status: "Available",
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: "",
      author: "",
      genre: "",
      publishedYear: new Date().getFullYear(),
      status: "Available",
    });
  };

  return (
    <form
      className="p-4 border bg-gray-50 rounded mb-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-2">
        {editingBook ? "Edit Book" : "Add Book"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="publishedYear"
          placeholder="Published Year"
          value={formData.publishedYear}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 border rounded col-span-2"
        >
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Save
        </button>
        {editingBook && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;
