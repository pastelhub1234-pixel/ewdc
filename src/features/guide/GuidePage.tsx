import React from 'react'; // React import 확인
import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, ShoppingBag, Ticket, Heart, PenTool, Users, Siren } from "lucide-react";

const guideSections = [
  { id: 'basic', title: '기본 활동', icon: <BookOpen />, path: 'basic' },
  { id: 'goods', title: '굿즈/포카', icon: <ShoppingBag />, path: 'goods' },
  { id: 'concert', title: '공연/티켓', icon: <Ticket />, path: 'concert' },
  { id: 'support', title: '서포트', icon: <Heart />, path: 'support' },
  { id: 'creation', title: '창작 활동', icon: <PenTool />, path: 'creation' },
  { id: 'community', title: '커뮤니티', icon: <Users />, path: 'community' },
  { id: 'report', title: '신고/문의', icon: <Siren />, path: 'report' },
];

export function GuidePage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50/50">
      {/* 상단 탭 */}
      <div className="flex-none z-30 bg-white/60 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-4 overflow-x-auto scrollbar-hide">
            {/* ... (탭 메뉴 코드는 기존과 동일) ... */}
            <div className="flex gap-2 min-w-max px-2">
              {guideSections.map((section) => (
                <NavLink
                  key={section.id}
                  to={`/guide/${section.path}`}
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-medium
                     ${isActive 
                       ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 scale-105" 
                       : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                     }`
                  }
                >
                  <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                    {React.cloneElement(section.icon as React.ReactElement, { size: 18, strokeWidth: 2.5 })}
                  </div>
                  <span className="whitespace-nowrap">{section.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* ✅ [수정 포인트] 여기에 ID 추가 (id="guide-scroll-container") */}
      <div 
        id="guide-scroll-container"
        className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth relative"
      >
        <Outlet />
      </div>
    </div>
  );
}
