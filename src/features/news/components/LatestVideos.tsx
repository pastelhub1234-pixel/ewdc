import { Youtube } from "lucide-react";
import { useJsonData } from '../../../hooks/useJsonData';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  channelName?: string;
  channelProfile?: string;
  date: string;
}

export function LatestVideos() {
  const { data: videos, loading } = useJsonData<VideoItem[]>('youtube');

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <Youtube className="w-4 h-4 text-purple-500" />
        <h4 className="text-gray-800 font-medium">Latest YouTube Videos</h4>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-8">로딩 중...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos && videos.map((video, idx) => (
            <div key={idx} className="space-y-2 group">
              {/* 썸네일 */}
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video rounded-xl overflow-hidden bg-gray-100 relative shadow-sm group-hover:shadow-md transition-all"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </a>

              {/* 정보 */}
              <div className="min-w-0">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-800 line-clamp-2 hover:text-purple-600 font-medium leading-snug"
                >
                  {video.title}
                </a>
                <div className="flex items-center gap-1 mt-1">
                   <p className="text-xs text-gray-500">{video.date}</p>
                </div>
              </div>
            </div>
          ))}
          {(!videos || videos.length === 0) && (
             <div className="col-span-4 text-center text-gray-400 text-sm">영상이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
