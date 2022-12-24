import { FC } from 'react';
import { CustomError } from '../../utils/custom-error';
import { useCharacter } from './CharacterContext';
import CharacterError from './CharacterError';
import CharacterSkeleton from './CharacterSkeleton';

import { Root } from './styles';

const Character: FC = () => {
  const { 
    state: { isLoading, character, errorState },
  } = useCharacter();

  return (
    <Root>
      {isLoading ? (
        <CharacterSkeleton />
      ) : errorState ? (
        <CharacterError />
      ) : (
        <div />
      )}
    </Root>
  );
}

export default Character;