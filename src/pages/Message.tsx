import { useState, useEffect } from 'react';

interface Message {
  id: string;
  type: 'request' | 'overdue' | 'return' | 'notification';
  title: string;
  content: string;
  bookTitle?: string;
  userName?: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'requests' | 'overdue'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Mock data - replace with your API call
    const mockMessages: Message[] = [
      {
        id: '1',
        type: 'request',
        title: 'Book Request: The Lean Startup',
        content: 'John Doe has requested "The Lean Startup" by Eric Ries. Please review and approve.',
        bookTitle: 'The Lean Startup',
        userName: 'John Doe',
        timestamp: '2024-01-15T10:30:00Z',
        isRead: false,
        priority: 'medium'
      },
      {
        id: '2',
        type: 'overdue',
        title: 'Overdue Book Return',
        content: 'Jane Smith has not returned "1984" which was due 5 days ago.',
        bookTitle: '1984',
        userName: 'Jane Smith',
        timestamp: '2024-01-14T15:45:00Z',
        isRead: false,
        priority: 'high'
      },
      {
        id: '3',
        type: 'return',
        title: 'Book Returned Successfully',
        content: 'Mike Johnson has successfully returned "Pride and Prejudice".',
        bookTitle: 'Pride and Prejudice',
        userName: 'Mike Johnson',
        timestamp: '2024-01-13T09:20:00Z',
        isRead: true,
        priority: 'low'
      },
      {
        id: '4',
        type: 'notification',
        title: 'New Book Added',
        content: 'A new book "Clean Code" has been added to the library collection.',
        bookTitle: 'Clean Code',
        timestamp: '2024-01-12T14:10:00Z',
        isRead: false,
        priority: 'low'
      },
      {
        id: '5',
        type: 'request',
        title: 'Book Extension Request',
        content: 'Sarah Wilson wants to extend the due date for "The Great Gatsby".',
        bookTitle: 'The Great Gatsby',
        userName: 'Sarah Wilson',
        timestamp: '2024-01-11T11:35:00Z',
        isRead: true,
        priority: 'medium'
      }
    ];

    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 500);
  }, []);

  const getTypeIcon = (type: Message['type']) => {
    const icons = {
      request: '📬',
      overdue: '⚠️',
      return: '✅',
      notification: '🔔'
    };
    return icons[type];
  };

  const getTypeColor = (type: Message['type']) => {
    const colors = {
      request: 'text-blue-400 bg-blue-500/20',
      overdue: 'text-red-400 bg-red-500/20',
      return: 'text-green-400 bg-green-500/20',
      notification: 'text-purple-400 bg-purple-500/20'
    };
    return colors[type];
  };

  const getPriorityColor = (priority: Message['priority']) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority];
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.title.toLowerCase().includes(search.toLowerCase()) ||
      msg.content.toLowerCase().includes(search.toLowerCase()) ||
      (msg.bookTitle && msg.bookTitle.toLowerCase().includes(search.toLowerCase()));

    switch (filter) {
      case 'unread': return !msg.isRead && matchesSearch;
      case 'requests': return msg.type === 'request' && matchesSearch;
      case 'overdue': return msg.type === 'overdue' && matchesSearch;
      default: return matchesSearch;
    }
  });

  const unreadCount = messages.filter(m => !m.isRead).length;
  const overdueCount = messages.filter(m => m.type === 'overdue').length;
  const requestCount = messages.filter(m => m.type === 'request').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto p-4 space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-slate-700 rounded-xl w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="h-20 bg-slate-700 rounded-xl"></div>)}
            </div>
            <div className="h-14 bg-slate-700 rounded-xl"></div>
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-700 rounded-xl"></div>)}
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
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            💬 Messages & Notifications
          </h1>
          <p className="text-slate-300">Stay updated with library activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">{messages.length}</div>
            <div className="text-slate-300 text-sm">Total Messages</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-orange-400">{unreadCount}</div>
            <div className="text-slate-300 text-sm">Unread</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-red-400">{overdueCount}</div>
            <div className="text-slate-300 text-sm">Overdue</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">{requestCount}</div>
            <div className="text-slate-300 text-sm">Requests</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 bg-slate-700/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              {[
                { key: 'all', label: '📋 All' },
                { key: 'unread', label: '🟠 Unread' },
                { key: 'requests', label: '📬 Requests' },
                { key: 'overdue', label: '⚠️ Overdue' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as never)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => {
                setSelectedMessage(message);
                if (!message.isRead) markAsRead(message.id);
              }}
              className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/70 transition-all cursor-pointer ${
                !message.isRead ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(message.type)}`}>
                  <span className="text-lg">{getTypeIcon(message.type)}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-semibold ${!message.isRead ? 'text-white' : 'text-slate-300'}`}>
                      {message.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`}></div>
                      <span className="text-xs text-slate-400">{formatTimestamp(message.timestamp)}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">{message.content}</p>
                  
                  {message.bookTitle && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        📚 {message.bookTitle}
                      </span>
                      {message.userName && (
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                          👤 {message.userName}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No messages found</h3>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-600 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(selectedMessage.type)}`}>
                  <span className="text-lg">{getTypeIcon(selectedMessage.type)}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedMessage.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(selectedMessage.priority)}`}></div>
                    <span className="text-sm text-slate-400">{formatTimestamp(selectedMessage.timestamp)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">{selectedMessage.content}</p>
              
              {selectedMessage.bookTitle && (
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <h3 className="text-white font-medium mb-2">📚 Book Details</h3>
                  <p className="text-slate-300">{selectedMessage.bookTitle}</p>
                  {selectedMessage.userName && (
                    <p className="text-slate-400 text-sm mt-1">User: {selectedMessage.userName}</p>
                  )}
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                {selectedMessage.type === 'request' && (
                  <>
                    <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      ✅ Approve
                    </button>
                    <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                      ❌ Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}