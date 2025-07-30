import logo from "@/assets/logo.png";
import primaryLogo from "@/assets/logo-primary.png";
export const logoUrl = logo;
export const primaryLogoUrl = primaryLogo;

export const sortOptions = [
  { value: "startDate_desc", label: "Ngày bắt đầu ↓" },
  { value: "startDate_asc", label: "Ngày bắt đầu ↑" },
  { value: "name_asc", label: "Tên (A-Z)" },
  { value: "name_desc", label: "Tên (Z-A)" },
  { value: "createdAt_desc", label: "Mới nhất" },
  { value: "createdAt_asc", label: "Cũ nhất" },
];
