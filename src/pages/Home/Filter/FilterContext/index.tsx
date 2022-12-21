import { ComponentType, createContext, FC, useContext } from 'react';
import { useHome } from '../../HomeContext';
import useFilterController from './controller';
import { FilterContextProps } from './types';

const FilterContext = createContext({} as FilterContextProps);

interface FilterProviderProps {
  children: JSX.Element;
}

export const FilterProvider: FC<FilterProviderProps> = ({ children }) => {
  const homeController = useHome();
  const controller = useFilterController(homeController);
 
  return (
    <FilterContext.Provider value={controller}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);

export const withFilter = (Component: ComponentType) => () => (
  <FilterProvider>
    <Component />
  </FilterProvider>
);