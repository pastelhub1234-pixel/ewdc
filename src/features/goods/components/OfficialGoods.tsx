import { ShoppingBag } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface GoodsItem {
  name: string;
  price: string;
  tag: string;
  img: string;
}

export function OfficialGoods() {
  const { data: goods, loading } = useJsonData<GoodsItem[]>('goods');

  if (loading) return <div>굿즈 목록 로딩 중...</div>;
  if (!goods) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/60">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-500" /> Official Store
        </h3>
        <button className="text-sm text-purple-500 font-medium hover:underline">
          Weverse Shop 바로가기 →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {goods.map((item, idx) => (
          <div key={idx} className="group bg-white p-3 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all">
            <div className="aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-4xl relative overflow-hidden">
              <span className="group-hover:scale-110 transition-transform duration-300">{item.img}</span>
              {item.tag && (
                <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold text-white rounded-md ${
                  item.tag === 'COLLAB' ? 'bg-green-500' : 
                  item.tag === 'NEW' ? 'bg-blue-500' : 
                  item.tag === 'SOLD OUT' ? 'bg-gray-400' : 'bg-red-400'
                }`}>
                  {item.tag}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
              <p className="text-sm font-bold text-purple-600">{item.price}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}