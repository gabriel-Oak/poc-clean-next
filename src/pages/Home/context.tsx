import { createContext, FC, useContext, useState, ComponentType, useEffect, useMemo } from 'react';
import HomeController, { createHomeController } from './controller';
import { HomeState } from './types';

export interface HomeContextProps {
  data: HomeState;
  controller: HomeController;
}

const HomeContext = createContext({} as HomeContextProps);

export interface HomeContextProviderProps {
  children: JSX.Element;
  controllerFactory?: typeof createHomeController;
}

export const HomeProvider: FC<HomeContextProviderProps> = ({
  children, controllerFactory
}) => {
  const [data, setData] = useState<HomeState>({ isLoading: false });
  const controller = useMemo(
    () => controllerFactory?.(data, setData) ?? createHomeController(data, setData),
    [setData]
  );


  useEffect(() => {
    controller.getAll();
  }, []);

  return (
    <HomeContext.Provider value={{
      data,
      controller,
    }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeState = () => useContext(HomeContext);

export const withHomeState = (Component: ComponentType, controller?: typeof createHomeController) => () => (
  <HomeProvider controllerFactory={controller}>
    <Component />
  </HomeProvider>
);