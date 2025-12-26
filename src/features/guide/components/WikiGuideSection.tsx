import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, AlignLeft } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';
// ✅ 분리된 재귀 컴포넌트 import
import { RecursiveGuideCard, GuideItem } from './RecursiveGuideCard';

interface GuideGroup {
  id: string;
  title: string;
  items: GuideItem[];
}

export function WikiGuideSection() {
  const { slug } = useParams();
  const { data: allGuides, loading } = useJsonData<GuideGroup[]>('guides');
  const [targetGuide, setTargetGuide] = useState<GuideGroup | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);

  // 데이터 로드
  useEffect(() => {
    if (allGuides && slug) {
      const found = allGuides.find(g => g.id === slug);
      setTargetGuide(found || null);
    }
  }, [allGuides, slug]);

  // 스크롤 이동 함수
  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      // 헤더 높이 등을 고려한 스크롤 보정
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(index);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">가이드 로딩 중...</div>;
  if (!targetGuide) return <div className="text-center text-gray-400 py-10">내용을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 pb-32">
      {/* 1. 헤더 영역 (아이콘 + 제목) */}
      <div className="flex items-center gap-3 mb-10 border-b border-purple-100 pb-5">
        <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 shadow-sm">
           <AlignLeft className="w-7 h-7"/>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{targetGuide.title}</h2>
      </div>

      {/* 2. 메인 컨텐츠 + 목차 레이아웃 (Flex 사용) */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* [왼쪽] 본문 영역 (RecursiveGuideCard 사용) */}
        <div className="flex-1 min-w-0 w-full bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
          {targetGuide.items && targetGuide.items.length > 0 ? (
            targetGuide.items.map((item, idx) => (
              <div 
                key={idx} 
                id={`section-${idx}`} 
                // scroll-mt-24: 상단 헤더에 가려지지 않도록 여백 확보
                className="scroll-mt-24 mb-10 last:mb-0 border-b border-slate-100 pb-10 last:border-0 last:pb-0" 
              >
                {/* ✅ 재귀 컴포넌트 호출 */}
                <RecursiveGuideCard item={item} depth={0} />
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-20">작성된 가이드가 없습니다.</div>
          )}
        </div>

        {/* [오른쪽] 목차 영역 (Sticky) */}
        <aside className="sticky top-8 w-full lg:w-[280px] flex-shrink-0">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-purple-100/60">
            <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 text-sm uppercase tracking-wide">
               <List className="w-4 h-4 text-purple-500"/> 
               <span>Contents</span>
            </h3>
            
            <div className="flex flex-col gap-1">
              {targetGuide.items?.map((item, idx) => {
                const isActive = activeSection === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`
                      text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 truncate
                      ${isActive 
                        ? 'bg-purple-50 text-purple-700 font-bold' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="mr-2 text-xs opacity-60">{idx + 1}.</span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
