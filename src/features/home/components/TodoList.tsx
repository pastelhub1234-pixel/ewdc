import { useState, useEffect } from 'react';
import { CheckSquare, ExternalLink, Circle, CheckCircle2, MessageCircle, PlayCircle, Star, Heart } from 'lucide-react';
import { useJsonData } from '../../../hooks/useJsonData';

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

export function TodoDashboard() {
  // 데이터 구조를 객체 형태로 받아옵니다.
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
  
  // 진척도에 따른 블러 강도 계산
  const blurValue = Math.max(0, 20 - (progressPercent / 5));

  // 퀵 액션 아이콘 매핑 함수
  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-4 h-4" />;
      case 'play': return <PlayCircle className="w-4 h-4" />;
      case 'star': return <Star className="w-4 h-4" />;
      case 'heart': return <Heart className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  if (loading) return <div className="p-10 text-center">로딩 중...</div>;
  if (error || !serverData) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
      
      {/* [왼쪽 영역] 메인 할 일 리스트 (60%) */}
      <div className="lg:w-3/5 bg-white/70 backdrop-blur-md rounded-[32px] p-7 shadow-xl border border-purple-100/50 flex flex-col text-left">
        <div className="flex items-center justify-between mb-8 px-2 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 rounded-xl">
              <CheckSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">오늘의 미션</h4>
              <p className="text-xs text-gray-400 text-left">Daily Missions</p>
            </div>
          </div>
          <div className="bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
             <span className="text-sm font-bold text-purple-600">{completedCount} / {todos.length}</span>
          </div>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {todos.map((todo) => (
            <div
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                todo.completed 
                  ? 'bg-gray-50/50 border-gray-100 opacity-60' 
                  : 'bg-white border-transparent shadow-sm hover:shadow-md hover:border-purple-200'
              }`}
            >
              <div className="shrink-0 transition-transform group-active:scale-90">
                {todo.completed ? (
                  <CheckCircle2 className="w-7 h-7 text-purple-500 animate-in zoom-in" />
                ) : (
                  <Circle className="w-7 h-7 text-purple-200 group-hover:text-purple-300" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-base font-semibold transition-all ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                }`}>
                  {todo.task}
                </p>
              </div>

              {todo.url && (
                <a 
                  href={todo.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={(e) => e.stopPropagation()} 
                  className="p-3 bg-gray-50 text-gray-400 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all border border-transparent hover:border-purple-100"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* [오른쪽 영역] 진척도 & 보상 & 퀵 버튼 (40%) */}
      <div className="lg:w-2/5 flex flex-col gap-6 font-sans">
        
        {/* 1. 진척도 도넛 차트 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-purple-100/50 shadow-lg flex flex-col items-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 text-left">
              <circle cx="72" cy="72" r="64" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
              <circle 
                cx="72" cy="72" r="64" stroke="url(#purpleGradient)" strokeWidth="12" fill="transparent" 
                strokeDasharray={402} 
                strokeDashoffset={402 - (402 * progressPercent) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-gray-800">{progressPercent}%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Done</span>
            </div>
          </div>
        </div>

        {/* 2. 보상 이미지 (JSON 데이터 기반) */}
        <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-purple-100/50 shadow-lg bg-gray-100 group">
          <img 
            src={serverData.rewardImage.url} 
            alt="Reward"
            style={{ filter: `blur(${blurValue}px)` }}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
            <p className="text-white font-bold text-lg drop-shadow-md">
              {progressPercent === 100 ? serverData.rewardImage.unlockedMessage : "🔒 미션을 완료하여 해제하세요"}
            </p>
            <p className="text-white/70 text-xs mt-1">{serverData.rewardImage.caption}</p>
          </div>
        </div>

        {/* 3. 퀵 액션 버튼 리스트 (JSON 데이터 기반) */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-400 ml-3 mb-1 uppercase tracking-wider text-left">Extra Activities</p>
          <div className="grid grid-cols-1 gap-2.5">
            {serverData.quickActions.map((btn) => (
              <a 
                key={btn.id}
                href={btn.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm border border-gray-100 rounded-[20px] transition-all group hover:bg-purple-50"
              >
                <div className="p-2.5 rounded-xl bg-white shadow-sm transition-colors text-purple-500">
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
