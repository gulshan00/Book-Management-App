import { useState, useEffect } from 'react';
import { getBooks, type Book } from '../api/booksApi';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-slate-700 rounded-xl w-64"></div>
            <div className="h-14 bg-slate-700 rounded-xl"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="h-48 bg-slate-700 rounded-xl"></div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            📚 Library
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="text-blue-400 font-semibold">{books.length} Total</span>
            <span className="text-green-400 font-semibold">{books.filter(b => b.status === 'Available').length} Available</span>
            <span className="text-orange-400 font-semibold">{books.filter(b => b.status === 'Issued').length} Issued</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/60 backdrop-blur-sm text-white placeholder-slate-400 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/60 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  book.status === 'Available' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {book.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                {book.title}
              </h3>
              <p className="text-slate-300 text-sm mb-1">{book.author}</p>
              <p className="text-slate-400 text-xs mb-2">{book.genre} • {book.publishedYear}</p>
              
              <div className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Click for details →
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No books found</h3>
            <p className="text-slate-400">Try different search terms</p>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-600 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white pr-4">{selectedBook.title}</h2>
              <button
                onClick={() => setSelectedBook(null)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Author:</span>
                <span className="text-white font-medium">{selectedBook.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Genre:</span>
                <span className="text-white">{selectedBook.genre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Year:</span>
                <span className="text-white">{selectedBook.publishedYear}</span>
              </div>
              {/* {selectedBook.isbn && (
                <div className="flex justify-between">
                  <span className="text-slate-400">ISBN:</span>
                  <span className="text-white font-mono text-xs">{selectedBook.isbn}</span>
                </div>
              )} */}
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className={`font-medium ${
                  selectedBook.status === 'Available' ? 'text-green-400' : 'text-orange-400'
                }`}>
                  {selectedBook.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedBook(null)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}