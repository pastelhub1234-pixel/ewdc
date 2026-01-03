import { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  ExternalLink, 
  MessageCircle, 
  PlayCircle, 
  Star, 
  Heart 
} from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

// 1. 데이터 타입 정의
interface TodoItem {
  id: string;
  task: string;
  url?: string;
}

interface QuickAction {
  id: string;
  label: string;
  url: string;
  type: 'message' | 'play' | 'star' | 'heart';
}

interface TodoData {
  dailyMissions: TodoItem[];
  rewardImage: {
    url: string;
    caption: string;
    unlockedMessage: string;
  };
  quickActions: QuickAction[];
}

interface LocalTodo extends TodoItem {
  completed: boolean;
}

export function TodoList() {
  const { data: serverData, loading, error } = useJsonData<TodoData>('todo');
  const [todos, setTodos] = useState<LocalTodo[]>([]);

  useEffect(() => {
    if (serverData?.dailyMissions) {
      setTodos(serverData.dailyMissions.map(t => ({ ...t, completed: false })));
    }
  }, [serverData]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;
  
  const blurValue = Math.max(0, 20 - (progressPercent / 5));

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-4 h-4" />;
      case 'play': return <PlayCircle className="w-4 h-4" />;
      case 'star': return <Star className="w-4 h-4" />;
      case 'heart': return <Heart className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">로딩 중...</div>;
  if (error || !serverData) return <div className="p-10 text-center text-red-400">데이터를 불러올 수 없습니다.</div>;

  return (
    // [수정 완료] 
    // flex-col 제거, sm: 조건 제거 -> 무조건 flex-row (가로 배치)
    <div className="flex flex-row gap-4 h-full w-full min-h-[300px]">
      
      {/* [왼쪽 영역] TODO 리스트 */}
      {/* w-[60%] 고정: 화면이 작아도 무조건 60% 차지 */}
      <div className="w-[60%] bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100/50 flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-purple-500 shrink-0" />
            <h4 className="text-gray-800 font-bold text-base md:text-lg whitespace-nowrap">TODO</h4>
          </div>
          <span className="px-2 py-0.5 bg-gradient-to-r from-pink-200 to-peach-200 text-gray-700 rounded-full text-[10px] md:text-xs font-bold shrink-0">
            {completedCount}/{todos.length}
          </span>
        </div>

        {/* 리스트 아이템 */}
        <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-0">
          {todos.map((todo) => (
            <div
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className="flex items-center gap-2 p-2 bg-white/80 rounded-lg hover:bg-white transition-all border border-purple-100/30 cursor-pointer group active:scale-[0.99]"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="w-3.5 h-3.5 rounded md:rounded-md border-2 border-purple-300 text-purple-500 focus:ring-0 pointer-events-none shrink-0"
              />
              
              <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                <span className={`text-xs md:text-sm truncate transition-colors ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}>
                  {todo.task}
                </span>

                {todo.url && (
                  <a 
                    href={todo.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={(e) => e.stopPropagation()} 
                    className="text-gray-400 hover:text-purple-500 p-1 rounded-md hover:bg-purple-50 transition-colors shrink-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
           {(!todos || todos.length === 0) && (
            <p className="text-center text-gray-400 text-xs py-10">할 일이 없습니다.</p>
          )}
        </div>
      </div>

      {/* [오른쪽 영역] 진척도 & 보상 */}
      {/* w-[40%] 고정: 화면이 작아도 무조건 40% 차지 */}
      <div className="w-[40%] flex flex-col gap-3 min-w-0">
        
        {/* 1. 진척도 바 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-100/50 shadow-lg flex flex-col justify-center shrink-0">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">{progressPercent}%</span>
            <span className="text-[9px] md:text-[10px] font-bold text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
               Progress
            </span>
          </div>
          <div className="w-full h-2 md:h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2. 보상 이미지 (남는 공간 채우기) */}
        <div className="relative flex-1 rounded-2xl overflow-hidden border border-purple-100/50 shadow-lg bg-gray-100 group min-h-[100px]">
          <img 
            src={serverData.rewardImage.url} 
            alt="Reward"
            style={{ filter: `blur(${blurValue}px)` }}
            className="w-full h-full object-cover transition-all duration-700 absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-left">
            <p className="text-white font-bold text-sm md:text-base drop-shadow-md truncate">
              {progressPercent === 100 ? serverData.rewardImage.unlockedMessage : "🔒 완료 시 공개"}
            </p>
            <p className="text-white/70 text-[9px] md:text-[10px] mt-0.5 truncate">{serverData.rewardImage.caption}</p>
          </div>
        </div>

        {/* 3. 퀵 액션 (2열 그리드) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 shrink-0">
          {serverData.quickActions.map((btn) => (
            <a 
              key={btn.id}
              href={btn.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 bg-white/60 backdrop-blur-sm border border-gray-100 rounded-xl transition-all hover:bg-purple-50 hover:border-purple-200"
              title={btn.label}
            >
              <div className="text-purple-500 shrink-0">
                {getIcon(btn.type)}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-600 truncate">
                {btn.label}
              </span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
