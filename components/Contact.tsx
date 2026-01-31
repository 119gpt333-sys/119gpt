
import React from 'react';
import { ICONS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-zinc-50">
      <div className="mx-auto max-w-7xl">
        <div className="bg-white rounded-[40px] border border-zinc-200 overflow-hidden shadow-2xl shadow-zinc-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 bg-zinc-900 text-white space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Contact Us</h3>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                  여러분의 의견이<br />안전을 더 견고하게<br />만듭니다.
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-md">
                  서비스 개선 제안, 협업 문의, 데이터 관련 피드백 등 소중한 의견을 기다립니다. 모든 문의는 담당 부서의 검토를 거쳐 신속히 회신 드립니다.
                </p>
              </div>
              
              <div className="space-y-4 pt-12 border-t border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-orange-500">
                    <ICONS.ExternalLink />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Official Email</p>
                    <p className="text-sm font-medium">contact@seoul.fire.ai</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-12 lg:p-20 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">문의 유형</label>
                  <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-orange-500 transition-colors">
                    <option>서비스 이용 문의</option>
                    <option>데이터 협업/연구 제안</option>
                    <option>오류 및 개선 제보</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">성함 / 소속</label>
                  <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors" placeholder="홍길동 / 서울대학교" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">메시지</label>
                <textarea className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-6 text-xs min-h-[150px] outline-none focus:border-orange-500 transition-colors resize-none" placeholder="내용을 입력해주세요."></textarea>
              </div>
              <button className="w-full bg-orange-600 text-white py-4 rounded-xl text-xs font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
                문의 보내기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
