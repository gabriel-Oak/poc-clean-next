import LinearProgress from '@mui/material/LinearProgress';
import { styled } from "@mui/system";

export const Root = styled('div')(({theme}) => `
  display: flex;
  padding: ${theme.spacing(2)};
  margin-top: 70px;
`);

export const CardList = styled('section')(({ theme }) => `
  display: grid;
  grid-template-columns: repeat(2, calc(50% - ${
    +theme.spacing(3).replace('px', '') / 2
  }px));
  column-gap: ${theme.spacing(3)};
  grid-row-gap: ${theme.spacing(3)};
  width: 100%;
  
  ${theme.breakpoints.down('md')} {
    display: flex;
    flex-direction: column;
  }
`);

export const Loader = styled(LinearProgress)`
  position: fixed;
  top: 0;
  z-index: 10000;
  left: 0;
  width: 100vw;
`;

export const FloatinContainer = styled('aside')`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;