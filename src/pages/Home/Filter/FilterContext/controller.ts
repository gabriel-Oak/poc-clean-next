import { useMediaQuery, useTheme } from '@mui/material';
import { createRef, useEffect, useState } from 'react';
import { CharacterFilters } from '../../../../features/character/types/character-filter';
import { HomeContextProps } from '../../HomeContext/types';
import { FilterContextProps } from './types';

const useFilterController = (homeController: HomeContextProps): FilterContextProps => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(() => breakpoints.down('md'));

  const containerRef = createRef<HTMLDivElement>();
  const [height, setHeight] = useState(global.innerHeight);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isMobile) setOpen(isMobile);
  }, [isMobile]);

  const onSubmit = (filters: CharacterFilters) => {
    setOpen(false);
    homeController.search({
      page: 1,
      filters
    });
  };

  const onResize = () => {
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  return {
    state: {
      containerRef,
      isMobile,
      open,
      height,
    },
    setOpen,
    onSubmit,
  };
}

export default useFilterController;