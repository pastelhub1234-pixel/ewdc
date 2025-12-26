import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { List, AlignLeft, ArrowUp } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';
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
  
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (allGuides && slug) {
      const found = allGuides.find(g => g.id === slug);
      setTargetGuide(found || null);
    }
  }, [allGuides, slug]);

  // 스크롤 감지 로직 (화면 중앙 기준 인식)
  useEffect(() => {
    if (!targetGuide) return;
    
    const scrollContainer = document.getElementById('guide-scroll-container');
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveSection(index);
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: '-10% 0px -70% 0px', // 상단 10% ~ 하단 70% 사이 영역에 들어오면 활성화
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
    const element = sectionRefs.current[index];
    
    if (container && element) {
      // 상단 헤더 높이 등을 고려하여 조금 더 위로 스크롤
      const topPos = element.offsetTop - 32; 
      container.scrollTo({
        top: topPos,
        behavior: "smooth"
      });
      setActiveSection(index);
    }
  };

  if (loading) return <div className="py-32 text-center text-gray-500 animate-pulse">가이드 로딩 중...</div>;
  if (!targetGuide) return <div className="py-32 text-center text-gray-400">가이드 내용을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 pb-40">
      {/* 헤더 섹션 */}
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-indigo-50">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
           <AlignLeft className="w-7 h-7"/>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{targetGuide.title}</h2>
          <p className="text-gray-500 text-sm mt-1 ml-1">스텔라이브 팬 가이드 위키</p>
        </div>
      </div>

      {/* ✅ [핵심 수정] Grid 레이아웃 적용 
          - minmax(0, 1fr): 본문 영역이 넘치지 않도록 강제 (중요)
          - 300px: 목차 영역 고정
          - md:grid-cols-... : 태블릿 이상에서만 분할, 모바일은 세로 배치
      */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12 items-start relative">
        
        {/* [왼쪽] 본문 영역 */}
        <div className="min-w-0">
          {targetGuide.items && targetGuide.items.length > 0 ? (
            targetGuide.items.map((item, idx) => (
              <div 
                key={idx} 
                data-index={idx}
                ref={el => sectionRefs.current[idx] = el}
                className="scroll-mt-8" // 스크롤 시 상단 여백 확보
              >
                <RecursiveGuideCard item={item} depth={0} />
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400">
              작성된 내용이 없습니다.
            </div>
          )}
        </div>

        {/* [오른쪽] 목차 영역 (Sticky) 
            - hidden md:block: 모바일에서는 숨김 (또는 하단 배치)
            - sticky top-8: 스크롤 따라오기
        */}
        <aside className="hidden md:block sticky top-8 self-start w-full">
          <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
            <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2 pb-3 border-b border-gray-50">
               <List className="w-5 h-5 text-indigo-600"/> 
               <span className="text-base">목차 (Contents)</span>
            </h3>
            
            <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
              {targetGuide.items.map((item, idx) => {
                const isActive = activeSection === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`
                      group relative flex items-start w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    {/* 활성 상태 표시 (왼쪽 바) */}
                    <div className={`
                      absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r-full bg-indigo-500 transition-all duration-300
                      ${isActive ? 'h-6 opacity-100' : 'h-0 opacity-0'}
                    `} />
                    
                    <span className={`text-sm leading-snug ${isActive ? 'pl-2' : ''} transition-all`}>
                      {item.label}
                    </span>
                    
                    {/* Hover 시 화살표 등장 */}
                    {isActive && (
                      <ArrowUp className="w-3 h-3 ml-auto text-indigo-400 rotate-45 self-center animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-300 font-light">PastelHub Wiki Guide</p>
          </div>
        </aside>

      </div>
    </div>
  );
}
