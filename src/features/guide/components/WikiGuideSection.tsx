import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { List, AlignLeft } from 'lucide-react';
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
        rootMargin: '-20% 0px -60% 0px',
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
      const topPos = element.offsetTop - 24; 
      container.scrollTo({
        top: topPos,
        behavior: "smooth"
      });
      setActiveSection(index);
    }
  };

  if (loading) return <div className="p-20 text-center text-gray-500">가이드 로딩 중...</div>;
  if (!targetGuide) return <div className="p-20 text-center text-gray-400">해당 가이드를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-indigo-50">
        <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600 shadow-sm">
           <AlignLeft className="w-6 h-6"/>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{targetGuide.title}</h2>
      </div>

      {/* ✅ [수정] Grid 설정 변경 
         - md(768px) 이상부터 2단 레이아웃 적용 (기존 lg -> md)
         - gap을 조금 줄여서(8->6) 좁은 화면에서도 사이드바 공간 확보
      */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px] gap-6 items-start relative">
        
        {/* [왼쪽] 본문 영역 */}
        <div className="min-w-0 space-y-6">
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
            <div className="text-gray-400 py-10 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              내용이 없습니다.
            </div>
          )}
        </div>

        {/* [오른쪽] 목차 영역 (Sticky) 
          ✅ [수정] hidden lg:block -> hidden md:block 으로 변경하여 태블릿 사이즈부터 보이게 함
        */}
        <aside className="hidden md:block sticky top-6">
          <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
            <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2 pb-2 border-b border-gray-50 text-sm">
               <List className="w-4 h-4 text-indigo-500"/> 
               <span>목차</span>
            </h3>
            
            <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
              {targetGuide.items.map((item, idx) => {
                const isActive = activeSection === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`
                      relative flex items-center w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
                      ${isActive 
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-1.5 w-1 h-4 bg-indigo-500 rounded-full" />
                    )}
                    <span className={`truncate ${isActive ? 'pl-2' : ''} transition-all`}>
                      {item.label}
                    </span>
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
