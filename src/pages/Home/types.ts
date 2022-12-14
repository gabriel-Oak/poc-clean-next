import Character from "../../features/character/models/character";
import { PaginatedInfo } from "../../utils/types/request";

export interface HomeState {
  isLoading: boolean;
  characters?: Character[];
  pagination?: PaginatedInfo;
}