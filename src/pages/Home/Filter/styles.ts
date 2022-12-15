import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled('aside')<{
  isMobile?: boolean,
  height: number,
  windowHeight: number,
}>(({ isMobile, theme, height, windowHeight }) => ({
  display: 'flex',
  justifyContent: 'stretch',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '280px',
  padding: '16px',
  ...(!isMobile && {
    borderRadius: 16,
    backgroundColor: '#1e1e1e',
    marginRight: theme.spacing(2),
    height: 'fit-content',
    position: 'sticky',
    top: `-${height - windowHeight + 16}px`,
  }),
}));

export const FilterButton = styled(Button)`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;