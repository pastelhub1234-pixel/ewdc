import { NavLink, Outlet } from "react-router-dom";
import { 
  Ticket, 
  Disc, 
  ShoppingBag, 
  Store, 
  Calculator, 
  Megaphone 
} from 'lucide-react';

const goodsSections = [
  {
    id: 'ticket',
    title: '티켓팅',
    description: '공연 & 팬미팅 예매',
    icon: <Ticket className="w-6 h-6" />,
    path: 'ticket'
  },
  {
    id: 'album',
    title: '앨범',
    description: '디스코그래피 & 구매',
    icon: <Disc className="w-6 h-6" />,
    path: 'album'
  },
  {
    id: 'goods',
    title: '공식 스토어',
    description: '공식 굿즈 & 콜라보',
    icon: <ShoppingBag className="w-6 h-6" />,
    path: 'goods'
  },
  {
    id: 'market',
    title: '2차 창작 부스',
    description: '코믹월드 / 일러스타',
    icon: <Store className="w-6 h-6" />,
    path: 'market'
  },
  {
    id: 'membership',
    title: '멤버십',
    description: '구독료 계산기 & 혜택',
    icon: <Calculator className="w-6 h-6" />,
    path: 'membership'
  },
  {
    id: 'support',
    title: '기부 · 서포트',
    description: '총공 모금 & 진행 현황',
    icon: <Megaphone className="w-6 h-6" />,
    path: 'support'
  },
];

export function GoodsPage() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-6 pb-20 max-w-7xl mx-auto">
        
        {/* 네비게이션 그리드 (변경 없음) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {goodsSections.map((section) => (
            <NavLink
              key={section.id}
              to={`/goods/${section.path}`}
              className={({ isActive }) => `
                p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer group border relative overflow-hidden flex flex-col
                ${isActive
                  ? "bg-white/90 border-purple-200 shadow-xl scale-[1.02] ring-1 ring-purple-100"
                  : "bg-white/60 border-transparent hover:bg-white/80 hover:border-purple-100 hover:shadow-md hover:scale-[1.01]"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-xl opacity-60" />
                  )}
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm z-10 relative ${
                    isActive
                      ? "bg-gradient-to-br from-purple-400 to-pink-400 shadow-purple-200"
                      : "bg-white text-purple-300"
                  }`}>
                    <div className={isActive ? "text-white" : "text-gray-400 group-hover:text-purple-400"}>
                      {section.icon}
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <div className={`font-bold text-sm md:text-base mb-0.5 transition-colors ${
                      isActive ? "text-gray-800" : "text-gray-600"
                    }`}>
                      {section.title}
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-500 truncate">
                      {section.description}
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* 여기가 중요! 
            Outlet은 GoodsRoutes에서 주입해주는 컴포넌트를 보여주는 '창문' 역할만 합니다.
            데이터는 Routes 파일에서 element에 props로 꽂아줍니다.
        */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards min-h-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
