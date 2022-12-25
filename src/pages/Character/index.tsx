import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { CustomError } from '../../utils/custom-error';
import { useCharacter } from './CharacterContext';
import CharacterError from './CharacterError';
import CharacterSkeleton from './CharacterSkeleton';

import { ArrowsContainer, CharacterImage, Root, Row } from './styles';

const Character: FC = () => {
  const {
    state: { isLoading, character, errorState },
    search,
  } = useCharacter();

  return (
    <Root>
      {isLoading ? (
        <CharacterSkeleton />
      ) : errorState ? (
        <CharacterError />
      ) : character && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <CharacterImage
                alt=""
                src={character.image}
                height={300}
                width={300}
              />
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  {character.name}
                </Typography>

                <Row>
                  <Typography variant="subtitle1">
                    Status:
                  </Typography>

                  <Typography variant="body1">
                    {character.status}
                  </Typography>
                </Row>

                <Row>
                  <Typography variant="subtitle1">
                    Species:
                  </Typography>

                  <Typography variant="body1">
                    {character.species}
                  </Typography>
                </Row>

                <Row>
                  <Typography variant="subtitle1">
                    Gender:
                  </Typography>

                  <Typography variant="body1">
                    {character.gender}
                  </Typography>
                </Row>

                <Row>
                  <Typography variant="subtitle1">
                    Origin:
                  </Typography>

                  <Typography variant="body1">
                    {character.origin.name}
                  </Typography>
                </Row>

                <Row>
                  <Typography variant="subtitle1">
                    Last known location:
                  </Typography>

                  <Typography variant="body1">
                    {character.location.name}
                  </Typography>
                </Row>
              </Grid>
            </Grid>
          </Grid>

          <ArrowsContainer>
            <IconButton
              disabled={character.id === 1}
              onClick={() => search(String(character.id - 1))}
            >
              <ArrowBack />
            </IconButton>

            <IconButton
              onClick={() => search(String(character.id + 1))}
            >
              <ArrowForward />
            </IconButton>
          </ArrowsContainer>
        </Box>
      )}
    </Root>
  );
}

export default Character;