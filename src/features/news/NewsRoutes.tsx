// features/news/NewsRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { NewsPage } from "./NewsPage";

import { AllSchedule } from "./components/AllSchedule";
import { BroadcastStatus } from "./components/BroadcastStatus";
import { FanCafeNotice } from "./components/FanCafeNotice";
import { AllTweets } from "./components/AllTweets";
import { LatestVideos } from "./components/LatestVideos";
import { RecentSongs } from "./components/RecentSongs";

export function NewsRoutes() {
  return (
    <Routes>
      <Route element={<NewsPage />}>
        {/* /news 접속 시 일정 탭으로 리다이렉트 */}
        <Route index element={<Navigate to="schedule" replace />} />
        
        <Route path="schedule" element={<AllSchedule />} />
        <Route path="broadcast" element={<BroadcastStatus />} />
        <Route path="cafe" element={<FanCafeNotice />} />
        <Route path="twitter" element={<AllTweets />} />
        <Route path="videos" element={<LatestVideos />} />
        <Route path="songs" element={<RecentSongs />} />
      </Route>
    </Routes>
  );
}
