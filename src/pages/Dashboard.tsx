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

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      const data = await getBooks();
      setBooks(data);
    } catch {
      toast.error("Failed to fetch books");
    }
  };

  const handleSave = async (book: Book) => {
    try {
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
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        toast.success("Book deleted successfully!");
        fetchBooks();
      } catch {
        toast.error("Error deleting book");
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

  // Get unique genres for filter
  const genres = ["All", ...new Set(books.map((b) => b.genre))];

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className="text-2xl font-bold mb-4">Book Management Dashboard</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded flex-1"
        />

        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="p-2 border rounded"
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
          className="p-2 border rounded"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>

        <button
          onClick={() => {
            setEditingBook(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Book
        </button>
      </div>

      {/* Table */}
      <BookTable
        books={currentBooks}
        onEdit={(book) => {
          setEditingBook(book);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
        onPageChange={setCurrentPage}
      />

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
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
