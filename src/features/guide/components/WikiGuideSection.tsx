import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { List, AlignLeft } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';
import { RecursiveGuideCard, GuideItem } from './RecursiveGuideCard'; // 경로에 맞게 수정하세요

interface GuideGroup {
  id: string;
  title: string;
  items: GuideItem[];
}

export function WikiGuideSection() {
  const { slug } = useParams();
  // hooks 경로는 실제 프로젝트 구조에 맞게 확인해주세요
  const { data: allGuides, loading } = useJsonData<GuideGroup[]>('guides'); 
  const [targetGuide, setTargetGuide] = useState<GuideGroup | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  
  // 섹션 위치 참조용
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (allGuides && slug) {
      const found = allGuides.find(g => g.id === slug);
      setTargetGuide(found || null);
    }
  }, [allGuides, slug]);

  // 스크롤 감지 (Intersection Observer)
  useEffect(() => {
    if (!targetGuide) return;
    
    // GuidePage.tsx에 id="guide-scroll-container"가 선언되어 있어야 합니다.
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
        rootMargin: '-20% 0px -60% 0px', // 화면 중앙 쯤에 오면 활성화
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
      const topPos = element.offsetTop - 24; // 상단 여백 보정
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 pb-32">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-indigo-50">
        <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 shadow-sm">
           <AlignLeft className="w-7 h-7"/>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{targetGuide.title}</h2>
      </div>

      {/* Grid 레이아웃: [본문 1fr] - [목차 300px] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start relative">
        
        {/* [왼쪽] 본문 영역 */}
        <div className="min-w-0 space-y-8">
          {targetGuide.items && targetGuide.items.length > 0 ? (
            targetGuide.items.map((item, idx) => (
              <div 
                key={idx} 
                data-index={idx}
                ref={el => sectionRefs.current[idx] = el}
                className="scroll-mt-6"
              >
                {/* 여기서 RecursiveGuideCard 사용 */}
                <RecursiveGuideCard item={item} depth={0} />
              </div>
            ))
          ) : (
            <div className="text-gray-400 py-10 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              내용이 없습니다.
            </div>
          )}
        </div>

        {/* [오른쪽] 목차 영역 (Sticky) */}
        {/* lg 사이즈 이상에서만 보임, sticky position 적용 */}
        <aside className="hidden lg:block sticky top-6">
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
            <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2 pb-3 border-b border-gray-50">
               <List className="w-5 h-5 text-indigo-500"/> 
               <span className="text-base">목차</span>
            </h3>
            
            <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {targetGuide.items.map((item, idx) => {
                const isActive = activeSection === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`
                      relative flex items-center w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                      ${isActive 
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    {/* 활성 상태 인디케이터 (점) */}
                    {isActive && (
                      <div className="absolute left-2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    )}
                    <span className={`truncate ${isActive ? 'pl-2' : ''} transition-all`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* 하단 팁이나 부가 정보 (이미지처럼 빈 공간 채우기 용) */}
          <div className="mt-4 p-4 rounded-xl bg-gray-50 text-xs text-gray-400 leading-relaxed">
            Windows 정품 인증<br/>
            [설정]으로 이동하여 Windows를 정품 인증합니다.
          </div>
        </aside>

      </div>
    </div>
  );
}
