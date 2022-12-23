import React, { FC } from 'react';
import CharacterCard from './Character';
import { useHome } from './HomeContext';
import Filter from './Filter';
import { CardList, FloatinContainer, Loader, Root } from './styles';
import { Fab, Grow } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const Home: FC = () => {
  const { 
    state: { isLoading, characters, isScrolled },
    backToTop, 
  } = useHome();

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


      <FloatinContainer>
        <Grow in={isScrolled}>
          <Fab color="primary" size="large" onClick={backToTop}>
            <ArrowUpward />
          </Fab>
        </Grow>
      </FloatinContainer>
    </Root>
  );
}

export default Home;