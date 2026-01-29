'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateUser, changePassword, ApiError } from '../lib/api';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [originalData, setOriginalData] = useState({ username: '', bio: '' });
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

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

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    
    setPasswordError('');
    setPasswordSuccess(false);

    // Validation
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    setPasswordChanging(true);

    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      
      setPasswordSuccess(true);
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Hide success message after 3 seconds
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setPasswordChanging(false);
    }
  };

  // Check if password form is valid
  const isPasswordFormValid = 
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword !== currentPassword &&
    newPassword === confirmPassword &&
    !passwordChanging;

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

        {/* Change Password Section */}
        <form onSubmit={handlePasswordChange} className="mb-12">
          <div className="mb-8">
            <h2 
              className="text-xl font-medium mb-6"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Change Password
            </h2>
            <div 
              className="border-b mb-6"
              style={{ borderColor: 'var(--color-luxury-gray-200)' }}
            />

            {/* Password Success Message */}
            {passwordSuccess && (
              <div 
                className="mb-6 border-l-4 p-4"
                style={{ 
                  borderColor: 'var(--color-accent)',
                  backgroundColor: 'var(--color-luxury-gray-50)'
                }}
              >
                <p className="text-sm" style={{ color: 'var(--color-accent)' }}>
                  Password changed successfully
                </p>
              </div>
            )}

            {/* Password Error Message */}
            {passwordError && (
              <div 
                className="mb-6 border-l-4 p-4"
                style={{ 
                  borderColor: 'var(--color-luxury-gray-900)',
                  backgroundColor: 'var(--color-luxury-gray-50)'
                }}
              >
                <p className="text-sm font-medium mb-1">Error</p>
                <p className="text-sm" style={{ color: 'var(--color-luxury-gray-700)' }}>
                  {passwordError}
                </p>
              </div>
            )}

            {/* Current Password Field */}
            <div className="mb-6">
              <label 
                htmlFor="currentPassword" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-luxury-black)' }}
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  disabled={passwordChanging}
                  className="w-full px-4 py-3 pr-12 text-sm border rounded-none focus:outline-none focus:ring-1"
                  style={{ 
                    borderColor: 'var(--color-luxury-gray-300)',
                    backgroundColor: 'var(--color-luxury-white)',
                    color: 'var(--color-luxury-black)'
                  }}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  disabled={passwordChanging}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 transition-opacity disabled:opacity-50"
                  style={{ color: 'var(--color-luxury-gray-500)' }}
                  aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                >
                  {showCurrentPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div className="mb-6">
              <label 
                htmlFor="newPassword" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-luxury-black)' }}
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={passwordChanging}
                  className="w-full px-4 py-3 pr-12 text-sm border rounded-none focus:outline-none focus:ring-1"
                  style={{ 
                    borderColor: 'var(--color-luxury-gray-300)',
                    backgroundColor: 'var(--color-luxury-white)',
                    color: 'var(--color-luxury-black)'
                  }}
                  placeholder="Enter new password (min 8 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  disabled={passwordChanging}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 transition-opacity disabled:opacity-50"
                  style={{ color: 'var(--color-luxury-gray-500)' }}
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {newPassword.length > 0 && newPassword.length < 8 && (
                <p className="mt-1 text-xs" style={{ color: 'var(--color-luxury-gray-600)' }}>
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-luxury-black)' }}
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={passwordChanging}
                  className="w-full px-4 py-3 pr-12 text-sm border rounded-none focus:outline-none focus:ring-1"
                  style={{ 
                    borderColor: 'var(--color-luxury-gray-300)',
                    backgroundColor: 'var(--color-luxury-white)',
                    color: 'var(--color-luxury-black)'
                  }}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={passwordChanging}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 transition-opacity disabled:opacity-50"
                  style={{ color: 'var(--color-luxury-gray-500)' }}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                <p className="mt-1 text-xs" style={{ color: 'var(--color-luxury-gray-600)' }}>
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Change Password Button */}
            <button
              type="submit"
              disabled={!isPasswordFormValid}
              className="px-6 py-3 text-sm font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: 'var(--color-luxury-black)',
                color: 'var(--color-luxury-white)'
              }}
            >
              {passwordChanging ? 'Changing Password...' : 'Change Password'}
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
