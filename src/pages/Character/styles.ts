import { styled } from '@mui/material';
import Image from 'next/image';

export const Root = styled('main')`
  max-width: 900px;
  margin: auto;
  margin-top: 70px;
  padding: 16px;
`;

export const CharacterImage = styled(Image)`
  width: 100%; 
  max-width: 500px; 
  height: auto; 
  border-radius: 16px;
`;

export const Row = styled('div')`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: baseline;
  margin-top: 8px;
`;

export const ArrowsContainer = styled('nav')`
  display: flex;
  justify-content: space-between;
`;