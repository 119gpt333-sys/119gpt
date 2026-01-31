
import React from 'react';
import { ICONS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-zinc-900 text-sm tracking-tighter uppercase flex items-center gap-2 font-bold hover:opacity-70 transition-opacity">
          <div className="bg-orange-600 text-white p-1 rounded-md">
            <ICONS.Fire />
          </div>
          Seoul Fire AI GPT
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest text-zinc-500 uppercase">
          <a href="#home" className="hover:text-orange-600 transition-colors">Home</a>
          <a href="#database" className="hover:text-orange-600 transition-colors">Database</a>
          <a href="#datasets" className="hover:text-orange-600 transition-colors">Datasets</a>
          <a href="#assistant" className="hover:text-orange-600 transition-colors">AI Assistant</a>
          <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 uppercase">
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
            System Online
          </span>
          <a href="#" className="hidden md:flex items-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-4 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-orange-600 hover:border-orange-600 transition-all group">
            포털 접속
            <ICONS.ExternalLink />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
