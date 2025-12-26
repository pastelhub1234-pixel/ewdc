// Chat Types
export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  icon: string;
}

export interface ChatMessage {
  id: string;
  type: 'text' | 'date' | 'file' | 'link';
  sender?: string;
  content?: string;
  time?: string;
  fileName?: string;
  description?: string;
  title?: string;
  url?: string;
}

// Broadcast Types
export interface BroadcastItem {
  name: string;
  message: string;
  image: string;
  link: string;
}

export interface BroadcastGroup {
  id: string;
  title: string;
  color: string;
  items: BroadcastItem[];
}

// YouTube Types
export interface YoutubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelProfile: string;
  videoUrl: string;
  channelUrl: string;
  uploadedAt: string;
  type?: "video" | "shorts";
}

// Tweet Types
export interface Tweet {
  id: string;
  author: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
}

// Schedule Types
export interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'broadcast' | 'event' | 'release' | 'other';
  description?: string;
}

// Goods Types
export interface GoodsItem {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  category: 'official' | 'personal' | 'collab';
  status: 'available' | 'soldout' | 'upcoming';
}
