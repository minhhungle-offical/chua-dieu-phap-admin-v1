import {
  FiUsers,
  FiSettings,
  FiBookOpen,
  FiCalendar,
  FiFileText,
  FiShield,
} from "react-icons/fi";

export const menu = [
  { label: "Khóa tu", icon: FiBookOpen, path: "/bang-dieu-khien/khoa-tu" },
  { label: "Sự kiện", icon: FiCalendar, path: "/bang-dieu-khien/su-kien" },
  { label: "Tin tức", icon: FiFileText, path: "/bang-dieu-khien/tin-tuc" },
  { label: "Admin", icon: FiShield, path: "/bang-dieu-khien/admin" },
  { label: "Phật tử", icon: FiUsers, path: "/bang-dieu-khien/phat-tu" },
  { label: "Settings", icon: FiSettings, path: "/bang-dieu-khien/settings" },
];
