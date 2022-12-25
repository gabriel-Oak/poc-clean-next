import { mock, mockReset } from 'jest-mock-extended';
import Character from '../../../features/character/models/character';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';
import character from '../../../utils/mocks/characters.json';
import { PaginatedResult } from '../../../utils/types/request';
import { renderHook } from '@testing-library/react-hooks'
import { useHomeController } from './controller';
import { act } from '@testing-library/react';
import { CustomError } from '../../../utils/custom-error';

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
  const resultMockEmpty = new PaginatedResult<Character>({
    info: {
      count: 0,
      pages: 1,
    },
    results: [],
  });

  const scrollWindow = (x: number, y: number) => {
    window.scrollX = x;
    window.scrollY = y;
    window.dispatchEvent(new Event('scroll'));
  }

  beforeEach(() => {
    mockReset(getCharactersMock);
  });

  it('Should get initial characters', async () => {
    getCharactersMock.execute.mockImplementation(async () => resultMock);
    const {
      result
    } = await act(
      async () => await renderHook(() => useHomeController(getCharactersMock))
    );
    expect(result.current.state.characters).toEqual([characterMock]);
  });

  it('Should search for characters and update state', async () => {
    getCharactersMock.execute.mockImplementationOnce(async () => resultMockEmpty);
    const { result } = await act(async () => await renderHook(
      () => useHomeController(getCharactersMock))
    );

    expect(result.current.state.characters).toEqual([]);

    getCharactersMock.execute.mockImplementation(async () => resultMock);
    await act(async () =>
      result.current.search({ filters: { name: 'Juan Sanchez' } }));

    expect(result.current.state.characters).toEqual([characterMock]);
    expect(getCharactersMock.execute).toHaveBeenCalledWith({ filters: { name: 'Juan Sanchez' } });
  });

  it('Should scroll to bottom and increment state', async () => {
    getCharactersMock.execute.mockImplementationOnce(async () => resultMock);
    const { result, waitForNextUpdate } = await act(async () => await renderHook(
      () => useHomeController(getCharactersMock))
    );
    expect(result.current.state.page).toBe(1);

    getCharactersMock.execute.mockImplementation(async () => resultMock);
    scrollWindow(0, window.innerHeight);
    await waitForNextUpdate();

    expect(result.current.state.page).toBe(2);
    expect(result.current.state.characters?.length).toBe(2);
    expect(getCharactersMock.execute).toHaveBeenCalledWith(expect.objectContaining({
      page: 2
    }));
  });

  it('Should set page back to top', async () => {
    jest.spyOn(window, 'scroll').mockImplementation(() => window.scrollY = 0);
    getCharactersMock.execute.mockImplementationOnce(async () => resultMock);
    const { result } = await act(async () => await renderHook(
      () => useHomeController(getCharactersMock))
    );

    expect(global.scrollY).not.toBe(0);
    await act(async () => await result.current.backToTop());
    expect(global.scrollY).toBe(0);
  });

  it('Should set error state when... got an error!', async () => {
    getCharactersMock.execute.mockImplementation(async () => new CustomError({
      message: 'Oppsie, can not find any character'
    }));
    const {
      result
    } = await act(
      async () => await renderHook(() => useHomeController(getCharactersMock))
    );
    expect(result.current.state.errorState).toBeInstanceOf(CustomError);
  });
});