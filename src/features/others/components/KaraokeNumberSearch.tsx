import { useState } from "react";
import { Music } from "lucide-react";
import { useJsonData } from "../../../hooks/useJsonData";

interface KaraokeSong {
  title: string;
  name: string;
  type: "ky" | "tj";
  solo: boolean;
  Img: string;
  url: string;
}

type KaraokeBrand = "TJ" | "KY";
type SongType = "group" | "solo";

export function KaraokeNumberSearch() {
  const [brand, setBrand] = useState<KaraokeBrand>("TJ");
  const [songType, setSongType] = useState<SongType | null>(null);
  
  const { data: songs, loading } = useJsonData<KaraokeSong[]>('karaoke');

  if (loading) return <div>노래방 데이터 로딩 중...</div>;

  const filteredSongs = songs?.filter((song) => {
    // 1. 브랜드 필터 (JSON의 type이 소문자 ky, tj로 되어있다고 가정)
    if (song.type.toLowerCase() !== brand.toLowerCase()) return false;
    
    // 2. 곡 타입 필터 (선택된 경우만)
    if (songType === 'solo' && !song.solo) return false;
    if (songType === 'group' && song.solo) return false;
    
    return true;
  }) || [];

  return (
    <section className="p-6 bg-white rounded-xl shadow space-y-6">
      {/* 헤더 */}
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">노래방 번호 찾기</h2>
        </div>
        <p className="text-sm text-gray-600">
          오리지널 곡 기준 · 선택한 노래방에서 바로 검색
        </p>
      </header>

      {/* 노래방 선택 버튼 */}
      <div className="flex gap-2">
        {(["TJ", "KY"] as KaraokeBrand[]).map((b) => (
          <button
            key={b}
            onClick={() => setBrand(b)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                brand === b
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {b} 노래방
          </button>
        ))}
      </div>

      {/* 곡 타입 토글 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => setSongType(songType === "group" ? null : "group")}
          className={`px-4 py-2 rounded-full text-sm transition
            ${
              songType === "group"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          단체곡
        </button>
        <button
          onClick={() => setSongType(songType === "solo" ? null : "solo")}
          className={`px-4 py-2 rounded-full text-sm transition
            ${
              songType === "solo"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          개인곡
        </button>
      </div>

      {/* 곡 리스트 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredSongs.map((song, idx) => (
          <a
            key={idx}
            href={song.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* 이미지 */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={song.Img}
                alt={song.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* 정보 */}
            <div className="p-3 bg-white">
              <div className="font-semibold truncate">{song.title}</div>
              <div className="text-sm text-gray-500">
                  {song.name}
              </div>
              <div className="text-xs text-purple-500 mt-1">
                {brand}에서 확인하기 →
              </div>
            </div>
          </a>
        ))}
        {filteredSongs.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-4">
            해당하는 곡이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}