import { CreditCard } from "lucide-react";
import { useJsonData } from '../../../hooks/useJsonData';

interface MembershipItem {
  platform: string;
  priceDesc: string;
  desc: string;
  bgColor: string;
  btnColor: string;
}

export function MembershipCalculator() {
  const { data: memberships, loading } = useJsonData<MembershipItem[]>('memberships');

  if (loading) return <div>멤버십 정보 로딩 중...</div>;
  if (!memberships) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800">멤버십 · 구독</h3>
      </div>

      <div className="space-y-3">
        {memberships.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-xl ${item.bgColor}`}>
            <p className="text-sm text-gray-800 mb-2">{item.platform}</p>
            <p className="text-xs text-gray-600 mb-3">
              {item.priceDesc} · {item.desc}
            </p>
            <button className={`w-full py-2 text-white rounded-lg transition-all shadow-sm ${item.btnColor}`}>
              가입하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}