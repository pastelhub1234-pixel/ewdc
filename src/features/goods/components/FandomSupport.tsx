import { Sparkles } from "lucide-react";
import { useJsonData } from '../../../hooks/useJsonData';

interface CollabItem {
  brand: string;
  product: string;
  status: string;
  color: string;
}

export function FandomSupport() {
  const { data: collabs, loading } = useJsonData<CollabItem[]>('collabs');

  if (loading) return <div>콜라보 정보 로딩 중...</div>;
  if (!collabs) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800">콜라보 굿즈</h3>
      </div>

      <div className="space-y-3">
        {collabs.map((collab, idx) => (
          <div key={idx} className={`p-4 ${collab.color} rounded-xl`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-800 mb-1 font-bold">{collab.brand}</p>
                <p className="text-xs text-gray-600">{collab.product}</p>
              </div>
              <span className="px-3 py-1 bg-white text-purple-700 text-xs rounded-full shadow-sm font-medium">
                {collab.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}