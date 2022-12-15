import { RefObject } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CharacterFilters } from '../../../features/character/types/character-filter';

export interface FilterInternalState {
  open?: boolean;
  containerRef: RefObject<HTMLDivElement>;
}

export interface FilterState extends FilterInternalState {
  filters: CharacterFilters;
  form: UseFormReturn<CharacterFilters, unknown>;
  isMobile: boolean;
}