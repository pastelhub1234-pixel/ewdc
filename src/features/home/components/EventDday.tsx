import { useMemo } from 'react';
import { Clock, MoreHorizontal } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface ScheduleItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'birthday' | 'album' | 'concert' | 'broadcast' | 'event';
}

export function EventDday() {
  const { data: schedules, loading } = useJsonData<ScheduleItem[]>('schedules');

  const getKstDate = (dateStr?: string) => {
    const date = dateStr ? new Date(dateStr) : new Date();
    return new Date(date.getTime() + (9 * 60 * 60 * 1000));
  };

  const upcomingEvents = useMemo(() => {
    if (!schedules) return [];
    const nowKst = getKstDate();
    nowKst.setUTCHours(0, 0, 0, 0); 

    return schedules.map(event => {
      const eventKst = getKstDate(event.date);
      const eventDateOnly = new Date(eventKst);
      eventDateOnly.setUTCHours(0, 0, 0, 0);
      
      const dDayVal = Math.ceil((eventDateOnly.getTime() - nowKst.getTime()) / (1000 * 60 * 60 * 24));
      return { ...event, dDayVal, eventKst };
    })
    .filter(e => e.dDayVal >= 0) 
    .sort((a, b) => a.dDayVal - b.dDayVal)
    .slice(0, 4);
  }, [schedules]);

  const getTypeColor = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'birthday': return 'text-pink-500';
      case 'broadcast': return 'text-purple-600';
      case 'concert': return 'text-blue-500';
      case 'album': return 'text-indigo-500';
      default: return 'text-emerald-500';
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center text-gray-400 text-xs">Loading...</div>;

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-sm h-full flex flex-col font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pl-1">
        <Clock className="w-5 h-5 text-purple-600" />
        <h4 className="text-gray-800 font-bold text-lg tracking-tight">다가오는 일정</h4>
      </div>

      {/* Timeline List */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-2 scrollbar-hide">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((item) => {
            const isToday = item.dDayVal === 0;
            const typeColor = getTypeColor(item.type);

            return (
              <div key={item.id} className="flex gap-4 items-start group">
                
                <div className="flex-shrink-0 pt-1">
                  <div className={`
                    px-3 py-1.5 rounded-full text-[12px] font-bold shadow-sm border
                    flex items-center justify-center min-w-[64px] tracking-wide
                    transition-colors duration-200
                    ${isToday 
                      ? 'bg-gray-800 text-white border-gray-800' 
                      : 'bg-white text-gray-500 border-white/60 group-hover:border-purple-200 group-hover:text-purple-600'}
                  `}>
                    {isToday ? 'NOW' : `D-${item.dDayVal}`}
                  </div>
                </div>

                {/* [Right] White Card */}
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-purple-50/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  
                  {/* Badge & Type */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${typeColor}`}>
                      {item.type}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded animate-pulse">
                        ON AIR
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h5 className="text-[15px] font-bold text-gray-800 mb-1 leading-snug">
                    {item.title}
                  </h5>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 font-medium">
                    {item.description || "상세 설명이 없습니다."}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60">
             <MoreHorizontal className="w-8 h-8" />
             <p className="text-xs">일정이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
