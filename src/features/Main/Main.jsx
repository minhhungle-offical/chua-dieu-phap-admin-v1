import { MainLayout } from "@/components/Layouts/MainLayout";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Retreat = lazy(() => import("@/features/Retreats/Retreats"));

export default function Main() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/khoa-tu/*" element={<Retreat />} />
      </Routes>
    </MainLayout>
  );
}
