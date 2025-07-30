import { NavLink } from "react-router-dom";
import { menu } from "@/constants/nav";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-md">
      <ul className="flex justify-around items-center pt-4 pb-6">
        {menu.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center text-xs",
                  isActive ? "text-white" : "text-gray-400 hover:text-white",
                ].join(" ")
              }
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
