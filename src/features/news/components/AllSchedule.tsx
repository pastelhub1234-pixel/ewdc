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
    <div className="w-full h-full p-6 overflow-x-auto">
      {/* [통합 카드 컨테이너] 
        - min-w-[1400px]: 내부 비율(1:2:1) 유지
        - h-[750px]: 달력 정사각형 비율에 맞춘 고정 높이
        - 하나의 큰 박스 안에 divide-x로 구역을 나눔
      */}
      <div className="min-w-[1400px] h-[750px] bg-white/70 backdrop-blur-xl rounded-[32px] shadow-sm border border-white/60 flex flex-row divide-x divide-purple-50/50">
        
        {/* =======================================================
            1. [Left] Upcoming List (Flex: 1)
            - overflow-hidden: 부모 영역 넘침 방지
           ======================================================= */}
        <div className="flex-1 flex flex-col h-full overflow-hidden p-6">
          <div className="flex items-center gap-2 mb-6 pl-1 flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-500" />
            <h4 className="text-gray-800 font-bold text-lg">Upcoming</h4>
          </div>
          
          {/* [스크롤 영역] 
            - flex-1: 남은 공간 채움
            - overflow-y-auto: 세로 스크롤
            - [&::-webkit-scrollbar]:hidden: 스크롤바 숨김 (Tailwind 임의설정)
          */}
          <div className="flex-1 overflow-y-auto space-y-3 [&::-webkit-scrollbar]:hidden">
            {schedules?.map((event) => (
              <button
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setCurrentDate(new Date(event.date));
                }}
                className={`
                  w-full p-4 rounded-2xl transition-all duration-200 text-left border relative group flex items-center gap-4 flex-shrink-0
                  ${selectedEvent?.id === event.id 
                    ? 'bg-white shadow-md border-purple-100 scale-[1.02]' 
                    : 'bg-white/40 hover:bg-white hover:border-purple-50 border-transparent'}
                `}
              >
                {selectedEvent?.id === event.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-purple-400 rounded-r-full" />
                )}
                
                <div className="text-2xl flex-shrink-0 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-purple-50 transition-colors">
                  {getEventIcon(event.type)}
                </div>
                
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-bold truncate ${selectedEvent?.id === event.id ? 'text-purple-700' : 'text-gray-700'}`}>
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 font-medium">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* =======================================================
            2. [Center] Calendar (Flex: 2)
            - 가장 넓은 영역 차지
           ======================================================= */}
        <div className="flex-[2] flex flex-col h-full p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-shrink-0">
            <h3 className="text-gray-800 font-bold flex items-center gap-3 text-3xl tracking-tight ml-2">
              <CalendarIcon className="w-8 h-8 text-purple-500" />
              {monthNames[currentDate.getMonth()]} <span className="text-purple-300 font-light">{currentDate.getFullYear()}</span>
            </h3>
            <div className="flex gap-3">
              <button onClick={previousMonth} className="w-12 h-12 hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-purple-100">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button onClick={nextMonth} className="w-12 h-12 hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-purple-100">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 mb-4 px-2 flex-shrink-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-4 flex-1 content-start px-2 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const event = getEventsForDate(day);
              const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
              const isSelected = selectedEvent && new Date(selectedEvent.date).getDate() === day && new Date(selectedEvent.date).getMonth() === currentDate.getMonth();

              return (
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

        {/* =======================================================
            3. [Right] Details (Flex: 1)
            - justify-center: 내용은 중앙 정렬
           ======================================================= */}
        <div className="flex-1 flex flex-col justify-center h-full p-8 relative overflow-hidden">
          {selectedEvent ? (
            <div className="animate-in fade-in zoom-in duration-300 h-full flex flex-col items-center justify-center">
               <div className="w-32 h-32 mx-auto bg-white rounded-[2.5rem] shadow-sm flex items-center justify-center text-7xl mb-8 border border-purple-50">
                {getEventIcon(selectedEvent.type)}
              </div>
              
              <div className="inline-flex items-center justify-center px-5 py-2 mb-6 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest border border-purple-100">
                {selectedEvent.type}
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-5 leading-tight break-keep px-4 text-center">
                {selectedEvent.title}
              </h2>
              
              <p className="text-base text-gray-500 mb-12 leading-relaxed px-4 line-clamp-4 text-center">
                {selectedEvent.description}
              </p>

              <div className="w-full bg-white/60 rounded-3xl p-6 text-left border border-white/80 space-y-5 shadow-sm">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
                    <CalendarIcon size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Date</p>
                    <p className="text-base font-bold text-gray-700 mt-0.5">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                 <div className="flex items-center gap-5">
                   <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Location</p>
                    <p className="text-base font-bold text-gray-700 mt-0.5">Seoul, Korea</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-300 flex flex-col items-center gap-5 select-none opacity-50">
              <Info className="w-20 h-20 opacity-20" />
              <p className="text-base font-medium">일정을 선택해주세요</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
