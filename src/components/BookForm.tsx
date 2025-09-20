import React, { useState, useEffect } from "react";
import type { Book } from "../api/booksApi";

interface Props {
  onSave: (book: Book) => void;
  editingBook: Book | null;
  onCancel: () => void;
}

interface FormErrors {
  title?: string;
  author?: string;
  genre?: string;
  publishedYear?: string;
}

const BookForm: React.FC<Props> = ({ onSave, editingBook, onCancel }) => {
  const [formData, setFormData] = useState<Book>({
    title: "",
    author: "",
    genre: "",
    publishedYear: new Date().getFullYear(),
    status: "Available",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commonGenres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Business",
    "Technology",
    "Health",
    "Travel",
    "Cooking",
    "Art",
    "Poetry",
    "Drama",
    "Horror",
    "Thriller",
    "Adventure"
  ];

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  // Validation functions
  const validateTitle = (value: string): string | undefined => {
    if (!value.trim()) return "Title is required";
    if (value.trim().length < 2) return "Title must be at least 2 characters";
    if (value.trim().length > 100) return "Title must be less than 100 characters";
    if (!/^[a-zA-Z0-9\s\-:.,!?'"()&]+$/.test(value)) return "Title contains invalid characters";
    return undefined;
  };

  const validateAuthor = (value: string): string | undefined => {
    if (!value.trim()) return "Author is required";
    if (value.trim().length < 2) return "Author name must be at least 2 characters";
    if (value.trim().length > 50) return "Author name must be less than 50 characters";
    if (!/^[a-zA-Z\s\-'.]+$/.test(value)) return "Author name can only contain letters, spaces, hyphens, apostrophes, and periods";
    return undefined;
  };

  const validateGenre = (value: string): string | undefined => {
    if (!value.trim()) return "Genre is required";
    if (value.trim().length < 2) return "Genre must be at least 2 characters";
    if (value.trim().length > 30) return "Genre must be less than 30 characters";
    if (!/^[a-zA-Z\s-]+$/.test(value)) return "Genre can only contain letters, spaces, and hyphens";
    return undefined;
  };

  const validatePublishedYear = (value: number): string | undefined => {
    const currentYear = new Date().getFullYear();
    if (!value) return "Published year is required";
    if (value < 1000) return "Year must be 1000 or later";
    if (value > currentYear) return `Year cannot be later than ${currentYear}`;
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;

    // Process input based on field type
    if (name === 'title') {
      processedValue = value.replace(/[^a-zA-Z0-9\s\-:.,!?'"()&]/g, '');
    } else if (name === 'author') {
      processedValue = value.replace(/[^a-zA-Z\s\-'.]/g, '');
    } else if (name === 'genre') {
      processedValue = value.replace(/[^a-zA-Z\s-]/g, '');
    } else if (name === 'publishedYear') {
      processedValue = parseInt(value) || new Date().getFullYear();
    }

    setFormData({ ...formData, [name]: processedValue });

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      title: validateTitle(formData.title),
      author: validateAuthor(formData.author),
      genre: validateGenre(formData.genre),
      publishedYear: validatePublishedYear(formData.publishedYear),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const bookData: Book = {
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
    };

    try {
      await onSave(bookData);
      
      // Reset form only if not editing
      if (!editingBook) {
        setFormData({
          title: "",
          author: "",
          genre: "",
          publishedYear: new Date().getFullYear(),
          status: "Available",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (hasError: boolean) => {
    return `w-full p-3 bg-slate-700/50 text-white placeholder-slate-400 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
      hasError 
        ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
        : 'border-slate-600/50 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-slate-700/70'
    }`;
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {editingBook ? "✏️ Edit Book" : "➕ Add New Book"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Field */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              📖 Book Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter book title..."
              value={formData.title}
              onChange={handleChange}
              className={getInputClassName(!!errors.title)}
              maxLength={100}
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <span>⚠️</span> {errors.title}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-400">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Author Field */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              ✍️ Author Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name..."
              value={formData.author}
              onChange={handleChange}
              className={getInputClassName(!!errors.author)}
              maxLength={50}
              required
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <span>⚠️</span> {errors.author}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-400">
              {formData.author.length}/50 characters
            </p>
          </div>

          {/* Genre Field */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              🎭 Genre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="genre"
              placeholder="Enter or select genre..."
              value={formData.genre}
              onChange={handleChange}
              className={getInputClassName(!!errors.genre)}
              maxLength={30}
              list="genres"
              required
            />
            <datalist id="genres">
              {commonGenres.map(genre => (
                <option key={genre} value={genre} />
              ))}
            </datalist>
            {errors.genre && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <span>⚠️</span> {errors.genre}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-400">
              {formData.genre.length}/30 characters
            </p>
          </div>

          {/* Published Year Field */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              📅 Published Year <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="publishedYear"
              placeholder="YYYY"
              value={formData.publishedYear}
              onChange={handleChange}
              className={getInputClassName(!!errors.publishedYear)}
              min="1000"
              max={new Date().getFullYear()}
              required
            />
            {errors.publishedYear && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <span>⚠️</span> {errors.publishedYear}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-400">
              Enter year (1000 - {new Date().getFullYear()})
            </p>
          </div>

          {/* Status Field */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              📊 Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700/50 text-white border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-200 hover:bg-slate-700/70"
            >
              <option value="Available">✅ Available</option>
              <option value="Issued">📤 Issued</option>
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-600/30">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>{editingBook ? "💾" : "➕"}</span>
                <span>{editingBook ? "Update Book" : "Save Book"}</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>❌</span>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;