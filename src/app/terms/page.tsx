import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - LearnLoop",
  description: "LearnLoop Terms of Service - Rules and guidelines for using our platform",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient-primary">
            Terms of Service
          </h1>
          <p className="text-base text-luxury-gray-400">
            Last updated: January 28, 2026
          </p>
          <p className="text-base text-luxury-gray-400 mt-2">
            These Terms of Service govern your use of LearnLoop, operated by Cool Shot Systems.
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl space-y-8">
          
          {/* Agreement to Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Agreement to Terms
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              By accessing or using LearnLoop, you agree to be bound by these Terms of Service and our Privacy Policy. 
              If you do not agree to these terms, you may not use the platform.
            </p>
          </section>

          {/* User Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              User Eligibility
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              To use LearnLoop, you must meet the following requirements:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  You must be at least 13 years old to create an account and use the platform.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  You must provide accurate and complete information during registration.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  You must not be prohibited from using the service under applicable laws.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  You must verify your email address before fully interacting with the platform.
                </span>
              </li>
            </ul>
          </section>

          {/* Account Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Account Responsibilities
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              You are responsible for maintaining the security and confidentiality of your account:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Account Security:</strong> Keep your password secure 
                  and do not share it with others. You are responsible for all activity under your account.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Accurate Information:</strong> Keep your account 
                  information current and accurate. Update your email address if it changes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">One Account Per Person:</strong> Each user may 
                  maintain only one account. Creating multiple accounts to evade restrictions is prohibited.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Notify Us:</strong> Immediately notify us of any 
                  unauthorized use of your account or security breaches.
                </span>
              </li>
            </ul>
          </section>

          {/* Content Ownership */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Content Ownership and License
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-accent-indigo pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Your Content
                </h3>
                <p className="text-base text-luxury-gray-300 leading-relaxed">
                  You retain full ownership of all content you create and post on LearnLoop, including posts, 
                  comments, and any other materials. Your content remains yours.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-cyan pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  License to LearnLoop
                </h3>
                <p className="text-base text-luxury-gray-300 leading-relaxed">
                  By posting content on LearnLoop, you grant us a non-exclusive, worldwide, royalty-free license 
                  to use, display, reproduce, and distribute your content on the platform. This license allows 
                  us to show your posts to other users and operate the service. This license ends when you 
                  delete your content or account, except for content that has been shared or copied by other users.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-violet pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Responsibility for Content
                </h3>
                <p className="text-base text-luxury-gray-300 leading-relaxed">
                  You are solely responsible for the content you post. Ensure you have the right to share 
                  any content you post and that it does not violate any laws or third-party rights.
                </p>
              </div>
            </div>
          </section>

          {/* Prohibited Behavior */}
          <section className="bg-dark-surface-elevated border border-dark-border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Prohibited Behavior
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              The following activities are strictly prohibited on LearnLoop:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Harassment and Abuse:</strong> Bullying, harassment, 
                  threats, or abusive behavior toward other users.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Spam and Manipulation:</strong> Posting spam, 
                  manipulating votes, or artificially inflating engagement.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Illegal Content:</strong> Sharing content that 
                  violates laws, including pirated materials, illegal substances, or exploitative content.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Hate Speech:</strong> Content that promotes hatred, 
                  discrimination, or violence based on race, ethnicity, religion, gender, or other protected characteristics.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Impersonation:</strong> Impersonating other users, 
                  organizations, or Cool Shot Systems staff.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Malicious Activity:</strong> Attempting to hack, 
                  exploit vulnerabilities, or disrupt the platform's functionality.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Copyright Infringement:</strong> Posting content 
                  that violates others' intellectual property rights without permission.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Misinformation:</strong> Deliberately spreading 
                  false information or harmful misinformation.
                </span>
              </li>
            </ul>
          </section>

          {/* Moderation Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Moderation and Enforcement
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              Cool Shot Systems reserves the right to moderate content and enforce these terms:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  We may review, remove, or moderate any content that violates these Terms of Service.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  We reserve the right to remove content at our discretion, even if it does not explicitly 
                  violate these terms but is deemed harmful to the community.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  We may investigate reports of violations and take appropriate action.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  We are not obligated to pre-screen content but may do so at our discretion.
                </span>
              </li>
            </ul>
          </section>

          {/* Account Suspension and Termination */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Account Suspension and Termination
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              We reserve the right to suspend or terminate accounts for violations of these terms:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Temporary Suspension
                </h3>
                <p className="text-base text-luxury-gray-300">
                  For minor or first-time violations, we may temporarily suspend your account and require 
                  corrective action before restoring access.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Permanent Termination
                </h3>
                <p className="text-base text-luxury-gray-300">
                  For serious or repeated violations, we may permanently terminate your account without warning. 
                  This includes but is not limited to: harassment, illegal activity, or multiple violations 
                  after warnings.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-cyan pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  Your Right to Terminate
                </h3>
                <p className="text-base text-luxury-gray-300">
                  You may terminate your account at any time by contacting us. Upon termination, your 
                  access will be removed, though some content may remain visible if it was shared or 
                  interacted with by others.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Limitation of Liability
            </h2>
            <div className="space-y-4 text-luxury-gray-300">
              <p className="leading-relaxed">
                <strong className="text-luxury-white">Service "As Is":</strong> LearnLoop is provided on an 
                "as is" and "as available" basis. We make no warranties, express or implied, regarding the 
                service's reliability, availability, or fitness for a particular purpose.
              </p>
              
              <p className="leading-relaxed">
                <strong className="text-luxury-white">User Content:</strong> We are not responsible for 
                user-generated content. Users are solely responsible for their posts, and we do not endorse 
                or verify the accuracy of user content.
              </p>
              
              <p className="leading-relaxed">
                <strong className="text-luxury-white">Limitation of Damages:</strong> To the maximum extent 
                permitted by law, Cool Shot Systems shall not be liable for any indirect, incidental, 
                consequential, or punitive damages arising from your use of LearnLoop.
              </p>
              
              <p className="leading-relaxed">
                <strong className="text-luxury-white">Maximum Liability:</strong> Our total liability to you 
                for any claims arising from your use of LearnLoop shall not exceed the amount you paid us 
                in the past 12 months (currently $0 for free users).
              </p>
              
              <p className="leading-relaxed">
                <strong className="text-luxury-white">Third-Party Links:</strong> LearnLoop may contain links 
                to third-party websites. We are not responsible for the content or practices of these external sites.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              LearnLoop Intellectual Property
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              The LearnLoop platform, including its design, features, code, and branding, is owned by 
              Cool Shot Systems and protected by copyright, trademark, and other intellectual property laws. 
              You may not copy, modify, distribute, or create derivative works from our platform without 
              express permission.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Changes to Terms
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              We may update these Terms of Service from time to time. We will notify users of significant 
              changes by posting a notice on the platform or via email. Your continued use of LearnLoop 
              after changes are posted constitutes acceptance of the updated terms. If you do not agree 
              to the updated terms, you must stop using the platform.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Governing Law and Disputes
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              These Terms of Service are governed by applicable laws. Any disputes arising from these 
              terms or your use of LearnLoop should be resolved through good faith negotiation. If 
              negotiation fails, disputes may be subject to binding arbitration or court proceedings 
              as permitted by law.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-indigo-900 to-violet-900 bg-opacity-20 border border-accent-indigo rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Contact Us
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              If you have questions about these Terms of Service, please contact us:
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
                  href="mailto:legal@learnloop.com" 
                  className="text-accent-indigo hover:text-accent-violet transition-colors underline"
                >
                  legal@learnloop.com
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
