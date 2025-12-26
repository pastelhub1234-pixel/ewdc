# 프로젝트 구조 가이드

## 📁 폴더 구조

```
/
├── types/               # TypeScript 타입 정의
│   └── index.ts        # 전역 타입 정의
│
├── hooks/              # 커스텀 훅 및 데이터 (Firebase로 교체 예정)
│   ├── useChat.ts           # 채팅 데이터 훅
│   ├── useBroadcast.ts      # 방송 데이터 훅
│   ├── useYoutube.ts        # YouTube 데이터 훅
│   ├── mockChatData.ts      # Mock 채팅 데이터
│   ├── mockBroadcastData.ts # Mock 방송 데이터
│   ├── mockYoutubeData.ts   # Mock YouTube 데이터
│   ├── guideData.ts         # 가이드 콘텐츠 데이터
│   ├── karaokeSongs.ts      # 노래방 번호 데이터
│   ├── fanGames.ts          # 팬게임 데이터
│   └── FanArtArchiveData.ts # 팬아트 데이터
│
├── features/           # 기능별 모듈 ✅ 정리 완료
│   ├── home/          # 홈 페이지
│   │   ├── HomePage.tsx
│   │   └── components/
│   │       ├── BannerCarousel.tsx
│   │       ├── LatestVideos.tsx
│   │       ├── LiveStatusPanel.tsx
│   │       ├── OfficialLinks.tsx
│   │       ├── QuickAccessButtons.tsx
│   │       ├── RecentTweets.tsx
│   │       ├── TodaySchedule.tsx
│   │       └── TodoList.tsx
│   │
│   ├── news/          # 뉴스 페이지
│   │   ├── NewsPage.tsx
│   │   ├── NewsRoutes.tsx
│   │   └── components/
│   │       ├── AllTweets.tsx
│   │       ├── AllSchedule.tsx
│   │       ├── BroadcastStatus.tsx
│   │       ├── LatestVideos.tsx
│   │       ├── RecentSongs.tsx
│   │       ├── FanCafeNotice.tsx
│   │       ├── ChatRoomList.tsx
│   │       ├── ChatConversation.tsx
│   │       └── MessageBubble.tsx
│   │
│   ├── activities/    # 활동 페이지
│   │   ├── ActivitiesPage.tsx
│   │   ├── ActivitiesRoutes.tsx
│   │   └── components/
│   │       ├── EventLinks.tsx
│   │       ├── MusicStreaming.tsx
│   │       ├── TodoList.tsx
│   │       ├── TrendingTool.tsx
│   │       ├── VotingAndHype.tsx
│   │       └── YoutubeFixTool.tsx
│   │
│   ├── goods/         # 굿즈 페이지
│   │   ├── GoodsPage.tsx
│   │   ├── GoodsRoutes.tsx
│   │   └── components/
│   │       ├── TicketingInfo.tsx
│   │       ├── AlbumList.tsx
│   │       ├── OfficialGoods.tsx
│   │       ├── PersonalGoods.tsx
│   │       ├── CollabGoods.tsx
│   │       └── MembershipInfo.tsx
│   │
│   ├── guide/         # 가이드 페이지
│   │   ├── GuidePage.tsx
│   │   ├── GuideRoutes.tsx
│   │   └── components/
│   │       └── WikiGuideSection.tsx
│   │
│   └── others/        # 기타 페이지
│       ├── OthersPage.tsx
│       ├── OthersRoutes.tsx
│       └── components/
│           ├── DailyFortune.tsx
│           ├── FanArtArchive.tsx
│           ├── FanGameDetail.tsx
│           ├── FanGameList.tsx
│           ├── FanGames.tsx
│           ├── FandomStats.tsx
│           ├── KaraokeNumberSearch.tsx
│           └── KirinukiRanking.tsx
│
├── components/         # 공통 컴포넌트
│   ├── TopNavigation.tsx  # 최상단 네비게이션
│   ├── ui/            # UI 라이브러리 컴포넌트 (shadcn/ui)
│   └── figma/         # Figma 관련 컴포넌트
│       └── ImageWithFallback.tsx
│
├── styles/
│   └── globals.css     # 전역 스타일
│
└── App.tsx            # 메인 앱 컴포넌트 (라우팅 설정)
```

## 🏗️ 아키텍처 원칙

### 1. Feature-Based 구조
각 페이지(기능)는 독립적인 폴더로 관리되며, 해당 기능에 필요한 모든 것을 포함합니다:
- 페이지 컴포넌트 (`*Page.tsx`)
- 라우팅 설정 (`*Routes.tsx`)
- 하위 컴포넌트 (`components/`)

### 2. 데이터와 UI 분리
- **UI 컴포넌트**: `/features/[기능]/components/`
- **데이터 소스**: `/hooks/`
- **타입 정의**: `/types/`

이 구조를 통해 나중에 데이터 소스를 Mock에서 Firebase로 쉽게 교체할 수 있습니다.

### 3. Route 분리
각 features는 자체 라우팅을 관리합니다:
- `*Page.tsx`: 레이아웃과 탭 UI
- `*Routes.tsx`: 라우팅 로직과 데이터 주입

## 🔄 Firebase 마이그레이션 준비

현재 프로젝트는 **Mock 데이터**를 사용하고 있으며, 나중에 Firebase로 쉽게 교체할 수 있도록 설계되었습니다.

### 데이터 흐름

```
UI Component → Custom Hook → Data Source (Mock/Firebase)
```

### Firebase로 교체하는 방법

1. **Firebase 설정**
   ```bash
   npm install firebase
   ```

2. **Hook 파일만 수정**
   - `/hooks/useChat.ts`
   - `/hooks/useBroadcast.ts`
   - `/hooks/useYoutube.ts`
   
   각 파일의 `TODO:` 주석 부분을 Firebase 코드로 교체

3. **UI 컴포넌트는 수정 불필요**
   - Hook의 인터페이스가 동일하므로 UI는 그대로 유지

### 예시: useChat.ts Firebase 변환

```typescript
// Before (Mock)
useEffect(() => {
  setChatRooms(mockChatRooms);
  setLoading(false);
}, []);

// After (Firebase)
useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, 'chatRooms'),
    (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChatRooms(rooms);
      setLoading(false);
    }
  );
  return () => unsubscribe();
}, []);
```

## 📦 주요 데이터 타입

### ChatRoom
```typescript
interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  icon: string;
}
```

### BroadcastGroup
```typescript
interface BroadcastGroup {
  id: string;
  title: string;
  color: string;
  items: BroadcastItem[];
}
```

### YoutubeVideo
```typescript
interface YoutubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelProfile: string;
  videoUrl: string;
  channelUrl: string;
  uploadedAt: string;
  type?: "video" | "shorts";
}
```

## 🚀 다음 단계

1. ✅ **구조 정리 완료**
   - 모든 페이지를 `/features/[기능명]/`로 이동 완료
   - Page와 Routes 분리 완료
   - 데이터와 UI 분리 완료

2. **최적화**
   - 코드 스플리팅 적용 (React.lazy)
   - 성능 최적화 (React.memo, useMemo, useCallback)
   - 번들 사이즈 최적화

3. **Firebase 연동**
   - Firebase 프로젝트 생성
   - `/hooks/` 파일들 업데이트
   - 실시간 데이터 동기화 구현

4. **상태 관리**
   - 필요시 Zustand 또는 Context API 추가
   - 전역 상태 관리 구조 설계

## 📋 Features 현황

### ✅ features/home/
홈 페이지 - 대시보드 UI
- BannerCarousel, LiveStatusPanel
- LatestVideos, RecentTweets
- TodaySchedule, TodoList
- OfficialLinks, QuickAccessButtons

### ✅ features/news/
뉴스/소식 페이지 - 8개 탭
- AllTweets, AllSchedule, BroadcastStatus
- LatestVideos, RecentSongs, FanCafeNotice
- ChatRoomList, ChatConversation

### ✅ features/activities/
활동 페이지 - 6개 탭
- EventLinks, MusicStreaming
- TodoList, TrendingTool
- VotingAndHype, YoutubeFixTool

### ✅ features/goods/
굿즈 페이지 - 6개 탭
- TicketingInfo, AlbumList
- OfficialGoods, PersonalGoods
- CollabGoods, MembershipInfo

### ✅ features/guide/
가이드 페이지 - 7개 탭
- WikiGuideSection (재사용 컴포넌트)
- 데이터 주입 방식으로 다양한 가이드 표시

### ✅ features/others/
기타 페이지 - 6개 탭
- FanArtArchive, KaraokeNumberSearch
- FanGames, FandomStats
- KirinukiRanking, DailyFortune
