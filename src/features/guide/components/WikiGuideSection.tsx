import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { List, AlignLeft, ChevronRight, Circle } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

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

const RecursiveItem = ({ item, depth = 0 }: { item: GuideItemData; depth: number }) => {
  return (
    <div className={`flex flex-col gap-2 ${depth > 0 ? 'mt-3' : 'mt-6'}`}>
      {/* 제목/라벨 영역 */}
      <div className="flex items-start gap-3">
        {/* 깊이에 따른 아이콘 변화 */}
        <div className={`flex-shrink-0 mt-1.5 ${depth === 0 ? 'text-indigo-600' : 'text-gray-400'}`}>
          {depth === 0 ? (
            <div className="w-2 h-6 bg-indigo-500 rounded-full" /> // 1단계: 굵은 바
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
          
          {/* 내용이 있다면 표시 */}
          {item.content && (
            <p className="text-sm text-gray-600 mb-2 leading-7 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
              {item.content}
            </p>
          )}
        </div>
      </div>

      {/* 자식 항목이 있다면 재귀 호출 (들여쓰기 적용) */}
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
  const [activeSection, setActiveSection] = useState<number>(0);
  
  // 섹션 참조용 Refs
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (allGuides && slug) {
      const found = allGuides.find(g => g.id === slug);
      setTargetGuide(found || null);
    }
  }, [allGuides, slug]);

  // 스크롤 감지 (목차 하이라이팅)
  useEffect(() => {
    if (!targetGuide) return;
    const scrollContainer = document.getElementById('guide-scroll-container');
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.id.replace('section-', ''));
            setActiveSection(index);
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [targetGuide]);

  const scrollToSection = (index: number) => {
    const container = document.getElementById('guide-scroll-container');
    const element = document.getElementById(`section-${index}`);
    
    if (container && element) {
      const headerOffset = 24; 
      const elementPosition = element.offsetTop;
      
      container.scrollTo({
        top: elementPosition - headerOffset,
        behavior: "smooth"
      });
      setActiveSection(index);
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

      {/* 메인 레이아웃: 본문(좌) - 목차(우) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
        
        {/* [왼쪽] 본문 영역 */}
        <div className="min-w-0 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-indigo-50/60">
          {targetGuide.items && targetGuide.items.length > 0 ? (
            targetGuide.items.map((item, idx) => (
              <div 
                key={idx} 
                id={`section-${idx}`} 
                ref={el => sectionRefs.current[idx] = el}
                className="scroll-mt-8 mb-10 last:mb-0" // 섹션 간 간격 확보
              >
                <RecursiveItem item={item} depth={0} />
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-10">작성된 가이드가 없습니다.</div>
          )}
        </div>

        {/* [오른쪽] 목차 영역 (Sticky) */}
        {/* hidden 클래스 제거 -> 항상 보임 */}
        <aside className="sticky top-6 self-start w-full lg:w-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-indigo-100 flex flex-col max-h-[80vh]">
            <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 text-sm uppercase tracking-wide">
               <List className="w-4 h-4 text-indigo-500"/> 
               <span>Contents</span>
            </h3>
            
            <div className="space-y-1 overflow-y-auto pr-1 custom-scrollbar">
              {targetGuide.items.map((item, idx) => {
                const isActive = activeSection === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`
                      group flex items-center w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 text-sm
                      ${isActive 
                        ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm ring-1 ring-indigo-100' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    {/* 활성화 표시 점 */}
                    <div className={`
                      w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 flex-shrink-0
                      ${isActive ? 'bg-indigo-500 scale-125' : 'bg-gray-300 group-hover:bg-indigo-300'}
                    `} />
                    <span className="truncate">{item.label}</span>
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
