import React from 'react';
import { Vote, Youtube, Trophy } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface VoteItem {
  title: string;
  type: string; // "bugs", "hype" 등
  imageUrl: string;
  url: string;
  importance: boolean;
}

export function VotingAndHype() {
  const { data: voteItems, loading, error } = useJsonData<VoteItem[]>('vote');

  if (loading) return <div>투표 목록 로딩 중...</div>;
  if (error) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <Vote className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800">투표 · YouTube Hype</h3>
      </div>

      {/* [배치 설정 변경]
        grid-cols-1: 모바일에서는 1개
        sm:grid-cols-2: 작은 태블릿에서는 2개
        md:grid-cols-4: 일반 태블릿 및 PC에서는 4개 (기존 lg -> md로 변경하여 더 빨리 4개가 되도록 설정)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {voteItems?.map((item, idx) => (
          <div 
            key={idx} 
            className={`p-4 rounded-xl border flex flex-col justify-between transition-all hover:shadow-md ${
              item.importance 
                ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100' 
                : 'bg-white/80 border-gray-100'
            }`}
          >
            {/* 상단: 아이콘 + 제목 + 중요배지 */}
            <div className="flex items-start justify-between mb-3 gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="shrink-0 p-1.5 bg-white rounded-lg shadow-sm border border-gray-100">
                    {item.type === 'hype' ? (
                      <Youtube className="w-4 h-4 text-red-500" />
                    ) : (
                      <Trophy className="w-4 h-4 text-yellow-500" />
                    )}
                </div>
                <p className="text-sm font-bold text-gray-700 leading-tight line-clamp-2">{item.title}</p>
              </div>
              
              {item.importance && (
                <span className="shrink-0 px-1.5 py-0.5 bg-red-400 text-white text-[10px] font-bold rounded-md animate-pulse">
                  중요
                </span>
              )}
            </div>
            
            {/* 하단: 버튼 */}
            <a 
              href={item.url} 
              target="_blank" 
              rel="noreferrer"
              className={`block w-full py-2.5 text-center text-xs font-bold text-white rounded-lg transition-all shadow-sm active:scale-95 mt-auto ${
                item.type === 'hype' 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-100' 
                  : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 shadow-purple-100'
              }`}
            >
              {item.type === 'hype' ? 'Hype 하기' : '투표 참여'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
