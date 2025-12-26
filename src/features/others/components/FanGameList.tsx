import { useNavigate } from 'react-router-dom';
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

export function FanGameList() {
  const navigate = useNavigate();
  const { data: fanGames, loading, error } = useJsonData<FanGame[]>('fangames');

  if (loading) return <div>게임 목록 로딩 중...</div>;
  if (error) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <section className="p-6 bg-white rounded-xl shadow space-y-6">
      <header>
        <h2 className="text-xl font-bold">팬게임</h2>
        <p className="text-sm text-gray-600">
          팬이 제작한 비공식 게임 모음
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {fanGames?.map((game) => (
          <button
            key={game.id}
            onClick={() => navigate(`/others/games/${game.id}`)}
            className="text-left rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition"
          >
            <div className="aspect-square bg-gray-100">
              <img
                src={game.thumbnailUrl}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3">
              <div className="font-semibold truncate">
                {game.title}
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                {game.shortDesc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}