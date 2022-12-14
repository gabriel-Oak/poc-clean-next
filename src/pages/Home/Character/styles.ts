import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Root = styled(Card)``;

export const Container = styled('article')`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const ImageContainer = styled('div')`
  flex: 1;
`;

export const Content = styled(CardContent)`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Subtitle = styled(Typography)`
  opacity: 0.3;
`;