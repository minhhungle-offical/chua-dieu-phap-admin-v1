import { authApi } from "@/api/authApi";
import { useEffect } from "react";
import { BottomNav } from "../Common/MobileNav";
import { SideBar } from "../Common/SideBar";
import { MobileHeader } from "../Common/MobileHeader";
import { authStore } from "@/stores/authStore";

export function MainLayout({ children }) {
  const profile = authStore((state) => state.profile);
  const setProfile = authStore((state) => state.setProfile);

  useEffect(() => {
    (async () => {
      try {
        const data = await authApi.getMe();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <SideBar profile={profile} />
      </div>

      <div className="flex-1 flex flex-col">
        <MobileHeader profile={profile} />
        <div className="flex-1 overflow-y-auto bg-gray-100 mb-3">
          {children}
        </div>

        <div className="block md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
