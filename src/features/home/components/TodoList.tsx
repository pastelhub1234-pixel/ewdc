import { useState, useEffect } from 'react'; 
import { CheckSquare, ExternalLink } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

// 1. JSON 데이터 전체 구조에 맞는 인터페이스 정의
interface TodoData {
  dailyMissions: TodoItem[];
  rewardImage?: any; // 이 컴포넌트에서 안 쓰더라도 타입 에러 방지용
  quickActions?: any;
}

interface TodoItem {
  id: string;
  task: string;
  url?: string;
}

interface LocalTodo extends TodoItem {
  completed: boolean;
}

export function TodoList() {
  // 2. useJsonData 제네릭을 배열(TodoItem[])에서 객체(TodoData)로 변경
  const { data: serverData } = useJsonData<TodoData>('todo');
  const [todos, setTodos] = useState<LocalTodo[]>([]);

  // 3. 서버 데이터가 로드되면 'dailyMissions' 배열을 찾아 로컬 상태 초기화
  useEffect(() => {
    // serverData가 존재하고, 그 안에 dailyMissions가 있을 때만 실행
    if (serverData && serverData.dailyMissions) {
      setTodos(serverData.dailyMissions.map((t) => ({ ...t, completed: false })));
    }
  }, [serverData]);

  // 토글 기능
  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50 h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-purple-500" />
          <h4 className="text-gray-800">TODO List</h4>
        </div>
        <span className="px-2.5 py-0.5 bg-gradient-to-r from-pink-200 to-peach-200 text-gray-700 rounded-full text-xs">
          {completedCount}/{todos.length}
        </span>
      </div>

      {/* 리스트 영역 */}
      <div className="space-y-2 mb-3 flex-1 overflow-y-auto custom-scrollbar">
        {todos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => toggleTodo(todo.id)} // ⭐️ 클릭 시 토글 (영역 전체)
            className="flex items-center gap-3 p-3 bg-white/80 rounded-lg hover:bg-white transition-all border border-purple-100/30 cursor-pointer group active:scale-[0.99]"
          >
            {/* 체크박스 (클릭 이벤트는 부모가 처리하므로 pointer-events-none 적용) */}
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="w-4 h-4 rounded-md border-2 border-purple-300 text-purple-500 focus:ring-0 pointer-events-none"
            />

            {/* 텍스트 */}
            <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
              <span
                className={`text-sm truncate transition-colors ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {todo.task}
              </span>

              {/* 링크 아이콘 (링크 클릭 시 토글 방지 stopPropagation) */}
              {todo.url && (
                <a
                  href={todo.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-purple-500 p-1 rounded-md hover:bg-purple-50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}

        {(!todos || todos.length === 0) && (
          <p className="text-center text-gray-400 text-sm py-10">할 일이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
