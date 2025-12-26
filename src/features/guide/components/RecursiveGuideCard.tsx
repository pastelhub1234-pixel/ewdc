import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface GuideItem {
  label: string;
  content?: string;
  children?: GuideItem[];
}

interface Props {
  item: GuideItem;
  depth?: number;
}

export function RecursiveGuideCard({ item, depth = 0 }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  // Depth 0: 메인 카드 스타일 (그림자, 흰 배경)
  const mainCardStyle = `
    bg-white border border-gray-100 rounded-2xl mb-6 overflow-hidden 
    shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300
  `;

  // Depth > 0: 서브 아이템 스타일 (투명 배경)
  const subItemStyle = `mt-2`;

  return (
    <div className={depth === 0 ? mainCardStyle : subItemStyle}>
      {/* 헤더 영역 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-start text-left transition-colors duration-200 group
          ${depth === 0 ? 'p-6 hover:bg-gray-50/50' : 'py-1.5 px-2 rounded hover:bg-gray-100'}
          ${!hasChildren ? 'cursor-text' : 'cursor-pointer'}
        `}
      >
        {/* 화살표 아이콘 (자식이 있을 때만) */}
        {hasChildren && (
          <div className={`flex-shrink-0 mr-3 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
             <ChevronDown className={`
               ${depth === 0 ? 'w-5 h-5 text-indigo-500 mt-1' : 'w-4 h-4 text-gray-400 group-hover:text-indigo-500 mt-0.5'}
             `} />
          </div>
        )}

        {/* 라벨 & 콘텐츠 */}
        <div className="flex-1">
          {/* 제목 */}
          <div className={`
            ${depth === 0 ? 'text-xl font-bold text-gray-800 mb-1' : 'text-[15px] font-medium text-gray-700'}
          `}>
            {item.label}
          </div>
          
          {/* 본문 (자식 없이 바로 내용이 붙는 경우) */}
          {isOpen && item.content && (
             <div className={`
               whitespace-pre-line leading-loose text-gray-600 font-light tracking-wide
               ${depth === 0 ? 'mt-4 text-[15px]' : 'mt-2 text-sm pl-1'}
             `}>
              {item.content}
            </div>
          )}
        </div>
      </button>

      {/* 자식 리스트 렌더링 */}
      {isOpen && hasChildren && (
        <div className={`
          ${depth === 0 
            ? 'border-t border-gray-50 px-6 py-4 bg-white' // 최상위: 내부 패딩
            : 'pl-4 ml-2 border-l-2 border-gray-100 space-y-1' // 하위: 들여쓰기 가이드라인
          }
        `}>
          {item.children!.map((child, idx) => (
            <RecursiveGuideCard 
              key={idx} 
              item={child} 
              depth={depth + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
