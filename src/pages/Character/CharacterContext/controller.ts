import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Character from '../../../features/character/models/character';
import { IGetDetailsUsecase } from '../../../features/character/usecases/get-details/types';
import { CustomError } from '../../../utils/custom-error';
import { CharacterContextProps } from './types';

const useCharacterController = (usecase: IGetDetailsUsecase): CharacterContextProps => {
  const { query: { characterId } } = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(null as unknown as Character);
  const [errorState, setErrorState] = useState<CustomError | null>(null);

  const search = async (id: string) => {
    if (isLoading) return;
    
    setErrorState(null);
    setIsLoading(true);

    const result = await usecase.execute(id);    
    if (result instanceof Error) setErrorState(result);
    else setCharacter(result);

    setIsLoading(false);
  }

  useEffect(() => {
    if (characterId) search(characterId as string);
  }, [characterId]);

  return {
    state: {
      isLoading,
      character,
      errorState,
      characterId: String(characterId),
    },
    search,
  }
}

export default useCharacterController;