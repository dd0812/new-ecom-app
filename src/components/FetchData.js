import { useState, useEffect, useCallback } from "react";
import productsData from '../data/products.json';
import axios from "axios";

function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState({});

  useEffect(() => {
    try {
      console.log('products', productsData);
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, []);

  return { loading, error, products };
}

export default useFetch;