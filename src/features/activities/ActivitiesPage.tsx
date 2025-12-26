import { NavLink, Outlet } from "react-router-dom";
import {
  CheckSquare,
  Trophy,
  Calendar,
  TrendingUp,
  Music,
  Wrench,
} from "lucide-react";

const activitySections = [
  { id: "todo", title: "할 일 목록", description: "오늘의 덕질 체크", icon: <CheckSquare className="w-6 h-6" />, path: "todo" },
  { id: "voting", title: "투표 · Hype", description: "화력 지원 하러가기", icon: <Trophy className="w-6 h-6" />, path: "voting" },
  { id: "events", title: "이벤트", description: "진행 중인 이벤트", icon: <Calendar className="w-6 h-6" />, path: "events" },
  { id: "trending", title: "트렌딩 툴", description: "실시간 인기 급상승", icon: <TrendingUp className="w-6 h-6" />, path: "trending" },
  { id: "streaming", title: "음원 스밍", description: "스트리밍 가이드", icon: <Music className="w-6 h-6" />, path: "streaming" },
  { id: "youtubeFix", title: "YouTube Fix", description: "프리미엄 기능 복구", icon: <Wrench className="w-6 h-6" />, path: "youtube-fix" },
];

export function ActivitiesPage() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-6 pb-20 max-w-7xl mx-auto">
 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {activitySections.map((section) => (
            <NavLink
              key={section.id}
              to={`/activities/${section.path}`}
              className={({ isActive }) => `
                p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer group border relative overflow-hidden flex flex-col
                ${isActive
                  ? "bg-white/90 border-pink-200 shadow-xl scale-[1.02] ring-1 ring-pink-100"
                  : "bg-white/60 border-transparent hover:bg-white/80 hover:border-pink-100 hover:shadow-md hover:scale-[1.01]"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full blur-xl opacity-60" />
                  )}
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm z-10 relative ${
                    isActive
                      ? "bg-gradient-to-br from-pink-400 to-rose-400 shadow-pink-200"
                      : "bg-white text-pink-300"
                  }`}>
                    <div className={isActive ? "text-white" : "text-gray-400 group-hover:text-pink-400"}>
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

