import { MessageCircle } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface FeedItem {
  type: "TEXT" | "IMAGE";
  name: string;
  profileImg: string;
  content: string;
  time: string;
}

// ✅ UI 확인용 임시 데이터 (데이터 로딩 실패 시 사라짐 방지)
const FALLBACK_FEEDS: FeedItem[] = [
  {
    type: "IMAGE",
    name: "Stellar Live",
    profileImg: "https://ui-avatars.com/api/?name=Stellar&background=random",
    content: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    time: new Date().toISOString()
  },
  {
    type: "TEXT",
    name: "Official Notice",
    profileImg: "https://ui-avatars.com/api/?name=Admin&background=random",
    content: "이번 주말 특별 이벤트 공지가 업로드되었습니다. 카페를 확인해주세요! 📢",
    time: new Date().toISOString()
  }
];

export function RecentTweets() {
  const { data: serverFeeds } = useJsonData<FeedItem[]>('1');

  // ✅ 핵심: 서버 데이터가 없으면 임시 데이터를 보여줘서 UI가 사라지지 않게 함
  const feeds = (serverFeeds && serverFeeds.length > 0) ? serverFeeds : FALLBACK_FEEDS;

  if (!feeds || feeds.length === 0) return null;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-4 h-4 text-purple-500" />
        <h4 className="text-gray-800 font-bold">Recent Updates</h4>
      </div>

      <div className="space-y-4">
        {feeds.map((feed, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            {/* 프로필 이미지 */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center flex-shrink-0 p-[2px]">
              <img src={feed.profileImg} alt={feed.name} className="w-full h-full rounded-full object-cover bg-white" />
            </div>

            {/* 내용 영역 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-bold text-gray-800">{feed.name}</span>
                <span className="text-[10px] text-gray-400">{feed.time ? new Date(feed.time).toLocaleDateString() : ''}</span>
              </div>
              
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-purple-100/50 inline-block max-w-full">
                 {feed.type === 'IMAGE' ? (
                    <div className="rounded-lg overflow-hidden mt-1">
                        {/* ✅ [문제 해결] style 속성으로 높이 200px 강제 고정 */}
                        {/* Tailwind 클래스가 안 먹히더라도 무조건 적용됩니다. */}
                        <img 
                          src={feed.content} 
                          alt="Content" 
                          className="max-w-full w-full object-cover" 
                          style={{ 
                            height: '200px', 
                            maxHeight: '200px',
                            objectFit: 'cover' 
                          }}
                        />
                    </div>
                 ) : (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{feed.content}</p>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 rounded-lg transition-all text-sm font-medium">
        View All Updates
      </button>
    </div>
  );
}
