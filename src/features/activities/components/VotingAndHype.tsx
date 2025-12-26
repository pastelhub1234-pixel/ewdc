import React from 'react';
import { Vote, Youtube, Trophy, ExternalLink, Sparkles, Megaphone } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface VoteItem {
  title: string;
  type: string; // "bugs", "hype" etc.
  imageUrl: string;
  url: string;
  importance: boolean;
}

export function VotingAndHype() {
  const { data: voteItems, loading, error } = useJsonData<VoteItem[]>('vote');

  if (loading) return <div className="p-8 text-center text-gray-400">투표 목록 로딩 중...</div>;
  if (error) return <div className="p-8 text-center text-red-400">데이터를 불러올 수 없습니다.</div>;

  return (
    // [컨테이너] 달력 컴포넌트와 동일한 Glassmorphism 스타일 적용
    <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white/60 h-full flex flex-col">
      
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6 pl-2">
        <div className="p-2 bg-purple-100 rounded-xl text-purple-600 shadow-sm">
           <Vote className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 leading-none">Voting & Hype</h3>
          <p className="text-xs text-gray-400 mt-1 font-medium">화력 지원이 필요해요! 🔥</p>
        </div>
      </div>

      {/* 리스트 영역 */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #e9d5ff; border-radius: 10px; }
        `}</style>

        {voteItems?.map((item, idx) => {
          const isHype = item.type === 'hype';
          const isImportant = item.importance;

          return (
            <div 
              key={idx} 
              className={`
                group relative flex flex-col gap-3 p-5 rounded-3xl border transition-all duration-300
                ${isImportant 
                  ? 'bg-red-50/50 border-red-100 hover:bg-white hover:border-red-200 hover:shadow-red-100/50' 
                  : 'bg-white/50 border-white hover:bg-white hover:border-purple-100'
                }
                hover:shadow-lg hover:-translate-y-1
              `}
            >
              {/* 상단: 뱃지 & 타이틀 */}
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-start gap-3">
                  {/* 아이콘 박스 */}
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-sm
                    ${isHype ? 'bg-red-100 text-red-500' : 'bg-yellow-100 text-yellow-600'}
                  `}>
                    {isHype ? <Youtube size={20} /> : <Trophy size={20} />}
                  </div>
                  
                  {/* 텍스트 정보 */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border
                        ${isHype 
                          ? 'bg-white text-red-500 border-red-100' 
                          : 'bg-white text-yellow-600 border-yellow-100'
                        }
                      `}>
                        {item.type}
                      </span>
                      {isImportant && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded-full animate-pulse">
                          <Megaphone size={10} /> 중요
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-800 text-base mt-1 leading-snug break-keep">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* 하단: 액션 버튼 */}
              <a 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className={`
                  flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white shadow-md transition-all active:scale-95
                  ${isHype
                    ? 'bg-gradient-to-r from-red-500 to-rose-400 hover:from-red-600 hover:to-rose-500 shadow-red-200'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-400 hover:from-purple-600 hover:to-indigo-500 shadow-purple-200'
                  }
                `}
              >
                {isHype ? 'Hype 하러 가기' : '투표 참여하기'}
                <ExternalLink size={14} className="opacity-80 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* 장식용 배경 효과 (중요한 항목일 때만) */}
              {isImportant && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 text-red-200 opacity-50 rotate-12 pointer-events-none">
                  <Sparkles size={40} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
