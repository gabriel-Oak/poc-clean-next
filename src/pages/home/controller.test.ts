import { mock, mockReset } from 'jest-mock-extended';
import Character from '../../features/character/models/character';
import GetCharatersUsecase from '../../features/character/usecase/get-characters';
import GetDetailsUsecase from '../../features/character/usecase/get-details';
import HomeController from './controller';
import character from '../../utils/mocks/characters.json';
import { PaginatedResult } from '../../utils/types/request';
import { CustomError } from '../../utils/custom-error';

describe('HomeController tests', () => {
  const dataMock = { isLoading: false };
  const setDataMock = jest.fn();
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
    setDataMock.mockClear();
    mockReset(getCharacterMock);
  });

  it('Should set data as loading, then load characters', async () => {
    getCharacterMock.execute.mockImplementation(async () => resultMock);
    const controller = new HomeController(
      dataMock,
      setDataMock,
      getCharacterMock,
    );

    await controller.getAll();
    expect(setDataMock).toHaveBeenCalledWith({ isLoading: true });
    expect(setDataMock).toHaveBeenCalledWith({
      isLoading: false,
      pagination: {
        count: 1,
        pages: 1,
      },
      characters: [characterMock],
    });
  });

  it('Should notify error searching characters', async () => {
    getCharacterMock.execute.mockImplementation(async () => new CustomError({
      message: 'Ooooooooooooh Nooooooo'
    }));
    const controller = new HomeController(
      dataMock,
      setDataMock,
      getCharacterMock,
    );

    await controller.getAll();
    expect(setDataMock).toHaveBeenCalledWith({ isLoading: true });
    expect(setDataMock).toHaveBeenCalledWith({ isLoading: false });
  });

  it('Should set data as loading, then load characters', async () => {
    getCharacterMock.execute.mockImplementation(async () => resultMock);
    const controller = new HomeController(
      dataMock,
      setDataMock,
      getCharacterMock,
    );

    await controller.getAll();
    expect(setDataMock).toHaveBeenCalledWith({ isLoading: true });
    expect(setDataMock).toHaveBeenCalledWith({
      isLoading: false,
      pagination: {
        count: 1,
        pages: 1,
      },
      characters: [characterMock],
    });
  });

});