
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants.tsx';
import { DatabaseCategory } from '../types.ts';

const DEFAULT_CATEGORIES: DatabaseCategory[] = [
  {
    title: "운영·행정 데이터",
    items: ["소방 관련 법령 요약", "내부 업무 매뉴얼", "민원 행정 질의 유형"],
    iconType: 'Code',
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "현장 대응 데이터",
    items: ["사건 유형별 사례", "상황별 대응 절차", "화재·구조 현장 로그"],
    iconType: 'Fire',
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "공공·외부 데이터",
    items: ["서울시 실시간 교통", "도시 공간 정보", "기상 및 환경 통계"],
    iconType: 'Satellite',
    color: "bg-zinc-100 text-zinc-600"
  }
];

const Database: React.FC = () => {
  const [categories, setCategories] = useState<DatabaseCategory[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('seoul_fire_db');
    if (savedData) {
      setCategories(JSON.parse(savedData));
    } else {
      setCategories(DEFAULT_CATEGORIES);
    }
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const saveToLocal = (updated: DatabaseCategory[]) => {
    setCategories(updated);
    localStorage.setItem('seoul_fire_db', JSON.stringify(updated));
  };

  const handleEditItem = (catIndex: number, itemIndex: number, newValue: string) => {
    // Immutable update: create new array and new object
    const newCategories = categories.map((cat, idx) => {
      if (idx === catIndex) {
        const newItems = [...cat.items];
        newItems[itemIndex] = newValue;
        return { ...cat, items: newItems };
      }
      return cat;
    });
    saveToLocal(newCategories);
  };

  const handleDeleteItem = (catIndex: number, itemIndex: number) => {
    const newCategories = categories.map((cat, idx) => {
      if (idx === catIndex) {
        const newItems = cat.items.filter((_, iIdx) => iIdx !== itemIndex);
        return { ...cat, items: newItems };
      }
      return cat;
    });
    saveToLocal(newCategories);
  };

  const handleAddItem = (catIndex: number) => {
    const newItem = prompt('새로운 항목 내용을 입력하세요:');
    if (newItem) {
      const newCategories = categories.map((cat, idx) => {
        if (idx === catIndex) {
          return { ...cat, items: [...cat.items, newItem] };
        }
        return cat;
      });
      saveToLocal(newCategories);
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'Code': return <ICONS.Code />;
      case 'Fire': return <ICONS.Fire />;
      case 'Satellite': return <ICONS.Satellite />;
      default: return <ICONS.Code />;
    }
  };

  return (
    <section id="database" className="py-32 px-6 bg-white border-y border-zinc-100 relative z-0">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Database Archive</h3>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
              검증된 데이터에서<br />시작되는 신뢰
            </h2>
            <div className="text-zinc-500 leading-relaxed">
              <p>서울소방GPT의 모든 답변은 비식별 처리된 공공 데이터와 공식 매뉴얼을 기반으로 합니다.</p>
              {isAdmin && (
                <div className="mt-6 text-orange-700 font-bold bg-orange-100 p-4 rounded-2xl text-xs border border-orange-200 shadow-inner">
                  <span className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping"></span>
                    권한 확인: 관리자 (Admin)
                  </span>
                  현재 관리자 모드입니다. 텍스트를 클릭하여 수정하세요.
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${isAdmin ? 'border-orange-300 bg-orange-50/30 shadow-md' : 'border-zinc-100 bg-zinc-50'} hover:bg-white hover:shadow-2xl transition-all group relative overflow-hidden`}>
                {isAdmin && <div className="absolute top-0 right-0 p-2 text-[8px] font-black text-orange-400 opacity-40 select-none uppercase tracking-widest">Editable Area</div>}
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${cat.color}`}>
                  {renderIcon(cat.iconType)}
                </div>
                <h4 className="text-sm font-bold text-zinc-900 mb-6">{cat.title}</h4>
                <ul className="space-y-4">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-[11px] text-zinc-500 flex items-start gap-2 relative group/item">
                      <div className={`w-1 h-1 rounded-full ${isAdmin ? 'bg-orange-400' : 'bg-zinc-300'} mt-2 flex-shrink-0`}></div>
                      
                      {isAdmin ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input 
                            type="text" 
                            value={item} 
                            onChange={(e) => handleEditItem(i, j, e.target.value)}
                            className="bg-white border border-orange-200 rounded-lg px-2 py-1.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none w-full text-orange-900 font-medium shadow-sm transition-all"
                            autoComplete="off"
                          />
                          <button 
                            onClick={() => handleDeleteItem(i, j)}
                            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                            title="삭제"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <span className="leading-relaxed">{item}</span>
                      )}
                    </li>
                  ))}
                  
                  {isAdmin && (
                    <li className="pt-2">
                      <button 
                        onClick={() => handleAddItem(i)}
                        className="w-full py-3 border-2 border-dashed border-orange-200 rounded-xl text-[10px] font-black text-orange-500 hover:border-orange-500 hover:bg-orange-100 transition-all active:scale-[0.98]"
                      >
                        + 항목 추가
                      </button>
                    </li>
                  )}
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
