import { UseFormReturn } from 'react-hook-form';
import Character from '../../../features/character/models/character';
import { CharacterFilters } from '../../../features/character/types/character-filter';
import { PaginatedInfo } from '../../../utils/types/request';

export interface HomeState {
  isLoading: boolean;
  page: number;
  characters?: Character[];
  pagination?: PaginatedInfo;
  form: UseFormReturn<CharacterFilters, unknown>;
  isScrolled: boolean;
}

export interface HomeContextProps {
  state: HomeState;
  search: (args: {
    filters?: CharacterFilters;
    page?: number;
  }) => Promise<void>
  backToTop: () => void;
}