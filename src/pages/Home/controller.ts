import GetCharatersUsecase from '../../features/character/usecase/get-characters';
import { PaginatedResult } from '../../utils/types/request';
import { HomeState } from './types';
import {container} from 'tsyringe';
import { CharacterFilters } from '../../features/character/types/character-filter';

export const createHomeController = () => {
  const getCharacters = container.resolve(GetCharatersUsecase)
  return new HomeController(getCharacters);
}

interface SearchProps {
  state:HomeState;
  setState: (state: HomeState) => void;
  filters?: CharacterFilters;
  page?: number;
}

export default class HomeController {
  constructor(private getCharactersUsecase: GetCharatersUsecase) {}

  async search({
    setState, state, filters, page
  }: SearchProps) {
    setState({
      ...state,
      isLoading: true,
    });

    const result = await this.getCharactersUsecase.execute({ ...filters, page});
    if (result instanceof PaginatedResult) {
      return setState({
        ...state,
        isLoading: false,
        characters: result.results,
        pagination: result.info,
        page: page || state.page,
      });
    }

    setState({ 
      ...state,
      isLoading: false
    });
    // TODO DISPLAY SNACKBAR HERE
    console.error(result);
  }
}