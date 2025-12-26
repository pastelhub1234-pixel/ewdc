import { Wrench, ExternalLink } from "lucide-react";

export function YoutubeFixTool() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-100/50">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="w-5 h-5 text-red-500" />
        <h2 className="font-bold text-gray-800 text-lg">YouTube Fix Tool</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 왼쪽: 이미지 설명 영역 */}
        <div className="lg:w-2/3">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-100 bg-gray-50 group">
            <img 
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80" 
              alt="YouTube Fix Guide" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* 이미지 위 설명 라벨 */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white text-sm font-medium">유튜브 영상 재생 및 프리미엄 기능 복구 가이드</p>
            </div>
          </div>
        </div>

        {/* 오른쪽: 버튼 영역 */}
        <div className="lg:w-1/3 flex flex-col justify-center gap-3">
          <div className="space-y-1 mb-2 text-center lg:text-left">
            <p className="text-sm font-bold text-gray-700">문제가 발생했나요?</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              영상이 멈추거나 광고 제거 기능에 오류가 있을 때 아래 도구를 사용하세요.
            </p>
          </div>
          
          <a
            href="https://github.com/YTSolver/Fix" // 실제 도구 링크로 수정
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-4 px-6 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-md shadow-red-100 transition-all active:scale-95"
          >
            Fix Tool 바로가기
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
