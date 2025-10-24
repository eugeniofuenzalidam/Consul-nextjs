'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-black">
            <Sparkles className="w-8 h-8" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#productos"
              className="text-[#5B9AA9] hover:text-black transition-colors text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="#recursos"
              className="text-[#5B9AA9] hover:text-black transition-colors text-sm font-medium"
            >
              Resources
            </Link>
            <Link
              href="#precios"
              className="text-[#5B9AA9] hover:text-black transition-colors text-sm font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="#productos"
              className="block text-[#5B9AA9] hover:text-black transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="#recursos"
              className="block text-[#5B9AA9] hover:text-black transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="#precios"
              className="block text-[#5B9AA9] hover:text-black transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
