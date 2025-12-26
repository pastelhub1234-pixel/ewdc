import { Wrench } from "lucide-react";

export function YoutubeFixTool() {
  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-2">
      <div className="flex items-center gap-2">
        <Wrench className="w-5 h-5 text-red-500" />
        <h2 className="font-bold text-lg">YouTube Fix Tool</h2>
      </div>
      <p className="text-gray-600 text-sm">유튜브 영상 문제 해결 도구</p>
    </div>
  );
}