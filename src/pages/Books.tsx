import { useState, useEffect } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: 'Available' | 'Issued';
  isbn?: string;
  publishedYear?: number;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockBooks: Book[] = [
      { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', status: 'Available', publishedYear: 1925 },
      { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', status: 'Issued', publishedYear: 1960 },
      { id: '3', title: '1984', author: 'George Orwell', genre: 'Dystopian', status: 'Available', publishedYear: 1949 },
      { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', status: 'Available', publishedYear: 1813 },
    ];
    
    setTimeout(() => {
      setBooks(mockBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700 rounded mb-6 w-48"></div>
          <div className="h-12 bg-slate-700 rounded mb-6"></div>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-20 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          📚 Books Collection
        </h1>
        <p className="text-slate-300">Browse and manage your library books</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search books by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">{books.length}</div>
          <div className="text-slate-300 text-sm">Total Books</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {books.filter(b => b.status === 'Available').length}
          </div>
          <div className="text-slate-300 text-sm">Available</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-400">
            {books.filter(b => b.status === 'Issued').length}
          </div>
          <div className="text-slate-300 text-sm">Issued</div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-white line-clamp-2">
                {book.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                book.status === 'Available' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-orange-500/20 text-orange-400'
              }`}>
                {book.status}
              </span>
            </div>
            
            <p className="text-slate-300 mb-2">📝 {book.author}</p>
            <p className="text-slate-400 text-sm mb-2">🎭 {book.genre}</p>
            {book.publishedYear && (
              <p className="text-slate-400 text-sm">📅 {book.publishedYear}</p>
            )}
            
            <div className="mt-4 pt-4 border-t border-slate-700">
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No books found</h3>
          <p className="text-slate-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}