import { mock, mockReset } from 'jest-mock-extended';
import Character from '../../../features/character/models/character';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';
import character from '../../../utils/mocks/characters.json';
import { PaginatedResult } from '../../../utils/types/request';
import { renderHook, act } from '@testing-library/react-hooks'
import { useHomeController } from './controller';

describe('useHomeController tests', () => {
  const getCharactersMock = mock<IGetCharatersUsecase>();
  const characterMock = new Character(character);
  const resultMock = new PaginatedResult<Character>({
    info: {
      count: 1,
      pages: 1,
    },
    results: [characterMock],
  });

  beforeEach(() => {
    mockReset(getCharactersMock);
  });

  it('Should search for characters and update state', async () => {
    getCharactersMock.execute.mockImplementation(async () => resultMock);
    await act(async () => {
      const {
        result: { current, error }, waitForNextUpdate, 
      } = renderHook(() => useHomeController(getCharactersMock));
      await waitForNextUpdate();

      current.search({ page: 3 });
      await waitForNextUpdate();
      console.log(error);
      
    });

    expect(getCharactersMock.execute).toHaveBeenCalledWith({ page: 3 });
  });
});