import { Music } from "lucide-react";
import { useJsonData } from '../../../hooks/useJsonData';

interface SongItem {
  id: string;
  title: string;
  thumbnailUrl: string; // JSON: thumbnailUrl
  profileImg: string;   // JSON: profileImg
  videoUrl: string;     // JSON: videoUrl
  name: string;         // JSON: name (아티스트)
  time: string;         // JSON: time (ISO Date String)
}

export function RecentSongs() {
  const { data: songs, loading } = useJsonData<SongItem[]>('youtube_music');

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-4 h-4 text-purple-500" />
        <h4 className="text-gray-800 font-medium">Recent Songs</h4>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-8">로딩 중...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {songs && songs.map((song) => (
            <div key={song.id} className="space-y-2 group">
              {/* 썸네일 */}
              <a
                href={song.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video rounded-xl overflow-hidden bg-gray-100 relative shadow-sm group-hover:shadow-md transition-all"
              >
                <img
                  src={song.thumbnailUrl}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              </a>

              {/* 정보 */}
              <div className="min-w-0">
                <a
                  href={song.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-800 line-clamp-2 hover:text-purple-600 font-medium leading-snug"
                >
                  {song.title}
                </a>
                <div className="flex items-center gap-1 mt-1">
                   {/* 날짜 표시 (ISO 날짜에서 YYYY-MM-DD 추출) */}
                   <p className="text-xs text-gray-500">
                     {song.time.split('T')[0]}
                   </p>
                </div>
              </div>
            </div>
          ))}
          {(!songs || songs.length === 0) && (
             <div className="col-span-4 text-center text-gray-400 text-sm">노래가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
