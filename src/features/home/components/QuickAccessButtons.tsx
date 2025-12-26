import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Megaphone, Vote, TrendingUp, Headphones, 
  Youtube, Heart, Mic2, Sparkles 
} from 'lucide-react';

interface QuickButton {
  icon: React.ReactNode;
  label: string;
  path: string;
  // Tailwind 클래스를 통째로 정의하여 호버 시 배경/테두리/그림자/글자색을 한 번에 제어
  hoverTheme: string; 
  iconTheme: string;
}

const buttons: QuickButton[] = [
  { 
    icon: <Megaphone className="w-5 h-5" />, 
    label: '공지사항', 
    path: '/news/cafe', 
    hoverTheme: 'hover:bg-orange-50 hover:border-orange-200 hover:shadow-orange-100',
    iconTheme: 'text-orange-500'
  },
  { 
    icon: <Vote className="w-5 h-5" />, 
    label: '투표', 
    path: '/activities/voting', 
    hoverTheme: 'hover:bg-blue-50 hover:border-blue-200 hover:shadow-blue-100',
    iconTheme: 'text-blue-500'
  },
  { 
    icon: <TrendingUp className="w-5 h-5" />, 
    label: '트렌딩', 
    path: '/activities/trending', 
    hoverTheme: 'hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-emerald-100',
    iconTheme: 'text-emerald-500'
  },
  { 
    icon: <Headphones className="w-5 h-5" />, 
    label: '스밍', 
    path: '/activities/streaming', 
    hoverTheme: 'hover:bg-violet-50 hover:border-violet-200 hover:shadow-violet-100',
    iconTheme: 'text-violet-500'
  },
  { 
    icon: <Youtube className="w-5 h-5" />, 
    label: '유튜브', 
    path: '/activities/youtube-fix', 
    hoverTheme: 'hover:bg-red-50 hover:border-red-200 hover:shadow-red-100',
    iconTheme: 'text-red-500'
  },
  { 
    icon: <Heart className="w-5 h-5" />, 
    label: '서포트', 
    path: '/goods/support', 
    hoverTheme: 'hover:bg-rose-50 hover:border-rose-200 hover:shadow-rose-100',
    iconTheme: 'text-rose-500'
  },
  { 
    icon: <Mic2 className="w-5 h-5" />, 
    label: '노래방', 
    path: '/others/karaoke', 
    hoverTheme: 'hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-indigo-100',
    iconTheme: 'text-indigo-500'
  },
  { 
    icon: <Sparkles className="w-5 h-5" />, 
    label: '운세', 
    path: '/others/fortune', 
    hoverTheme: 'hover:bg-amber-50 hover:border-amber-200 hover:shadow-amber-100',
    iconTheme: 'text-amber-500'
  },
];

export function QuickAccessButtons() {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full px-1 py-2"
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '10px'
      }}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => navigate(button.path)}
          style={{ height: '72px' }} 
          
          className={`
            group relative flex flex-col items-center justify-center 
            w-full
            bg-white rounded-2xl border border-gray-100
            shadow-[0_2px_8px_rgba(0,0,0,0.03)]
            
            /* 호버 효과: 위로 뜸 + 그림자 진해짐 + 테두리 색상 변경 */
            hover:-translate-y-1 hover:shadow-lg
            ${button.hoverTheme}

            /* 클릭 효과: 눌리는 느낌 */
            active:scale-95 active:shadow-inner
            cursor-pointer 
            transition-all duration-300 ease-out
          `}
        >
          {/* 아이콘 배경 원형 박스 */}
          <div className={`
            mb-2 p-2.5 rounded-full 
            bg-gray-50 text-gray-400
            border border-transparent
            
            /* 호버 시: 배경이 흰색으로 바뀌면서 아이콘 색상 강조 + 링 효과 */
            group-hover:bg-white group-hover:scale-110 group-hover:shadow-sm
            ${button.iconTheme.replace('text-', 'group-hover:text-')}
            
            transition-all duration-300
          `}>
            {button.icon}
          </div>

          {/* 텍스트 라벨 */}
          <span className={`
            text-[11px] font-bold text-gray-400 
            /* 호버 시 텍스트 색상도 진하게 변경 */
            group-hover:text-gray-700
            transition-colors duration-300
          `}>
            {button.label}
          </span>
        </button>
      ))}
    </div>
  );
}
