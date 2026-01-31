
import React from 'react';
import { ICONS } from '../constants';

const Database: React.FC = () => {
  const dbCategories = [
    {
      title: "운영·행정 데이터",
      items: ["소방 관련 법령 요약", "내부 업무 매뉴얼", "민원 행정 질의 유형"],
      icon: <ICONS.Code />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "현장 대응 데이터",
      items: ["사건 유형별 사례", "상황별 대응 절차", "화재·구조 현장 로그"],
      icon: <ICONS.Fire />,
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "공공·외부 데이터",
      items: ["서울시 실시간 교통", "도시 공간 정보", "기상 및 환경 통계"],
      icon: <ICONS.Satellite />,
      color: "bg-zinc-100 text-zinc-600"
    }
  ];

  return (
    <section id="database" className="py-32 px-6 bg-white border-y border-zinc-100">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Database Archive</h3>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
              검증된 데이터에서<br />시작되는 신뢰
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              서울소방GPT의 모든 답변은 비식별 처리된 공공 데이터와 공식 매뉴얼을 기반으로 합니다. 단순한 언어 모델을 넘어 신뢰할 수 있는 지식 저장소를 구축합니다.
            </p>
            <div className="pt-4 flex items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>비식별 원칙</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>실시간 동기화</span>
            </div>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {dbCategories.map((cat, i) => (
              <div key={i} className="p-8 rounded-3xl border border-zinc-100 bg-zinc-50 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all group cursor-default">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${cat.color}`}>
                  {cat.icon}
                </div>
                <h4 className="text-sm font-bold text-zinc-900 mb-6">{cat.title}</h4>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-[11px] text-zinc-500 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-zinc-300"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Database;
