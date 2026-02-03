'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomeActions() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page or filter posts
      // For now, we'll just log it - you can implement search later
      console.log('Searching for:', searchQuery);
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Action buttons row */}
      <div className="flex items-center gap-4">
        {/* Create Post Button */}
        <Link
          href="/create"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Post</span>
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, topics, users..."
              className="w-full px-4 py-3 pl-11 bg-dark-surface-elevated border border-dark-border rounded-lg text-sm text-luxury-white placeholder-luxury-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:border-transparent transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gray-500" aria-hidden="true">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-gray-500 hover:text-luxury-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
