import React from 'react';
import { Calendar, MapPin, Store } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface EventItem {
  name: string;
  time: string;
  loc: string;
  booth: string;
}

export function EventLinks() {
  const { data: events, loading, error } = useJsonData<EventItem[]>('event');

  if (loading) return <div>이벤트 로딩 중...</div>;
  if (error) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800">주요 이벤트 & 팝업</h3>
      </div>

      <div className="space-y-2">
        {events?.map((evt, idx) => {
          const date = new Date(evt.time);
          const dateStr = date.toLocaleDateString();

          return (
            <div key={idx} className="p-3 bg-white/80 rounded-xl border border-purple-100/30 hover:bg-white transition-colors">
              <p className="font-bold text-gray-800 mb-1">{evt.name}</p>
              
              <div className="flex flex-col gap-1 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-purple-400" />
                  <span>{evt.loc}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Store className="w-3 h-3 text-pink-400" />
                  <span>{evt.booth}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 mt-1">
                  <span>📅 {dateStr}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}