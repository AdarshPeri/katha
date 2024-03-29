/* eslint-disable react/prop-types */
import { createContext, useMemo } from 'react';
import { useCategory } from '../hooks/useCategory';

export const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const { isLoading, categories, error } = useCategory();

  const memoCategories = useMemo(
    () =>({isLoading, categories, error}),
    [isLoading, categories, error]
  )

  return (
    <CategoryContext.Provider value={memoCategories}>
      {children}
    </CategoryContext.Provider>
  );
};
