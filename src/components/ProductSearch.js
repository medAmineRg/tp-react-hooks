import React, { useState, useContext, useEffect } from "react";
import { ThemeContext, SearchTermContext } from "../App";
import useDebounce from "../hooks/useDebounce";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkTheme } = useContext(ThemeContext);
  const { setSearchTerm: setGlobalSearchTerm } = useContext(SearchTermContext);

  // Use the debounce hook
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Update global search term when debounced value changes
  useEffect(() => {
    setGlobalSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setGlobalSearchTerm]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? "bg-dark text-light" : ""}`}
      />
    </div>
  );
};

export default ProductSearch;
