import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User as LucideUser, Mail, Phone, MapPin } from 'lucide-react';
import { UserProfile } from '../types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState<UserProfile>({
    uid: currentUser?.uid || '',
    email: currentUser?.email || '',
    displayName: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      pinCode: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile({ ...docSnap.data() as UserProfile });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserProfile],
          [child]: value,
        },
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setError('');
      setSuccess('');
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, profile, { merge: true });
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-600">Please sign in to view your profile</p>
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
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl font-semibold text-white ${
                  profile.email ? profile.email[0].toUpperCase() === 'A' ? 'bg-blue-500'
                    : profile.email[0].toUpperCase() === 'B' ? 'bg-green-500'
                    : profile.email[0].toUpperCase() === 'C' ? 'bg-yellow-500'
                    : profile.email[0].toUpperCase() === 'D' ? 'bg-purple-500'
                    : 'bg-maroon-500'
                  : 'bg-gray-400'
                }`}>
                  {profile.displayName?.[0]?.toUpperCase() || profile.email[0]?.toUpperCase()}
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {profile.displayName || 'Your Profile'}
                  </h1>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 border border-maroon-600 text-maroon-600 rounded-md hover:bg-maroon-50 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
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
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Display Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LucideUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="displayName"
                        value={profile.displayName || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-maroon-500 focus:border-maroon-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={profile.phoneNumber || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-maroon-500 focus:border-maroon-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address.street"
                        value={profile.address?.street || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-maroon-500 focus:border-maroon-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="address.city"
                        value={profile.address?.city || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-maroon-500 focus:border-maroon-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        name="address.state"
                        value={profile.address?.state || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-maroon-500 focus:border-maroon-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                      <input
                        type="text"
                        name="address.pinCode"
                        value={profile.address?.pinCode || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-maroon-500 focus:border-maroon-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 