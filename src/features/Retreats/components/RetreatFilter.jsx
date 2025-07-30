import { SearchInput } from "@/components/FormFields/SearchInput";
import { SortField } from "@/components/FormFields/SortField";
import { sortOptions } from "@/constants/common";
import { retreatOption, statusOptions } from "@/constants/retreat";

export const RetreatFilter = ({ filter, onFilterChange }) => {
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
          placeholder="Tìm kiếm tên khóa tu..."
        />
      </div>

      <div className="flex-  lg:flex-1" />
      <div className="w-full sm:w-auto">
        <SortField
          value={filter?.type}
          onChange={(e) => handleChange("type", e.target.value)}
          options={retreatOption}
          placeholder="Tất cả khóa tu"
        />
      </div>
      <div className="w-full sm:w-auto">
        <SortField
          value={filter?.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={statusOptions}
          placeholder="Tất cả trạng thái"
        />
      </div>

      <div className="w-full sm:w-auto">
        <SortField
          value={filter?.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
          options={sortOptions}
          placeholder="Sắp xếp tự động"
        />
      </div>
    </div>
  );
};
