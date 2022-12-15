import Character from '../../features/character/models/character';
import { PaginatedInfo } from '../../utils/types/request';

export interface HomeState {
  isLoading: boolean;
  page: number;
  characters?: Character[];
  pagination?: PaginatedInfo;
  scrollTimeout?: NodeJS.Timeout;
}