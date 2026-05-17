import React from "react";
import { Search } from "lucide-react";
import { formatDisplayTitle } from "@/lib/ui/formatDisplayTitle";

type SearchSuggestionsProps = {
  suggestions: string[];
  className?: string;
  onSelect?: (suggestion: string) => void;
};

export function SearchSuggestions({
  suggestions,
  className = "",
  onSelect,
}: SearchSuggestionsProps) {
  return (
    <div className={`space-y-3 ${className}`.trim()} data-journee-ui="search-suggestions">
      {suggestions.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect?.(label)}
          className="flex w-full min-w-0 items-center gap-3 text-left text-sm font-semibold text-white/86 transition hover:text-[#f3b544]"
        >
          <Search className="h-4 w-4 shrink-0 text-white/70" />
          <span className="min-w-0">{formatDisplayTitle(label)}</span>
        </button>
      ))}
    </div>
  );
}
