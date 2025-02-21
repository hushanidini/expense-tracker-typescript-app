import { CommonCard } from "@/components/organisam/commons/common-card"
import { SearchBar } from "@/components/molecule/searchbar/searchbar"

type CommonFilterProps = {
  children?: React.ReactNode;
  hAlign?: "items-center" | "items-start" | "items-end";
  searchPlaceholder?: string;
  search?: boolean;
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CommonFilter({
  children,
  hAlign = "items-center",
  searchPlaceholder = "Search...",
  search = true,
  searchOnChange,
}: CommonFilterProps) {
  return (
    <CommonCard>
      <div className={`flex flex-col md:flex-row justify-between ${hAlign}`}>
        {search && (
          <SearchBar
            placeholder={searchPlaceholder}
            onChange={searchOnChange}
          />
        )}
        <div className="flex gap-4 items-center justify-end">{children}</div>
      </div>
    </CommonCard>
  )
}