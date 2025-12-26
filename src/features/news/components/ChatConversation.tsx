import { useJsonData } from '../../../hooks/useJsonData';
import { MessageBubble } from './MessageBubble';
import { Search, Menu, Smile, Paperclip } from 'lucide-react';
import { ChatMessage } from '../../../types'; 

interface ChatRoom {
  roomId: string;
  roomName: string;
  roomImg: string;
  todayPostCount: number;
}

interface ChatConversationProps {
  roomId: string;
}

export function ChatConversation({ roomId }: ChatConversationProps) {
  const { data: chatRooms } = useJsonData<ChatRoom[]>('chat_rooms');
  const { data: messages, loading } = useJsonData<ChatMessage[]>(roomId);
  
  const room = chatRooms?.find(r => r.roomId === roomId);

  return (
    // ✅ flex-1: 남은 공간 채움
    // ✅ min-w-0: 내부 콘텐츠가 길어져도 부모 영역을 뚫고 나가지 않게 함 (밀림 방지 핵심)
    <div className="flex-1 h-full flex flex-col bg-[#b2c7da] min-w-0 min-h-0">
      
      {/* 헤더 (고정) */}
      <header className="bg-[#b2c7da]/95 backdrop-blur-sm px-4 py-3 flex justify-between items-center border-b border-black/5 flex-shrink-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          {room && (
            <img 
              src={room.roomImg} 
              alt={room.roomName} 
              className="w-9 h-9 rounded-[13px] object-cover shadow-sm cursor-pointer hover:opacity-90"
            />
          )}
          <div className="min-w-0">
            <h2 className="text-gray-900 text-[14px] font-bold truncate">
              {room ? room.roomName : "채팅방"}
            </h2>
            <div className="flex items-center gap-1.5 text-gray-700 opacity-70">
              <span className="text-[11px]">
                참여자 {(messages?.length || 0) + 1}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 text-gray-700 opacity-60">
          <Search size={18} className="cursor-pointer hover:opacity-100" />
          <Menu size={18} className="cursor-pointer hover:opacity-100" />
        </div>
      </header>

      {/* 메시지 영역 (스크롤) */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">
        {loading ? (
          <div className="text-center text-gray-600 py-8 text-xs">로딩 중...</div>
        ) : (
          messages && messages.length > 0 ? (
            messages.map((m, i) => (
               <MessageBubble key={i} msg={m} />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm gap-2 opacity-60">
               <p>대화 내용이 없습니다.</p>
            </div>
          )
        )}
      </div>

      {/* ✅ 입력창 (한 줄 배치 + 크기 축소) */}
      <div className="bg-white px-3 py-2 flex-shrink-0 border-t border-[#ebebeb]">
        <div className="flex items-center gap-2">
            
            {/* 아이콘들 (왼쪽) */}
            <div className="flex gap-2 shrink-0 text-gray-400">
                 <Paperclip size={20} className="cursor-pointer hover:text-gray-600" />
                 <Smile size={20} className="cursor-pointer hover:text-gray-600" />
            </div>

            {/* 입력 필드 (가운데, 높이 줄임) */}
            <textarea 
                className="flex-1 resize-none text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none h-[36px] py-2 px-1 leading-normal"
                placeholder="메시지를 입력하세요"
            />

            {/* 전송 버튼 (오른쪽, 크기 줄임) */}
            <button className="bg-[#feec34] hover:bg-[#f5e11b] text-black text-[12px] px-3 py-1.5 rounded-[4px] font-medium transition-colors shrink-0">
                전송
            </button>
        </div>
      </div>
    </div>
  );
}
