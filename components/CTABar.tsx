'use client';

import { Sparkles } from 'lucide-react';

export default function CTABar() {
  return (
    <section className="bg-black py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-white">
          <Sparkles className="w-6 h-6" />
          <span className="font-semibold">Fuenzalida Consulting</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white text-sm hover:text-gray-300 transition-colors">
            Secondary
          </a>
          <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Contactar
          </button>
        </div>
      </div>
    </section>
  );
}
