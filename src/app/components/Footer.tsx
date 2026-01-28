import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-surface mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Company info */}
          <div className="text-sm text-luxury-gray-400">
            © 2026 <span className="text-luxury-white font-medium">Cool Shot Systems</span>. All rights reserved.
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            <Link 
              href="/guidelines" 
              className="text-sm text-luxury-gray-400 hover:text-luxury-white transition-colors"
            >
              Community Guidelines
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-luxury-gray-400 hover:text-luxury-white transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-luxury-gray-400 hover:text-luxury-white transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/cookies" 
              className="text-sm text-luxury-gray-400 hover:text-luxury-white transition-colors"
            >
              Cookies
            </Link>
            <a 
              href="mailto:legal@learnloop.com" 
              className="text-sm text-luxury-gray-400 hover:text-luxury-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
