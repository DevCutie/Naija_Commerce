import { useState, useEffect } from "react";

const STORAGE_KEY = "recently_viewed_products";

export function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setViewedIds(JSON.parse(stored));
    }
  }, []);

  const addProduct = (id: string) => {
    let currentIds = [...viewedIds];

    currentIds = currentIds.filter((itemId) => itemId !== id);

    currentIds.unshift(id);

    if (currentIds.length > 4) currentIds.pop();

    setViewedIds(currentIds);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentIds));
  };

  return { viewedIds, addProduct };
}
