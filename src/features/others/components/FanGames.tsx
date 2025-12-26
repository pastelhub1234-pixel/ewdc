import { Routes, Route } from 'react-router-dom';
import { FanGameList } from './FanGameList';
import { FanGameDetail } from './FanGameDetail';

export function FanGames() {
  return (
    <Routes>
      <Route index element={<FanGameList />} />
      <Route path=":gameId" element={<FanGameDetail />} />
    </Routes>
  );
}
