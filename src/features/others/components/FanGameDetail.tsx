import { useParams, useNavigate } from 'react-router-dom';
import { useJsonData } from '../../../hooks/useJsonData';

interface FanGame {
  id: string;
  title: string;
  creator: string;
  shortDesc: string;
  fullDesc: string;
  thumbnailUrl: string;
  gifUrl: string;
  imageUrls: string[];
  downloadUrl: string;
  time: string;
}

export function FanGameDetail() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  // 상세 정보도 전체 리스트에서 id로 검색 (또는 API 구조에 따라 개별 호출로 변경 가능)
  const { data: fanGames, loading } = useJsonData<FanGame[]>('fangames');

  if (loading) return <div>로딩 중...</div>;

  const game = fanGames?.find((g) => String(g.id) === gameId);

  if (!game) {
    return <div className="p-6">게임을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 플레이 GIF 또는 썸네일 */}
        <div className="aspect-video bg-black">
          <img
            src={game.gifUrl || game.thumbnailUrl}
            alt={`${game.title} 플레이 화면`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{game.title}</h2>
            <p className="text-sm text-gray-500 mt-1">제작: {game.creator}</p>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {game.fullDesc}
          </p>

          {/* 추가 스크린샷 */}
          {game.imageUrls && game.imageUrls.length > 0 && (
             <div className="grid grid-cols-3 gap-2 mt-4">
                {game.imageUrls.map((url, idx) => (
                   <img key={idx} src={url} alt={`Screenshot ${idx}`} className="rounded-lg border object-cover h-24 w-full" />
                ))}
             </div>
          )}

          <div className="flex gap-3 pt-4">
            <a
              href={game.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
            >
              다운로드 / 플레이
            </a>

            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              목록으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}