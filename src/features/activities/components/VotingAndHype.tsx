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

      <div className="space-y-3">
        {voteItems?.map((item, idx) => (
          <div 
            key={idx} 
            className={`p-4 rounded-xl border ${
              item.importance 
                ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100' 
                : 'bg-white/80 border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {/* 타입에 따른 아이콘 변경 */}
                {item.type === 'hype' ? (
                  <Youtube className="w-4 h-4 text-red-500" />
                ) : (
                  <Trophy className="w-4 h-4 text-yellow-500" />
                )}
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              </div>
              {item.importance && (
                <span className="px-2 py-0.5 bg-red-400 text-white text-[10px] rounded-full animate-pulse">
                  중요
                </span>
              )}
            </div>
            
            <a 
              href={item.url} 
              target="_blank" 
              rel="noreferrer"
              className={`block w-full py-2 text-center text-sm text-white rounded-lg transition-all ${
                item.type === 'hype' 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500'
              }`}
            >
              {item.type === 'hype' ? 'Hype 하러 가기' : '투표 참여하기'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}