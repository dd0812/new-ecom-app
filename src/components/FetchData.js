import { useState, useEffect, useCallback } from "react";
import productsData from '../data/products.json';
import axios from "axios";

function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [userList, setUserList] = useState([]);
  const [products, setProducts] = useState({});

  // const loadUserInfo = useCallback(async () => {
  //   try {
  //     await setLoading(true);
  //     await setError(false);
  //     const res = await axios.get(
  //       `https://randomuser.me/api/?results=500`
  //     );
  //     console.log(res);
  //     await setUserList((prev) => [...new Set([...prev, ...res.data.results])]);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //   }
  // }, []);

  useEffect(() => {
    try {
      console.log('products', productsData);
      // loadUserInfo();
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, []);
   //[page, loadUserInfo]

  return { loading, error, products };
}

export default useFetch;