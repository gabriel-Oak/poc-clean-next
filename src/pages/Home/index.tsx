import React, { FC } from 'react';
import CharacterCard from './Character';
import { useHomeState } from './context';
import { CardList, Loader, Root } from './styles';

const Home: FC = () => {
  const { data } = useHomeState();

  return (
    <Root>
      {data.isLoading && <Loader />}

      <CardList>
        {data.characters?.map((character) => (
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