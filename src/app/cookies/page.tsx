import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy - LearnLoop",
  description: "LearnLoop Cookie Policy - How we use cookies and local storage",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient-primary">
            Cookie Policy
          </h1>
          <p className="text-base text-luxury-gray-400">
            Last updated: January 28, 2026
          </p>
          <p className="text-base text-luxury-gray-400 mt-2">
            This Cookie Policy explains how LearnLoop (operated by Cool Shot Systems) uses cookies and similar technologies.
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl space-y-8">
          
          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              What Are Cookies and Local Storage?
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed mb-4">
              Cookies are small text files stored on your device when you visit a website. Local storage is 
              a similar technology that allows websites to store data in your browser.
            </p>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              LearnLoop uses these technologies to provide essential functionality and improve your experience 
              on the platform. We believe in transparency about how we use these technologies.
            </p>
          </section>

          {/* Essential Cookies */}
          <section className="bg-dark-surface-elevated border border-dark-border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Essential Cookies and Storage
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              These are necessary for the platform to function properly. You cannot opt out of these 
              while using LearnLoop.
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-accent-indigo pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Authentication Token
                </h3>
                <div className="space-y-2 text-luxury-gray-300">
                  <p><strong className="text-luxury-white">Purpose:</strong> Keeps you logged in to your account</p>
                  <p><strong className="text-luxury-white">Storage Type:</strong> Local Storage</p>
                  <p><strong className="text-luxury-white">Key Name:</strong> <code className="text-accent-cyan">learnloop_token</code></p>
                  <p><strong className="text-luxury-white">Data Stored:</strong> JWT authentication token</p>
                  <p><strong className="text-luxury-white">Expiration:</strong> Persists until you log out or token expires</p>
                  <p className="text-sm">
                    This token is essential for authenticating your requests and maintaining your session. 
                    Without it, you would need to log in every time you visit the site.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Analytics Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Analytics and Performance
            </h2>
            <div className="bg-dark-surface-elevated border border-dark-border rounded-xl p-6">
              <p className="text-base text-luxury-gray-300 leading-relaxed">
                <strong className="text-luxury-white">Currently, we do not use analytics cookies.</strong>
                {' '}LearnLoop does not currently use third-party analytics tools or performance tracking cookies. 
                If we add analytics in the future, we will update this policy and provide you with options 
                to control these cookies.
              </p>
            </div>
          </section>

          {/* What We Don't Use */}
          <section className="bg-gradient-to-r from-emerald-900 to-teal-900 bg-opacity-20 border border-accent-emerald rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              What We Don't Use
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              LearnLoop does not use the following:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">No Advertising Cookies:</strong> We do not use 
                  cookies for targeted advertising or ad tracking.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">No Third-Party Tracking:</strong> We do not share 
                  your browsing data with advertisers or data brokers.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">No Cross-Site Tracking:</strong> We do not track 
                  your activity across other websites.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">No Behavioral Profiling:</strong> We do not build 
                  behavioral profiles for marketing purposes.
                </span>
              </li>
            </ul>
          </section>

          {/* How to Control Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              How to Control Cookies and Local Storage
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              You have control over how cookies and local storage are used on your device:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-accent-indigo pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Browser Settings
                </h3>
                <p className="text-base text-luxury-gray-300 leading-relaxed mb-2">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="space-y-2 text-luxury-gray-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent-cyan">•</span>
                    <span>View and delete existing cookies and local storage</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-cyan">•</span>
                    <span>Block cookies from being set</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-cyan">•</span>
                    <span>Set preferences for specific websites</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-cyan">•</span>
                    <span>Clear cookies when you close your browser</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-l-4 border-accent-violet pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Impact of Blocking Cookies
                </h3>
                <p className="text-base text-luxury-gray-300 leading-relaxed">
                  <strong className="text-luxury-white">Please note:</strong> If you block or delete the 
                  authentication token stored in local storage, you will be automatically logged out and 
                  will need to log in again. This is necessary for the platform to function securely.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-emerald pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Logging Out
                </h3>
                <p className="text-base text-luxury-gray-300 leading-relaxed">
                  When you log out of LearnLoop, we automatically remove the authentication token from 
                  your browser's local storage. This ensures your account remains secure when you're 
                  not using the platform.
                </p>
              </div>
            </div>
          </section>

          {/* Browser-Specific Instructions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Browser-Specific Instructions
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              Here's how to manage cookies in popular browsers:
            </p>
            
            <div className="space-y-3">
              <div className="bg-dark-surface-elevated rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  Google Chrome
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Settings → Privacy and security → Cookies and other site data → See all site data and permissions
                </p>
              </div>
              
              <div className="bg-dark-surface-elevated rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  Mozilla Firefox
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Settings → Privacy & Security → Cookies and Site Data → Manage Data
                </p>
              </div>
              
              <div className="bg-dark-surface-elevated rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  Safari
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Preferences → Privacy → Manage Website Data
                </p>
              </div>
              
              <div className="bg-dark-surface-elevated rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  Microsoft Edge
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Settings → Cookies and site permissions → Manage and delete cookies and site data
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Security of Stored Data
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              We take the security of data stored in your browser seriously:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-cyan flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">JWT Tokens:</strong> Authentication tokens are 
                  cryptographically signed and have expiration times.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-cyan flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">HTTPS Only:</strong> All data transmitted between 
                  your browser and our servers is encrypted using HTTPS.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-cyan flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">No Sensitive Data:</strong> We do not store 
                  passwords or sensitive personal information in cookies or local storage.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-cyan flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Automatic Expiration:</strong> Tokens expire 
                  after a period of time, requiring you to log in again.
                </span>
              </li>
            </ul>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Changes to This Policy
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              If we add new cookies or tracking technologies in the future, we will update this Cookie Policy 
              and notify users of significant changes. We will provide clear information about any new cookies 
              and give you the opportunity to control them where applicable.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-indigo-900 to-violet-900 bg-opacity-20 border border-accent-indigo rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Questions?
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              If you have questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-luxury-gray-300">
              <p>
                <strong className="text-luxury-white">Company:</strong> Cool Shot Systems
              </p>
              <p>
                <strong className="text-luxury-white">Product:</strong> LearnLoop
              </p>
              <p>
                <strong className="text-luxury-white">Email:</strong>{' '}
                <a 
                  href="mailto:privacy@learnloop.com" 
                  className="text-accent-indigo hover:text-accent-violet transition-colors underline"
                >
                  privacy@learnloop.com
                </a>
              </p>
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center space-x-4">
          <Link 
            href="/privacy"
            className="text-sm font-medium text-accent-indigo hover:text-accent-violet transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-luxury-gray-600">•</span>
          <Link 
            href="/terms"
            className="text-sm font-medium text-accent-indigo hover:text-accent-violet transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-luxury-gray-600">•</span>
          <Link 
            href="/"
            className="text-sm font-medium text-accent-indigo hover:text-accent-violet transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
