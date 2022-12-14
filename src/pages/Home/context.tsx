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
  controllerInstance?: HomeController;
}

export const HomeContextProvider: FC<HomeContextProviderProps> = ({
  children, controllerInstance
}) => {
  const [data, setData] = useState<HomeState>({ isLoading: false });
  const controller = useMemo(
    () => controllerInstance ?? createHomeController(data, setData),
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

export const withHomeState = (Component: ComponentType, controller?: HomeController) => () => (
  <HomeContextProvider controllerInstance={controller}>
    <Component />
  </HomeContextProvider>
);