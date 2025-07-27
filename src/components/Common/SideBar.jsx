import { logoUrl } from "@/constants/common";
import { menu } from "@/constants/nav";
import { FiLogOut, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export function SideBar({ profile,logout }) {
  return (
    <nav className="h-screen w-[240px] bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="px-6 py-5">
        <img src={logoUrl} alt="Logo" className="w-[80px] object-contain" />
      </div>

      <div className="p-2">
        {profile && (
          <div className="flex items-center gap-3">
            <div className="bg-gray-700 p-2 rounded-full">
              <FiUser className="text-white text-lg" />
            </div>
            <div className="text-xs leading-tight">
              <div className="font-semibold">{profile.name}</div>
              <div className="text-gray-400 capitalize">{profile.role}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <ul className="space-y-1 py-4">
          {menu.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 p-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  ].join(" ")
                }
              >
                <item.icon className="text-lg shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-800 py-4 space-y-3">
        <button onClick={() => logout?.()} className="flex items-center gap-3 w-full text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white p-3 transition">
          <FiLogOut className="text-lg" />
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}
