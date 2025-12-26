import { Routes, Route, Navigate } from "react-router-dom";
import { OthersPage } from "./OthersPage";

import { FanArtArchive } from "./components/FanArtArchive";
import { KaraokeNumberSearch } from "./components/KaraokeNumberSearch";
import { FanGames } from "./components/FanGames";
import { FandomStats } from "./components/FandomStats";
import { KirinukiRanking } from "./components/KirinukiRanking";
import { DailyFortune } from "./components/DailyFortune";

export function OthersRoutes() {
  return (
    <Routes>
      <Route element={<OthersPage />}>
        {/* /others 접속 시 팬아트 탭으로 리다이렉트 */}
        <Route index element={<Navigate to="fanArt" replace />} />
        
        <Route path="fanArt" element={<FanArtArchive />} />
        <Route path="karaoke" element={<KaraokeNumberSearch />} />
        <Route path="games/*" element={<FanGames />} />
        <Route path="stats" element={<FandomStats />} />
        <Route path="kirinuki" element={<KirinukiRanking />} />
        <Route path="fortune" element={<DailyFortune />} />
      </Route>
    </Routes>
  );
}
