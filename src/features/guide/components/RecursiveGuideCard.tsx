import { useState } from 'react';
import { ChevronDown, ChevronRight, Circle, Minus } from 'lucide-react';

// 데이터 타입 정의 (RecursiveGuideCard 내부에서 사용)
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
  // depth 0(최상위)만 펼쳐두고, 나머지는 접어두기 (원하시면 true로 변경 가능)
  const [isOpen, setIsOpen] = useState(true); 
  const hasChildren = item.children && item.children.length > 0;

  // ✅ [공간 최적화] 깊이가 깊어질수록 여백을 줄임 (기존 pl-4 -> pl-3 또는 border 방식 활용)
  // depth가 0일 때는 여백 없음, 그 이상일 때는 왼쪽 여백 및 보더 라인 추가
  const indentClass = depth > 0 ? 'ml-3 pl-3 border-l border-slate-200' : '';

  // 깊이에 따른 스타일링 (배경색, 폰트 크기)
  const headerStyle = depth === 0 
    ? 'text-lg font-bold text-gray-800 py-4' 
    : 'text-sm font-medium text-gray-700 py-2.5';

  return (
    <div className={`transition-all duration-300 ${indentClass}`}>
      {/* 헤더 (클릭하여 열고 닫기) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-start gap-2 text-left hover:bg-black/5 rounded-lg px-2 -ml-2 transition-colors group ${headerStyle}`}
      >
        {/* 아이콘: 최상위는 숫자/텍스트만, 자식은 불렛 포인트 */}
        <div className="mt-1 flex-shrink-0 text-purple-500">
          {depth === 0 ? null : (
            hasChildren ? (
              isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : (
              <Circle size={6} fill="currentColor" className="mt-1.5" />
            )
          )}
        </div>

        <div className="flex-1">
          {item.label}
        </div>

        {/* 최상위 레벨일 때만 우측에 접기 아이콘 표시 */}
        {depth === 0 && (
          <div className="text-gray-400 mt-1">
            {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        )}
      </button>

      {/* 내용 영역 (애니메이션 효과) */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mb-2' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {/* 텍스트 내용 */}
          {item.content && (
            <div className={`
              text-gray-600 leading-relaxed whitespace-pre-line mb-3
              ${depth === 0 ? 'text-base bg-slate-50 p-4 rounded-xl border border-slate-100' : 'text-sm pl-2'}
            `}>
              {item.content}
            </div>
          )}

          {/* 자식 요소 재귀 렌더링 */}
          {hasChildren && (
            <div className="flex flex-col">
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
      </div>
    </div>
  );
}
