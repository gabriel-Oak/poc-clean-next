import React, { FC } from 'react';
import CharacterCard from './Character';
import { useHome } from './HomeContext';
import Filter from './Filter';
import { CardList, FloatinContainer, Loader, Root } from './styles';
import { Fab, Grow, Typography } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import { Box } from '@mui/system';

const Home: FC = () => {
  const {
    state: { isLoading, characters, isScrolled, errorState },
    backToTop,
  } = useHome();
  console.log(errorState);

  return (
    <Root>
      {isLoading && <Loader />}

      <Filter />

      <div>
        <CardList >
          {characters?.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          ))}
        </CardList>

        {errorState && (
          <Box mt={2}>
            <Typography textAlign="center" variant="h5">
              Oops, got an error searching characters
            </Typography>

            <Typography textAlign="center" variant="body1">
              {errorState.message}
            </Typography>
          </Box>
        )}
      </div>



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