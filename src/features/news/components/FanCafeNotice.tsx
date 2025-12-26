import { MessageSquare } from "lucide-react";

export function FanCafeNotice() {
  const notices = [
    { title: "[공지] 신규 회원 가입 안내", date: "2025-01-08", category: "공지" },
    { title: "[이벤트] 컴백 기념 팬미팅 안내", date: "2025-01-07", category: "이벤트" },
    { title: "[안내] 굿즈 배송 지연 안내", date: "2025-01-05", category: "안내" },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800">팬카페 공지</h3>
      </div>

      <div className="space-y-2">
        {notices.map((n, i) => (
          <div
            key={i}
            className="p-3 bg-white/80 rounded-xl hover:bg-purple-50/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                {n.category}
              </span>
              <span className="text-xs text-gray-500">{n.date}</span>
            </div>
            <p className="text-sm text-gray-800">{n.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
