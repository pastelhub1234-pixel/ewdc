import { Users, Heart, Activity, Clock } from "lucide-react";
import { useJsonData } from "../../../hooks/useJsonData";

interface Statistics {
  visitors: number;
  totalLikes: number;
  activeUser: number;
  time: string;
}

export function GoodsTrade() {
  const { data: stats, loading } = useJsonData<Statistics>('statistics');

  if (loading) return <div>통계 불러오는 중...</div>;
  if (!stats) return null;

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-5 h-5 text-purple-500" />
        <h2 className="font-bold text-lg">팬덤 활동 통계</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 방문자 수 */}
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-semibold">Total Visitors</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.visitors.toLocaleString()}</p>
        </div>

        {/* 총 좋아요 */}
        <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
            <div className="flex items-center gap-2 text-pink-600 mb-1">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-semibold">Total Likes</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.totalLikes.toLocaleString()}</p>
        </div>

        {/* 활성 사용자 */}
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 text-green-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-semibold">Active Now</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.activeUser.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mt-2">
        <Clock className="w-3 h-3" />
        <span>Updated: {new Date(stats.time).toLocaleString()}</span>
      </div>
    </div>
  );
}
