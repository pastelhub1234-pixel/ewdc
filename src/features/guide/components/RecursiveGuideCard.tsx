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
  // ✅ [수정] 기본값을 true로 설정하여 처음부터 다 펼쳐 보이게 함
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  const bgColor = depth === 0 ? 'bg-white' : 'bg-slate-50';
  const borderColor = depth === 0 ? 'border-purple-100' : 'border-slate-100';
  const paddingLeft = depth > 0 ? 'pl-4' : '';

  return (
    <div className={`rounded-xl border ${borderColor} ${bgColor} overflow-hidden mb-3 shadow-sm transition-all`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-black/5 transition-colors"
      >
        <span className={`font-bold text-gray-800 ${depth > 0 ? 'text-sm' : 'text-base'}`}>
          {item.label}
        </span>
        
        {(item.content || hasChildren) && (
          isOpen ? <ChevronDown className="w-5 h-5 text-purple-500" /> : <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 p-4 pt-2">
          {item.content && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-line pl-1">
              {item.content}
            </p>
          )}

          {hasChildren && (
            <div className={`flex flex-col gap-2 ${paddingLeft}`}>
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
      )}
    </div>
  );
}
