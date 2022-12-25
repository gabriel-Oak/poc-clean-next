import { CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC, memo } from 'react';
import Character from '../../../features/character/models/character';
import { Container, Content, ImageContainer, Name, Root, Subtitle } from './styles';

interface CharacterCardsProps {
  character: Character;
}

const CharacterCard: FC<CharacterCardsProps> = ({
  character
}) => {
  return (
    <Link href={`/character/${character.id}`}>
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
              <Name variant='h4' fontWeight={500}>
                {character.name}
              </Name>

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
    </Link>
  );
}

export default memo(CharacterCard);