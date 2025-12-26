import React from 'react';
import { Music, ExternalLink } from 'lucide-react';
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

  if (loading) return <div>로딩 중...</div>;
  if (error) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800">음원 스트리밍</h3>
      </div>

      {/* 앨범 정보 */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-white/50 rounded-xl">
        <img 
          src={data?.Img} 
          alt={data?.songTitle} 
          className="w-12 h-12 rounded-lg object-cover shadow-sm"
        />
        <div>
          <p className="text-xs text-gray-500">권장 스트리밍</p>
          <p className="font-bold text-gray-800">{data?.songTitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {data?.platforms.map((p, idx) => (
          <a
            key={idx}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-purple-50 transition-colors border border-purple-100/30 group"
          >
            <div className="flex items-center gap-3">
              {/* 실제 아이콘 이미지 사용 (없으면 이모지 대체 가능) */}
              <img src={p.iconImg} alt={p.name} className="w-6 h-6 object-contain" />
              <span className="text-sm font-medium text-gray-700">{p.name}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}