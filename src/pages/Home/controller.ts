import GetCharatersUsecase from '../../features/character/usecase/get-characters';
import { PaginatedResult } from '../../utils/types/request';
import { HomeState } from './types';
import {container} from 'tsyringe';

export const createHomeController = (data: HomeState, setData: (data: HomeState) => void) => {
  const getCharacters = container.resolve(GetCharatersUsecase)
  return new HomeController(data, setData, getCharacters);
}

export default class HomeController {
  constructor(
    private data: HomeState,
    private setData: (data: HomeState) => void,
    private getCharactersUsecase: GetCharatersUsecase,
  ) { }

  private changeState(newState: Partial<HomeState>) {
    if (JSON.stringify(newState) === JSON.stringify(this.data)) return;
    this.data = {
      ...this.data,
      ...newState
    };
    this.setData(this.data);
  }

  async getAll() {
    this.changeState({isLoading: true });

    const result = await this.getCharactersUsecase.execute();
    if (result instanceof PaginatedResult) {
      return this.changeState({
        isLoading: false,
        characters: result.results,
        pagination: result.info
      });
    }

    this.changeState({ isLoading: false });
    // TODO DISPLAY SNACKBAR HERE
    console.error(result);
  }
}