import { Disc } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface AlbumItem {
  id: string;
  title: string;
  type: string;
  year: string;
  colorClass: string;
}

export function AlbumList() {
  const { data: albums, loading } = useJsonData<AlbumItem[]>('albums');

  if (loading) return <div>앨범 목록 로딩 중...</div>;
  if (!albums) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album) => (
          <div key={album.id} className="group cursor-pointer">
            <div className={`aspect-square rounded-2xl shadow-md mb-3 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 ${album.colorClass}`}>
              <Disc className="w-16 h-16 text-white/50 animate-[spin_10s_linear_infinite]" />
            </div>
            <div className="px-1">
              <h4 className="font-bold text-gray-800 truncate">{album.title}</h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">{album.type}</span>
                <span className="text-xs text-gray-400">{album.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}