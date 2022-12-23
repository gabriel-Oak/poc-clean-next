import { RefObject } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CharacterFilters } from '../../../../features/character/types/character-filter';

export interface FilterState {
  open?: boolean;
  containerRef: RefObject<HTMLDivElement>;
  isMobile: boolean;
  height: number;
}

export interface FilterContextProps {
  state: FilterState;
  setOpen: (v: boolean) => void;
  onSubmit: (filters: CharacterFilters) => void;
  clearFilters: () => void;
}