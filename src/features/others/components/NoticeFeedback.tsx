import { Image } from "lucide-react";

export function NoticeFeedback() {
  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-2">
      <div className="flex items-center gap-2">
        <Image className="w-5 h-5 text-purple-500" />
        <h2 className="font-bold text-lg">팬아트 갤러리</h2>
      </div>
      <p className="text-gray-600 text-sm">최신 팬아트 모아보기</p>
    </div>
  );
}
