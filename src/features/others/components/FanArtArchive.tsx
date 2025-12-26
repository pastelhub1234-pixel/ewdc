import { useState } from "react";
import { Image, ExternalLink } from "lucide-react";
import { useJsonData } from "../../../hooks/useJsonData";

interface FanArtItem {
  title: string;
  name: string;
  url: string;
}

export function FanArtArchive() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: fanArts, loading } = useJsonData<FanArtItem[]>('fanarts');

  if (loading) return <div>팬아트 로딩 중...</div>;
  if (!fanArts) return null;

  // 2개씩 페이지 분리
  const pages: FanArtItem[][] = fanArts.reduce(
    (acc: FanArtItem[][], item: FanArtItem, idx: number) => {
      const pageIndex = Math.floor(idx / 2);
      if (!acc[pageIndex]) acc[pageIndex] = [];
      acc[pageIndex].push(item);
      return acc;
    },
    []
  );

  const nextPage = () => {
    if (pages.length > 0) {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <Image className="w-6 h-6 text-purple-500" />
        <h2 className="font-bold text-xl">팬아트 갤러리</h2>
      </div>
      <p className="text-gray-600 text-sm">
        이미지를 눌러 다음 팬아트를 감상하세요
      </p>

      {/* 카드 페이지 영역 */}
      <div className="relative w-full max-w-3xl h-[400px] md:h-[520px] mx-auto overflow-hidden">
        {pages.map((page, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 grid grid-cols-2 gap-6 transition-all duration-500 ease-out
              ${
                idx === currentPage
                  ? "opacity-100 translate-x-0 z-10"
                  : "opacity-0 translate-x-8 z-0 pointer-events-none"
              }
            `}
          >
            {page.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className="relative flex flex-col h-full"
              >
                {/* 이미지: 클릭 시 다음 페이지 */}
                <div
                  onClick={nextPage}
                  // aspect-square 클래스를 추가하여 1:1 비율을 고정했습니다.
                  // flex-1은 제거하여 비율이 깨지지 않도록 했습니다.
                  className="cursor-pointer relative w-full aspect-square rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 bg-gray-100"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 정보 영역 */}
                <div className="mt-3 space-y-1">
                  <div className="font-semibold text-sm truncate">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Artist: {item.name}
                  </div>

                  {/* 원본 링크 */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-purple-600 hover:underline mt-1"
                  >
                    원본 보러가기
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
        {pages.length === 0 && <div className="text-center text-gray-400 mt-20">팬아트가 없습니다.</div>}
      </div>
    </div>
  );
}
