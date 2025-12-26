import { Routes, Route, Navigate } from "react-router-dom";
import { GoodsPage } from "./GoodsPage";

import { TicketingLinker } from "./components/TicketingLinker";
import { AlbumList } from "./components/AlbumList";
import { OfficialGoods } from "./components/OfficialGoods";
import { FanEventBooth } from "./components/FanEventBooth";
import { MembershipCalculator } from "./components/MembershipCalculator";
import { FandomSupport } from "./components/FandomSupport";

export function GoodsRoutes() {
  return (
    <Routes>
      <Route element={<GoodsPage />}>
        {/* /goods 접속 시 티켓 탭으로 리다이렉트 */}
        <Route index element={<Navigate to="ticket" replace />} />
        
        {/* Props 없이 깔끔하게 컴포넌트만 렌더링 */}
        <Route path="ticket" element={<TicketingLinker />} />
        <Route path="album" element={<AlbumList />} />
        <Route path="goods" element={<OfficialGoods />} />
        <Route path="market" element={<FanEventBooth />} />
        <Route path="membership" element={<MembershipCalculator />} />
        <Route path="support" element={<FandomSupport />} />
      </Route>
    </Routes>
  );
}