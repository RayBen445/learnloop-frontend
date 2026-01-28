import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - LearnLoop",
  description: "LearnLoop Privacy Policy - How we collect, use, and protect your data",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient-primary">
            Privacy Policy
          </h1>
          <p className="text-base text-luxury-gray-400">
            Last updated: January 28, 2026
          </p>
          <p className="text-base text-luxury-gray-400 mt-2">
            Cool Shot Systems ("we", "us", or "our") operates LearnLoop, a learning-based social platform.
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Introduction
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              This Privacy Policy explains how we collect, use, store, and protect your personal information 
              when you use LearnLoop. We are committed to protecting your privacy and being transparent about 
              our data practices.
            </p>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Information We Collect
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              We collect the following information when you use LearnLoop:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Email Address:</strong> Used for account creation, 
                  verification, and important communications about your account.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Username:</strong> Your public identifier on the platform, 
                  visible to other users.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Posts and Comments:</strong> Content you create and share 
                  on the platform, including text and any associated metadata.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Votes:</strong> Your upvotes on posts and comments, 
                  used to help surface quality content.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Authentication Tokens:</strong> Secure tokens stored 
                  in your browser to keep you logged in and protect your account.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Account Information:</strong> Profile details like 
                  bio and account creation date.
                </span>
              </li>
            </ul>
          </section>

          {/* Why We Collect Data */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Why We Collect This Information
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              We collect and use your information for the following purposes:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">To provide our service:</strong> Enable you to create 
                  an account, post content, and interact with the community.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">To verify your identity:</strong> Ensure accounts 
                  belong to real users through email verification.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">To improve the platform:</strong> Understand how 
                  users engage with content and make LearnLoop better.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">To communicate with you:</strong> Send important 
                  updates, verification emails, and notifications about your account.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">To maintain security:</strong> Protect your account 
                  and prevent unauthorized access or abuse.
                </span>
              </li>
            </ul>
          </section>

          {/* How We Store and Protect Data */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              How We Store and Protect Your Data
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              We take data security seriously and implement industry-standard practices:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-cyan flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Encryption:</strong> Your password is encrypted using 
                  secure hashing algorithms. We never store passwords in plain text.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-cyan flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Secure Storage:</strong> Data is stored on secure 
                  servers with restricted access and regular backups.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-cyan flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Authentication Tokens:</strong> JWT tokens are 
                  stored securely in your browser and have expiration times.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-cyan flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Access Controls:</strong> Only authorized personnel 
                  have access to user data, and only when necessary for platform operation.
                </span>
              </li>
            </ul>
          </section>

          {/* Email Verification */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Email Verification
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              When you create an account, we send a verification email to confirm your email address. 
              This helps us ensure that:
            </p>
            <ul className="space-y-3 text-luxury-gray-300 mt-4">
              <li className="flex gap-3">
                <span className="text-accent-violet flex-shrink-0">•</span>
                <span>You have access to the email address you provided</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-violet flex-shrink-0">•</span>
                <span>We can contact you if needed for account-related matters</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-violet flex-shrink-0">•</span>
                <span>The platform maintains quality by reducing spam and fake accounts</span>
              </li>
            </ul>
            <p className="text-base text-luxury-gray-300 mt-4 leading-relaxed">
              You must verify your email before you can create posts or interact with content. 
              Verification links expire after a certain time for security purposes.
            </p>
          </section>

          {/* Data Not Sold */}
          <section className="bg-dark-surface-elevated border border-dark-border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              We Do Not Sell Your Data
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              <strong className="text-luxury-white">We never sell your personal information to third parties.</strong> 
              {' '}Your data is used solely to operate and improve LearnLoop. We do not share your information 
              with advertisers or data brokers.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Your Rights
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              You have the following rights regarding your personal data:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-accent-indigo pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Access Your Data
                </h3>
                <p className="text-base text-luxury-gray-300">
                  You can view and access your profile information, posts, and comments at any time 
                  by logging into your account.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-emerald pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Correct Your Data
                </h3>
                <p className="text-base text-luxury-gray-300">
                  You can update your username, bio, and other profile information through your 
                  account settings at any time.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-cyan pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Delete Your Data
                </h3>
                <p className="text-base text-luxury-gray-300">
                  You have the right to request deletion of your account and associated data. 
                  Contact us at the email below to initiate this process. Note that some data 
                  may be retained for legal compliance or legitimate business purposes.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-violet pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Export Your Data
                </h3>
                <p className="text-base text-luxury-gray-300">
                  You can request a copy of your data in a portable format. Contact us to make 
                  this request.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Changes to This Privacy Policy
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify users of any 
              significant changes by posting a notice on the platform or sending an email to your 
              registered email address. Your continued use of LearnLoop after changes are made 
              constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-indigo-900 to-violet-900 bg-opacity-20 border border-accent-indigo rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Contact Us
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              If you have questions about this Privacy Policy or how we handle your data, 
              please contact us:
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
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="text-sm font-medium text-accent-indigo hover:text-accent-violet transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
