
import React, { useState, useRef, useEffect } from 'react';
import { analyzeIncident } from '../services/geminiService';
import { RiskAnalysis } from '../types';
import { ICONS } from '../constants';

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await analyzeIncident(input);
      setAnalysis(result);
    } catch (err) {
      setError('분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
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
              Live AI Analysis v3.1
            </div>
            <h2 className="text-3xl md:text-5xl tracking-tight text-zinc-900 font-semibold leading-tight">
              재난 시나리오<br />지능형 분석기
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              Gemini 기반의 AI가 실시간으로 화재 시나리오를 분석하고 최적의 대응 전략과 필요한 AI 모델을 제안합니다. 시나리오를 아래에 입력하세요.
            </p>
            
            <form onSubmit={handleAnalyze} className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="예: 강남역 인근 15층 빌딩 4층에서 화재 발생, 연기 확산 속도 빠름, 유동인구 많음..."
                className="w-full min-h-[160px] p-6 rounded-2xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm resize-none shadow-inner"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute bottom-4 right-4 flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-orange-600 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {loading ? '분석 중...' : '시나리오 분석'}
                {!loading && <ICONS.ArrowRight />}
              </button>
            </form>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}
          </div>

          <div className="bg-zinc-50 rounded-3xl border border-zinc-200 p-8 min-h-[400px] flex flex-col relative overflow-hidden">
            {!analysis && !loading && (
              <div className="m-auto text-center space-y-4 max-w-xs">
                <div className="w-16 h-16 bg-zinc-200/50 rounded-2xl mx-auto flex items-center justify-center text-zinc-400">
                  <ICONS.Satellite />
                </div>
                <p className="text-zinc-400 text-sm">왼쪽 입력창에 시나리오를 작성하면 AI 분석 결과가 여기에 표시됩니다.</p>
              </div>
            )}

            {loading && (
              <div className="m-auto space-y-6 text-center">
                <div className="flex justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-600 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 rounded-full bg-orange-600 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-orange-600 animate-bounce"></span>
                </div>
                <p className="text-zinc-500 text-sm font-medium animate-pulse">디지털 트윈 데이터 대조 중...</p>
              </div>
            )}

            {analysis && !loading && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">분석 결과 리포트</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${riskColors[analysis.riskLevel]}`}>
                    RISK: {analysis.riskLevel}
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-tighter">분석 요약</label>
                  <p className="text-zinc-900 leading-relaxed font-medium">{analysis.description}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-orange-500 tracking-tighter">권장 전략</label>
                  <div className="p-4 bg-white border border-orange-100 rounded-xl shadow-sm text-zinc-800 text-sm border-l-4 border-l-orange-500">
                    {analysis.recommendedAction}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-tighter">추천 배치 모델</label>
                  <div className="flex flex-wrap gap-2">
                    {analysis.suggestedAIModels.map((model, idx) => (
                      <span key={idx} className="bg-zinc-200/50 text-zinc-600 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">Confidence: 99.2%</span>
                  </div>
                  <button 
                    onClick={() => setAnalysis(null)}
                    className="text-[10px] text-zinc-400 hover:text-orange-600 uppercase font-bold transition-colors"
                  >
                    결과 초기화
                  </button>
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
