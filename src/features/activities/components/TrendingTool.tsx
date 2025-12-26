import React from 'react';
import { Wand2, Copy } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface TrendData {
  title: string;
  hashtags: string[];
  keywords: string[];
  baseword: string;
  time: string;
}

export function TrendingTool() {
  const { data: trend, loading, error } = useJsonData<TrendData>('trend');

  if (loading) return <div>데이터 로딩 중...</div>;
  if (error) return null;

  // 복사할 전체 텍스트 생성
  const fullText = `${trend?.baseword}\n\n${trend?.hashtags.join(' ')}\n${trend?.keywords.join(' ')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    alert('총공 문구가 복사되었습니다!');
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800">실트 총공 도구</h3>
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-bold text-gray-800">{trend?.title}</p>
            <span className="text-xs text-purple-500 bg-white px-2 py-1 rounded-full shadow-sm">
              {new Date(trend?.time || '').toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 기준
            </span>
          </div>
          
          <div className="p-3 bg-white rounded-lg mb-3 border border-purple-100/50">
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {fullText}
            </p>
          </div>
          
          <button 
            onClick={handleCopy}
            className="w-full py-2 flex items-center justify-center gap-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
          >
            <Copy className="w-4 h-4" />
            <span>문구 전체 복사하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}