
import React, { useState, useRef } from 'react';
import { analyzeIncident } from '../services/geminiService.ts';
import { RiskAnalysis } from '../types.ts';
import { ICONS } from '../constants.tsx';

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    setLoading(true);
    setError(null);
    try {
      const result = await analyzeIncident(input, image || undefined);
      setAnalysis(result);
    } catch (err) {
      setError('분석 중 오류가 발생했습니다. 이미지 용량이 너무 크거나 네트워크 문제일 수 있습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const riskColors = {
    LOW: 'bg-green-100 text-green-700 border-green-200',
    MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    HIGH: 'bg-orange-100 text-orange-700 border-orange-200',
    CRITICAL: 'bg-red-100 text-red-700 border-red-200 animate-pulse',
  };

  return (
    <section id="assistant" className="py-24 px-6 bg-white border-y border-zinc-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Multi-modal Analysis Active
            </div>
            <h2 className="text-3xl md:text-5xl tracking-tight text-zinc-900 font-semibold leading-tight">
              현장 사진 & 시나리오<br />통합 분석기
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              사고 현장 사진을 업로드하거나 상황을 텍스트로 입력하세요. AI가 시각 데이터와 텍스트 데이터를 융합하여 정밀한 위험도를 도출합니다.
            </p>
            
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="relative group">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="텍스트 시나리오를 입력하세요 (이미지만으로도 분석 가능)..."
                  className="w-full min-h-[120px] p-6 rounded-2xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm resize-none"
                />
                
                {image && (
                  <div className="absolute top-4 right-4 group-2">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-orange-500 shadow-xl">
                      <img src={image} className="w-full h-full object-cover" alt="Preview" />
                      <button 
                        type="button"
                        onClick={() => setImage(null)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-zinc-200 text-zinc-600 px-6 py-4 rounded-2xl text-xs font-bold hover:bg-zinc-50 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  사진 업로드
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <button
                  type="submit"
                  disabled={loading || (!input.trim() && !image)}
                  className="flex-[1.5] flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-2xl text-xs font-bold hover:bg-orange-600 disabled:bg-zinc-200 transition-all shadow-xl shadow-zinc-200"
                >
                  {loading ? '데이터 융합 분석 중...' : '분석 실행'}
                  {!loading && <ICONS.ArrowRight />}
                </button>
              </div>
            </form>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}
          </div>

          {/* Analysis Result Display */}
          <div className="bg-zinc-50 rounded-[2.5rem] border border-zinc-200 p-8 min-h-[450px] flex flex-col relative overflow-hidden">
            {!analysis && !loading && (
              <div className="m-auto text-center space-y-6 max-w-xs">
                <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center text-zinc-300 shadow-sm">
                  <ICONS.Satellite />
                </div>
                <div className="space-y-2">
                  <p className="text-zinc-900 font-bold">대기 중</p>
                  <p className="text-zinc-400 text-xs">시나리오와 이미지를 결합하여 초정밀 분석 리포트를 생성합니다.</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="m-auto text-center space-y-8">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-orange-600 font-bold text-sm uppercase tracking-widest">Processing</p>
                  <p className="text-zinc-400 text-xs">시각 정보 추출 및 위험도 대조 중...</p>
                </div>
              </div>
            )}

            {analysis && !loading && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Analysis Intelligence</h3>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${riskColors[analysis.riskLevel]}`}>
                    {analysis.riskLevel}
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-tighter">종합 판정</label>
                  <p className="text-zinc-900 leading-relaxed font-medium text-sm md:text-base">{analysis.description}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-orange-500 tracking-tighter">대응 프로토콜</label>
                  <div className="p-5 bg-white border border-orange-100 rounded-2xl shadow-sm text-zinc-800 text-sm border-l-4 border-l-orange-500 leading-relaxed">
                    {analysis.recommendedAction}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-tighter">추천 AI 모델</label>
                  <div className="flex flex-wrap gap-2">
                    {analysis.suggestedAIModels.map((model, idx) => (
                      <span key={idx} className="bg-white text-zinc-600 px-3 py-2 rounded-xl text-[10px] font-bold border border-zinc-200 shadow-sm">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Verified Analysis
                  </div>
                  <button onClick={() => setAnalysis(null)} className="hover:text-orange-600 transition-colors">Reset</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
