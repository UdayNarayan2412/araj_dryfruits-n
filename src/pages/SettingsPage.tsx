import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Moon, Sun, Globe } from 'lucide-react';
import { UserPreferences } from '../types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [preferences, setPreferences] = useState<UserPreferences>({
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    theme: 'light',
    language: 'en',
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!currentUser) return;
      
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().preferences) {
          setPreferences(docSnap.data().preferences);
        }
      } catch (err) {
        console.error('Error fetching preferences:', err);
        setError('Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [currentUser]);

  const handleToggle = (key: keyof UserPreferences) => {
    if (typeof preferences[key] === 'boolean') {
      setPreferences(prev => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const handleChange = (key: keyof UserPreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (!currentUser) return;

    try {
      setError('');
      setSuccess('');
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { preferences }, { merge: true });
      setSuccess('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError('Failed to save preferences');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-600">Please sign in to view settings</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account preferences and notifications
            </p>
          </div>

          <div className="px-6 py-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-md">
                {success}
              </div>
            )}

            <div className="space-y-6">
              {/* Notifications */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                    </div>
                    <button
                      onClick={() => handleToggle('emailNotifications')}
                      className={`${
                        preferences.emailNotifications ? 'bg-maroon-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          preferences.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Order Updates</h3>
                      <p className="text-sm text-gray-500">Get notified about your order status</p>
                    </div>
                    <button
                      onClick={() => handleToggle('orderUpdates')}
                      className={`${
                        preferences.orderUpdates ? 'bg-maroon-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          preferences.orderUpdates ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Promotional Emails</h3>
                      <p className="text-sm text-gray-500">Receive emails about special offers and discounts</p>
                    </div>
                    <button
                      onClick={() => handleToggle('promotionalEmails')}
                      className={`${
                        preferences.promotionalEmails ? 'bg-maroon-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          preferences.promotionalEmails ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  {preferences.theme === 'light' ? (
                    <Sun className="h-5 w-5 mr-2" />
                  ) : (
                    <Moon className="h-5 w-5 mr-2" />
                  )}
                  Appearance
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Theme</label>
                    <div className="mt-2 flex gap-3">
                      <button
                        onClick={() => handleChange('theme', 'light')}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                          preferences.theme === 'light'
                            ? 'bg-maroon-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => handleChange('theme', 'dark')}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                          preferences.theme === 'dark'
                            ? 'bg-maroon-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Language
                </h2>
                <div>
                  <label className="text-sm font-medium text-gray-900">Select Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-maroon-500 focus:outline-none focus:ring-maroon-500 sm:text-sm"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 