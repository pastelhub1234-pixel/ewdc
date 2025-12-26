import { NavLink, Outlet } from "react-router-dom";
import {
  Calendar,
  FileText,
  Twitter,
  Radio,
  Music,
  Youtube,
} from "lucide-react";

const newsSections = [
  { id: "schedule", title: "일정 · D-DAY", description: "스텔라이브 전체 일정", icon: <Calendar className="w-6 h-6" />, path: "schedule" },
  { id: "broadcast", title: "방송 현황", description: "멤버별 생방송 확인", icon: <Radio className="w-6 h-6" />, path: "broadcast" },
  { id: "cafe", title: "팬카페 공지", description: "공식 카페 새 소식", icon: <FileText className="w-6 h-6" />, path: "cafe" },
  { id: "twitter", title: "X (트위터)", description: "실시간 타임라인", icon: <Twitter className="w-6 h-6" />, path: "twitter" },
  { id: "videos", title: "YouTube", description: "최신 업로드 영상", icon: <Youtube className="w-6 h-6" />, path: "videos" },
  { id: "songs", title: "최근 노래", description: "커버곡 & 오리지널", icon: <Music className="w-6 h-6" />, path: "songs" },
];

export function NewsPage() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-6 pb-20 max-w-7xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {newsSections.map((section) => (
            <NavLink
              key={section.id}
              to={`/news/${section.path}`}
              className={({ isActive }) => `
                p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer group border relative overflow-hidden flex flex-col
                ${isActive
                  ? "bg-white/90 border-blue-200 shadow-xl scale-[1.02] ring-1 ring-blue-100"
                  : "bg-white/60 border-transparent hover:bg-white/80 hover:border-blue-100 hover:shadow-md hover:scale-[1.01]"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-xl opacity-60" />
                  )}
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm z-10 relative ${
                    isActive
                      ? "bg-gradient-to-br from-blue-400 to-cyan-400 shadow-blue-200"
                      : "bg-white text-blue-300"
                  }`}>
                    <div className={isActive ? "text-white" : "text-gray-400 group-hover:text-blue-400"}>
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
