import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Info } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface ScheduleItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'birthday' | 'album' | 'concert' | 'broadcast' | 'event';
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function AllSchedule() {
  const { data: schedules } = useJsonData<ScheduleItem[]>('schedules');
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
  const [selectedEvent, setSelectedEvent] = useState<ScheduleItem | null>(null);

  useEffect(() => {
    if (schedules && schedules.length > 0 && !selectedEvent) {
      setSelectedEvent(schedules[0]);
    }
  }, [schedules]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { 
      daysInMonth: lastDay.getDate(), 
      startingDayOfWeek: firstDay.getDay() 
    };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedEvent(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedEvent(null);
  };

  const getEventsForDate = (day: number) => {
    if (!schedules) return null;
    return schedules.find((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === currentDate.getFullYear() &&
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getDate() === day
      );
    });
  };

  const getEventIcon = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'birthday': return '🎂';
      case 'album': return '💿';
      case 'concert': return '🎤';
      case 'broadcast': return '📺';
      case 'event': return '🎉';
      default: return '📅';
    }
  };

  const getEventColor = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'birthday': return 'bg-pink-100 text-pink-600 ring-pink-200';
      case 'album': return 'bg-purple-100 text-purple-600 ring-purple-200';
      case 'concert': return 'bg-blue-100 text-blue-600 ring-blue-200';
      case 'broadcast': return 'bg-yellow-100 text-yellow-700 ring-yellow-200';
      default: return 'bg-green-100 text-green-600 ring-green-200';
    }
  };

  return (
    <div className="w-full h-full p-6 overflow-x-auto flex justify-center items-center">
      {/* 스크롤바 숨김 스타일 */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* [Grid Layout 변경]
        - grid-cols-4: 전체를 4분할
        - Left: col-span-1 (1/4)
        - Center: col-span-2 (2/4 = 1/2)
        - Right: col-span-1 (1/4)
        - h-[600px]: 높이 고정 (달력 줄 수 변화에도 UI 흔들림 방지)
        - max-w-[1400px]: 너무 넓어지지 않게 제한
      */}
      <div className="min-w-[1000px] max-w-[1400px] w-full h-[600px] grid grid-cols-4 gap-6">
        
        {/* =======================================================
            1. [Left] Upcoming List (1/4)
           ======================================================= */}
        <div className="col-span-1 bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white/60 flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-2 mb-4 pl-1 flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-500" />
            <h4 className="text-gray-800 font-bold text-lg">Upcoming</h4>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide pr-1 pb-2">
            {schedules?.map((event) => (
              <button
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setCurrentDate(new Date(event.date));
                }}
                className={`
                  w-full p-3 rounded-2xl transition-all duration-200 text-left border relative group flex items-center gap-3 flex-shrink-0
                  ${selectedEvent?.id === event.id 
                    ? 'bg-white shadow-md border-purple-100 scale-[1.02]' 
                    : 'bg-white/40 hover:bg-white hover:border-purple-50 border-transparent'}
                `}
              >
                {selectedEvent?.id === event.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-400 rounded-r-full" />
                )}
                
                <div className="text-xl flex-shrink-0 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-purple-50 transition-colors">
                  {getEventIcon(event.type)}
                </div>
                
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-bold truncate ${selectedEvent?.id === event.id ? 'text-purple-700' : 'text-gray-700'}`}>
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 font-medium truncate">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* =======================================================
            2. [Center] Calendar (2/4)
            - col-span-2: 너비 2배 확보
           ======================================================= */}
        <div className="col-span-2 bg-white/70 backdrop-blur-xl rounded-[32px] p-8 shadow-sm border border-purple-50 flex flex-col h-full overflow-hidden">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6 flex-shrink-0 px-2">
            <h3 className="text-gray-800 font-bold flex items-center gap-3 text-3xl tracking-tight">
              <CalendarIcon className="w-8 h-8 text-purple-500" />
              {monthNames[currentDate.getMonth()]} <span className="text-purple-300 font-light">{currentDate.getFullYear()}</span>
            </h3>
            <div className="flex gap-2">
              <button onClick={previousMonth} className="w-10 h-10 hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-purple-100">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button onClick={nextMonth} className="w-10 h-10 hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-purple-100">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 mb-2 px-4 flex-shrink-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid - 높이 고정 상태에서 자연스럽게 배치 */}
          <div className="flex-1 px-4">
            <div className="grid grid-cols-7 gap-4 h-full content-start">
              {Array.from({ length: startingDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const event = getEventsForDate(day);
                const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
                const isSelected = selectedEvent && new Date(selectedEvent.date).getDate() === day && new Date(selectedEvent.date).getMonth() === currentDate.getMonth();

                return (
                  /* aspect-square를 사용하여 정사각형 비율 유지하되, 컨테이너 너비에 맞춤 */
                  <button
                    key={day}
                    onClick={() => event && setSelectedEvent(event)}
                    className={`
                      w-full aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300
                      ${event 
                        ? `${getEventColor(event.type).split(' ')[0]} ${getEventColor(event.type).split(' ')[1]} hover:scale-105 shadow-sm hover:shadow-md cursor-pointer` 
                        : 'hover:bg-gray-50 text-gray-400'}
                      ${isToday ? 'ring-2 ring-purple-400 ring-offset-2 z-10' : ''}
                      ${isSelected ? 'ring-2 ring-gray-400 ring-offset-2 z-10 scale-95' : ''}
                    `}
                  >
                    <span className={`text-lg mb-1 ${event ? 'font-bold' : ''}`}>{day}</span>
                    {event && <span className="text-xl group-hover:-translate-y-1 transition-transform">{event.icon}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =======================================================
            3. [Right] Details (1/4)
           ======================================================= */}
        <div className="col-span-1 bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white/60 flex flex-col justify-center text-center h-full relative overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center w-full py-4">
               <div className="w-24 h-24 mx-auto bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-5xl mb-6 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-widest border border-purple-100">
                {selectedEvent.type}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight px-2 w-full truncate">
                {selectedEvent.title}
              </h2>
              
              <p className="text-sm text-gray-500 mb-8 leading-relaxed px-2 line-clamp-4 w-full h-[5rem]">
                {selectedEvent.description}
              </p>

              <div className="w-full bg-white/60 rounded-3xl p-5 text-left border border-white/80 space-y-4 shadow-sm mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
                    <CalendarIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Date</p>
                    <p className="text-sm font-bold text-gray-700 mt-0.5 truncate">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500 flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Location</p>
                    <p className="text-sm font-bold text-gray-700 mt-0.5 truncate">Seoul, Korea</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-300 flex flex-col items-center gap-4 select-none opacity-50">
              <Info className="w-16 h-16 opacity-20" />
              <p className="text-sm font-medium">일정을 선택해주세요</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
