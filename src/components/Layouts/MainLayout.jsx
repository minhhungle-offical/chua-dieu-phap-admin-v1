import { useEffect, useState } from "react";
import { SideBar } from "../Common/SideBar";
import { authApi } from "@/api/authApi";

export function MainLayout({ children }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await authApi.getMe();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar profile={profile} />
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">{children}</div>
    </div>
  );
}
