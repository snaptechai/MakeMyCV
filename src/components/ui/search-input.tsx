"use client";
import React, { useState, useEffect, useCallback } from "react";
import { InputProps } from "./input";
import { cn } from "@/lib/utils";

interface SearchResult {
  label: string;
  value: string | number;
}

interface SearchInputProps extends InputProps {
  searchFunction: (term: string) => Promise<SearchResult[]>;
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type, value, onChange, searchFunction, ...props }, ref) => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedResult, setSelectedResult] = useState<string | number>("");
    const [userInteracted, setUserInteracted] = useState(false);

    const handleSearch = useCallback(
      debounce(async (term: string) => {
        const searchResults = await searchFunction(term);
        setResults(searchResults);
        setShowResults(userInteracted);
      }, 300),
      [searchFunction, userInteracted],
    );

    useEffect(() => {
      if (value !== selectedResult) {
        handleSearch(value);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, [value, handleSearch]);

    const handleResultClick = (result: SearchResult) => {
      const syntheticEvent = {
        target: { value: result.value },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
      setShowResults(false);
      setUserInteracted(false);
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
          value={value}
          onChange={(e) => {
            setUserInteracted(true);
            onChange?.(e);
          }}
        />
        {showResults && results.length !== 0 && userInteracted && (
          <div className="absolute left-0 right-0 top-11 z-50 max-h-44 overflow-y-scroll rounded-xl border border-gray-300 bg-white">
            {results.map((result, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 text-sm capitalize hover:bg-gray-200"
                onClick={() => {
                  handleResultClick(result);
                  setSelectedResult(result.value);
                }}
              >
                {result.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
