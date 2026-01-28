'use client';

import LoadingState from '../../components/LoadingState';

export default function TestLoadingPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-gradient-primary-from via-gradient-primary-via to-gradient-primary-to bg-clip-text text-transparent">
          LoadingState Component Demo
        </h1>
        
        <div className="space-y-16">
          {/* Large */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-luxury-gray-300">Large Size</h2>
            <div className="bg-dark-surface rounded-lg p-12">
              <LoadingState size="lg" />
            </div>
          </div>

          {/* Medium (default) */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-luxury-gray-300">Medium Size (Default)</h2>
            <div className="bg-dark-surface rounded-lg p-12">
              <LoadingState size="md" />
            </div>
          </div>

          {/* Small */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-luxury-gray-300">Small Size</h2>
            <div className="bg-dark-surface rounded-lg p-12">
              <LoadingState size="sm" />
            </div>
          </div>

          {/* In context */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-luxury-gray-300">In Context Example</h2>
            <div className="bg-dark-surface-elevated rounded-lg p-8 border border-dark-border">
              <p className="text-luxury-gray-400 mb-6">Loading your content...</p>
              <LoadingState size="md" />
            </div>
          </div>

          {/* Multiple instances */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-luxury-gray-300">Multiple Instances</h2>
            <div className="bg-dark-surface rounded-lg p-12 flex justify-around items-center">
              <LoadingState size="sm" />
              <LoadingState size="md" />
              <LoadingState size="sm" />
            </div>
          </div>

          {/* Dark surface variations */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-luxury-gray-300">On Different Dark Backgrounds</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-bg rounded-lg p-8">
                <p className="text-xs text-luxury-gray-500 mb-4">dark-bg</p>
                <LoadingState size="sm" />
              </div>
              <div className="bg-dark-surface rounded-lg p-8">
                <p className="text-xs text-luxury-gray-500 mb-4">dark-surface</p>
                <LoadingState size="sm" />
              </div>
              <div className="bg-dark-surface-elevated rounded-lg p-8">
                <p className="text-xs text-luxury-gray-500 mb-4">dark-surface-elevated</p>
                <LoadingState size="sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 p-6 bg-dark-surface-elevated rounded-lg border border-dark-border">
          <h3 className="text-xl font-semibold mb-4 text-gradient-primary-via">Features</h3>
          <ul className="space-y-2 text-luxury-gray-400">
            <li>✅ Network-inspired design with pulsing nodes</li>
            <li>✅ Primary gradient (indigo → violet → cyan)</li>
            <li>✅ Smooth looping animation</li>
            <li>✅ Respects prefers-reduced-motion</li>
            <li>✅ Three sizes: sm, md, lg</li>
            <li>✅ Works on all dark backgrounds</li>
            <li>✅ Reusable anywhere in the app</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
