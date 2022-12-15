import { Drawer } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useFilter } from './context';
import FilterContent from './FilterContent';
import { FilterButton } from './styles';

const Filter: FC = () => {
  const { toggleDrawer, state } = useFilter();
  
  return (
    <>
    {state.isMobile ? (
      <Drawer
        open={state.open}
        onClose={() => toggleDrawer(false)}
      >
        <FilterContent />
      </Drawer>
    ): (
      <FilterContent />
    )}

      {state.isMobile && (
        <FilterButton
          variant='contained'
          onClick={() => toggleDrawer(!state.open)}
        >
          Filtros
        </FilterButton>
      )}
    </>
  );
}

export default Filter;