// features/others/OthersPage.tsx
import { NavLink, Outlet } from "react-router-dom";
import {
  Image,      // 팬아트
  Mic2,       // 노래방 (Mic2가 없으면 Mic 사용)
  Gamepad2,   // 팬게임 (Gamepad2가 없으면 Gamepad 사용)
  ShoppingBag,// 굿즈 거래
  Megaphone,  // 신문고
  BellRing    // 공지 및 개선의견
} from "lucide-react";

// 메뉴 데이터 정의 (유지보수 편의성)
const otherSections = [
  { 
    id: "fanArt", 
    title: "팬아트", 
    description: "아카이브", // 모바일 공간 부족으로 짧게 수정
    icon: <Image size={20} />, 
    path: "fanArt" 
  },
  { 
    id: "karaoke", 
    title: "노래방", 
    description: "번호 찾기", 
    icon: <Mic2 size={20} />, 
    path: "karaoke" 
  },
  { 
    id: "games", 
    title: "팬게임", 
    description: "게임 모음", 
    icon: <Gamepad2 size={20} />, 
    path: "games" 
  },
  { 
    id: "goods", 
    title: "굿즈 거래", 
    description: "교환/나눔", 
    icon: <ShoppingBag size={20} />, 
    path: "goods" 
  },
  { 
    id: "sinmungo", 
    title: "신문고", 
    description: "소통 창구", 
    icon: <Megaphone size={20} />, 
    path: "sinmungo" 
  },
  { 
    id: "notice", 
    title: "공지·의견", 
    description: "개선 제안", 
    icon: <BellRing size={20} />, 
    path: "notice" 
  },
];

export function OthersPage() {
  return (
    // [레이아웃] 전체 화면 채우기 (세로/가로 배치 자동 전환)
    <div className="flex flex-col md:flex-row h-full w-full overflow-hidden bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
      
      {/* 1. 사이드바 네비게이션 */}
      <nav className="
        flex-shrink-0 z-20
        w-full md:w-64 h-auto md:h-full
        bg-white/60 backdrop-blur-md border-b md:border-b-0 md:border-r border-emerald-100
        flex md:flex-col 
        overflow-x-auto md:overflow-y-auto no-scrollbar
        p-2 md:p-4 gap-2
      ">
        {/* 헤더 (PC에서만 보임) */}
        <div className="hidden md:block px-4 py-3 mb-2">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Others</h2>
          <p className="text-xs text-gray-500 font-medium">다양한 즐길거리</p>
        </div>

        {/* 메뉴 리스트 */}
        {otherSections.map((section) => (
          <NavLink
            key={section.id}
            to={`/others/${section.path}`}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              whitespace-nowrap flex-shrink-0 md:w-full select-none
              ${isActive 
                ? "bg-white shadow-sm text-emerald-600 font-bold ring-1 ring-emerald-100 scale-[1.02]" 
                : "text-gray-500 hover:bg-white/50 hover:text-emerald-600"}
            `}
          >
            {/* 아이콘 */}
            <div className={({ isActive }) => isActive ? "text-emerald-500" : "opacity-70"}>
              {section.icon}
            </div>
            
            {/* 텍스트 정보 */}
            <div className="flex flex-col text-left">
              <span className="text-sm leading-none mb-0.5">{section.title}</span>
              {/* 모바일에서는 설명 숨김 (공간 확보), PC에서는 보임 */}
              <span className="text-[10px] font-normal opacity-60 hidden md:block">
                {section.description}
              </span>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* 2. 메인 콘텐츠 영역 */}
      <main className="flex-1 h-full overflow-hidden relative w-full">
        {/* Outlet이 들어갈 공간: 내부에서 스크롤 처리를 하기 위해 h-full 보장 */}
        <div className="h-full w-full overflow-y-auto custom-scrollbar p-0">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}
