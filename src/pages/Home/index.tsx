import React, { FC } from 'react';
import CharacterCard from './Character';
import { useHome } from './context';
import Filter from './Filter';
import { CardList, Loader, Root } from './styles';

const Home: FC = () => {
  const { state: { isLoading, characters } } = useHome();

  return (
    <Root>
      {isLoading && <Loader />}

      <Filter />

      <CardList >
        {characters?.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}
      </CardList>
    </Root>
  );
}

export default Home;