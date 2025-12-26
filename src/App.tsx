// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TopNavigation } from "./components/TopNavigation";

import { HomePage } from "./features/home/HomePage";
import { NewsRoutes } from "./features/news/NewsRoutes";
import { ActivitiesRoutes } from "./features/activities/ActivitiesRoutes";
import { GoodsRoutes } from "./features/goods/GoodsRoutes";
import { GuideRoutes } from "./features/guide/GuideRoutes";
import { OthersRoutes } from "./features/others/OthersRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <TopNavigation />

        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/news/*" element={<NewsRoutes />} />
            <Route path="/activities/*" element={<ActivitiesRoutes />} />
            <Route path="/goods/*" element={<GoodsRoutes />} />
            <Route path="/guide/*" element={<GuideRoutes />} />
            <Route path="/others/*" element={<OthersRoutes />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}