import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Guidelines - LearnLoop",
  description: "LearnLoop Community Guidelines - Creating a respectful learning environment",
};

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient-primary">
            Community Guidelines
          </h1>
          <p className="text-base text-luxury-gray-400">
            Last updated: January 28, 2026
          </p>
          <p className="text-base text-luxury-gray-400 mt-2">
            Welcome to LearnLoop! These guidelines help us maintain a respectful, supportive community 
            focused on learning and growth.
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-xl space-y-8">
          
          {/* Our Philosophy */}
          <section className="bg-gradient-to-r from-indigo-900 to-violet-900 bg-opacity-20 border border-accent-indigo rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Our Philosophy
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed mb-4">
              LearnLoop exists to foster a culture of learning, curiosity, and mutual respect. We believe 
              that everyone has something to learn and something to teach. Our community thrives when 
              members support each other's growth and share knowledge generously.
            </p>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              These guidelines aren't about restricting expression—they're about creating an environment 
              where everyone feels safe to ask questions, share ideas, and learn from one another.
            </p>
          </section>

          {/* Core Values */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Our Core Values
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-accent-indigo pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  🌱 Growth Mindset
                </h3>
                <p className="text-base text-luxury-gray-300">
                  We celebrate learning at all levels. There are no "stupid questions" here—every question 
                  is an opportunity to learn and help others learn.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-emerald pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  🤝 Mutual Respect
                </h3>
                <p className="text-base text-luxury-gray-300">
                  Treat everyone with kindness and respect, regardless of their experience level, 
                  background, or perspective. We learn best when we feel valued.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-cyan pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  💡 Knowledge Sharing
                </h3>
                <p className="text-base text-luxury-gray-300">
                  Share what you know generously. Give credit where it's due. Build on each other's 
                  ideas to create something greater together.
                </p>
              </div>
              
              <div className="border-l-4 border-accent-violet pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  🎯 Constructive Dialogue
                </h3>
                <p className="text-base text-luxury-gray-300">
                  Engage thoughtfully. Disagree respectfully. Focus on ideas, not personal attacks. 
                  We grow through constructive discussion.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptable Behavior */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              What We Encourage
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              These behaviors help build our community:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">Ask Questions:</strong> No matter how basic 
                  or advanced. Curiosity drives learning.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">Share Knowledge:</strong> Answer questions, 
                  share resources, and explain concepts in your own words.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">Be Supportive:</strong> Encourage others, 
                  celebrate their progress, and offer constructive feedback.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">Stay On Topic:</strong> Keep discussions 
                  relevant to learning and knowledge sharing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">Give Credit:</strong> Cite sources, 
                  acknowledge ideas from others, and respect intellectual contributions.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">Admit When You're Wrong:</strong> It's okay 
                  to make mistakes—that's how we learn. Acknowledge errors gracefully.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-emerald flex-shrink-0">✓</span>
                <span>
                  <strong className="text-luxury-white">Welcome Newcomers:</strong> Help new members 
                  feel at home. Remember that you were new once too.
                </span>
              </li>
            </ul>
          </section>

          {/* Prohibited Behavior */}
          <section className="bg-dark-surface-elevated border border-dark-border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              What's Not Allowed
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              These behaviors harm our community and are not permitted:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Harassment and Bullying:</strong> Personal attacks, 
                  intimidation, unwelcome contact, or targeting individuals based on their identity or characteristics.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Hate Speech:</strong> Content that demeans, threatens, 
                  or promotes discrimination against people based on race, ethnicity, religion, gender, 
                  sexual orientation, disability, or other protected characteristics.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Spam and Self-Promotion:</strong> Excessive self-promotion, 
                  repetitive posts, irrelevant links, or commercial spam. Share genuine knowledge, not advertisements.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Plagiarism:</strong> Copying others' work without 
                  attribution. Always credit sources and acknowledge when you're sharing someone else's ideas.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Misinformation:</strong> Deliberately spreading false 
                  information or misleading others. If you're uncertain, say so. Accuracy matters.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Trolling and Bad Faith:</strong> Deliberately 
                  provoking arguments, derailing discussions, or engaging in disruptive behavior.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Vote Manipulation:</strong> Creating fake accounts, 
                  coordinating votes, or gaming the system to artificially boost content.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>
                  <strong className="text-luxury-white">Illegal Content:</strong> Sharing pirated materials, 
                  instructions for illegal activities, or content that violates laws.
                </span>
              </li>
            </ul>
          </section>

          {/* Learning-First Culture */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Learning-First Culture
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              LearnLoop is built on the principle that learning is a journey, not a competition:
            </p>
            <div className="space-y-4">
              <div className="bg-dark-surface-elevated rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  📚 All Levels Welcome
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Whether you're just starting out or deeply experienced, your contributions matter. 
                  Beginners ask important questions. Experts share valuable insights. Everyone teaches 
                  and learns.
                </p>
              </div>
              
              <div className="bg-dark-surface-elevated rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  🎓 Patient Teaching
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  When answering questions, remember what it was like not to know. Explain concepts clearly, 
                  provide context, and resist the urge to make others feel bad for not knowing something.
                </p>
              </div>
              
              <div className="bg-dark-surface-elevated rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  💬 Constructive Feedback
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Feedback should help people improve. Focus on the content, be specific, and suggest 
                  improvements. Avoid harsh criticism that discourages learning.
                </p>
              </div>
              
              <div className="bg-dark-surface-elevated rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  🌍 Diverse Perspectives
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Different backgrounds and experiences enrich our community. Welcome varied viewpoints, 
                  learn from cultural differences, and recognize that there are often multiple valid 
                  approaches to a problem.
                </p>
              </div>
            </div>
          </section>

          {/* Reporting Process */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Reporting Violations
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              If you see content or behavior that violates these guidelines, please report it:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-accent-indigo pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  How to Report
                </h3>
                <p className="text-base text-luxury-gray-300 mb-2">
                  Contact us at{' '}
                  <a 
                    href="mailto:moderation@learnloop.com" 
                    className="text-accent-indigo hover:text-accent-violet transition-colors underline"
                  >
                    moderation@learnloop.com
                  </a>
                  {' '}with:
                </p>
                <ul className="space-y-2 text-luxury-gray-300 text-sm ml-4">
                  <li className="flex gap-2">
                    <span className="text-accent-cyan">•</span>
                    <span>Link to the content or user profile</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-cyan">•</span>
                    <span>Description of the issue</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-cyan">•</span>
                    <span>How it violates these guidelines</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-l-4 border-accent-emerald pl-4">
                <h3 className="text-lg font-semibold text-luxury-white mb-2">
                  What Happens Next
                </h3>
                <p className="text-base text-luxury-gray-300">
                  Our moderation team will review your report promptly and take appropriate action. 
                  We may remove content, issue warnings, or suspend accounts depending on the severity 
                  and frequency of violations. All reports are kept confidential.
                </p>
              </div>
            </div>
          </section>

          {/* Moderation Philosophy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Our Moderation Approach
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              We believe in fair, consistent, and transparent moderation:
            </p>
            <ul className="space-y-3 text-luxury-gray-300">
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Context Matters:</strong> We consider intent, 
                  context, and impact when evaluating content. Not every mistake requires punishment.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Education First:</strong> For minor violations, 
                  we prefer to educate rather than punish. We want people to learn and improve.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Escalating Consequences:</strong> First-time 
                  violations typically result in warnings. Repeated violations lead to stronger action, 
                  including temporary or permanent bans.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Human Review:</strong> Automated tools may flag 
                  content, but human moderators make final decisions considering nuance and context.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-indigo flex-shrink-0">•</span>
                <span>
                  <strong className="text-luxury-white">Appeals Process:</strong> If you believe a 
                  moderation decision was unfair, you can appeal by contacting us with your reasoning.
                </span>
              </li>
            </ul>
          </section>

          {/* Consequences */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Consequences for Violations
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              Depending on the severity and frequency of violations:
            </p>
            <div className="space-y-3">
              <div className="bg-amber-900 bg-opacity-20 border border-amber-600 rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  ⚠️ Warning
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  For minor or first-time violations, you'll receive a warning explaining what went wrong 
                  and how to improve.
                </p>
              </div>
              
              <div className="bg-orange-900 bg-opacity-20 border border-orange-600 rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  🚫 Content Removal
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Content that violates guidelines will be removed. You'll be notified and given an 
                  explanation.
                </p>
              </div>
              
              <div className="bg-red-900 bg-opacity-20 border border-red-600 rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  ⏸️ Temporary Suspension
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  For repeated violations or more serious issues, your account may be temporarily suspended 
                  while you reflect on the guidelines.
                </p>
              </div>
              
              <div className="bg-red-950 bg-opacity-30 border border-red-500 rounded-lg p-4">
                <h3 className="text-base font-semibold text-luxury-white mb-2">
                  🔒 Permanent Ban
                </h3>
                <p className="text-sm text-luxury-gray-300">
                  Severe violations (harassment, hate speech, illegal activity) or persistent rule-breaking 
                  may result in permanent account termination.
                </p>
              </div>
            </div>
          </section>

          {/* Final Note */}
          <section className="bg-gradient-to-r from-emerald-900 to-teal-900 bg-opacity-20 border border-accent-emerald rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Building Together
            </h2>
            <p className="text-base text-luxury-gray-300 leading-relaxed mb-4">
              These guidelines aren't just rules—they're the foundation of our community. Every member 
              plays a role in making LearnLoop a welcoming, supportive place to learn and grow.
            </p>
            <p className="text-base text-luxury-gray-300 leading-relaxed">
              Thank you for being part of our learning community. Your curiosity, kindness, and 
              willingness to share knowledge make LearnLoop special. Let's learn together!
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-indigo-900 to-violet-900 bg-opacity-20 border border-accent-indigo rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-luxury-white">
              Questions or Feedback?
            </h2>
            <p className="text-base text-luxury-gray-300 mb-4 leading-relaxed">
              Have questions about these guidelines or suggestions for improvement?
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
                  href="mailto:moderation@learnloop.com" 
                  className="text-accent-indigo hover:text-accent-violet transition-colors underline"
                >
                  moderation@learnloop.com
                </a>
              </p>
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center space-x-4">
          <Link 
            href="/terms"
            className="text-sm font-medium text-accent-indigo hover:text-accent-violet transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-luxury-gray-600">•</span>
          <Link 
            href="/privacy"
            className="text-sm font-medium text-accent-indigo hover:text-accent-violet transition-colors"
          >
            Privacy Policy
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
