import React, { useState, useEffect, type JSX } from 'react';

// Define specific types for different setting values
type ToggleValue = boolean;
type SelectValue = string;
type InputValue = string;
type RangeValue = number;

// Union type for all possible setting values
type SettingValue = ToggleValue | SelectValue | InputValue | RangeValue;

interface BaseSettingItem {
  id: string;
  category: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

interface ToggleSettingItem extends BaseSettingItem {
  type: 'toggle';
  value: ToggleValue;
}

interface SelectSettingItem extends BaseSettingItem {
  type: 'select';
  value: SelectValue;
  options: string[];
}

interface InputSettingItem extends BaseSettingItem {
  type: 'input';
  value: InputValue;
}

interface RangeSettingItem extends BaseSettingItem {
  type: 'range';
  value: RangeValue;
  min: number;
  max: number;
}

// Union type for all setting items
type SettingItem = ToggleSettingItem | SelectSettingItem | InputSettingItem | RangeSettingItem;

export default function Settings() {
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockSettings: SettingItem[] = [
      {
        id: '1',
        category: 'General',
        name: 'Dark Mode',
        description: 'Enable dark theme across the application',
        type: 'toggle',
        value: true,
        status: 'Active'
      },
      {
        id: '2',
        category: 'General',
        name: 'Language',
        description: 'Select your preferred language',
        type: 'select',
        value: 'English',
        options: ['English', 'Spanish', 'French', 'German', 'Chinese'],
        status: 'Active'
      },
      {
        id: '3',
        category: 'Notifications',
        name: 'Email Notifications',
        description: 'Receive notifications via email',
        type: 'toggle',
        value: false,
        status: 'Active'
      },
      {
        id: '4',
        category: 'Notifications',
        name: 'Push Notifications',
        description: 'Enable browser push notifications',
        type: 'toggle',
        value: true,
        status: 'Active'
      },
      {
        id: '5',
        category: 'Privacy',
        name: 'Profile Visibility',
        description: 'Control who can see your profile',
        type: 'select',
        value: 'Public',
        options: ['Public', 'Friends Only', 'Private'],
        status: 'Active'
      },
      {
        id: '6',
        category: 'Privacy',
        name: 'Data Collection',
        description: 'Allow anonymous usage data collection',
        type: 'toggle',
        value: false,
        status: 'Inactive'
      },
      {
        id: '7',
        category: 'Performance',
        name: 'Cache Size',
        description: 'Maximum cache size in MB',
        type: 'range',
        value: 512,
        min: 100,
        max: 2048,
        status: 'Active'
      },
      {
        id: '8',
        category: 'Performance',
        name: 'Auto-save Interval',
        description: 'Minutes between auto-saves',
        type: 'input',
        value: '5',
        status: 'Active'
      },
      {
        id: '9',
        category: 'Security',
        name: 'Two-Factor Authentication',
        description: 'Enable 2FA for enhanced security',
        type: 'toggle',
        value: true,
        status: 'Active'
      },
      {
        id: '10',
        category: 'Security',
        name: 'Session Timeout',
        description: 'Auto logout after inactivity (minutes)',
        type: 'select',
        value: '30',
        options: ['15', '30', '60', '120', 'Never'],
        status: 'Active'
      }
    ];
    
    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
    }, 1000);
  }, []);

  const categories: string[] = ['All', ...Array.from(new Set(settings.map(s => s.category)))];
  
  const filteredSettings = settings.filter((setting: SettingItem) => {
    const matchesSearch = setting.name.toLowerCase().includes(search.toLowerCase()) ||
                         setting.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || setting.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSettingChange = (id: string, newValue: SettingValue): void => {
    setSettings(prev => prev.map((setting: SettingItem) => 
      setting.id === id ? { ...setting, value: newValue } as SettingItem : setting
    ));
  };

  const renderSettingControl = (setting: SettingItem): JSX.Element | null => {
    switch (setting.type) {
      case 'toggle': {
        return (
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={(setting as ToggleSettingItem).value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleSettingChange(setting.id, e.target.checked)
              }
              className="sr-only"
            />
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              (setting as ToggleSettingItem).value ? 'bg-blue-600' : 'bg-slate-600'
            }`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                (setting as ToggleSettingItem).value ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </div>
          </label>
        );
      }
      
      case 'select': {
        return (
          <select
            value={(setting as SelectSettingItem).value}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
              handleSettingChange(setting.id, e.target.value)
            }
            className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            {(setting as SelectSettingItem).options.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      }
      
      case 'input': {
        return (
          <input
            type="text"
            value={(setting as InputSettingItem).value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              handleSettingChange(setting.id, e.target.value)
            }
            className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-1 text-sm w-20 focus:ring-2 focus:ring-blue-500"
          />
        );
      }
      
      case 'range': {
        const rangeSetting = setting as RangeSettingItem;
        return (
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min={rangeSetting.min}
              max={rangeSetting.max}
              value={rangeSetting.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleSettingChange(setting.id, parseInt(e.target.value, 10))
              }
              className="w-24 accent-blue-600"
            />
            <span className="text-blue-400 text-sm font-medium min-w-[50px]">
              {rangeSetting.value}{setting.name.includes('MB') ? 'MB' : ''}
            </span>
          </div>
        );
      }
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700 rounded mb-6 w-48"></div>
          <div className="h-12 bg-slate-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1,2,3,4].map((i: number) => (
              <div key={i} className="h-20 bg-slate-700 rounded"></div>
            ))}
          </div>
          <div className="flex space-x-2 mb-6">
            {[1,2,3,4,5].map((i: number) => (
              <div key={i} className="h-8 bg-slate-700 rounded w-20"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1,2,3,4,5,6].map((i: number) => (
              <div key={i} className="h-24 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleResetToDefaults = (): void => {
    // Implementation for reset functionality
    console.log('Reset to defaults clicked');
  };

  const handleSaveChanges = (): void => {
    // Implementation for save functionality
    console.log('Save changes clicked');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          ⚙️ Settings Configuration
        </h1>
        <p className="text-slate-300">Customize your application preferences and settings</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search settings by name or description..."
          value={search}
          onChange={handleSearchChange}
          className="w-full p-4 bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">{settings.length}</div>
          <div className="text-slate-300 text-sm">Total Settings</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">
            {settings.filter((s: SettingItem) => s.status === 'Active').length}
          </div>
          <div className="text-slate-300 text-sm">Active</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">
            {categories.length - 1}
          </div>
          <div className="text-slate-300 text-sm">Categories</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {settings.filter((s: SettingItem) => s.type === 'toggle' && (s as ToggleSettingItem).value).length}
          </div>
          <div className="text-slate-300 text-sm">Enabled</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category: string) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        {filteredSettings.map((setting: SettingItem) => (
          <div
            key={setting.id}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 mr-4">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{setting.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    setting.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {setting.status}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                    {setting.category}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{setting.description}</p>
              </div>
              <div className="flex items-center">
                {renderSettingControl(setting)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredSettings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚙️</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No settings found</h3>
          <p className="text-slate-400">Try adjusting your search terms or category filter</p>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="flex justify-end space-x-4">
          <button 
            onClick={handleResetToDefaults}
            className="px-6 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200"
          >
            Reset to Defaults
          </button>
          <button 
            onClick={handleSaveChanges}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}