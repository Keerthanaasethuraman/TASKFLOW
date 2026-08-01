import "./SearchBar.css";

import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement>;

function SearchBar(props: SearchBarProps) {
  return (
    <div className="search-bar">
      <Search className="search-icon" size={18} />

      <input
        className="search-input"
        {...props}
      />
    </div>
  );
}

export default SearchBar;