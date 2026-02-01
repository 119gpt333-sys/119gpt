
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants.tsx';

const Navbar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(loggedIn);
    if (loggedIn) document.body.classList.add('admin-active');
  }, []);

  const handleAdminLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdmin) {
      if (confirm('관리자 모드를 종료하시겠습니까?')) {
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
        document.body.classList.remove('admin-active');
        window.location.reload();
      }
      return;
    }

    const password = prompt('관리자 비밀번호를 입력하세요.');
    if (password === '1618') {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      document.body.classList.add('admin-active');
      alert('관리자 권한이 승인되었습니다. 데이터 편집이 가능합니다.');
      window.location.reload();
    } else if (password !== null) {
      alert('비밀번호가 옳지 않습니다.');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      {/* 고가시성 관리자 배너 */}
      {isAdmin && (
        <div className="bg-orange-600 text-white h-8 flex items-center overflow-hidden border-b border-orange-700 pointer-events-none">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-12">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                관리자 모드 활성 중 — 실시간 데이터 수정 및 삭제 권한이 활성화되었습니다
              </span>
            ))}
          </div>
        </div>
      )}

      <nav className={`border-b ${isAdmin ? 'border-orange-500 bg-orange-50/95 shadow-lg shadow-orange-500/10' : 'border-zinc-200 bg-white/90'} backdrop-blur-md transition-all relative z-10`}>
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-zinc-900 text-sm tracking-tighter uppercase flex items-center gap-2 font-bold hover:opacity-70 transition-opacity">
            <div className={`p-1 rounded-md transition-colors ${isAdmin ? 'bg-orange-700' : 'bg-orange-600'} text-white`}>
              <ICONS.Fire />
            </div>
            Seoul Fire AI GPT {isAdmin && <span className="text-[10px] text-orange-600 ml-1 font-black">[관리자]</span>}
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest text-zinc-500 uppercase">
            <a href="#home" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="#database" className="hover:text-orange-600 transition-colors">Database</a>
            <a href="#assistant" className="hover:text-orange-600 transition-colors">AI Assistant</a>
            <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleAdminLogin}
              className={`relative z-20 flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all shadow-sm ${isAdmin ? 'bg-orange-700 text-white hover:bg-zinc-900' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
            >
              {isAdmin ? '관리자 로그아웃' : '관리자'}
            </button>
            <a href="#" className="hidden md:flex items-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-4 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-orange-600 hover:border-orange-600 transition-all group">
              포털 접속
              <ICONS.ExternalLink />
            </a>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
