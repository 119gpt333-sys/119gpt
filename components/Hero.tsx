
import React from 'react';

const Hero: React.FC = () => {
  return (
    <header id="home" className="relative h-[85vh] w-full bg-zinc-50 overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2940&auto=format&fit=crop" 
          alt="Seoul Urban Safety" 
          className="w-full h-full object-cover opacity-10 saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 text-[10px] font-black text-orange-600 uppercase tracking-[0.3em]">
              <span className="w-12 h-[1px] bg-orange-600"></span>
              Seoul Fire Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter text-zinc-900 font-bold leading-[0.95]">
              데이터로 답하는<br />
              <span className="text-orange-600">서울소방 GPT</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
              서울소방의 축적된 현장 경험과 방대한 공공 데이터를 기반으로 비상 대응, 행정 지원, 정책 분석을 돕는 지능형 의사결정 파트너입니다.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#assistant" className="bg-zinc-900 text-white px-8 py-4 rounded-full text-xs font-bold hover:bg-orange-600 transition-all shadow-xl shadow-zinc-200">
                AI 분석 시작하기
              </a>
              <a href="#database" className="bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-full text-xs font-bold hover:bg-zinc-50 transition-all">
                데이터 아카이브 둘러보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
