import { createContext, useState, useEffect } from "react";
import {} from "../utils/firebase/firebase.utils";
import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = {
    products,
    setProducts,
  };

  useEffect(() => {}, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
