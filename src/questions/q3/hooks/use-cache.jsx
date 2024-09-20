import { useRef } from "react";

const getCurrentTimstamp = () => Math.floor(new Date().getTime() / 1000);

export const useCache = (key, expirationTime = 300000) => {
  const prevCache = JSON.parse(localStorage.getItem(key));
  const cache = useRef(prevCache || {});

  const setCache = (query, data) => {
    const queryKey = query.toLowerCase();
    const timestamp = getCurrentTimstamp();
    cache.current[queryKey] = { data, timestamp };
    localStorage.setItem(key, JSON.stringify(cache.current));
  };

  const getCache = (query) => {
    const queryKey = query.toLowerCase();
    const { data, timestamp } = cache.current[queryKey] || {};
    const currentTime = getCurrentTimstamp();

    if (data && currentTime - timestamp < expirationTime) {
      return data;
    } else {
      delete cache.current[queryKey];
      localStorage.setItem(key, JSON.stringify(cache.current));
    }

    return null;
  };

  return { getCache, setCache };
};
