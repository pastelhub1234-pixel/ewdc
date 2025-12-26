import { NavLink, Outlet } from "react-router-dom";
import {
  Image, 
  Search,
  Gamepad,
  BarChart,
  Video,
  Star,
} from "lucide-react";

const otherSections = [
  {
    id: "fanArt",
    title: "팬아트",
    description: "쇼츠처럼 보는 아카이브",
    icon: <Image className="w-6 h-6" />, // icon: Image -> icon: <Image ... />
    path: "fanArt",
  },
  {
    id: "karaoke",
    title: "노래방",
    description: "곡별 노래방 번호 찾기",
    icon: <Search className="w-6 h-6" />,
    path: "karaoke",
  },
  {
    id: "games",
    title: "팬게임",
    description: "팬 제작 게임 모음",
    icon: <Gamepad className="w-6 h-6" />,
    path: "games",
  },
  {
    id: "stats",
    title: "팬덤 통계",
    description: "활동 데이터 분석",
    icon: <BarChart className="w-6 h-6" />,
    path: "stats",
  },
  {
    id: "kirinuki",
    title: "키리누키",
    description: "클립 영상 랭킹",
    icon: <Video className="w-6 h-6" />,
    path: "kirinuki",
  },
  {
    id: "fortune",
    title: "오늘의 운세",
    description: "재미로 보는 운세",
    icon: <Star className="w-6 h-6" />,
    path: "fortune",
  },
];
export function OthersPage() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-6 pb-20 max-w-7xl mx-auto">
 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {otherSections.map((section) => (
            <NavLink
              key={section.id}
              to={`/others/${section.path}`}
              className={({ isActive }) => `
                p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer group border relative overflow-hidden flex flex-col
                ${isActive
                  ? "bg-white/90 border-emerald-200 shadow-xl scale-[1.02] ring-1 ring-emerald-100"
                  : "bg-white/60 border-transparent hover:bg-white/80 hover:border-emerald-100 hover:shadow-md hover:scale-[1.01]"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-xl opacity-60" />
                  )}
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm z-10 relative ${
                    isActive
                      ? "bg-gradient-to-br from-emerald-400 to-teal-400 shadow-emerald-200"
                      : "bg-white text-emerald-300"
                  }`}>
                    <div className={isActive ? "text-white" : "text-gray-400 group-hover:text-emerald-400"}>
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

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards min-h-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
