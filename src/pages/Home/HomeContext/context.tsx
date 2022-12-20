import { createContext, FC, useContext, useState, ComponentType, useEffect, useMemo } from 'react';
import createCharacterController from '../../features/character/controller';
import { CharacterFilters } from '../../../features/character/types/character-filter';
import { HomeState } from './types';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';
import createGetCharactersUsecase from '../../../features/character/usecases/get-characters';
import { useHomeState } from './hooks';

export interface HomeContextProps extends HomeState{
  searchCharacters: (page: number, filters?: CharacterFilters) => void;
}

const HomeContext = createContext({} as HomeContextProps);

export interface HomeContextProviderProps {
  children: JSX.Element;
  getCharactersFactory?: () => IGetCharatersUsecase;
}

export const HomeProvider: FC<HomeContextProviderProps> = ({
  children, getCharactersFactory
}) => {
  const getCharacters = getCharactersFactory?.() ?? createGetCharactersUsecase();
  const {} = useHomeState(getCharacters);

  const [state, setState] = useState<HomeState>({
    isLoading: false,
    page: 1,
  });


  const onScroll = () => {
    const scrolledToBottom =
      window?.innerHeight + Math.ceil(window?.pageYOffset) + 800 >=
      document?.body.offsetHeight;

    if (scrolledToBottom) {
      if (state.scrollTimeout) clearTimeout(state.scrollTimeout);

      setState({
        ...state,
        scrollTimeout: setTimeout(() => {
           controller.search({ page: state.page + 1 });
        }, 50),
      });
    }
  };

  useEffect(() => {
    window?.addEventListener('scroll', onScroll);
    return () => window?.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    controller.search({ state, setState });
  }, []);

  const searchCharacters: HomeContextProps['searchCharacters'] = (page, filters) => controller
    .search({ state, setState, filters, page });

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

export const withHome = (Component: ComponentType, getCharactersFactory?: () => IGetCharatersUsecase) => () => (
  <HomeProvider getCharactersFactory={getCharactersFactory}>
    <Component />
  </HomeProvider>
);