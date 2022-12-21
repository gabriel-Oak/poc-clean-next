import { useMediaQuery, useTheme } from '@mui/material';
import { ComponentType, createContext, createRef, FC, useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CharacterFilters } from '../../../features/character/types/character-filter';
import { useHome } from '../HomeContext/context';
import FilterController, { createFilterController } from './controller';
import { FilterInternalState, FilterState } from './types';

export interface FilterContextProps {
  state: FilterState;
  toggleDrawer: (open: boolean) => void;
  onSubmit: (filters: CharacterFilters) => void;
}

const FilterContext = createContext({} as FilterContextProps);

interface FilterProviderProps {
  children: JSX.Element;
  controllerFactory?: typeof createFilterController;
}

export const FilterProvider: FC<FilterProviderProps> = ({ children, controllerFactory }) => {
  const { state: { isLoading }, search } = useHome();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(() => breakpoints.down('md'));

  const [state, setState] = useState({
    containerRef: createRef(),
    windowHeight: global.innerHeight,
  } as FilterInternalState);

  
  const controller = useMemo(
    () => controllerFactory?.()
      || createFilterController(),
    [setState]
  );

  useEffect(() => {
    if (isMobile) setState({...state, open: isMobile });
  }, [isMobile]);

  const toggleDrawer = (open: boolean) => setState({...state, open});
  const onSubmit = (filters: CharacterFilters) => {
    toggleDrawer(false);
    controller.submit(filters, isLoading, search);
  };

  return (
    <FilterContext.Provider value={{
      state: {
        ...state,
        isMobile,
      },
      onSubmit,
      toggleDrawer,
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);

export const withFilter = (Component: ComponentType, controllerFactory?: typeof createFilterController) => () => (
  <FilterProvider controllerFactory={controllerFactory}>
    <Component />
  </FilterProvider>
);