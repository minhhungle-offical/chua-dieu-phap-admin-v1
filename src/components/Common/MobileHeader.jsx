import { logoUrl } from "@/constants/common";
import { FiUser } from "react-icons/fi";

export function MobileHeader({ profile }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white md:hidden shadow">
      <div className="flex items-center gap-2">
        <img src={logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
      </div>

      {profile && (
        <div className="flex items-center gap-2 text-right text-xs">
          <div>
            <div className="font-medium">{profile.name}</div>
            <div className="text-gray-400 capitalize">{profile.role}</div>
          </div>

          <div className="bg-gray-700 p-2 rounded-full">
            <FiUser className="text-white text-base" />
          </div>
        </div>
      )}
    </header>
  );
}
