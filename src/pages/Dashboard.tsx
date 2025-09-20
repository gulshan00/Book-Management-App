import React, { useEffect, useState } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  type Book,
} from "../api/booksApi";
import BookTable from "../components/BookTable";
import BookForm from "../components/BookForm";
import Pagination from "../components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookSkeleton from "../components/BookSkeleton";

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Search & Filters
  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (book: Book) => {
    try {
      setLoading(true);
      if (editingBook && editingBook.id) {
        await updateBook(editingBook.id, book);
        toast.success("Book updated successfully!");
      } else {
        await addBook(book);
        toast.success("Book added successfully!");
      }
      setEditingBook(null);
      setIsFormOpen(false);
      fetchBooks();
    } catch {
      toast.error("Error saving book");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setLoading(true);
        await deleteBook(id);
        toast.success("Book deleted successfully!");
        fetchBooks();
      } catch {
        toast.error("Error deleting book");
        setLoading(false);
      }
    }
  };

  // Search + Filtered books
  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());

    const matchesGenre = filterGenre === "All" || b.genre === filterGenre;
    const matchesStatus = filterStatus === "All" || b.status === filterStatus;

    return matchesSearch && matchesGenre && matchesStatus;
  });

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Unique genres for dropdown
  const genres = ["All", ...new Set(books.map((b) => b.genre))];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header with gradient text */}
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          📚 Book Management Dashboard
        </h1>
        <p className="text-slate-300 text-lg">Manage your library collection with ease</p>
      </div>

      {/* Search & Filters - Enhanced styling */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search by title or author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-4 bg-slate-700/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-slate-700/70"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex gap-3">
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="p-3 bg-slate-700/50 text-white border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-slate-700/70"
            >
              {genres.map((g) => (
                <option key={g} value={g} className="bg-slate-800 text-white">
                  {g === "All" ? "🎭 All Genres" : `📖 ${g}`}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-3 bg-slate-700/50 text-white border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 hover:bg-slate-700/70"
            >
              <option value="All" className="bg-slate-800 text-white">📊 All Status</option>
              <option value="Available" className="bg-slate-800 text-white">✅ Available</option>
              <option value="Issued" className="bg-slate-800 text-white">📤 Issued</option>
            </select>
          </div>

          {/* Add Book Button */}
          <button
            onClick={() => {
              setEditingBook(null);
              setIsFormOpen(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-green-500/20"
          >
            ➕ Add New Book
          </button>
        </div>
      </div>

      {/* Results Summary */}
      {!loading && (
        <div className="mb-6">
          <p className="text-slate-300 text-sm">
            Showing <span className="text-blue-400 font-semibold">{currentBooks.length}</span> of{" "}
            <span className="text-blue-400 font-semibold">{filteredBooks.length}</span> books
            {search && (
              <span className="ml-2">
                for "<span className="text-cyan-400">{search}</span>"
              </span>
            )}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-6">
          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-600 border-dashed rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
          <BookSkeleton />
        </div>
      ) : (
        <>
          {/* Enhanced Table Container */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl mb-8">
            <BookTable
              books={currentBooks}
              onEdit={(book) => {
                setEditingBook(book);
                setIsFormOpen(true);
              }}
              onDelete={handleDelete}
            />
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      {/* Enhanced Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4">
          <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-xl shadow-2xl w-full max-w-lg relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors duration-200 text-xl"
            >
              ✖
            </button>
            <BookForm
              onSave={handleSave}
              editingBook={editingBook}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;