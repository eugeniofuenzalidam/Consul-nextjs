import { Sparkles, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7" />
            <span className="font-semibold text-black">Fuenzalida Consulting</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-black transition-colors text-sm">
              Features
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-black transition-colors text-sm">
              Learn more
            </Link>
            <Link href="#support" className="text-gray-600 hover:text-black transition-colors text-sm">
              Support
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      <div className="h-32 bg-gradient-to-r from-[#5B9AA9] to-[#A8C5CE]"></div>
    </>
  );
}
