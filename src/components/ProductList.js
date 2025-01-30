import React, { useContext } from "react";
import { LanguageContext, ThemeContext } from "../App";
import useProductSearch from "../hooks/useProductSearch";

const ProductList = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const { products, loading, error, reload, paginate } = useProductSearch();

  if (loading)
    return (
      <div className="text-center my-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        Erreur: {error}
      </div>
    );

  return (
    <div>
      <button
        className="btn btn-primary mb-4"
        onClick={async () => await reload()}>
        Recharger
      </button>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div
              className={`card h-100 ${
                isDarkTheme ? "bg-dark text-light" : ""
              }`}>
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Prix: </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={async () => {
                paginate.setPage(() => paginate.prevPage);
                await reload();
              }}>
              Précédent
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {paginate.page} sur {10}
            </span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={async () => {
                paginate.setPage(() => paginate.nextPage);
                await reload();
              }}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
