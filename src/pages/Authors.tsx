import { useState, useEffect } from 'react';

interface Author {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  status: 'Active' | 'Inactive';
  email?: string;
  joinedYear?: number;
  articlesCount: number;
  rating: number;
}

export default function Authors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockAuthors: Author[] = [
      { 
        id: '1', 
        name: 'Sarah Johnson', 
        specialty: 'Technology Writer', 
        bio: 'Passionate about emerging technologies and their impact on society', 
        status: 'Active', 
        joinedYear: 2020, 
        articlesCount: 127, 
        rating: 4.8 
      },
      { 
        id: '2', 
        name: 'Michael Chen', 
        specialty: 'Science Journalist', 
        bio: 'Award-winning science journalist with expertise in climate change', 
        status: 'Active', 
        joinedYear: 2019, 
        articlesCount: 89, 
        rating: 4.9 
      },
      { 
        id: '3', 
        name: 'Emily Rodriguez', 
        specialty: 'Health & Wellness', 
        bio: 'Medical professional turned writer, focusing on mental health', 
        status: 'Inactive', 
        joinedYear: 2021, 
        articlesCount: 156, 
        rating: 4.7 
      },
      { 
        id: '4', 
        name: 'David Thompson', 
        specialty: 'Business Analyst', 
        bio: 'Former Fortune 500 consultant sharing market trends insights', 
        status: 'Active', 
        joinedYear: 2018, 
        articlesCount: 203, 
        rating: 4.6 
      },
      { 
        id: '5', 
        name: 'Lisa Park', 
        specialty: 'Creative Director', 
        bio: 'Design thinking enthusiast exploring creativity and innovation', 
        status: 'Active', 
        joinedYear: 2022, 
        articlesCount: 94, 
        rating: 4.9 
      },
      { 
        id: '6', 
        name: 'James Wilson', 
        specialty: 'Travel Writer', 
        bio: 'Globe-trotter documenting sustainable travel practices', 
        status: 'Active', 
        joinedYear: 2020, 
        articlesCount: 178, 
        rating: 4.8 
      },
    ];
    
    setTimeout(() => {
      setAuthors(mockAuthors);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(search.toLowerCase()) ||
    author.specialty.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700 rounded mb-6 w-48"></div>
          <div className="h-12 bg-slate-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1,2,3].map(i => (
              <div key={i} className="h-20 bg-slate-700 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-48 bg-slate-700 rounded"></div>
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
          ✍️ Authors Collection
        </h1>
        <p className="text-slate-300">Browse and manage your content authors</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search authors by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">{authors.length}</div>
          <div className="text-slate-300 text-sm">Total Authors</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {authors.filter(a => a.status === 'Active').length}
          </div>
          <div className="text-slate-300 text-sm">Active</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-400">
            {authors.reduce((sum, author) => sum + author.articlesCount, 0)}
          </div>
          <div className="text-slate-300 text-sm">Total Articles</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">
            {authors.length > 0 ? (authors.reduce((sum, author) => sum + author.rating, 0) / authors.length).toFixed(1) : '0'}
          </div>
          <div className="text-slate-300 text-sm">Avg Rating</div>
        </div>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors.map((author) => (
          <div
            key={author.id}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-white line-clamp-2">
                {author.name}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                author.status === 'Active' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {author.status}
              </span>
            </div>
            
            <p className="text-slate-300 mb-2">💼 {author.specialty}</p>
            <p className="text-slate-400 text-sm mb-3 line-clamp-2">{author.bio}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{author.articlesCount}</div>
                <div className="text-slate-400 text-xs">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">⭐ {author.rating}</div>
                <div className="text-slate-400 text-xs">Rating</div>
              </div>
            </div>
            
            {author.joinedYear && (
              <p className="text-slate-400 text-sm mb-4">📅 Joined {author.joinedYear}</p>
            )}
            
            <div className="mt-4 pt-4 border-t border-slate-700">
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredAuthors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✍️</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No authors found</h3>
          <p className="text-slate-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}