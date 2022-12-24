import { createContext, FC, useContext, useState, ComponentType, useEffect, useMemo } from 'react';
import { CharacterFilters } from '../../../features/character/types/character-filter';
import { HomeContextProps, HomeState } from './types';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';
import createGetCharactersUsecase from '../../../features/character/usecases/get-characters';
import { useHomeController } from './controller';

const HomeContext = createContext({} as HomeContextProps);

export interface HomeContextProviderProps {
  children: JSX.Element;
}

export const HomeProvider: FC<HomeContextProviderProps> = ({
  children
}) => {
  const getCharacters = createGetCharactersUsecase();
  const controller = useHomeController(getCharacters);

  return (
    <HomeContext.Provider value={controller}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHome = () => useContext(HomeContext);

export const withHome = (Component: ComponentType) => () => (
  <HomeProvider >
    <Component />
  </HomeProvider>
);