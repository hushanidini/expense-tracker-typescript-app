import React from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
    placeholder: string | undefined;
    className?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar({
    placeholder = "Search...",
    className,
    onChange,
    value,
}: SearchBarProps) {
    return (
        <form className={`relative ${className}`}>
            <input type="text"
                placeholder={placeholder}
                className="input input-neutral w-full sm:min-w-80 bg-gray-100" 
                onChange={onChange}
                value={value}
            />

            <Search
                className="absolute right-4 top-[10px] text-slate-500"
                size={20}
            />
        </form>
    );
}
