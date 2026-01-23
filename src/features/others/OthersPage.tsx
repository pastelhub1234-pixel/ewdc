// src/features/others/OthersPage.tsx
import { NavLink, Outlet } from "react-router-dom";
import {
  Image, Mic2, Gamepad2, ShoppingBag, Megaphone, BellRing
} from "lucide-react";

const otherSections = [
  { id: "fanArt", title: "팬아트", description: "아카이브", icon: <Image size={20} />, path: "fanArt" },
  { id: "karaoke", title: "노래방", description: "번호 찾기", icon: <Mic2 size={20} />, path: "karaoke" },
  { id: "games", title: "팬게임", description: "게임 모음", icon: <Gamepad2 size={20} />, path: "games" },
  { id: "goods", title: "굿즈 거래", description: "교환/나눔", icon: <ShoppingBag size={20} />, path: "goods" },
  { id: "sinmungo", title: "신문고", description: "소통 창구", icon: <Megaphone size={20} />, path: "sinmungo" },
  { id: "notice", title: "공지·의견", description: "개선 제안", icon: <BellRing size={20} />, path: "notice" },
];

export function OthersPage() {
  return (
    // [중요] flex-row가 있어야 왼쪽 사이드바가 생깁니다!
    <div className="flex flex-col md:flex-row h-full w-full overflow-hidden bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
      
      {/* 1. 사이드바 */}
      <nav className="
        flex-shrink-0 z-20
        w-full md:w-64 h-auto md:h-full
        bg-white/60 backdrop-blur-md border-b md:border-b-0 md:border-r border-emerald-100
        flex md:flex-col 
        overflow-x-auto md:overflow-y-auto no-scrollbar
        p-2 md:p-4 gap-2
      ">
        <div className="hidden md:block px-4 py-3 mb-2">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Others</h2>
          <p className="text-xs text-gray-500 font-medium">다양한 즐길거리</p>
        </div>

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
            <div className={isActive ? "text-emerald-500" : "opacity-70"}>{section.icon}</div>
            <div className="flex flex-col text-left">
              <span className="text-sm leading-none mb-0.5">{section.title}</span>
              <span className="text-[10px] font-normal opacity-60 hidden md:block">{section.description}</span>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* 2. 메인 콘텐츠 */}
      <main className="flex-1 h-full overflow-hidden relative w-full">
        <div className="h-full w-full overflow-y-auto custom-scrollbar p-0">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}
