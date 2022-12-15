import { createContext, FC, useContext, useState, ComponentType, useEffect, useMemo } from 'react';
import { CharacterFilters } from '../../features/character/types/character-filter';
import { createHomeController } from './controller';
import { HomeState } from './types';

export interface HomeContextProps {
  state: HomeState;
  searchCharacters: (page: number, filters?: CharacterFilters) => void;
}

const HomeContext = createContext({} as HomeContextProps);

export interface HomeContextProviderProps {
  children: JSX.Element;
  controllerFactory?: typeof createHomeController;
}

export const HomeProvider: FC<HomeContextProviderProps> = ({
  children, controllerFactory
}) => {
  const [state, setState] = useState<HomeState>({ 
    isLoading: false,
    page: 1,
  });

  const controller = useMemo(
    () => controllerFactory?.() ?? createHomeController(),
    []
  );

  useEffect(() => {
    controller.search({ state, setState });
  }, []);

  const searchCharacters: HomeContextProps['searchCharacters'] = (page, filters) => controller
    .search({ state, setState, filters, page })

  return (
    <HomeContext.Provider value={{
      state,
      searchCharacters,
    }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHome = () => useContext(HomeContext);

export const withHome = (Component: ComponentType, controller?: typeof createHomeController) => () => (
  <HomeProvider controllerFactory={controller}>
    <Component />
  </HomeProvider>
);