import { Drawer } from '@mui/material';
import React, { FC } from 'react';
import FilterContent from './FilterContent';
import { useFilter } from './FilterContext';
import { FilterButton } from './styles';

const Filter: FC = () => {
  const { setOpen, state } = useFilter();
  
  return (
    <>
    {state.isMobile ? (
      <Drawer
        open={state.open}
        onClose={() => setOpen(false)}
      >
        <FilterContent />
      </Drawer>
    ): (
      <FilterContent />
    )}

      {state.isMobile && (
        <FilterButton
          variant='contained'
          onClick={() => setOpen(!state.open)}
        >
          Filters
        </FilterButton>
      )}
    </>
  );
}

export default Filter;