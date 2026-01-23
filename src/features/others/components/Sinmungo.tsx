import { Trophy, Medal } from "lucide-react";
import { useJsonData } from "../../../hooks/useJsonData";

interface RankingItem {
  rank: number;
  name: string;
  profileImg: string;
  category: string;
}

export function Sinmungo() {
  const { data: rankings, loading } = useJsonData<RankingItem[]>('rankings');

  if (loading) return <div>랭킹 로딩 중...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="font-bold text-lg">이달의 우수 파스텔</h2>
      </div>
      <p className="text-gray-600 text-sm">커뮤니티 활동 랭킹</p>

      <div className="space-y-3 mt-4">
        {rankings?.map((item) => (
          <div key={item.rank} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-purple-100">
            {/* 랭킹 뱃지 */}
            <div className="flex-shrink-0 w-8 flex justify-center font-bold text-lg text-gray-400 italic">
                {item.rank === 1 ? <Medal className="text-yellow-400 w-6 h-6" /> : 
                 item.rank === 2 ? <Medal className="text-gray-400 w-6 h-6" /> :
                 item.rank === 3 ? <Medal className="text-orange-400 w-6 h-6" /> : item.rank}
            </div>
            
            {/* 프로필 이미지 */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img src={item.profileImg} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            {/* 정보 */}
            <div className="flex-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                    {item.category}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
