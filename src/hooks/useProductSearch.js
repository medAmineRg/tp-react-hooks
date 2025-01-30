import { useState, useEffect, useContext } from "react";
import { SearchTermContext } from "../App";

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 1.1 - ajouter le terme de recherche
  const { searchTerm } = useContext(SearchTermContext);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://api.daaif.net/products/search?q=${searchTerm}&delay=1000&limit=10&skip=${page}`
        );
        if (!response.ok) throw new Error("Erreur réseau");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, page]);

  const reload = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.daaif.net/products/search?q=${searchTerm}&delay=1000&limit=10&skip=${page}`
      );
      if (!response.ok) throw new Error("Erreur réseau");
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const paginate = () => {
    return {
      page,
      nextPage: page + 1,
      prevPage: page - 1,
      setPage,
    };
  };

  return {
    products,
    loading,
    error,
    reload,
    paginate: paginate(),
  };
};

export default useProductSearch;
