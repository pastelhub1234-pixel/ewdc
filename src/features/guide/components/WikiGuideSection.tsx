import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { List, ArrowUp } from 'lucide-react';
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

  // 스크롤 감지 (Spy)
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
        rootMargin: '-10% 0px -70% 0px',
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
      const topPos = element.offsetTop - 30; // 여백 보정
      container.scrollTo({
        top: topPos,
        behavior: "smooth"
      });
      setActiveSection(index);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-400">로딩 중...</div>;
  if (!targetGuide) return <div className="py-20 text-center text-gray-400">내용이 없습니다.</div>;

  return (
    // 상단 패딩(pt-10)을 주어 탭과 본문 사이 간격 확보
    <div className="max-w-[1400px] mx-auto px-5 md:px-8 pt-10 pb-40">
      
      {/* ✅ [핵심 수정] Flex Layout 사용 
        - lg:flex-row: 큰 화면에서는 가로 배치
        - gap-10: 본문과 목차 사이 간격
      */}
      <div className="flex flex-col lg:flex-row items-start gap-10 relative">
        
        {/* [왼쪽] 본문 영역 
            - flex-1: 남은 공간 모두 차지
            - min-w-0: Flex 내부에서 텍스트 넘침 방지
        */}
        <div className="flex-1 min-w-0 w-full">
          {targetGuide.items && targetGuide.items.length > 0 ? (
            targetGuide.items.map((item, idx) => (
              <div 
                key={idx} 
                data-index={idx}
                ref={el => sectionRefs.current[idx] = el}
                className="scroll-mt-6"
              >
                <RecursiveGuideCard item={item} depth={0} />
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
              가이드 내용이 준비되지 않았습니다.
            </div>
          )}
        </div>

        {/* [오른쪽] 목차 영역 (Sticky) 
            - w-[280px]: 너비 고정
            - shrink-0: 화면이 좁아져도 찌그러지지 않음 (중요)
            - hidden lg:block: 모바일/태블릿에서는 숨김 (공간 부족 이슈 해결)
            - sticky top-6: 스크롤 따라오기
        */}
        <aside className="hidden lg:block w-[280px] shrink-0 sticky top-6 z-10">
          <div className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            {/* 목차 헤더 */}
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center gap-2">
               <List className="w-4 h-4 text-indigo-500"/> 
               <span className="text-sm font-bold text-gray-700">목차</span>
            </div>
            
            {/* 목차 리스트 */}
            <nav className="p-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {targetGuide.items.map((item, idx) => {
                const isActive = activeSection === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-lg text-sm mb-1 transition-all duration-200 flex items-center justify-between group
                      ${isActive 
                        ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="truncate pr-2">{item.label}</span>
                    {isActive && <ArrowUp className="w-3 h-3 text-indigo-400 opacity-50" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

      </div>
    </div>
  );
}
