import { MapPin, Calendar, Store, ExternalLink } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface EventItem {
  name: string;
  date: string;
  loc: string;
  booth: string;
  desc: string;
  color: string;
}

export function FanEventBooth() {
  const { data: events, loading } = useJsonData<EventItem[]>('fan_events');

  if (loading) return <div>행사 정보 로딩 중...</div>;
  if (!events) return null;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-3xl p-6 border border-gray-200">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Store className="w-5 h-5 text-gray-600" />
            Creator Market
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            * 비공식 2차 창작 행사 및 부스 정보입니다.
          </p>
        </div>
        <button className="text-xs font-bold text-gray-500 hover:text-purple-600 flex items-center gap-1 transition-colors">
          행사 제보하기 <ExternalLink className="w-3 h-3" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((evt, idx) => (
          <div 
            key={idx} 
            className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all border-l-4 ${evt.color}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">
                Upcoming
              </span>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                부스 {evt.booth}
              </span>
            </div>

            <h4 className="font-bold text-gray-800 mb-3 text-lg leading-tight">
              {evt.name}
            </h4>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{evt.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{evt.loc}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 line-clamp-1">
                📝 {evt.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}