// features/activities/ActivitiesRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ActivitiesPage } from "./ActivitiesPage";

import { TodoList } from "./components/TodoList";
import { VotingAndHype } from "./components/VotingAndHype";
import { EventLinks } from "./components/EventLinks";
import { TrendingTool } from "./components/TrendingTool";
import { MusicStreaming } from "./components/MusicStreaming";
import { YoutubeFixTool } from "./components/YoutubeFixTool";

export function ActivitiesRoutes() {
  return (
    <Routes>
      <Route element={<ActivitiesPage />}>
        {/* /activities 접속 시 할 일 목록 탭으로 리다이렉트 */}
        <Route index element={<Navigate to="todo" replace />} />
        
        <Route path="todo" element={<TodoList />} />
        <Route path="voting" element={<VotingAndHype />} />
        <Route path="events" element={<EventLinks />} />
        <Route path="trending" element={<TrendingTool />} />
        <Route path="streaming" element={<MusicStreaming />} />
        <Route path="youtube-fix" element={<YoutubeFixTool />} />
      </Route>
    </Routes>
  );
}
