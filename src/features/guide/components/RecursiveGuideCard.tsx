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

  // ─────────────────────────────────────────────────────────────
  // 스타일 정의
  // ─────────────────────────────────────────────────────────────
  
  // Depth 0: 메인 섹션 스타일 (카드 형태, 그림자, 강조 테두리)
  const mainCardStyle = `
    bg-white border border-gray-200 rounded-2xl mb-6 overflow-hidden 
    shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300
    hover:border-indigo-200 hover:shadow-md
  `;

  // Depth > 0: 하위 리스트 스타일 (심플함)
  const subItemStyle = `
    mt-1 border-l-2 border-transparent transition-colors duration-200
  `;

  // 헤더(버튼) 스타일
  const headerBaseStyle = "w-full flex items-start text-left transition-colors duration-200 group";
  const headerDepth0 = "p-5 bg-white hover:bg-indigo-50/30";
  const headerDepthSub = "py-2 px-3 rounded-lg hover:bg-gray-100";

  // 텍스트 타이포그래피
  const labelDepth0 = "text-lg font-bold text-gray-900 tracking-tight";
  const labelDepth1 = "text-[15px] font-semibold text-gray-800";
  const labelDepthDeep = "text-sm font-medium text-gray-700";

  // 본문 내용 스타일 (가독성 개선: 행간 넓힘, 자간 조절)
  const contentStyle = `
    text-[15px] text-gray-600 leading-loose tracking-normal 
    whitespace-pre-line break-keep max-w-[850px]
  `;

  // ─────────────────────────────────────────────────────────────

  // 현재 깊이에 따른 라벨 스타일 선택
  const getLabelStyle = () => {
    if (depth === 0) return labelDepth0;
    if (depth === 1) return labelDepth1;
    return labelDepthDeep;
  };

  return (
    <div className={depth === 0 ? mainCardStyle : subItemStyle}>
      {/* --- 헤더 영역 (클릭 시 토글) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${headerBaseStyle}
          ${depth === 0 ? headerDepth0 : headerDepthSub}
          ${!hasChildren ? 'cursor-text' : 'cursor-pointer'}
        `}
      >
        {/* 아이콘 (내용만 있는 경우 숨김) */}
        {hasChildren && (
          <div className={`flex-shrink-0 mr-3 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
             {/* Depth 0은 조금 더 큰 아이콘, 하위는 작은 아이콘 */}
             <ChevronDown 
               className={`
                 ${depth === 0 ? 'w-6 h-6 text-indigo-500' : 'w-4 h-4 mt-0.5 text-gray-400 group-hover:text-indigo-500'}
               `} 
             />
          </div>
        )}

        {/* 텍스트 영역 */}
        <div className="flex-1">
          <span className={getLabelStyle()}>
            {item.label}
          </span>
          
          {/* 본문 내용이 바로 아래에 붙는 경우 (자식이 없는 Leaf node일 때) */}
          {isOpen && item.content && (
             <div className={`mt-3 ${contentStyle} ${depth === 0 ? 'bg-gray-50/80 p-5 rounded-xl border border-gray-100' : 'pl-1'}`}>
              {item.content}
            </div>
          )}
        </div>
      </button>

      {/* --- 자식 항목 렌더링 (재귀) --- */}
      {isOpen && hasChildren && (
        <div className={`
          ${depth === 0 
            ? 'border-t border-gray-100 p-5 pt-2 bg-white' // 최상위: 내부 패딩 넉넉히
            : 'pl-4 ml-1.5 border-l border-gray-200 space-y-1' // 하위: 왼쪽 선으로 계층 표현
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
