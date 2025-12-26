import { Radio, ExternalLink } from "lucide-react";
// ✅ Hook 교체
import { useJsonData } from '../../../hooks/useJsonData';

interface BroadcastItem {
  name: string;
  status: string;
  title: string;
  profileImg: string;
  liveUrl: string;
}

export function BroadcastStatus() {
  // ✅ useJsonData('status') 사용
  const { data: statusList, loading } = useJsonData<BroadcastItem[]>('status');

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
        <div className="text-center text-gray-500 py-8">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50 space-y-6">
      <div className="flex items-center gap-2">
        <Radio className="w-5 h-5 text-purple-500 animate-pulse" />
        <h3 className="text-gray-800 font-medium">방송 현황</h3>
      </div>

      <div className="space-y-3">
        {statusList && statusList.length > 0 ? (
          statusList.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-purple-50 shadow-sm">
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <img src={item.profileImg} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.title}</p>
                 </div>
              </div>
              <a 
                href={item.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full hover:bg-purple-200 transition-colors"
              >
                Live
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm py-4">현재 방송 중인 멤버가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
