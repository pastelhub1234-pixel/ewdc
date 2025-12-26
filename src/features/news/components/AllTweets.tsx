import { useState } from "react";
import { ChatRoomList } from "./ChatRoomList";
import { ChatConversation } from "./ChatConversation";

export function AllTweets() {
  const [roomId, setRoomId] = useState("1");

  return (
    <div className="w-full h-[600px] bg-white rounded-xl shadow-sm border border-gray-200 flex overflow-hidden font-sans">
      <ChatRoomList current={roomId} onSelect={setRoomId} />
      <ChatConversation roomId={roomId} />
    </div>
  );
}
