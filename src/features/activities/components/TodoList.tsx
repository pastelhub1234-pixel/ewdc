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
  // 2. 전체 데이터 가져오기
  const { data: serverData, loading, error } = useJsonData<TodoData>('todo');
  const [todos, setTodos] = useState<LocalTodo[]>([]);

  // 3. 데이터 로드 및 초기화
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
  
  // 블러 강도 계산
  const blurValue = Math.max(0, 20 - (progressPercent / 5));

  // 퀵 액션 아이콘 매핑
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
    // 레이아웃 수정: lg:flex-row -> md:flex-row (화면이 조금만 넓어도 가로 배치)
    // gap-6 -> gap-4 md:gap-6 (작은 화면에서 간격 조정)
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full min-h-[500px]">
      
      {/* [왼쪽 영역] 리스트 */}
      {/* lg:w-3/5 -> md:w-3/5 (비율 유지하되 기준점 낮춤) */}
      <div className="md:w-3/5 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50 flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-purple-500" />
            <h4 className="text-gray-800 font-bold text-lg">TODO List</h4>
          </div>
          <span className="px-3 py-1 bg-gradient-to-r from-pink-200 to-peach-200 text-gray-700 rounded-full text-xs font-bold">
            {completedCount}/{todos.length}
          </span>
        </div>

        {/* 리스트 아이템 */}
        <div className="space-y-2 mb-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className="flex items-center gap-3 p-3 bg-white/80 rounded-lg hover:bg-white transition-all border border-purple-100/30 cursor-pointer group active:scale-[0.99]"
            >
              {/* 심플 체크박스 */}
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="w-4 h-4 rounded-md border-2 border-purple-300 text-purple-500 focus:ring-0 pointer-events-none"
              />
              
              {/* 텍스트 */}
              <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                <span className={`text-sm truncate transition-colors ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}>
                  {todo.task}
                </span>

                {/* 링크 아이콘 */}
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

      {/* [오른쪽 영역] 진척도 & 보상 & 퀵 버튼 */}
      {/* lg:w-2/5 -> md:w-2/5 (비율 유지하되 기준점 낮춤) */}
      <div className="md:w-2/5 flex flex-col gap-6 font-sans">
        
        {/* 1. 직선형 진척도 바 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100/50 shadow-lg flex flex-col justify-center">
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-3xl font-black text-gray-800 tracking-tight">{progressPercent}%</span>
              <span className="text-xs font-bold text-gray-400 ml-1">Completed</span>
            </div>
            <div className="text-right">
               <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-2 py-1 rounded-full uppercase tracking-wider">
                 Daily Progress
               </span>
            </div>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2. 보상 이미지 */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-purple-100/50 shadow-lg bg-gray-100 group">
          <img 
            src={serverData.rewardImage.url} 
            alt="Reward"
            style={{ filter: `blur(${blurValue}px)` }}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5 text-left">
            <p className="text-white font-bold text-lg drop-shadow-md">
              {progressPercent === 100 ? serverData.rewardImage.unlockedMessage : "🔒 미션을 완료하세요"}
            </p>
            <p className="text-white/70 text-xs mt-1">{serverData.rewardImage.caption}</p>
          </div>
        </div>

        {/* 3. 퀵 액션 버튼 */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-400 ml-2 mb-1 uppercase tracking-wider text-left">Extra Activities</p>
          <div className="grid grid-cols-1 gap-2">
            {serverData.quickActions.map((btn) => (
              <a 
                key={btn.id}
                href={btn.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm border border-gray-100 rounded-xl transition-all group hover:bg-purple-50"
              >
                <div className="p-2 rounded-lg bg-white shadow-sm transition-colors text-purple-500">
                  {getIcon(btn.type)}
                </div>
                <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors">
                  {btn.label}
                </span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto text-gray-300 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
