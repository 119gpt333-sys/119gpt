
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import Architecture from './components/Architecture';
import Database from './components/Database';
import SafetyMonitor from './components/SafetyMonitor';
import Contact from './components/Contact';
import { ICONS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      
      <main>
        {/* Home Section */}
        <Hero />

        {/* Database Section */}
        <Database />

        {/* AI Assistant Section */}
        <AIAssistant />

        {/* Datasets Section (SafetyMonitor) */}
        <SafetyMonitor />

        {/* System Architecture (Expertise) */}
        <Architecture />

        {/* Contact Section */}
        <Contact />
      </main>

      <footer className="bg-white border-t border-zinc-200 py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1 space-y-6">
              <a href="/" className="text-zinc-900 text-sm flex items-center gap-2 font-bold tracking-tighter uppercase">
                <div className="bg-orange-600 text-white p-1 rounded-md">
                  <ICONS.Fire />
                </div>
                Seoul Fire AI GPT
              </a>
              <p className="text-xs text-zinc-500 leading-relaxed">
                서울특별시 소방재난본부의 지능형 데이터 플랫폼입니다. 우리는 더 안전한 도시를 위해 기술을 혁신합니다.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Services</h4>
              <ul className="space-y-3 text-[11px] font-bold text-zinc-500">
                <li><a href="#assistant" className="hover:text-orange-600">AI GPT 어시스턴트</a></li>
                <li><a href="#database" className="hover:text-orange-600">데이터 아카이브</a></li>
                <li><a href="#datasets" className="hover:text-orange-600">오픈 데이터셋</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Policies</h4>
              <ul className="space-y-3 text-[11px] font-bold text-zinc-500">
                <li><a href="#" className="hover:text-orange-600">개인정보 처리방침</a></li>
                <li><a href="#" className="hover:text-orange-600">AI 윤리 원칙</a></li>
                <li><a href="#" className="hover:text-orange-600">데이터 활용 가이드</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Official</h4>
              <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">
                서울특별시 소방재난본부<br />
                지능형 소방 연구팀
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              © 2024 SEOUL METROPOLITAN FIRE & DISASTER HEADQUARTERS. ALL RIGHTS RESERVED.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest hover:text-orange-600 transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
