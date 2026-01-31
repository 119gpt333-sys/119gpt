
import React from 'react';

const VisualMap: React.FC = () => {
  return (
    <section className="w-full relative group h-[60vh] md:h-[80vh] bg-zinc-950 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2700&auto=format&fit=crop" 
        alt="Data Visualization Map" 
        className="w-full h-full object-cover opacity-50 transition-transform duration-[10000ms] ease-linear group-hover:scale-110 saturate-0"
      />
      <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay"></div>
      
      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent blur-sm animate-[scan_4s_infinite_linear]"></div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 bg-black/80 backdrop-blur-xl border border-zinc-800 p-6 rounded-2xl text-zinc-300 shadow-2xl max-w-sm w-[90%] md:w-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">FireNet Active Node</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
            <span className="text-[10px] uppercase text-zinc-500 font-bold">Location</span>
            <span className="text-xs font-mono text-white">Seoul Zone 04</span>
          </div>
          <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
            <span className="text-[10px] uppercase text-zinc-500 font-bold">Network Load</span>
            <span className="text-xs font-mono text-white">12.4 Gbps</span>
          </div>
          <p className="text-[10px] leading-relaxed text-zinc-400">
            실시간 다중 모달 데이터 스트림 분석 중. 현재 4,291개의 엣지 센서가 활성화되어 서울 전역의 이상 징후를 감지하고 있습니다.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(8000%); }
        }
      `}</style>
    </section>
  );
};

export default VisualMap;
