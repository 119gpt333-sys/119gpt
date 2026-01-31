
import React from 'react';

const Architecture: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 space-y-6">
            <h3 className="text-xl tracking-tight text-zinc-900 font-semibold uppercase tracking-wider">시스템 아키텍처</h3>
            <p className="text-zinc-500 leading-relaxed">
              독자적인 'FireNet' 아키텍처는 다중 모달 입력을 처리합니다. 드론 비디오 피드, 소방관 장비의 IoT 센서 데이터, 도시 교통망 정보를 종합하여 실행 가능한 정보를 도출합니다.
            </p>
            <ul className="space-y-3 text-sm text-zinc-500 pt-2">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                엣지 컴퓨팅 (On-Device)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                실시간 클라우드 동기화
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                AR HUD 통합
              </li>
            </ul>
          </div>
          <div className="md:w-2/3 bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
            <div className="w-full aspect-[16/9] relative">
              <svg viewBox="0 0 800 450" className="w-full h-full text-zinc-800" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="50" y="200" width="100" height="60" rx="8" className="text-zinc-300" strokeWidth="1"></rect>
                <text x="100" y="235" textAnchor="middle" className="text-[10px] fill-zinc-500 stroke-none font-bold uppercase tracking-widest">Sensors</text>
                
                <rect x="250" y="100" width="120" height="250" rx="12" className="text-zinc-900" fill="#f4f4f5" strokeWidth="2"></rect>
                <text x="310" y="80" textAnchor="middle" className="text-[10px] uppercase tracking-widest fill-zinc-400 stroke-none font-bold">Neural Core</text>

                <circle cx="310" cy="140" r="15" fill="white"></circle>
                <circle cx="310" cy="225" r="15" fill="white"></circle>
                <circle cx="310" cy="310" r="15" fill="white"></circle>
                
                <rect x="500" y="180" width="100" height="100" rx="8" className="text-orange-500" strokeWidth="2"></rect>
                <path d="M535 230 L565 230 M550 215 L550 245" strokeWidth="3"></path>
                <text x="550" y="310" textAnchor="middle" className="text-[10px] uppercase tracking-widest fill-orange-600 stroke-none font-bold">Alarm</text>

                <path d="M150 230 L250 140" strokeDasharray="4,4" className="text-zinc-300"></path>
                <path d="M150 230 L250 225" strokeDasharray="4,4" className="text-zinc-300"></path>
                <path d="M150 230 L250 310" strokeDasharray="4,4" className="text-zinc-300"></path>

                <path d="M370 140 L500 230" className="text-zinc-400"></path>
                <path d="M370 225 L500 230" className="text-zinc-400"></path>
                <path d="M370 310 L500 230" className="text-zinc-400"></path>
                
                <rect x="650" y="50" width="100" height="350" rx="4" className="text-zinc-100" fill="#fafafa"></rect>
                <line x1="670" y1="80" x2="730" y2="80" className="text-zinc-200" strokeWidth="4"></line>
                <line x1="670" y1="100" x2="710" y2="100" className="text-zinc-200" strokeWidth="4"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
