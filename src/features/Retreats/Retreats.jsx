import { Route, Routes } from "react-router-dom";
import { RetreatDetail } from "./pages/RetreatDetail";
import { RetreatPage } from "./pages/RetreatPage";

export default function Retreats() {
  return (
    <Routes>
      <Route index element={<RetreatPage />} />
      <Route path=":slug" element={<RetreatDetail />} />
    </Routes>
  );
}
