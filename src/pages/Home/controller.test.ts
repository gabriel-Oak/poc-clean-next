import { mock, mockReset } from 'jest-mock-extended';
import Character from '../../features/character/models/character';
import GetCharatersUsecase from '../../features/character/usecase/get-characters';
import HomeController, { createHomeController } from './controller';
import character from '../../utils/mocks/characters.json';
import { PaginatedResult } from '../../utils/types/request';
import { CustomError } from '../../utils/custom-error';

describe('HomeController tests', () => {
  const state = { isLoading: false, page: 1 };
  const setState = jest.fn();
  const getCharacterMock = mock<GetCharatersUsecase>();
  const characterMock = new Character(character);
  const resultMock = new PaginatedResult<Character>({
    info: {
      count: 1,
      pages: 1,
    },
    results: [characterMock],
  });

  beforeEach(() => {
    setState.mockClear();
    mockReset(getCharacterMock);
  });

  it('Factory should return a controller', () => {
    const controller = createHomeController();
    expect(controller).toBeInstanceOf(HomeController);
  });

  it('Should set data as loading, then load characters', async () => {
    getCharacterMock.execute.mockImplementation(async () => resultMock);
    const controller = new HomeController(getCharacterMock);

    await controller.search({ state, setState, page: 1 });
    expect(setState).toHaveBeenCalledWith({
      isLoading: true,
      page: 1,
    });
    expect(setState).toHaveBeenCalledWith({
      isLoading: false,
      pagination: {
        count: 1,
        pages: 1,
      },
      page: 1,
      characters: [characterMock],
    });
  });

  it('Should notify error searching characters', async () => {
    getCharacterMock.execute.mockImplementation(async () => new CustomError({
      message: 'Ooooooooooooh Nooooooo'
    }));
    const controller = new HomeController(getCharacterMock);

    await controller.search({ state, setState, page: 1 });
    expect(setState).toHaveBeenCalledWith({
      isLoading: true,
      page: 1,
    });
    expect(setState).toHaveBeenCalledWith({
      isLoading: false,
      page: 1,
    });
  });

  it('Should set data as loading, then load characters', async () => {
    getCharacterMock.execute.mockImplementation(async () => resultMock);
    const controller = new HomeController(getCharacterMock);

    await controller.search({ state, setState, page: 2 });
    expect(setState).toHaveBeenCalledWith({
      isLoading: true,
      page: 1,
    });
    expect(setState).toHaveBeenCalledWith({
      isLoading: false,
      pagination: {
        count: 1,
        pages: 1,
      },
      characters: [characterMock],
      page: 2,
    });
  });

});