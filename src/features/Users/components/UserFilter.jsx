import { SearchInput } from "@/components/FormFields/SearchInput";
import { SortField } from "@/components/FormFields/SortField";
import { statusOptions } from "@/constants/user";

export const UserFilter = ({ filter, onFilterChange }) => {
  const handleChange = (key, val) => {
    onFilterChange?.({
      ...filter,
      [key]: val,
    });
  };

  const handleClearSearch = () => {
    onFilterChange?.({
      ...filter,
      search: "",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 items-start lg:items-center">
      <div className="w-full lg:w-auto">
        <SearchInput
          value={filter?.search}
          onChange={(val) => handleChange("search", val)}
          onClear={handleClearSearch}
          placeholder="Tìm theo tên, email..."
        />
      </div>

      <div className="flex-1" />

      <div className="w-full sm:w-auto">
        <SortField
          value={filter?.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={statusOptions}
          placeholder="Tất cả trạng thái"
        />
      </div>
    </div>
  );
};
