import { Youtube, Play } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  profileImg: string;
  videoUrl: string;
  name: string;
  time: string;
}

export function LatestVideos() {
  const { data: videos, loading } = useJsonData<Video[]>('youtube_music');

  if (loading) return <div className="p-4 text-center text-gray-400">Loading...</div>;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Youtube className="w-4 h-4 text-purple-500" />
          <h4 className="text-gray-800">Latest YouTube Videos</h4>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos?.map((video) => (
          <a
            key={video.id}
            href={video.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="group cursor-pointer block"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-2 shadow-md group-hover:shadow-xl transition-all bg-gray-100">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-4 h-4 text-purple-600 ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="px-0.5">
              <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors leading-snug">
                {video.title}
              </p>
              <div className="flex items-center gap-1.5">
                 <img src={video.profileImg} alt={video.name} className="w-4 h-4 rounded-full" />
                 <span className="text-xs text-gray-500 truncate">{video.name}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
