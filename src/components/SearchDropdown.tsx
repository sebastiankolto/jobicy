"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  id: string;
}

export default function SearchDropdown({
  options,
  value,
  onChange,
  placeholder = "Country",
  label,
  id,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null!);

  const selectedOption = options.find((option) => option.value === value);
  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        e.target instanceof Node &&
        !containerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(optionValue: string) {
    onChange(optionValue);
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={isOpen ? search : selectedOption?.label || ""}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-md px-3 py-2 text-sm bg-white text-black"
        />
        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
            <li
              onClick={() => handleSelect("")}
              className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
            >
              {placeholder}
            </li>
            {filtered.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer px-3 py-2 text-sm text-black`}
              >
                {option.label}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-800">No results</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
