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

  // Depth 0: 메인 카드 (흰색 배경, 그림자)
  // Depth > 0: 내부 리스트 (여백 최소화)
  const containerStyle = depth === 0 
    ? 'bg-white border border-gray-200 shadow-sm rounded-2xl mb-4 overflow-hidden'
    : 'mt-1'; // 하위 항목 간격 좁힘

  // 텍스트 스타일: 깊이가 깊어질수록 조금씩 작게, 하지만 너무 작지 않게
  const labelStyle = depth === 0 
    ? 'text-lg font-bold text-gray-900' 
    : 'text-[15px] font-medium text-gray-700 leading-relaxed';

  return (
    <div className={containerStyle}>
      {/* 헤더 영역 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        // 커서: 자식이 없으면(내용글이면) 기본 커서, 있으면 포인터
        className={`w-full flex items-start text-left transition-colors
          ${depth === 0 ? 'p-5 hover:bg-gray-50' : 'py-1.5 hover:bg-gray-100/50 rounded lg:px-2'}
          ${!hasChildren ? 'cursor-text' : 'cursor-pointer'} 
        `}
      >
        {/* 아이콘 영역: 내용글(자식이 없는 경우)에는 아이콘을 아예 렌더링하지 않음 */}
        {hasChildren && (
          <div className="flex-shrink-0 mt-1 mr-2">
            {depth === 0 ? (
               isOpen ? <ChevronDown className="w-5 h-5 text-indigo-500" /> : <ChevronRight className="w-5 h-5 text-gray-400" />
            ) : (
               isOpen ? <ChevronDown className="w-4 h-4 text-indigo-400" /> : <ChevronRight className="w-4 h-4 text-gray-300" />
            )}
          </div>
        )}

        {/* 텍스트 영역 */}
        <div className="flex-1">
          <span className={labelStyle}>{item.label}</span>
          
          {/* 부가 설명(content)이 있는 경우 */}
          {isOpen && item.content && (
             <div className={`mt-2 text-sm text-gray-600 leading-7 whitespace-pre-line
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
          ${depth === 0 ? 'border-t border-gray-100 p-4 pt-2 bg-white' : 'pl-4 border-l-2 border-gray-100 ml-2'}
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
