import { ExternalLink, Calendar, MapPin, AlarmClock, Ticket } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface TicketItem {
  id: string;
  bgClass: string;
  status: string;
  dDay: string;
  title: string;
  date: string;
  openTime: string;
  site: string;
}

export function TicketingLinker() {
  const { data: tickets, loading } = useJsonData<TicketItem[]>('tickets');

  if (loading) return <div>티켓 정보 로딩 중...</div>;
  if (!tickets || tickets.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2 px-2">
        <Ticket className="w-5 h-5 text-purple-500" />
        <h3 className="font-bold text-gray-800">티켓 예매 일정</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((t) => (
          <div key={t.id} className={`relative p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all group ${t.bgClass}`}>
            
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                t.status === 'upcoming' ? 'bg-rose-500 text-white animate-pulse' : 'bg-indigo-500 text-white'
              }`}>
                {t.dDay}
              </span>
              <button className="p-2 bg-white rounded-full text-gray-400 hover:text-purple-600 shadow-sm transition-colors group-hover:scale-110">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight min-h-[3.5rem]">{t.title}</h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 p-2 rounded-lg backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-purple-400" /><span>{t.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 p-2 rounded-lg backdrop-blur-sm">
                <AlarmClock className="w-4 h-4 text-rose-400" /><span>오픈: <span className="font-bold text-gray-800">{t.openTime}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 p-2 rounded-lg backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-blue-400" /><span>{t.site}</span>
              </div>
            </div>

            <button className="w-full mt-4 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              예매처 바로가기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}