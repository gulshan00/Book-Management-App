import { useState, useEffect } from 'react';

interface Setting {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'toggle' | 'select';
  value: boolean | string;
  options?: string[];
  icon: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockSettings: Setting[] = [
      {
        id: '1',
        name: 'Dark Mode',
        description: 'Switch between light and dark theme',
        category: 'Appearance',
        type: 'toggle',
        value: true,
        icon: '🌙'
      },
      {
        id: '2',
        name: 'Language',
        description: 'Choose your preferred language',
        category: 'General',
        type: 'select',
        value: 'English',
        options: ['English', 'Spanish', 'French', 'German'],
        icon: '🌍'
      },
      {
        id: '3',
        name: 'Email Notifications',
        description: 'Receive important updates via email',
        category: 'Notifications',
        type: 'toggle',
        value: false,
        icon: '📧'
      },
      {
        id: '4',
        name: 'Privacy Level',
        description: 'Control who can see your profile',
        category: 'Privacy',
        type: 'select',
        value: 'Public',
        options: ['Public', 'Friends Only', 'Private'],
        icon: '🔒'
      },
      {
        id: '5',
        name: 'Two-Factor Auth',
        description: 'Add extra security to your account',
        category: 'Security',
        type: 'toggle',
        value: true,
        icon: '🔐'
      },
      {
        id: '6',
        name: 'Auto-Save',
        description: 'Automatically save your work',
        category: 'General',
        type: 'toggle',
        value: true,
        icon: '💾'
      }
    ];
    
    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
    }, 1000);
  }, []);

  const updateSetting = (id: string, newValue: boolean | string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value: newValue } : setting
    ));
  };

  const categories = Array.from(new Set(settings.map(s => s.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="text-center mb-12">
              <div className="h-12 bg-slate-700 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-slate-700 rounded w-96 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-slate-800 rounded-2xl p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Settings
          </h1>
          <p className="text-slate-300 text-xl">Customize your experience to your liking</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {setting.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-semibold text-lg">{setting.name}</h3>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                        {setting.category}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{setting.description}</p>
                  </div>
                </div>
                
                {/* Control */}
                <div className="ml-4">
                  {setting.type === 'toggle' ? (
                    <label className="flex items-center cursor-pointer group-hover:scale-110 transition-transform duration-300">
                      <input
                        type="checkbox"
                        checked={setting.value as boolean}
                        onChange={(e) => updateSetting(setting.id, e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
                        setting.value 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30' 
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}>
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                          setting.value ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </div>
                    </label>
                  ) : (
                    <div className="relative">
                      <select
                        value={setting.value as string}
                        onChange={(e) => updateSetting(setting.id, e.target.value)}
                        className="appearance-none bg-slate-700/70 text-white border border-slate-600/50 rounded-xl px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-slate-700 cursor-pointer"
                      >
                        {setting.options?.map(option => (
                          <option key={option} value={option} className="bg-slate-800 text-white">{option}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{settings.length}</div>
            <div className="text-slate-300 text-sm">Total Settings</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {settings.filter(s => s.type === 'toggle' && s.value === true).length}
            </div>
            <div className="text-slate-300 text-sm">Enabled Features</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{categories.length}</div>
            <div className="text-slate-300 text-sm">Categories</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all duration-300 font-medium border border-slate-600/50 hover:border-slate-500">
            Reset to Defaults
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}