import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Librarian' | 'Member';
  avatar?: string;
  phone?: string;
  joinedDate: string;
  issuedBooks: number;
  totalIssued: number;
  overdueBooks: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState<'overview' | 'activity'>('overview');
  const [form, setForm] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@bookdash.com',
      role: 'Admin',
      phone: '+91 98765 43210',
      joinedDate: '2023-01-15',
      issuedBooks: 3,
      totalIssued: 45,
      overdueBooks: 1
    };
    setTimeout(() => { setUser(mockUser); setForm(mockUser); setLoading(false); }, 500);
  }, []);

  const roleColors = { 
    Admin: 'from-red-500 to-pink-500 text-white', 
    Librarian: 'from-blue-500 to-cyan-500 text-white', 
    Member: 'from-green-500 to-emerald-500 text-white' 
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!form.name?.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but format check if provided)
    if (form.phone?.trim()) {
      const phoneRegex = /^[+]?[\d\s\-(\\)]{10,}$/;
      if (!phoneRegex.test(form.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const save = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user && form) {
        setUser({ ...user, ...form });
        setEditing(false);
        setErrors({});
        toast.success('Profile updated successfully! 🎉');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const update = (field: string, value: unknown) => setForm(prev => ({ ...prev, [field]: value }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto p-6 space-y-8 animate-pulse">
          <div className="h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl"></div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-slate-600 rounded-full"></div>
              <div className="space-y-4">
                <div className="h-8 bg-slate-600 rounded w-64"></div>
                <div className="h-4 bg-slate-600 rounded w-48"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-700 rounded-2xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const activities = [
    { action: 'Issued book "Clean Code"', time: '2 hours ago', icon: '📚', color: 'text-blue-400' },
    { action: 'Updated profile information', time: '1 day ago', icon: '✏️', color: 'text-green-400' },
    { action: 'Returned "The Lean Startup"', time: '3 days ago', icon: '📖', color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            ✨ User Profile
          </h1>
          <p className="text-slate-300 text-lg">Manage your account settings and preferences</p>
        </div>

        {/* Profile Hero Card */}
        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              <button className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                📷
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">{user.name}</h2>
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${roleColors[user.role]} font-semibold text-sm shadow-lg`}>
                  {user.role}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-700/30 rounded-lg p-3">
                  <span className="text-blue-400">📧</span>
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-700/30 rounded-lg p-3">
                  <span className="text-green-400">📱</span>
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-700/30 rounded-lg p-3">
                  <span className="text-purple-400">📅</span>
                  <span className="text-sm">Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-700/30 rounded-lg p-3">
                  <span className="text-yellow-400">🕐</span>
                  <span className="text-sm">Active now</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="lg:self-start">
              <button
                onClick={() => setEditing(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                ✏️ Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Current Books', value: user.issuedBooks, icon: '📚', gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-500/10 to-cyan-500/10' },
            { label: 'Total Issued', value: user.totalIssued, icon: '📖', gradient: 'from-green-500 to-emerald-500', bg: 'from-green-500/10 to-emerald-500/10' },
            { label: 'Overdue', value: user.overdueBooks, icon: '⚠️', gradient: 'from-red-500 to-pink-500', bg: 'from-red-500/10 to-pink-500/10' },
            { label: 'Rating', value: '4.8⭐', icon: '🏆', gradient: 'from-yellow-500 to-orange-500', bg: 'from-yellow-500/10 to-orange-500/10' }
          ].map(({ label, value, icon, gradient, bg }) => (
            <div key={label} className={`relative bg-gradient-to-br ${bg} backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white text-xl shadow-lg`}>
                  {icon}
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {value}
                </div>
              </div>
              <div className="text-slate-300 font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs Section */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Tab Headers */}
          <div className="flex border-b border-slate-700/50 bg-slate-800/30">
            {[
              { key: 'overview', label: '📊 Overview', icon: '📊' },
              { key: 'activity', label: '📈 Activity', icon: '📈' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key as never)}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                  tab === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {tab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">📋 Account Details</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name', value: user.name, icon: '👤' },
                      { label: 'Email Address', value: user.email, icon: '📧' },
                      { label: 'Phone Number', value: user.phone, icon: '📱' },
                      { label: 'User Role', value: user.role, icon: '🎭' }
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                        <span className="text-2xl">{icon}</span>
                        <div>
                          <div className="text-slate-400 text-sm">{label}</div>
                          <div className="text-white font-medium">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">📊 Library Stats</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Books Currently Issued', value: user.issuedBooks, color: 'text-blue-400' },
                      { label: 'Total Books Issued', value: user.totalIssued, color: 'text-green-400' },
                      { label: 'Overdue Books', value: user.overdueBooks, color: 'text-red-400' },
                      { label: 'Account Status', value: 'Active', color: 'text-green-400' }
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl">
                        <span className="text-slate-300">{label}</span>
                        <span className={`font-bold text-lg ${color}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'activity' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">📈 Recent Activity</h3>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center text-xl ${activity.color}`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{activity.action}</div>
                        <div className="text-slate-400 text-sm">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-lg w-full border border-slate-600 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">✏️ Edit Profile</h3>
              <button onClick={() => setEditing(false)} className="text-slate-400 hover:text-white text-3xl transition-colors">×</button>
            </div>
            <div className="space-y-6">
              {[
                { key: 'name', label: 'Full Name', type: 'text', icon: '👤' },
                { key: 'email', label: 'Email Address', type: 'email', icon: '📧' },
                { key: 'phone', label: 'Phone Number', type: 'tel', icon: '📱' }
              ].map(({ key, label, type, icon }) => (
                <div key={key}>
                  <label className="block text-slate-300 font-medium mb-2 flex items-center gap-2">
                    <span>{icon}</span> {label}
                  </label>
                  <input
                    type={type}
                    value={form[key as keyof User] || ''}
                    onChange={(e) => {
                      update(key, e.target.value);
                      if (errors[key as keyof FormErrors]) {
                        setErrors(prev => ({ ...prev, [key]: undefined }));
                      }
                    }}
                    className={`w-full p-4 bg-slate-700 text-white border rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors[key as keyof FormErrors] 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-slate-600 focus:border-blue-500'
                    }`}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                  />
                  {errors[key as keyof FormErrors] && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <span>❌</span> {errors[key as keyof FormErrors]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={save}
                disabled={saving}
                className={`flex-1 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  saving 
                    ? 'bg-slate-600 text-slate-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105'
                }`}
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>💾 Save Changes</>
                )}
              </button>
              <button 
                onClick={() => {
                  setEditing(false);
                  setErrors({});
                  setForm(user || {});
                }} 
                disabled={saving}
                className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}