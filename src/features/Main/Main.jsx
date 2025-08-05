import { MainLayout } from "@/components/Layouts/MainLayout";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Retreat = lazy(() => import("@/features/Retreats/Retreats"));
const Posts = lazy(() => import("@/features/Posts/pages/Posts"));

export default function Main() {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="khoa-tu" />} />
        <Route path="/khoa-tu/*" element={<Retreat />} />
        <Route path="/tin-tuc/*" element={<Posts />} />
      </Routes>
    </MainLayout>
  );
}
