import { createContext, FC, useContext } from 'react';
import createGetDetailsUsecase from '../../../features/character/usecases/get-details';
import useCharacterController from './controller';
import { CharacterContextProps } from './types';

const CharacterContext = createContext({} as CharacterContextProps);

export const CharacterProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const usecase = createGetDetailsUsecase();
  const controller = useCharacterController(usecase);

  return (
    <CharacterContext.Provider value={controller}>
      {children}
    </CharacterContext.Provider>
  );
}

export const useCharacter = () => useContext(CharacterContext);