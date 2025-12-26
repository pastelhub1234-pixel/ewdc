import { useState } from 'react';
import { ChevronDown, ChevronRight, Circle } from 'lucide-react';

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

  // Depth 0: 메인 카드 (흰색 배경, 그림자)
  // Depth > 0: 내부 리스트 (배경색 투명/연한 회색, 테두리 최소화)
  const containerStyle = depth === 0 
    ? 'bg-white border border-gray-200 shadow-sm rounded-2xl mb-4 overflow-hidden'
    : 'mt-2 pl-2'; // 깊이가 있을 땐 왼쪽 패딩을 줄여서 공간 확보

  // 텍스트 스타일
  const labelStyle = depth === 0 
    ? 'text-lg font-bold text-gray-800' 
    : 'text-sm font-medium text-gray-700';

  return (
    <div className={containerStyle}>
      {/* 헤더 영역 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-start gap-3 text-left transition-colors
          ${depth === 0 ? 'p-5 hover:bg-gray-50' : 'py-2 hover:bg-gray-100/50 rounded-lg px-2'}
        `}
      >
        {/* 아이콘/불렛 포인트 처리 */}
        <div className="flex-shrink-0 mt-1">
           {depth === 0 ? (
             // 최상위: 숫자나 아이콘이 없을 경우 깔끔하게 처리
             isOpen ? <ChevronDown className="w-5 h-5 text-indigo-500" /> : <ChevronRight className="w-5 h-5 text-gray-400" />
           ) : (
             // 하위: 작은 점이나 화살표로 공간 절약
             hasChildren 
               ? (isOpen ? <ChevronDown className="w-4 h-4 text-indigo-400" /> : <ChevronRight className="w-4 h-4 text-gray-300" />)
               : <Circle className="w-1.5 h-1.5 mt-1.5 text-gray-300 fill-current" />
           )}
        </div>

        <div className="flex-1">
          <span className={labelStyle}>{item.label}</span>
          
          {/* 하위 항목이 열려있고, 내용이 있을 때 바로 아래에 내용 표시 */}
          {isOpen && item.content && (
             <div className={`mt-2 text-sm text-gray-600 leading-relaxed whitespace-pre-line
               ${depth === 0 ? 'bg-gray-50 p-4 rounded-xl border border-gray-100' : ''}
             `}>
              {item.content}
            </div>
          )}
        </div>
      </button>

      {/* 자식 항목 렌더링 영역 */}
      {isOpen && hasChildren && (
        <div className={`
          ${depth === 0 ? 'border-t border-gray-100 p-4 pt-2 bg-white' : 'border-l-2 border-gray-100 ml-3.5 pl-3'}
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
