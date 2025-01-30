import React, { createContext, useState } from "react";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";
import LanguageSelection from "./components/LanguageSelection";

export const LanguageContext = createContext();
export const ThemeContext = createContext();
export const SearchTermContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("fr");

  console.log(searchTerm);
  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <div
            className={`container ${
              isDarkTheme ? "bg-dark text-light" : "bg-light"
            }`}>
            <header className="my-4">
              <h1 className="text-center">Catalogue de Produits</h1>
              <div className="d-flex justify-content-end gap-2">
                <ThemeToggle />
                <LanguageSelection
                  language={language}
                  setLanguage={setLanguage}
                />
              </div>
            </header>
            <main>
              <ProductSearch />
              <ProductList />
            </main>
          </div>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </SearchTermContext.Provider>
  );
};

export default App;
