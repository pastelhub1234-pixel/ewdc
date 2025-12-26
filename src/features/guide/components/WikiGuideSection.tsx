import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, AlignLeft, ChevronRight, Circle } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

// ✅ 1. 데이터 타입 정의
interface GuideItemData {
  label: string;
  content?: string;
  children?: GuideItemData[];
}

interface GuideGroup {
  id: string;
  title: string;
  items: GuideItemData[];
}

// ✅ 2. 재귀 컴포넌트: 계층형 데이터 렌더링
const RecursiveItem = ({ item, depth = 0 }: { item: GuideItemData; depth: number }) => {
  return (
    <div className={`flex flex-col gap-2 ${depth > 0 ? 'mt-3' : 'mt-6'}`}>
      <div className="flex items-start gap-3">
        {/* 깊이(depth)에 따른 아이콘 스타일 */}
        <div className={`flex-shrink-0 mt-1.5 ${depth === 0 ? 'text-indigo-600' : 'text-gray-400'}`}>
          {depth === 0 ? (
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full" /> 
          ) : (
            <div className="flex items-center justify-center w-5 h-5">
               {depth === 1 ? <ChevronRight size={16} /> : <Circle size={6} fill="currentColor" />}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h4 className={`
            font-medium text-gray-800 leading-relaxed
            ${depth === 0 ? 'text-lg font-bold mb-2' : 'text-base'}
            ${depth === 1 ? 'text-indigo-900' : ''}
          `}>
            {item.label}
          </h4>
          
          {item.content && (
            <p className="text-sm text-gray-600 mb-2 leading-7 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
              {item.content}
            </p>
          )}
        </div>
      </div>

      {/* 자식이 있으면 재귀 호출 */}
      {item.children && item.children.length > 0 && (
        <div className={`flex flex-col ${depth === 0 ? 'ml-4 border-l-2 border-gray-100 pl-4 space-y-2' : 'ml-6 space-y-2'}`}>
          {item.children.map((child, idx) => (
            <RecursiveItem key={idx} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function WikiGuideSection() {
  const { slug } = useParams();
  const { data: allGuides, loading } = useJsonData<GuideGroup[]>('guides');
  const [targetGuide, setTargetGuide] = useState<GuideGroup | null>(null);

  // 데이터 로드
  useEffect(() => {
    if (allGuides && slug) {
      const found = allGuides.find(g => g.id === slug);
      setTargetGuide(found || null);
    }
  }, [allGuides, slug]);

  // ✅ [수정] 스크롤 이동 함수 (단순 이동 기능만 수행)
  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      // scrollIntoView를 사용하여 부드럽게 이동 (상단 여백 확보를 위해 scroll-mt 클래스 활용)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">가이드 로딩 중...</div>;
  if (!targetGuide) return <div className="text-center text-gray-400 py-10">내용을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 pb-32">
      {/* 상단 타이틀 */}
      <div className="flex items-center gap-3 mb-8 border-b border-indigo-100 pb-4">
        <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600 shadow-sm">
           <AlignLeft className="w-6 h-6"/>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{targetGuide.title}</h2>
      </div>

      {/* ✅ [레이아웃 수정] Grid 대신 Flex 사용 
        - flex-col: 모바일에서는 세로 배치
        - lg:flex-row: PC에서는 가로 배치 (목차가 오른쪽으로 감)
        - items-start: 높이가 달라도 상단 정렬 (Sticky 작동 필수 조건)
      */}
      <div className="flex flex-col lg:flex-row gap-10 items-start relative">
        
        {/* [왼쪽] 본문 영역 (Flex Grow) */}
        <div className="flex-1 min-w-0 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-indigo-50/60 w-full">
          {targetGuide.items && targetGuide.items.length > 0 ? (
            targetGuide.items.map((item, idx) => (
              <div 
                key={idx} 
                id={`section-${idx}`} 
                // ✅ scroll-mt-24: 스크롤 이동 시 상단 헤더에 가려지지 않게 여백 줌
                className="scroll-mt-24 mb-12 last:mb-0 border-b border-dashed border-gray-100 pb-10 last:border-0 last:pb-0" 
              >
                <RecursiveItem item={item} depth={0} />
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-10">작성된 가이드가 없습니다.</div>
          )}
        </div>

        {/* [오른쪽] 목차 영역 (Sticky Sidebar) */}
        {/* - w-full lg:w-[280px]: PC에서는 280px 고정, 모바일은 꽉 채움
           - sticky top-6: 스크롤 내릴 때 상단에 붙음
        */}
        <aside className="sticky top-6 w-full lg:w-[280px] flex-shrink-0">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-indigo-100 flex flex-col max-h-[80vh]">
            <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 text-sm uppercase tracking-wide">
               <List className="w-4 h-4 text-indigo-500"/> 
               <span>Contents</span>
            </h3>
            
            <div className="space-y-1 overflow-y-auto pr-1 custom-scrollbar">
              {targetGuide.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  className="group flex items-center w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 text-sm text-gray-500 hover:bg-indigo-50 hover:text-indigo-700 hover:font-medium"
                >
                  {/* 단순 불렛 포인트 (활성화 상태 제거됨) */}
                  <div className="w-1.5 h-1.5 rounded-full mr-3 bg-gray-300 group-hover:bg-indigo-400 transition-colors flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
