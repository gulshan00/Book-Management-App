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

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        📚 Book Management Dashboard
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded flex-1 min-w-[200px] focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>
        </div>

        <button
          onClick={() => {
            setEditingBook(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          ➕ Add Book
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        
        <><div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div><BookSkeleton /></>
      ) : (
        <>
          {/* Responsive Table */}
          <div className="overflow-x-auto rounded-lg shadow">
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
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
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
