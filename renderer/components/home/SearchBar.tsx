import FocusLock from "react-focus-lock";
import { create } from "zustand";

type SearchBarState = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFocusLocked: boolean;
  toggleFocusLock: () => void;
};

export const useSearchBar = create<SearchBarState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  isFocusLocked: true,
  toggleFocusLock: () =>
    set((state) => {
      

      return { isFocusLocked: !state.isFocusLocked }}),
}));

export default function SearchBar() {
  const { searchQuery, setSearchQuery, isFocusLocked } = useSearchBar();
  return (
    <FocusLock persistentFocus disabled={!isFocusLocked}>
      <input
        autoFocus
        type="text"
        className="w-full bg-gray-100/0 focus:outline-none text-lg"
        placeholder="Search for snippets..."
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "ArrowDown" || e.key == "ArrowUp") e.preventDefault();
        }}
        value={searchQuery}
      />
    </FocusLock>
  );
}
