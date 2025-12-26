import { useJsonData } from '../../../hooks/useJsonData';

interface ChatRoom {
  roomId: string;
  roomName: string;
  roomImg: string;
  todayPostCount: number;
  lastPost: string;
  lastPostTime: string;
}

interface ChatRoomListProps {
  onSelect: (roomId: string) => void;
  current: string;
}

export function ChatRoomList({ onSelect, current }: ChatRoomListProps) {
  const { data: chatRooms, loading } = useJsonData<ChatRoom[]>('chat_rooms');

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return '';
    }
  };

  if (loading) {
    // 로딩 중일 때도 높이 꽉 채우기
    return (
      <div className="w-[280px] h-full bg-white border-r border-gray-100 flex items-center justify-center">
        <span className="text-xs text-gray-400">목록 로딩 중...</span>
      </div>
    );
  }

  return (
    // ✅ h-full: 부모 높이(600px)만큼 꽉 채움
    // ✅ min-h-0: Flex 구조에서 스크롤을 만들기 위한 필수 설정 (이거 없으면 늘어남)
    <div className="w-[280px] h-full flex flex-col bg-white border-r border-[#ececec] min-h-0 shrink-0">
      {/* 헤더 (고정) */}
      <div className="px-4 py-3.5 border-b border-[#ececec] flex-shrink-0">
        <h2 className="font-bold text-gray-800 text-base">채팅</h2>
      </div>

      {/* 목록 (여기만 스크롤) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {chatRooms?.map((room) => (
          <button
            key={room.roomId}
            onClick={() => onSelect(room.roomId)}
            className={`w-full flex items-center px-4 py-3 transition-colors text-left group
              ${current === room.roomId ? "bg-[#f2f2f2]" : "hover:bg-[#f7f7f7]"}`}
          >
            <div className="relative shrink-0">
              <img 
                src={room.roomImg} 
                alt={room.roomName} 
                className="w-[42px] h-[42px] rounded-[14px] object-cover border border-black/5"
              />
            </div>

            <div className="flex-1 ml-3 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[14px] font-semibold text-gray-900 truncate">
                  {room.roomName}
                </span>
                <span className="text-[11px] text-gray-400 ml-2 shrink-0">
                  {formatTime(room.lastPostTime)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[12px] text-gray-500 truncate w-[140px]">
                  {room.lastPost || "대화 내용이 없습니다."}
                </p>
                {room.todayPostCount > 0 && (
                  <span className="bg-[#fe4e4e] text-white text-[10px] font-bold px-1.5 h-[16px] flex items-center justify-center rounded-full min-w-[16px]">
                    {room.todayPostCount > 300 ? "300+" : room.todayPostCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
