'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateUser, ApiError } from '../lib/api';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [originalData, setOriginalData] = useState({ username: '', bio: '' });
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const MAX_BIO_LENGTH = 160;
  const hasChanges = username !== originalData.username || bio !== originalData.bio;

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('learnloop_token');
    if (!token) {
      router.push('/');
      return;
    }

    // Load user data
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        // Handle new response format: { user: null } means not authenticated
        if (user === null) {
          localStorage.removeItem('learnloop_token');
          router.push('/');
          return;
        }
        setUsername(user.username);
        setBio(user.bio || '');
        setOriginalData({
          username: user.username,
          bio: user.bio || ''
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user data');
        // Use error.code for programmatic error handling
        if (
          (err instanceof ApiError && (err.code === 'NO_TOKEN' || err.code === 'FETCH_ERROR')) ||
          (err instanceof Error && err.message.includes('Authentication required'))
        ) {
          localStorage.removeItem('learnloop_token');
          router.push('/');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!hasChanges) return;

    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const updatedUser = await updateUser({
        username: username.trim(),
        bio: bio.trim()
      });
      
      // Update original data to new values
      setOriginalData({
        username: updatedUser.username,
        bio: updatedUser.bio || ''
      });
      
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('learnloop_token');
    router.push('/');
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen"
        style={{ 
          backgroundColor: 'var(--color-luxury-white)',
          color: 'var(--color-luxury-black)'
        }}
      >
        <div className="max-w-2xl mx-auto px-6 py-12">
          <p className="text-sm" style={{ color: 'var(--color-luxury-gray-600)' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: 'var(--color-luxury-white)',
        color: 'var(--color-luxury-black)'
      }}
    >
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 
            className="text-3xl font-medium mb-2"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Settings
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-luxury-gray-600)' }}>
            Manage your account
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div 
            className="mb-6 border-l-4 p-4"
            style={{ 
              borderColor: 'var(--color-accent)',
              backgroundColor: 'var(--color-luxury-gray-50)'
            }}
          >
            <p className="text-sm" style={{ color: 'var(--color-accent)' }}>
              Changes saved successfully
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div 
            className="mb-6 border-l-4 p-4"
            style={{ 
              borderColor: 'var(--color-luxury-gray-900)',
              backgroundColor: 'var(--color-luxury-gray-50)'
            }}
          >
            <p className="text-sm font-medium mb-1">Error</p>
            <p className="text-sm" style={{ color: 'var(--color-luxury-gray-700)' }}>
              {error}
            </p>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="mb-8">
            <h2 
              className="text-xl font-medium mb-6"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Profile
            </h2>
            <div 
              className="border-b mb-6"
              style={{ borderColor: 'var(--color-luxury-gray-200)' }}
            />

            {/* Username Field */}
            <div className="mb-6">
              <label 
                htmlFor="username" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-luxury-black)' }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={saving}
                className="w-full px-4 py-3 text-sm border rounded-none focus:outline-none focus:ring-1"
                style={{ 
                  borderColor: 'var(--color-luxury-gray-300)',
                  backgroundColor: 'var(--color-luxury-white)',
                  color: 'var(--color-luxury-black)'
                }}
                placeholder="Enter your username"
              />
            </div>

            {/* Bio Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label 
                  htmlFor="bio" 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-luxury-black)' }}
                >
                  Bio
                </label>
                <span 
                  className="text-xs"
                  style={{ 
                    color: bio.length > MAX_BIO_LENGTH 
                      ? 'var(--color-luxury-gray-900)' 
                      : 'var(--color-luxury-gray-500)'
                  }}
                >
                  {bio.length}/{MAX_BIO_LENGTH}
                </span>
              </div>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={MAX_BIO_LENGTH}
                disabled={saving}
                rows={3}
                className="w-full px-4 py-3 text-sm border rounded-none focus:outline-none focus:ring-1 resize-none"
                style={{ 
                  borderColor: 'var(--color-luxury-gray-300)',
                  backgroundColor: 'var(--color-luxury-white)',
                  color: 'var(--color-luxury-black)'
                }}
                placeholder="Tell us a bit about yourself..."
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={!hasChanges || saving}
              className="px-6 py-3 text-sm font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: 'var(--color-luxury-black)',
                color: 'var(--color-luxury-white)'
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Logout Section */}
        <div>
          <h2 
            className="text-xl font-medium mb-6"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Account
          </h2>
          <div 
            className="border-b mb-6"
            style={{ borderColor: 'var(--color-luxury-gray-200)' }}
          />
          
          <button
            type="button"
            onClick={handleLogout}
            className="px-6 py-3 text-sm font-medium border transition-opacity hover:opacity-70"
            style={{ 
              borderColor: 'var(--color-luxury-gray-300)',
              color: 'var(--color-luxury-black)'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
