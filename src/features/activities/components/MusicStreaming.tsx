import React, { useState } from 'react';
import { Music, ChevronRight, ChevronLeft, Info, ExternalLink } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

// JSON 데이터 타입 정의
interface Platform {
  name: string;
  url: string;
  iconImg: string;
}

interface Guide {
  title: string;
  image: string;
}

interface StreamingData {
  songTitle: string;
  Img: string;
  platforms: Platform[];
  guides?: Guide[];
}

export function MusicStreaming() {
  // 데이터 불러오기
  const { data, loading, error } = useJsonData<StreamingData>('streaming');
  const [currentGuideIdx, setCurrentGuideIdx] = useState(0);

  if (loading) return <div className="p-6 text-center text-gray-500">데이터 불러오는 중...</div>;
  if (error || !data) return null;

  const guides = data.guides || [];
  const hasGuides = guides.length > 0;

  // 슬라이드 이전/다음 핸들러
  const prevGuide = () => {
    setCurrentGuideIdx((prev) => (prev === 0 ? guides.length - 1 : prev - 1));
  };

  const nextGuide = () => {
    setCurrentGuideIdx((prev) => (prev === guides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800 font-bold">음원 스트리밍 가이드</h3>
      </div>

      {/* [레이아웃 수정] lg -> md로 변경하여 노트북에서도 가로 배치 유지 */}
      <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[280px]">
        
        {/* [왼쪽] 가이드 이미지 슬라이더 (높이 100%로 꽉 차게) */}
        <div className="md:w-2/3 h-full relative group rounded-2xl overflow-hidden border border-purple-100 bg-gray-100 shadow-sm">
            {hasGuides ? (
              <>
                <img 
                  src={guides[currentGuideIdx].image} 
                  alt="Streaming Guide" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {/* 텍스트 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="flex items-center gap-1 text-purple-300 text-xs font-bold mb-1">
                    <Info className="w-3 h-3" /> GUIDE {currentGuideIdx + 1}/{guides.length}
                  </span>
                  <h4 className="text-white font-bold text-lg drop-shadow-md leading-tight">
                    {guides[currentGuideIdx].title}
                  </h4>
                </div>
                
                {/* 화살표 컨트롤 (호버 시 표시) */}
                <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <button 
                    onClick={prevGuide}
                    className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors pointer-events-auto"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextGuide}
                    className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors pointer-events-auto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                가이드 이미지가 없습니다.
              </div>
            )}
        </div>

        {/* [오른쪽] 타겟 곡 정보 & 바로가기 링크 */}
        <div className="md:w-1/3 flex flex-col gap-3 h-full">
          
          {/* 타겟 앨범 정보 (고정 높이) */}
          <div className="shrink-0 flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100/30">
            <img 
              src={data.Img} 
              alt={data.songTitle} 
              className="w-10 h-10 rounded-lg object-cover shadow-sm border border-white"
            />
            <div className="overflow-hidden">
              <p className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">Target Song</p>
              <p className="text-sm font-bold text-gray-800 truncate">{data.songTitle}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1 min-h-0">
            <p className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">Quick Link</p>
            {/* 스크롤 영역: flex-1과 min-h-0를 통해 부모 높이 내에서 스크롤 되도록 설정 */}
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar grid grid-cols-1 gap-2">
              {data.platforms.map((plat, idx) => (
                <a
                  key={idx}
                  href={plat.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl transition-all shadow-sm hover:border-purple-200 hover:shadow-md group shrink-0"
                >
                  <div className="flex items-center gap-3">
                    {/* 아이콘 크기 통일 */}
                    <div className="w-6 h-6 flex items-center justify-center">
                        <img src={plat.iconImg} alt={plat.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="font-bold text-sm text-gray-700 group-hover:text-purple-700 transition-colors">
                      {plat.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-purple-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
