import { Circle, Radio } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface LiveStatus {
  name: string;
  status: string; // "X_live", "chzzk_live" 등
  title: string;
  profileImg: string;
  liveUrl: string;
}

export function LiveStatusPanel() {
  const { data: members, loading } = useJsonData<LiveStatus[]>('status');

  const getStatusColor = (status: string) => {
    if (status.includes('live')) return 'text-green-500'; // 방송중
    return 'text-gray-300'; // 오프라인
  };

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 border-r border-purple-200/30 overflow-y-auto scrollbar-hide">
      <div className="p-3">
        <div className="mb-3 px-2 flex items-center gap-2">
           <Radio className="w-3 h-3 text-purple-600" />
           <p className="text-xs font-bold text-purple-600">LIVE STATION</p>
        </div>

        <div className="space-y-1">
          {members?.map((member, idx) => {
             const isLive = member.status.includes('live');
             return (
                <a
                  key={idx}
                  href={member.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-all cursor-pointer ${
                      isLive ? 'bg-white shadow-sm ring-1 ring-purple-100' : 'hover:bg-white/50'
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center flex-shrink-0 p-[1.5px]">
                    <img src={member.profileImg} alt={member.name} className="w-full h-full rounded-full object-cover bg-white" />
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 text-xs font-bold truncate">{member.name}</span>
                      <Circle
                        className={`w-1.5 h-1.5 fill-current flex-shrink-0 ${getStatusColor(member.status)} ${
                          isLive ? 'animate-pulse' : ''
                        }`}
                      />
                    </div>
                    <p className="text-gray-500 text-[10px] truncate mt-0.5">{isLive ? 'ON AIR' : member.title}</p>
                  </div>
                </a>
             );
          })}
        </div>
      </div>
    </div>
  );
}
