import { CharacterFilters } from '../../../features/character/types/character-filter';
import { FilterInternalState } from './types';

type setState = (state: FilterInternalState) => void;
type search = (props: { page: number, filters?: CharacterFilters }) => void;

export const createFilterController = () => {
  return new FilterController();
}

export default class FilterController {
  constructor() { }

  submit(filters: CharacterFilters, isLoading: boolean, onSubmit: search) {
    if (!isLoading) onSubmit({ page: 1, filters });
  }
}