
import React, { useState, useRef } from 'react';

const Hero: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string>("https://images.unsplash.com/photo-1599427303058-f616eb1694f4?q=80&w=2000&auto=format&fit=crop");
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImage(reader.result as string);
        // 스캔 애니메이션 효과를 위해 3초 후 스캔 모드 해제
        setTimeout(() => setIsScanning(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <header id="home" className="relative min-h-[90vh] lg:h-[85vh] w-full bg-white overflow-hidden pt-24 lg:pt-16 flex items-center">
      {/* Background Decor - pointer-events-none added to ensure clicks pass through */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-100/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-100 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Content: Text */}
            <div className="space-y-10 order-2 lg:order-1 relative z-20">
              <div className="inline-flex items-center gap-3 text-[11px] font-black text-orange-600 uppercase tracking-[0.4em]">
                <span className="w-12 h-[1px] bg-orange-600"></span>
                Seoul Fire Intelligence
              </div>
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tighter text-zinc-900 font-bold leading-[0.9]">
                  데이터로 답하는<br />
                  <span className="text-orange-600">서울소방 GPT</span>
                </h1>
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                  현장의 긴박함을 데이터의 냉철함으로 분석합니다. 축적된 재난 정보와 지능형 모델을 결합한 서울소방의 혁신 플랫폼입니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#assistant" className="bg-zinc-900 text-white px-10 py-5 rounded-2xl text-[13px] font-black hover:bg-orange-600 transition-all shadow-2xl shadow-zinc-300 active:scale-95 flex items-center justify-center">
                  AI 분석 엔진 실행
                </a>
                <button 
                  onClick={triggerUpload}
                  className="bg-white text-zinc-900 border border-zinc-200 px-10 py-5 rounded-2xl text-[13px] font-black hover:bg-zinc-50 transition-all active:scale-95 flex items-center gap-2 justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  현장 사진 업로드
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>

            {/* Right Content: The Visual Hero Image */}
            <div className="relative order-1 lg:order-2 group z-10">
              <div className={`relative aspect-[4/3] lg:aspect-[5/6] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(234,88,12,0.15)] ${!isScanning ? 'animate-float-slow' : ''} border border-white/50 bg-zinc-100`}>
                <img 
                  src={heroImage} 
                  alt="Fire Scene Analysis" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${isScanning ? 'scale-110 blur-[2px] saturate-[1.5]' : 'group-hover:scale-105'}`}
                />
                
                {/* Scanning Animation Effect */}
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none z-20">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500 shadow-[0_0_20px_#ea580c] animate-scan-line"></div>
                    <div className="absolute inset-0 bg-orange-500/5 animate-pulse"></div>
                  </div>
                )}

                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute top-8 right-8 flex flex-col items-end gap-2 pointer-events-none">
                  <div className={`px-4 py-2 ${isScanning ? 'bg-orange-500' : 'bg-red-600'} text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg transition-colors`}>
                    {isScanning ? 'Analyzing Scene...' : 'Critical Status'}
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full">
                    Live Feed Node #04
                  </div>
                </div>

                {/* Info Card Overlay */}
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] pointer-events-none">
                  <div className="flex items-center gap-6">
                    <div className="flex-1 space-y-1">
                      <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">
                        {isScanning ? 'Processing Visual Data' : 'Incident Scene Analysis'}
                      </p>
                      <p className="text-sm text-white font-bold">
                        {isScanning ? '이미지 픽셀 기반 위험 수치 산출 중...' : '현장 위험 요소 자동 탐지 시스템 가동 중'}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-orange-400 animate-ping' : 'bg-green-500 animate-pulse'} shadow-[0_0_15px_rgba(34,197,94,0.6)]`}></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-orange-600/10 blur-[60px] rounded-[4rem] -z-10 animate-pulse-soft pointer-events-none"></div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(0.5deg); }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-scan-line {
          animation: scan-line 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </header>
  );
};

export default Hero;
