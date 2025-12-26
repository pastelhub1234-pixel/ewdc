import React, { useState, useEffect } from 'react';
import { CheckSquare, Link as LinkIcon } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

interface TodoData {
  id: string;
  task: string;
  url: string;
}

export function TodoList() {
  const { data: serverTodos, loading } = useJsonData<TodoData[]>('todo');
  
  // 로컬 상태로 체크 여부 관리 (id를 키로 사용)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) return <div>할 일 목록 로딩 중...</div>;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="w-5 h-5 text-purple-500" />
        <h3 className="text-gray-800">오늘의 할 일 (Daily)</h3>
      </div>

      <ul className="space-y-2">
        {serverTodos?.map((item) => {
          const isChecked = !!checkedItems[item.id];
          
          return (
            <li 
              key={item.id} 
              className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                isChecked ? 'bg-gray-50 opacity-60' : 'bg-white/80'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleCheck(item.id)}
                className="mt-1 w-4 h-4 text-purple-500 rounded border-gray-300 focus:ring-purple-400 cursor-pointer"
              />
              
              <div className="flex-1 min-w-0">
                <span className={`text-sm block ${isChecked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {item.task}
                </span>
                
                {item.url && (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-1 text-xs text-purple-500 hover:text-purple-700 hover:underline"
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>바로가기</span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      
      {(!serverTodos || serverTodos.length === 0) && (
        <p className="text-center text-sm text-gray-500 py-4">등록된 할 일이 없습니다.</p>
      )}
    </div>
  );
}