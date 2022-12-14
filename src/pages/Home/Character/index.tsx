import { CardMedia, Typography } from '@mui/material';
import React, { FC } from 'react';
import Character from '../../../features/character/models/character';
import { Container, Content, ImageContainer, Root, Subtitle } from './styles';

interface CharacterCardsProps {
  character: Character;
}

const CharacterCard: FC<CharacterCardsProps> = ({
  character
}) => {
  return (
    <Root>
      <Container>
        <ImageContainer>
          <CardMedia 
            component="img"
            src={character.image} 
            height="100%"
          />
        </ImageContainer>

        <Content>
          <div>
            <Typography variant='h4' fontWeight={500}>
              {character.name}
            </Typography>
            <Typography variant='body1'>
              {`${character.status} - ${character.species}`}
            </Typography>
          </div>

          <div>
            <Subtitle variant='subtitle1'>
              Last known location:
            </Subtitle>
            <Typography variant='body1'>
              {character.location.name}
            </Typography>
          </div>

          <div>
            <Subtitle variant='subtitle1'>
              First seen in:
            </Subtitle>
            <Typography variant='body1'>
              {character.origin.name}
            </Typography>
          </div>
        </Content>
      </Container>
    </Root>
  );
}

export default CharacterCard;