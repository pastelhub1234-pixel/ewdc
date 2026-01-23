import { Routes, Route, Navigate } from "react-router-dom";
import { OthersPage } from "./OthersPage";

import { FanArtArchive } from "./components/FanArtArchive"; 
import { KaraokeNumberSearch } from "./components/KaraokeNumberSearch";
import { FanGames } from "./components/FanGames";
import { GoodsTrade } from "./components/GoodsTrade"; 
import { Sinmungo } from "./components/Sinmungo";
import { NoticeFeedback } from "./components/NoticeFeedback";

export function OthersRoutes() {
  return (
    <Routes>
      <Route element={<OthersPage />}>
        {/* 기본 접속 시 팬아트로 리다이렉트 */}
        <Route index element={<Navigate to="fanArt" replace />} />
        
        <Route path="fanArt" element={<FanArtArchive />} />
        <Route path="karaoke" element={<KaraokeNumberSearch />} />
        <Route path="games/*" element={<FanGames />} />
        <Route path="goods" element={<GoodsTrade />} />
        <Route path="sinmungo" element={<Sinmungo />} />
        <Route path="notice" element={<NoticeFeedback />} />
      </Route>
    </Routes>
  );
}
