import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useCombobox } from "downshift";
import { LinkItem } from "models/item";
import { CloseIcon, NoSymbolIcon, SearchIcon, SpinnerIcon } from "./icons";

type ComboboxProps = {
  isLoading: boolean;
  label: string;
  placeholder: string;
  items: any[];
  setQuery: (s: string) => void;
  selectedItem: LinkItem | null;
  setSelectedItem: (item: any) => void;
};

export function Combobox({
  isLoading,
  label,
  placeholder,
  items,
  setQuery,
  selectedItem,
  setSelectedItem,
}: ComboboxProps) {
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useCombobox({
    items: items,
    itemToString: (item: LinkItem | null) => {
      return item ? String(item.name) : "";
    },
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue?.length) {
        setSelectedItem(null);
      }

      setQuery(inputValue?.toLowerCase() || "");
    },
    onSelectedItemChange: ({ selectedItem, ...rest }) => {
      setSelectedItem(selectedItem);
    },
  });
  return (
    <div>
      <label
        {...getLabelProps()}
        className="mb-1 block text-lg font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <div className="flex items-center space-x-4 rounded bg-white p-3 leading-[25px]">
          <div className="h-8 w-8 flex-none overflow-hidden rounded-full">
            {selectedItem ? (
              selectedItem.logo_url ? (
                <Image
                  src={selectedItem.logo_url}
                  alt="company logo"
                  width={32}
                  height={32}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <NoSymbolIcon />
                </div>
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                {isLoading ? (
                  <div className="animate-spin">
                    <SpinnerIcon />
                  </div>
                ) : (
                  <SearchIcon />
                )}
              </div>
            )}
          </div>
          <input
            {...getInputProps()}
            placeholder={placeholder}
            className="w-full border-b bg-transparent text-xl border-t-0 border-r-0 border-l-0 border-b-gray-400 border border-solid placeholder:text-gray-400 focus-visible:border-gray-700 focus-visible:outline-none focus-visible:border-t-0 focus-visible:border-r-0 focus-visible:border-l-0 !ring-transparent"
          />
          <button className="w-8" onClick={() => reset()}>
            <CloseIcon />
          </button>
        </div>
        <ul
          {...getMenuProps()}
          className="scrollbar absolute z-10 mt-2 max-h-[600px] w-full overflow-y-scroll rounded bg-white p-0 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                key={`${item}${index}`}
                className={clsx(
                  "flex items-center space-x-4 px-3 py-2 text-xl leading-[25px]",
                  {
                    "bg-gray-100": highlightedIndex === index,
                    "text-gray-600": item.is_input,
                  }
                )}
                {...getItemProps({ item, index })}
              >
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  {item.logo_url ? (
                    <Image
                      src={item.logo_url}
                      alt="company logo"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-400"></div>
                  )}
                </div>
                <div>{item.name}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
