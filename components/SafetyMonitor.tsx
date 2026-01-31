
import React, { useEffect, useState } from 'react';
import { fetchLiveSafetyNews } from '../services/geminiService.ts';
import { ICONS } from '../constants.tsx';

const SafetyMonitor: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const result = await fetchLiveSafetyNews();
      setData(result);
      setLoading(false);
    };
    loadNews();
  }, []);

  return (
    <section id="datasets" className="py-24 px-6 bg-zinc-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/5 blur-[120px] -z-0"></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                <ICONS.Satellite />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">Live Urban Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">서울 실시간 안전 모니터</h2>
          </div>
          <button 
             onClick={() => window.location.reload()}
             className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            REFRESH FEED
            <div className="w-1 h-1 rounded-full bg-green-500"></div>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-2xl bg-zinc-900 border border-zinc-800 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed">
                  <p className="whitespace-pre-wrap text-lg">{data?.text || '실시간 데이터를 불러올 수 없습니다.'}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Sources & Grounding</h3>
              <div className="space-y-3">
                {data?.links?.map((link: any, i: number) => (
                  <a 
                    key={i} 
                    href={link.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-800/50 transition-all group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-zinc-200 line-clamp-1 group-hover:text-orange-400 transition-colors">{link.title || 'Source'}</span>
                      <ICONS.ExternalLink />
                    </div>
                  </a>
                )) || <p className="text-xs text-zinc-500 italic">참조 링크가 없습니다.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SafetyMonitor;
