import React from 'react';
import { Music, ExternalLink, PlayCircle, Headphones } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface Platform {
  name: string;
  url: string;
  iconImg: string;
}

interface StreamingData {
  songTitle: string;
  Img: string;
  platforms: Platform[];
}

export function MusicStreaming() {
  const { data, loading, error } = useJsonData<StreamingData>('streaming');

  if (loading) return <div className="p-8 text-center text-gray-400">로딩 중...</div>;
  if (error) return <div className="p-8 text-center text-red-400">데이터를 불러올 수 없습니다.</div>;

  return (
    // [컨테이너] Glassmorphism 스타일 통일
    <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white/60 h-full flex flex-col">
      
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6 pl-2">
        <div className="p-2 bg-pink-100 rounded-xl text-pink-500 shadow-sm">
           <Music className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 leading-none">Streaming</h3>
          <p className="text-xs text-gray-400 mt-1 font-medium">오늘의 권장 스트리밍 🎧</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #e9d5ff; border-radius: 10px; }
        `}</style>

        {/* 앨범 아트 Hero 섹션 */}
        <div className="relative w-full rounded-3xl overflow-hidden mb-6 p-6 flex flex-col items-center justify-center text-center group">
          {/* 배경 블러 효과 */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 scale-110 transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundImage: `url(${data?.Img})` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/60" />

          {/* 앨범 콘텐츠 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <img 
                src={data?.Img} 
                alt={data?.songTitle} 
                className="w-28 h-28 rounded-2xl shadow-lg object-cover mb-4 ring-4 ring-white/50 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md text-pink-500">
                <Headphones size={16} fill="currentColor" />
              </div>
            </div>
            
            <h4 className="font-bold text-gray-800 text-lg leading-tight px-4 break-keep">
              {data?.songTitle}
            </h4>
            <span className="mt-2 text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Now Recommended
            </span>
          </div>
        </div>

        {/* 플랫폼 리스트 */}
        <div className="space-y-2.5">
          {data?.platforms.map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 pl-4 bg-white/60 hover:bg-white rounded-2xl border border-white hover:border-purple-100 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                {/* 아이콘 이미지 (그림자 및 라운드 처리) */}
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm p-0.5">
                  <img src={p.iconImg} alt={p.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-purple-700 transition-colors">
                  {p.name}
                </span>
              </div>
              
              <div className="pr-2 text-gray-300 group-hover:text-purple-400 transition-colors transform group-hover:scale-110">
                <PlayCircle size={20} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
